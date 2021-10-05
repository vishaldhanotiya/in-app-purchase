import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

let user = null;
export default function Setting({ navigation }) {
  const [transactionHistory, setTransactionHistory] = useState([]);
  useEffect(() => {
    user = auth().currentUser;
    User(user.uid);
  }, []);
  function User({ userId }) {
    database()
      .ref("/users")
      .child(user.uid)
      .child("purchaseHistory")
      .on("value", (snapshot) => {
        let items = [];
        snapshot.forEach(function (historySnapshot) {
          items.push(historySnapshot.val());
        });
        setTransactionHistory(items);
      });
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          elevation: 10,
          marginTop: 10,
          marginHorizontal: 5,
          borderRadius: 10,
          marginBottom: 5,
          backgroundColor: "white",
          //alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            {"Order Id: "}
          </Text>
          <Text style={{ color: "black", fontSize: 16 }}>{item.orderId}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            {"Price: "}
          </Text>
          <Text style={{ color: "black", fontSize: 16 }}>
            {" "}
            {item.productPrice}
          </Text>
        </View>
        {/* <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "black" }}> {"Price"}</Text>
          <Text style={{ color: "black" }}> {item.productPrice}</Text>
        </View> */}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <Text style={{ fontSize: 20, padding: 20, fontWeight: "bold" }}>
          {"Transaction History"}
        </Text>
      </View>
      <FlatList
        style={{ flex: 1, padding: 10 }}
        data={transactionHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  textStyle: {
    fontSize: 13,
    marginTop: 10,
  },
  buttonStyle: {
    width: 100,
    height: 50,
    backgroundColor: "#add8e6",
    marginTop: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
