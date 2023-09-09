import { View, StyleSheet } from "react-native";
import React from "react";
import { Text, BottomNavigation } from "react-native-paper";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Orders from "../Screen/Orders";
import Product from "../Screen/Product";
import ReciveOrder from "../Screen/ReciveOrder";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Product"
      activeColor="#0007"
      shifting={false}
      barStyle={{ backgroundColor: '#009387' }}
    >
      <Tab.Screen
        name="Product"
        component={Product}

        options={{
                 
          tabBarLabel: "Product",
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
        
          tabBarLabel: "Orders",
          tabBarIcon: ({ color }) => (
            <Icon name="list-sharp" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="ReciveOrder"
        component={ReciveOrder}
        options={{
          tabBarLabel: "ReciveOrder",
          tabBarIcon: ({ color }) => (
            <Icon name="reorder-two-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
