import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import database from "@react-native-firebase/database";
import NavigationService from "../navigation/NavigationService";

const SignIn = (props) => {
  useEffect(() => {
    configureGoogle();
    const user = auth().currentUser;

    if (user) {
      //NavigationService.navigateToClearStack("MyTabs");
      props.navigation.navigate("MyTabs");
      console.log("User Data: ", user);
    }
  }, []);

  const configureGoogle = async () => {
    await GoogleSignin.configure({
      webClientId:
        "846216344342-2o32kcp11f37boqk0lt5e4qhbm2tvess.apps.googleusercontent.com",
    });
  };
  const onLogin = () => {
    onGoogleButtonPress().then((value) => {
      database()
        .ref("/users")
        .child(value.user.uid)
        .update({
          name: value.user.displayName,
          email: value.user.email,
          providerData: value.user.providerData[0],
          photoURL: value.user.photoURL,
        })
        .then((value) => {
          console.log("Signed in with Google!", JSON.stringify(value));
          props.navigation.navigate("MyTabs");
        });
    });
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.9} onPress={() => onLogin()}>
        <View
          style={{
            elevation: 10,
            borderRadius: 5,
            backgroundColor: "white",
            width: "60%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 50,
          }}
        >
          <Image
            resizeMode={"center"}
            style={{ width: 25, marginStart: 20, height: 50 }}
            source={require("../assets/gmail.png")}
          />
          <Text
            style={{
              width: "80%",
              fontWeight: "bold",
              fontSize: 16,
              color: "#707371",
              textAlign: "center",
            }}
          >
            {"Sign in with Google"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignIn;
