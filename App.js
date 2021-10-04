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

const App: () => React$Node = () => {
  useEffect(async () => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      NetworkCheck.isConnected = state.isConnected;
    });
    // await RNIap.initConnection();
    // RNIap.initConnection().then(() => {
    //   // we make sure that "ghost" pending payment are removed
    //   // (ghost = failed pending payment that are still marked as pending in Google's native Vending module cache)
    //   RNIap.flushFailedPurchasesCachedAsPendingAndroid()
    //     .catch(() => {
    //       // exception can happen here if:
    //       // - there are pending purchases that are still pending (we can't consume a pending purchase)
    //       // in any case, you might not want to do anything special with the error
    //     })
    //     .then(() => {
    //       RNIap.purchaseUpdatedListener(async (purchase) => {
    //         // console.log('purchaseUpdatedListener', purchase);
    //         const receipt = purchase.transactionReceipt;
    //         if (purchase.productId === 'com.codiant.monthly_plan') {
    //           console.log('Nothing to Do');
    //         } else {
    //           console.log('===>' + JSON.stringify(purchase.productId));
    //           const params = {
    //             grant_type: 'refresh_token',
    //             client_id: CLIENT_ID,
    //             client_secret: CLIENT_SECRET,
    //             refresh_token: REFRESH_TOKEN,
    //           };
    //           commonApiAxios(
    //             'POST',
    //             'https://accounts.google.com/o/oauth2/token?',
    //             params,
    //           )
    //             .then((response) => {
    //               console.log('Access Token==>' + JSON.stringify(response));
    //               getValidateReceiptAndroid(
    //                 purchase.packageNameAndroid,
    //                 purchase.productId,
    //                 purchase.purchaseToken,
    //                 response.data.access_token,
    //                 true,
    //               ).then((result) => {
    //                 console.log(
    //                   'Get Validate Receipt Android==>' +
    //                     JSON.stringify(result),
    //                 );
    //               });
    //             })
    //             .catch((error) => {
    //               console.log(JSON.stringify(error));
    //             });
    //           if (receipt) {
    //             if (Platform.OS === 'ios') {
    //               await RNIap.finishTransactionIOS(purchase.transactionId);
    //             } else if (Platform.OS === 'android') {
    //               // If consumable (can be purchased again)
    //               // await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
    //               // If not consumable
    //               await RNIap.acknowledgePurchaseAndroid(
    //                 purchase.purchaseToken,
    //               );
    //             }
    //             // yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
    //             // .then( async (deliveryResult) => {
    //             //   if (isSuccess(deliveryResult)) {
    //             //     // Tell the store that you have delivered what has been paid for.
    //             //     // Failure to do this will result in the purchase being refunded on Android and
    //             //     // the purchase event will reappear on every relaunch of the app until you succeed
    //             //     // in doing the below. It will also be impossible for the user to purchase consumables
    //             //     // again until you do this.
    //             //     if (Platform.OS === 'ios') {
    //             //       await RNIap.finishTransactionIOS(purchase.transactionId);
    //             //     } else if (Platform.OS === 'android') {
    //             //       // If consumable (can be purchased again)
    //             //       await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
    //             //       // If not consumable
    //             //       await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
    //             //     }

    //             //     // From react-native-iap@4.1.0 you can simplify above `method`. Try to wrap the statement with `try` and `catch` to also grab the `error` message.
    //             //     // If consumable (can be purchased again)
    //             //     await RNIap.finishTransaction(purchase, true);
    //             //     // If not consumable
    //             //     await RNIap.finishTransaction(purchase, false);
    //             //   } else {
    //             //     // Retry / conclude the purchase is fraudulent, etc...
    //             //   }
    //             // });
    //           }
    //         }
    //       });

    //       // this.purchaseErrorSubscription = purchaseErrorListener((error) => {
    //       //   console.warn('purchaseErrorListener', error);
    //       // });
    //     });
    // });

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
