import * as React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IAP from "../containers/IAP";
import Profile from "../containers/Profile";
import Images from "../assets/Images";
import Setting from "./Setting";
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "bold",
          fontSize: 12,
          lineHeight: 15,
          paddingBottom: 3.5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const screenName = route.name.toLowerCase();
          const iconSource = focused
            ? `ic_${screenName}_active`
            : `ic_${screenName}`;
          return (
            <Image
              style={{ height: 21, resizeMode: "contain" }}
              source={Images[iconSource]}
            />
          );
        },
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen name="IAP" component={IAP} />
      <Tab.Screen name="Setting" component={Setting} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
