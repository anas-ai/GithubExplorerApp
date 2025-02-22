/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AppProvider from './src/context/AppContext';
import {ToastProvider} from 'react-native-toast-notifications';

const Root = () => {
  return (
    <AppProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AppProvider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
