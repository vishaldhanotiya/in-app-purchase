import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import NavigationService from "../navigation/NavigationService";
export default function Profile({ navigation }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const user = auth().currentUser;

    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
      setProfileImage(user.photoURL);
      console.log("User email: ", user);
    }
  }, []);

  const signOut = async () => {
    // database().ref("/users").push({
    //   name: "item",
    // });
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth()
      .signOut()
      .then((value) => {
        NavigationService.navigateToClearStack("SignIn");
      });
  };
  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={{ uri: profileImage }} />
      <Text style={styles.textStyle}>{displayName}</Text>
      <Text style={styles.textStyle}>{email}</Text>
      <TouchableOpacity
        style={{
          elevation: 10,
          borderRadius: 5,
          backgroundColor: "white",
          width: "40%",
          marginTop: 50,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
        }}
        activeOpacity={0.9}
        onPress={signOut}
      >
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: "#707371",
            }}
          >
            {"Sign out"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginTop: -100,
    borderRadius: 50,
    marginBottom: 30,
  },
  textStyle: {
    fontSize: 20,
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
