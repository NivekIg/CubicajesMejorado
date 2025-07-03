/**
 * @format
 */

require('moment/locale/es.js');
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './src/navigations/AppStack';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
