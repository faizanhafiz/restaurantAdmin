import { View, Text } from "react-native";
import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "../Context/AuthContext";
 
import { NavigationContainer } from "@react-navigation/native";
import Login from "../Screen/Login";
 
import BottomTabNavigator from "./BottomTabNavigator";


const AppNav = () => {
  const { token } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {token == null ? <Login /> : <BottomTabNavigator/>}
    </NavigationContainer>
  );
};

export default AppNav;
