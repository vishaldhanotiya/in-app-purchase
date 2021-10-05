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
import { TouchableOpacity } from "react-native-gesture-handler";
import database from "@react-native-firebase/database";

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
import auth from "@react-native-firebase/auth";
let user = null,
  productPrice = "";
const IAP = () => {
  const [productList, setProductList] = useState([]);
  // const [productPrice, setProductPrice] = useState("");
  const [receipt, setReceipt] = useState("");
  const [uid, setUid] = useState("");
  const [availableItemsMessage, setAvailableItemsMessage] = useState("");

  useEffect(() => {
    user = auth().currentUser;

    if (user) {
      //NavigationService.navigateToClearStack("MyTabs");
      setUid(user.uid);

      console.log("User Data: ", user);
    }
    initialConfiguration();
    return () => {
      endConnection();
    };
  }, []);

  const initialConfiguration = async () => {
    try {
      await RNIap.initConnection();
      // getPurchaseHistory();
      getItems();
      if (Platform.OS === "android") {
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      } else {
        await RNIap.clearTransactionIOS();
      }
    } catch (err) {
      console.warn(err.code, err.message);
    }

    purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
      async (purchase) => {
        //console.info("Purchase 1==>", purchase);
        const receipt = purchase.transactionReceipt
          ? purchase.transactionReceipt
          : purchase.originalJson;
        // console.info("Purchase 2==>", receipt);
        if (receipt) {
          try {
            const ackResult = await RNIap.finishTransaction(purchase);
            console.info("ackResult", ackResult);
          } catch (ackErr) {
            console.warn("ackErr", ackErr);
          }
          getPurchaseHistory();
          setReceipt(receipt);
          goNext(receipt, productPrice);
        }
      }
    );

    purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
      console.log("purchaseErrorListener", error);
      Alert.alert("purchase error", JSON.stringify(error));
    });
  };
  const endConnection = () => {
    if (purchaseUpdateSubscription) {
      purchaseUpdateSubscription.remove();
      purchaseUpdateSubscription = null;
    }
    if (purchaseErrorSubscription) {
      purchaseErrorSubscription.remove();
      purchaseErrorSubscription = null;
    }
    RNIap.endConnection();
  };
  const getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory();
      console.log("PurchaseHistory", JSON.stringify(purchaseHistory.length));
      //alert(JSON.stringify(purchaseHistory[0].purchaseToken));
      if (purchaseHistory.length > 0) {
        for (var i = 0; i < purchaseHistory.length; i++) {
          getConsumePurchaseAndroid(purchaseHistory[i].purchaseToken);
          //console.log("=============>", purchaseHistory[i].purchaseToken);
        }
      }
    } catch (err) {
      console.warn(err); // standardized err.code and err.message available
    }
  };

  const goNext = (receiptValue, productPrice) => {
    console.log("$$$===>", productPrice);
    database()
      .ref("/users")
      .child(user.uid)
      .child("purchaseHistory")
      .push({
        orderId: JSON.parse(receiptValue).orderId,
        productId: JSON.parse(receiptValue).productId,
        purchaseTime: JSON.parse(receiptValue).purchaseTime,
        purchaseToken: JSON.parse(receiptValue).purchaseToken,
        productPrice: productPrice,
      })
      .then((value) => {
        console.log("Insert Purchase Record!", JSON.stringify(value));
        //props.navigation.navigate("MyTabs");
      });
    //  Alert.alert("Receipt", JSON.parse(receiptValue).purchaseToken);
    Alert.alert("Receipt", "Payment Successfully");
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
  //********* Get All Subscriptions *********
  const getSubscriptions = async () => {
    try {
      const products = await RNIap.getSubscriptions(itemSubs);
      //console.log("Products", products);
      setProductList(products);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };
  const getConsumePurchaseAndroid = async (purchaseToken) => {
    try {
      // alert("purchaseToken==========" + JSON.stringify(purchaseToken));
      const res1 = await RNIap.consumePurchaseAndroid(purchaseToken);
      //alert("res1" + JSON.stringify(res1));
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
      // console.info("Available purchases :: ", purchases);
      if (purchases && purchases.length > 0) {
        setAvailableItemsMessage(`Got ${JSON.stringify(purchases)} items.`);
        setReceipt(purchases[0].transactionReceipt);
      }
    } catch (err) {
      console.warn(err.code, err.message);
      Alert.alert(err.message);
    }
  };

  // Version 3 apis
  const requestPurchase = async (sku, price) => {
    try {
      await RNIap.requestPurchase(sku);
      productPrice = price;
      // setProductPrice(price);
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
      {/* <View style={styles.header}>
        <Text style={styles.headerTxt}>react-native-iap V3</Text>
      </View> */}
      <View style={styles.content}>
        <ScrollView style={{ alignSelf: "stretch" }}>
          <View style={{ height: 50 }} />
          {/* <Button
            onPress={getAvailablePurchases}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get available purchases"}
          /> */}

          {/* <Text style={{ margin: 5, fontSize: 15, alignSelf: "center" }}>
            {availableItemsMessage}
          </Text>

          <Text style={{ margin: 5, fontSize: 9, alignSelf: "center" }}>
            {receipt}
          </Text> */}

          {/*
          "********* Get All Subscriptions *********"
           <Button
            onPress={getSubscriptions}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get Subscription"}
          /> */}
          {/* <Button
            onPress={getItems}
            activeOpacity={0.5}
            style={styles.btn}
            title={"Get Products"}
          /> */}
          {productList.map((product, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: "column",
                }}
              >
                {/* <Text
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
                </Text> */}
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    requestPurchase(
                      product.productId,
                      JSON.parse(product.originalJson).price
                    );
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      {"Buy " + JSON.parse(product.originalJson).price}
                    </Text>
                  </View>
                </TouchableOpacity>
                {/* <Button
                  onPress={() => requestPurchase(product.productId)}
                  // onPress={(): void =>
                  //   this.requestSubscription(product.productId)
                  // }
                  activeOpacity={0.5}
                  style={styles.btn}
                  title={"Buy " + JSON.parse(product.originalJson).price}
                ></Button> */}
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
    justifyContent: "center",
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
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btn: {
    height: 48,
    width: 200,
    borderRadius: 10,
    marginTop: 50,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#00c40f",
  },
  txt: {
    fontSize: 16,
    color: "white",
  },
});

export default IAP;
