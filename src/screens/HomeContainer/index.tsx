import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scale} from 'react-native-size-matters';
import {AppContext} from '../../context/AppContext';
import axios from 'axios';
import ResponsiveText from '../../components/ResponsiveTextComponent/ResponsiveText';
import {SCREEN_NAMES} from '../../constants/ScreensNamesConstants/ScreenName';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';

const HomeScreen = ({navigation}:any) => {
  const {state, dispatch} = useContext(AppContext);
  const [search, setSearch] = useState('');
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (!search.trim()) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(fetchRepo, 500);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [search]);

  const fetchRepo = useCallback(async () => {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${search}`,
      );
      dispatch({type: 'SET_REPOSITORIES', payload: response?.data.items || []});
    } catch (error) {
      dispatch({type: 'SET_ERROR', payload: 'Error fetching data'});
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  }, [search, dispatch]);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{x: 0.3, y: 0}}
        end={{x: 1.5, y: 0}}
        colors={[colors.graytextColor, '#6b6a6a']}
        style={styles.header}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent
        />
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search GitHub"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={colors.white}
            style={styles.searchInput}
          />
        </View>
      </LinearGradient>

      <View style={globalStyles.globalContainer}>
        {state.loading && !state.repositories?.length ? (
          <ActivityIndicator
            size="large"
            color={colors.white}
            style={styles.loader}
          />
        ) : state.error ? (
          <ResponsiveText
            title={state.error}
            fontColor={colors.red}
            fontStyle={styles.errorText}
          />
        ) : state.repositories?.length ? (
          <FlatList
            data={state.repositories}
            keyExtractor={item =>
              item?.id?.toString() || Math.random().toString()
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.repoContainer}
                onPress={() =>
                  navigation.navigate(SCREEN_NAMES.DETAILS_SCREEN, {repo: item})
                }>
                <Image
                  source={{uri: item?.owner.avatar_url}}
                  style={styles.avatar}
                />
                <View style={styles.repoDetails}>
                  <ResponsiveText
                    title={item.name}
                    fontColor={colors.white}
                    fontWeight="bold"
                  />
                  <ResponsiveText
                    title={item?.description || 'No description'}
                    fontColor={colors.white}
                  />
                  <Text style={styles.stats}>
                    ⭐ {item.stargazers_count} | 🍴 {item.forks_count} | 🏷{' '}
                    {item.language || 'N/A'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <ResponsiveText
              title="Find your stuff"
              fontColor={colors.white}
              fontWeight="bold"
              fontSize={22}
            />
            <View style={styles.textContainer}>
              <ResponsiveText
                title="Search all of GitHub for People,"
                fontColor={colors.gray}
              />
              <ResponsiveText
                title="Repositories, Organizations, Issues, and"
                fontColor={colors.gray}
              />
              <ResponsiveText title="Pull Requests." fontColor={colors.gray} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {backgroundColor: colors.black, flex: 1},
  header: {padding: 15, paddingTop: StatusBar.currentHeight},
  searchContainer: {
    height: scale(45),
    backgroundColor: colors.black,
    borderRadius: scale(12),
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
  searchInput: {
    color: colors.white,
    fontSize: moderateScale(18),
    fontWeight: '400',
    textAlign: 'center',
  },
  loader: {marginTop: scale(20)},
  errorText: {textAlign: 'center', marginTop: scale(20)},
  repoContainer: {
    padding: scale(12),
    backgroundColor: '#252525',
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    elevation: 3,
    gap: 20,
  },
  avatar: {
    height: scale(45),
    width: scale(45),
    borderRadius: scale(10),
  },
  repoDetails: {flex: 1},
  stats: {
    color: colors.graytextColor,
    fontSize: moderateScale(12),
    marginTop: 5,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {alignItems: 'center', marginTop: 10},
});
