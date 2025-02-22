import { SCREEN_NAMES } from "../constants/ScreensNamesConstants/ScreenName";
import DetailsScreen from "../screens/DetailsContainer";
import FavoritesScreen from "../screens/FavoritesContainer";
import HomeScreen from "../screens/HomeContainer";

export const RoutesStack = [
    {name:SCREEN_NAMES.HOME_SCREEN,component:HomeScreen},
    {name:SCREEN_NAMES.DETAILS_SCREEN,component:DetailsScreen},
    {name:SCREEN_NAMES.FAVORITES_SCREEN,component:FavoritesScreen},
   
]