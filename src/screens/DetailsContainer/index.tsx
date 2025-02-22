import React, {useContext, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {globalStyles} from '../../styles/globalStyles';
import ResponsiveText from '../../components/ResponsiveTextComponent/ResponsiveText';
import {colors} from '../../styles/color';
import CustomBackButton from '../../components/BackButtonComponents/CustomBackButton';
import {AppContext} from '../../context/AppContext';
import {useToast} from 'react-native-toast-notifications';
import { SCREEN_NAMES } from '../../constants/ScreensNamesConstants/ScreenName';

const DetailsScreen = ({route, navigation}) => {
  const {repo} = route.params;

  const {state,dispatch} = useContext(AppContext);
  const toast = useToast();

  const [isFavorite, setIsFavorite] = useState(false);
  const scalAim = new Animated.Value(1);

  const handleAddToFavorites = () => {
    const isAlreadyFavorite = state.favorites.some(item => item.id === repo.id);
  
    if (isAlreadyFavorite) {
      toast.show('Already in favorites!', { type: 'warning', duration: 2000 });
      return;
    }
  
    dispatch({ type: 'ADD_FAVORITES', payload: repo });
    setIsFavorite(true);
  
    Animated.sequence([
      Animated.timing(scalAim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scalAim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  
    toast.show('Added to favorites!', {
      type: 'success',
      duration: 2000,
      action: {
        label: 'View Favorites',
        onPress: () => navigation.navigate(SCREEN_NAMES.FAVORITES_SCREEN),
      },
    });
  
    setTimeout(() => {
      navigation.navigate(SCREEN_NAMES.FAVORITES_SCREEN);
    }, 1000);
  };
  return (
    <View style={globalStyles.globalContainer}>
      <View style={{marginTop: scale(40)}}>
        <CustomBackButton navigation={navigation} />
      </View>
      <Image
        source={{uri: repo?.owner?.avatar_url}}
        style={{
          height: scale(100),
          width: scale(100),
          borderRadius: scale(50),
          alignSelf: 'center',
          marginTop: scale(100),
        }}
      />

      <ResponsiveText
        title={repo?.owner?.login}
        fontColor={colors.white}
        fontSize={20}
        fontStyle={{textAlign: 'center', marginTop: scale(10)}}
        fontWeight="bold"
      />
      <ResponsiveText
        title={repo?.name}
        fontColor={colors.gray}
        fontSize={16}
        fontStyle={{textAlign: 'center'}}
      />
      <ResponsiveText
        title={repo?.description}
        fontColor={colors.white}
        fontSize={14}
        fontStyle={{textAlign: 'center', marginVertical: scale(10)}}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: scale(15),
        }}>
        <ResponsiveText
          title={`⭐ ${repo?.stargazers_count}` || '0'}
          fontColor={colors.white}
          fontSize={14}
        />
        <ResponsiveText
          title={`🍴 ${repo?.forks_count}` || '0'}
          fontColor={colors.white}
          fontSize={14}
        />
        <ResponsiveText
          title={`🌐 ${repo?.language}` || 'Not Specified'}
          fontColor={colors.white}
          fontSize={14}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleAddToFavorites}
        style={{
          backgroundColor: colors.graytextColor,
          paddingVertical: scale(10),
          paddingHorizontal: scale(20),
          borderRadius: scale(8),
          alignSelf: 'center',
          marginTop: scale(40),
        }}>
        <ResponsiveText title={isFavorite ?'Added!':'Add to Favorites'} fontColor={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;
