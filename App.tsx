import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './src/navigation/tab';
import navigationConfigs from './src/navigation/config/options';
import { navigationRef } from './src/navigation/NavigationService';
import Root from './src/navigation/sence/RootScenes';

const App = () => {
  return (
    <NavigationContainer>
        <Tabs />
        {/* <Root/> */}
    </NavigationContainer>
  );
};

export default App;
