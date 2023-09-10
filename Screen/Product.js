import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../Context/AuthContext";
import { FAB, Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = (props) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const { product ,setToken } = useContext(AuthContext);
  useEffect(() => {}, [product]);
  const [openFAB, setOpenFAB] = useState(false);

  const logout=()=>{
    AsyncStorage.removeItem("token")
    setToken(null)
    
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 150,
          marginBottom: 5,
        }}
      >
        <View style={{ height: "100%", width: "50%" }}>
          <Image
            source={{ uri: item.imageUrl }}
            style={{ width: "100%", height: "100%" }}
          ></Image>
        </View>
        <View
          style={{
            width: "50%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            padding: 8,
          }}
        >
          <Text>{item.productName}</Text>
          <Text>Price: {item.price}</Text>

          <TouchableOpacity
            disabled={item.available ? true : false}
            style={
              item.available
                ? styles.disabledButton
                : styles.buttongreen
            }
          >
            <Text>make available</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={item.available ? true : false}
            style={
              item.available
                ? styles.buttonorange
                : styles.disabledButton
            }
          >
            <Text>make not available</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Portal.Host> 
      <View style={styles.container}>
        {product.length == 0 ? null : (
          <>
            <View>
              <FlatList
                data={product}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
              <Portal>
                <FAB.Group
                  open={open}
                  visible
                  icon={open ? "close" : "plus"}
                  actions={[
                    { icon: "logout", label: "logout", onPress: () => logout() },
                     
                  ]}
                  onStateChange={onStateChange}
                  onPress={() => {
                    if (open) {
                      // do something if the speed dial is open
                    }
                  }}
                />
              </Portal>
            </View>
          </>
        )}
      </View>
    </Portal.Host>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    padding: 5,
  },
  buttongreen: {
    width: "100%",
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 6,
    backgroundColor: "green",
  },
  buttonorange: {
    width: "100%",
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 6,
    backgroundColor: "red",
  },
  disabledButton: {
    width: "100%",
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 6,
    backgroundColor: "gray", // Change this to your desired disabled button color
    // Adjust opacity to indicate disabled state
  },
});
