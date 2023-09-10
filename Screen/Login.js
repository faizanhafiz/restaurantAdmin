import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useSafeAreaFrame } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";
import CustomeInput from "../Component/CustomeInput";
import CustomeButton from "../Component/CustomeButton";
import Loader from "./Loader";
import { BASE_URL } from "../Config/config";

const Login = () => {
  const { token, setToken, showToastedError, showToastedSuccess } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading ,setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
       
      showToastedError("Please enter both email and password.");
      return;
    } else if (!isValidEmail(email)) {
       
      showToastedError("Please enter a valid email address.");
      return;
    } else if (password.length < 4) {
      
      showToastedError("Password must be at least 4 characters long.");
      return;
    }

    try{
      setIsLoading(true);
    const response = await Promise.race([
       fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }),
      new Promise(
        (_, reject) =>
          setTimeout(() => reject(new Error("Request timed out")), 15000) // 30 seconds timeout
      ),
    ]);

    if (response.status == 200) {
      const data = await response.json();
      if(data!=null)
      {
        setToken(data.token);
        AsyncStorage.setItem("token", data.token);
        setIsLoading(false);

      }
     
     
    }
    else if(response.status===401)
    {
      setIsLoading(false);
      showToastedError("verify you account");
      navigation.navigate("verificationScreen");
    }
    
    else if (response.status === 500) {
      setIsLoading(false);
      showToastedError("Something went wrong on the server.");
    }else if(response.status===404)
    {
      setIsLoading(false);
      showToastedError("user not found");

    }
     else {
    
      setIsLoading(false);
      showToastedError("Network issue");
    }

    }catch(err)
    {
      setIsLoading(false);

      showToastedError("server error")

    }

  };

  return (
    <>
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <Text style={styles.textTitle}>Login To your Account</Text>

        <CustomeInput
          placeholder="Email"
          keyBoardType="email-address"
          secureText={false}
          setValue={setEmail}
        />

        <CustomeInput
          placeholder="Password"
          secureText={true}
          setValue={setPassword}
        />

        <CustomeButton
          onPress={() => handleLogin(email, password)}
          text="Login"
        />
        
      </KeyboardAvoidingView>

    </View>


    {isLoading?<Loader/>:null}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    backgroundColor: "#fff",
  },
  keyboardContainer: {
    flex: 1,
    marginTop: "10%",
    alignItems: "center",

    width: "100%",
    marginTop: "25%",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 40,
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  forgotPassword: {
    alignSelf: "flex-start",
    marginHorizontal: 40,
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 16,
  },
  orText: {
    fontSize: 14,
    marginTop: 40,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-evenly",
    width: "60%",
  },
  socialButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  socialImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  signupContainer: {
    flexDirection: "row",
  },
  signupText: {
    fontSize: 15,
    fontWeight: "500",
  },
  signupLink: {
    color: "blue",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
