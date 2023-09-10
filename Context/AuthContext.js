import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { BASE_URL } from "../Config/config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [product, setProduct] = useState([]);

  const [order, setOrder] = useState([]);

  const getAllProduct = async () => {
    setIsLoading(true);
    await fetch(`${BASE_URL}/product/products`, {
      method: "GET",
      "Content-Type": "application/json",
    })
      .then((response) => {
        if (response.status == 200) {
          setIsLoading(false);
          return response.json();
        } else if (response.status == 500) {
          setIsLoading(false);
          showToastedError("server error");
        }
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error inside getproducts");
      });
  };

  const getOrderBydate = async (date) => {
    if (date == null) {
      const d = new Date();
      var month = (d.getMonth() + 1).toString();
      var dd = d.getDate().toString();
      const year = d.getFullYear();
      if (dd.length == 1) {
        dd = 0 + dd;
      }
      if (month.length == 1) {
        month = 0 + month;
      }
      date = year + "-" + month + "-" + dd;
      console.log(date);
    }
     

    try {
      const response = await Promise.race([
        fetch(`${BASE_URL}/order/getOrderbydate?date=${date}`),
        new Promise(
          (_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), 15000) // 30 seconds timeout
        ),
      ]);

      if (response.status == 200) {
        const data = await response.json();
        setOrder(data);
      } else if (response.status === 500) {
        showToastedError("server error");
      }
    } catch (err) {
     alert("time out")
    }
  };

  const login = async (email, password) => {
    try {
      return await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const showToastedError = (message) => {
   
    Toast.show({
      type: "error",
      text1: message,
      autoHide: true,
      position: "top", // Display at the top
      visibilityTime: 1500,
    });
  };

  const showToastedSuccess = (message) => {
    alert("inside")
    Toast.show({
      type: "success",
      text1: message,
      autoHide: true,
      position: "top", // Display at the top
      visibilityTime: 1500,
    });
  };

  const isLoggedIn = async () => {
    try {
      let token = await AsyncStorage.getItem("token");

      if (token != null) {
        setToken(token);
      }
    } catch (e) {
      console.log(`loggedIn error ${e}`);
    }
  };

  useEffect(() => {
     
    isLoggedIn();
    getAllProduct();
    getOrderBydate();
  }, []);

  useEffect(() => {
  
  }, [order]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        setToken,
        showToastedError,
        showToastedSuccess,
        product,
        order,
        getOrderBydate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});
