/* eslint-disable max-len */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from "react";
import { Platform, ActivityIndicator, Alert } from "react-native";
import SplashScreen from "react-native-splash-screen";
import * as RNIap from "react-native-iap";
import NetInfo from "@react-native-community/netinfo";

// import RNIap, {
//   purchaseErrorListener,
//   purchaseUpdatedListener,
//   ProductPurchase,
//   PurchaseError,
// } from 'react-native-iap';

import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  NetworkCheck,
} from "./src/utils/Constant";
import Routes from "./src/navigation";
import { firebase } from "@react-native-firebase/auth";
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
    const unsubscribe = NetInfo.addEventListener((state) => {
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
      NetworkCheck.isConnected = state.isConnected;
    });

    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    return () => {
      unsubscribe();
    };
  }, []);

  const getValidateReceiptAndroid = async (
    packageName,
    productId,
    purchaseToken,
    accessToken,
    isSub
  ) => {
    try {
      const result = await RNIap.validateReceiptAndroid(
        packageName,
        productId,
        purchaseToken,
        accessToken,
        isSub
      );
      return result;
    } catch (err) {
      console.error("getValidateReceiptAndroid==" + JSON.stringify(err)); // standardized err.code and err.message available
    }
  };
  return <Routes />;
};

export default App;
