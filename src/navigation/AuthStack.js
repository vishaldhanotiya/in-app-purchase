import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';

import Profile from '../containers/Profile';
import IAP from '../containers/IAP';

const Stack = createStackNavigator();
const AuthModeStack = createStackNavigator();
const LoggedInStack = createStackNavigator();

const AuthNavigator = () => {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  return (
    <AuthModeStack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
        name="SignIn"
        component={SignIn}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SignUp"
        component={SignUp}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
        name="Forgot"
        component={Forgot}
      /> */}
    </AuthModeStack.Navigator>
  );
};

const LoggedInNavigator = () => (
  <LoggedInStack.Navigator>
    {/* <Stack.Screen
      options={{ headerShown: true }}
      name="Home"
      component={Home}
    /> */}
    <Stack.Screen options={{ headerShown: true }} name="IAP" component={IAP} />
  </LoggedInStack.Navigator>
);

export default function AuthStack() {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={LoggedInNavigator}
            options={{
              headerShown: false,
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={AuthNavigator}
            options={{
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              headerShown: false,
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
