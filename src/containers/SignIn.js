import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const textRef = useRef();

  useEffect(() => {
    configureGoogle();
  }, []);

  const configureGoogle = async () => {
    await GoogleSignin.configure({
      webClientId:
        "846216344342-2o32kcp11f37boqk0lt5e4qhbm2tvess.apps.googleusercontent.com",
    });
  };
  const onLogin = () => {
    onGoogleButtonPress().then(() => {
      props.navigation.navigate("IAP");

      console.log("Signed in with Google!");
    });
  };

  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    //alert(JSON.stringify(token));

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.logo}>HeyAPP</Text>
      <View style={styles.inputView}>
        <TextInput
          ref={textRef}
          style={styles.inputText}
          value={email}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          value={password}
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin()}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
     
      */}
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
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          auth().signOut();
        }}
      >
        <Text style={styles.loginText}>Signup</Text>
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
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});

export default SignIn;
