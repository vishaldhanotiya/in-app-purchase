import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";

let user = null;
export default function Setting({ navigation }) {
  const [transactionHistory, setTransactionHistory] = useState([]);
  useEffect(() => {
    user = auth().currentUser;
    User();
  }, []);
  function User() {
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
          padding: 15,
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
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
              {"Price: "}
            </Text>
            <Text style={{ color: "black", fontSize: 16 }}>
              {" "}
              {item.productPrice}
            </Text>
          </View>
          <View>
            <Text style={{ color: "black", fontSize: 16 }}>
              {new Date(item.purchaseTime).toLocaleDateString() +
                " " +
                new Date(item.purchaseTime).toLocaleTimeString()}
            </Text>
          </View>
        </View>
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
      <View style={{ flex: 1 }}>
        {transactionHistory.length > 0 ? (
          <FlatList
            style={{ flex: 1, padding: 10 }}
            data={transactionHistory}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 200,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {"No Transactions Found"}
            </Text>
          </View>
        )}
      </View>
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
