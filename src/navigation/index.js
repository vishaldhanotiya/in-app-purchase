import * as React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NavigationService from "./NavigationService";
import Splash from "../containers/Splash";
import IAP from "../containers/IAP";
import SignIn from "../containers/SignIn";

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
      component={Splash}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="IAP" component={IAP} />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
