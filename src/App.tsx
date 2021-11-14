/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';

import { rootReducer } from "./redux/reducers/reducers";
import HomeScreen from './home_screen/HomeScreen';
import SignupScreen from './signup_screen/SignupScreen';
import SplashScreen from './splash_screen/SplashScreen';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
