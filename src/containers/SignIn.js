import React, { useEffect, useState } from "react";
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
import { NetworkCheck } from "../utils/Constant";

const SignIn = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    configureGoogle();
    const user = auth().currentUser;

    if (user) {
      setTimeout(() => {
        NavigationService.navigateToClearStack("MyTabs");
      }, 20);
      console.log("User Data: ", user);
    }
  }, []);

  const configureGoogle = async () => {
    await GoogleSignin.configure({
      webClientId:
        "912277330827-k6j83i7k2inrd70sp6hn97v9m6cs082s.apps.googleusercontent.com",
    });
  };
  const onLogin = () => {
    if (NetworkCheck.isConnected) {
      setLoading(true);
      onGoogleButtonPress()
        .then((value) => {
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
              setLoading(false);

              console.log("Signed in with Google!", JSON.stringify(value));
              props.navigation.navigate("MyTabs");
            });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
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
      {loading ? (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 25,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ fontWeight: "bold", fontSize: 15, marginStart: 20 }}>
            {"Please wait"}
          </Text>
        </View>
      ) : null}

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
