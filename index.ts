/**
 * Entry point for the Expo application
 * 
 * This file registers the root component with Expo's AppRegistry.
 * It ensures proper initialization whether running in Expo Go or a native build.
 */
import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
