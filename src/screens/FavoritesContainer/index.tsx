import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {colors} from '../../styles/color';
import {globalStyles} from '../../styles/globalStyles';
import {scale} from 'react-native-size-matters';
import {AppContext} from '../../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import {useToast} from 'react-native-toast-notifications';
import ResponsiveText from '../../components/ResponsiveTextComponent/ResponsiveText';

const FavoritesScreen = ({navigation}: any) => {
  const {state, dispatch} = useContext(AppContext);

  const toast = useToast();
  const toggleFavorite = repo => {
    dispatch({type: 'REMOVE_ADD_FAVORITES', payload: repo.id});
    toast.show('Remove to favorites!', {type: 'danger', duration: 2000});
  };

  return (
    <View style={globalStyles.globalContainer}>
      <View style={{marginTop: scale(40)}}>
        <CustomBackButton navigation={navigation} />
      </View>
      <ResponsiveText
        title="⭐ Favorite Repositories"
        fontStyle={styles.header}
        fontSize={22}
      />

      {state.favorites.length === 0 ? (
        <ResponsiveText
          title="No favorites yet. Start adding some!"
          fontStyle={styles.emptyText}
          fontSize={16}
        />
      ) : (
        <FlatList
          data={state.favorites}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardContent}>
                <Image
                  source={{uri: item.owner.avatar_url}}
                  style={styles.avatar}
                />
                <View style={{flex: 1}}>
                  <ResponsiveText
                    title={item?.name}
                    fontStyle={styles.repoName}
                  />
                  <ResponsiveText
                    title={item?.owner.login}
                    fontStyle={styles.repoOwner}
                  />
                  <ResponsiveText
                    title={item.description || 'No description available.'}
                    fontStyle={styles.repoDescription}
                  />

                  <View style={styles.statsRow}>
                    <View style={styles.stat}>
                      <Icon name="star" size={scale(20)} color="gold" />

                      <ResponsiveText
                        title={item.stargazers_count}
                        fontStyle={styles.statText}
                      />
                    </View>
                    <View style={styles.stat}>
                      <Icon name="call-split" size={scale(20)} color="gray" />
                      <ResponsiveText
                        title={item.forks_count}
                        fontStyle={styles.statText}
                      />
                    </View>
                    <View style={styles.stat}>
                      <Icon name="code" size={scale(20)} color="#00BFFF" />
                      <ResponsiveText
                        title={item.language || 'Unknown'}
                        fontStyle={styles.statText}
                      />
                      
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => toggleFavorite(item)}>
                <Icon name="delete" size={scale(26)} color={colors.red} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(15),
  },
  header: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginVertical: scale(20),
  },
  emptyText: {
    color: '#bbb',
    textAlign: 'center',
    marginTop: scale(50),
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: scale(10),
    padding: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap:10
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginRight: scale(10),
  },
  repoName: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  repoOwner: {
    color: colors.graytextColor,
    fontSize: 14,
    marginBottom: scale(5),
  },
  repoDescription: {
    color: '#bbb',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: scale(5),
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(15),
  },
  statText: {
    color: '#bbb',
    fontSize: 14,
    marginLeft: 5,
  },
  deleteButton: {
    padding: scale(10),
  },
});

export default FavoritesScreen;
