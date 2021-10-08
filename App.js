/* eslint-disable max-len */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Routes from "./src/navigation";
import NoInternetConnection from "./src/components/noInternetConnection";
const firebaseConfig = {
  apiKey: "AIzaSyBaS-Bd2k_YLoPFlwYA4APITEFtdBxDc-8",
  authDomain: "api-5702398225768468996-286864.firebaseapp.com",
  databaseURL:
    "https://api-5702398225768468996-286864-default-rtdb.firebaseio.com",
  projectId: "api-5702398225768468996-286864",
  storageBucket: "api-5702398225768468996-286864.appspot.com",
  messagingSenderId: "846216344342",
  appId: "1:846216344342:web:3fea7e13893bdc39d59637",
  measurementId: "G-248Q2SLTY0",
};
const App: () => React$Node = () => {
  useEffect(() => {
    //firebase.initializeApp(firebaseConfig);

    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <NoInternetConnection />
    </View>
  );
};

export default App;
