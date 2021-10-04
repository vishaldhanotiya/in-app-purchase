import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
} from "react-native";

import * as RNIap from "react-native-iap";
import React, { useState, useEffect } from "react";

// App Bundle > com.dooboolab.test
const itemSkus = Platform.select({
  ios: ["com.codiant.subscribe.monthly_plan"],
  android: ["com.inapp.inr_10", "com.codiant.monthly_plan"],
});

const itemSubs = Platform.select({
  android: [
    "com.codiant.subscribe.monthly_plan",
    "com.codiant.subscribe.quarterly_plan",
    "com.codiant.subscribe.half_yearly_plan",
    "com.codiant.subscribe.yearly_plan",
  ],
});

let purchaseUpdateSubscription;
let purchaseErrorSubscription;

const IAP = () => {
  const [productList, setProductList] = useState([]);
  const [receipt, setReceipt] = useState("");
  const [availableItemsMessage, setAvailableItemsMessage] = useState("");

  // useEffect(async () => {
  //   try {
  //     await RNIap.initConnection();
  //     getPurchaseHistory();

  //     if (Platform.OS === 'android') {
  //       await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
  //     } else {
  //       await RNIap.clearTransactionIOS();
  //     }
  //   } catch (err) {
  //     console.warn(err.code, err.message);
  //   }

  //   purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
  //     async (purchase) => {
  //       console.info('purchase', purchase);
  //       const receipt = purchase.transactionReceipt
  //         ? purchase.transactionReceipt
  //         : purchase.originalJson;
  //       console.info(receipt);
  //       if (receipt) {
  //         try {
  //           const ackResult = await RNIap.finishTransaction(purchase);
  //           console.info('ackResult', ackResult);
  //         } catch (ackErr) {
  //           console.warn('ackErr', ackErr);
  //         }
  //         setReceipt(receipt);

  //         setTimeout(() => {
  //           goNext();
  //         }, 5000);
  //       }
  //     },
  //   );

  //   purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
  //     console.log('purchaseErrorListener', error);
  //     Alert.alert('purchase error', JSON.stringify(error));
  //   });
  //   return () => {
  //     if (purchaseUpdateSubscription) {
  //       purchaseUpdateSubscription.remove();
  //       purchaseUpdateSubscription = null;
  //     }
  //     if (purchaseErrorSubscription) {
  //       purchaseErrorSubscription.remove();
  //       purchaseErrorSubscription = null;
  //     }
  //     RNIap.endConnection();
  //   };
  // }, []);

  const getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory();
      alert(JSON.stringify(purchaseHistory[0].purchaseToken));
      getConsumePurchaseAndroid(purchaseHistory[0].purchaseToken);
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };

  const goNext = () => {
    Alert.alert("Receipt", receipt.purchaseToken);
  };

  const getItems = async () => {
    try {
      const products = await RNIap.getProducts(itemSkus);
      // const products = await RNIap.getSubscriptions(itemSkus);
      console.log("Products", products);
      setProductList(products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      console.log("Products", products);
      setProductList(products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  const getConsumePurchaseAndroid = async (purchaseToken) => {
    try {
      const res1 = await RNIap.consumePurchaseAndroid(purchaseToken);
      alert("res1" + JSON.stringify(res1));
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };
  const getAvailablePurchases = async () => {
    try {
      console.info(
        "Get available purchases (non-consumable or unconsumed consumable)"
      );
      const purchases = await RNIap.getAvailablePurchases();
      console.info("Available purchases :: ", purchases);
      if (purchases && purchases.length > 0) {
        setAvailableItemsMessage(`Got ${purchases.length} items.`);
        setReceipt(purchases[0].transactionReceipt);
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  const requestPurchase = async (sku) => {
    try {
      RNIap.requestPurchase(sku);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const requestSubscription = async (sku) => {
    try {
      RNIap.requestSubscription(sku);
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTxt}>react-native-iap V3</Text>
      </View>
      <View style={styles.content}>
        <ScrollView style={{ alignSelf: "stretch" }}>
          <View style={{ height: 50 }} />
          <Button
            onPress={getAvailablePurchases}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get available purchases"}
          ></Button>

          <Text style={{ margin: 5, fontSize: 15, alignSelf: "center" }}>
            {availableItemsMessage}
          </Text>

          <Text style={{ margin: 5, fontSize: 9, alignSelf: "center" }}>
            {receipt.substring(0, 100)}
          </Text>
          <Button
            onPress={getSubscriptions}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get Subscription"}
          />
          <Button
            onPress={getItems}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get Products"}
          />
          {productList.map((product, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: "column",
                }}
              >
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 12,
                    color: "black",
                    minHeight: 100,
                    alignSelf: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  {JSON.stringify(product)}
                </Text>
                <Button
                  onPress={() => requestPurchase(product.productId)}
                  // onPress={(): void =>
                  //   this.requestSubscription(product.productId)
                  // }
                  activeOpacity={0.5}
                  style={styles.btn}
                  title={"Request purchase for above product"}
                ></Button>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerTxt: {
    fontSize: 26,
    color: "green",
  },
  content: {
    flex: 80,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btn: {
    height: 48,
    width: 240,
    alignSelf: "center",
    backgroundColor: "#00c40f",
    borderRadius: 0,
    borderWidth: 0,
  },
  txt: {
    fontSize: 16,
    color: "white",
  },
});

export default IAP;
