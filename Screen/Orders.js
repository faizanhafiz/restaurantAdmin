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
import { FAB, Modal, Portal  ,ActivityIndicator,MD2Colors, Snackbar} from "react-native-paper";
import { TextInput } from "react-native";

const Orders = (props) => {
  const { order, getOrderBydate ,showToastedError} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [dates ,setDate] = useState("");
  const [month ,setMonth] = useState("");
  const [year ,setYear] = useState("");
    

  useEffect(() => {}, [order]);
  const FABComponent = () => (
    <FAB icon="plus" style={styles.fab} onPress={() => showModal()} />
  );

  const handlegetOrderBydate=async()=>{
    
    if(month.length==0 || dates.length==0||year.length==0)
    {
      hideModal();
      showToastedError("please enter all fields")
      return
       
    }
     if(month.length==1 || month.length>2 )
     {
      hideModal();
      showToastedError("Please enter correct month format")
      return
     }
     if(dates.length==1 || dates.length>2){
      hideModal();
      showToastedError("Please enter correct date format")
      return
     }

     if( year.length!=4){
      hideModal();
      showToastedError("Please enter correct year format")
      return
     }


     const date = year+"-"+month+"-"+dates;
     try{
       setIsLoading(true);
      hideModal();
       await getOrderBydate(date);
       setIsLoading(()=>{

       },5000)
       
     }catch(err)
     {
      setIsLoading(false);
      console.log("error inside handlegetOrderBydate ",err);
     }finally{
       setIsLoading(false);
     }
   
     
  
  }

  const OrderItem = ({ item }) => {
    return (
      
      <View style={styles.orderContainer}>
        <Text style={styles.userName}>Name : {item.name}</Text>
        <Text style={styles.userName}>orderDate: {item.orderDate}</Text>
        <Text style={styles.userName}>mobile: {item.address.newMobile}</Text>
        <Text style={styles.userName}>address: {item.address.address}</Text>
        <Text style={styles.userName}>landmark: {item.address.landmark}</Text>

        {item.product.map((product) => (
          <View key={product.id} style={styles.productContainer}>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.productImage}
            />
            <Text style={styles.productPrice}>{product.productName}</Text>
            <Text style={styles.productPrice}>Price: {product.price}</Text>
            <Text style={styles.productPrice}>
              Quantity: {product.quantity}
            </Text>
            <Text style={styles.productStatus}>Status :{product.status}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator animating={isLoading} color={MD2Colors.red800} />
      </View>
      ) : order.length === 0 ? (
        <View>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text>Enter Date</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setDate(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2, borderBottomColor: '#000' }} />
                    <Text>Date:</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setMonth(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2 }} />
                    <Text>Month:</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setYear(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2 }} />
                    <Text>Year:</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buttonop} onPress={() => { handlegetOrderBydate() }}>
                  <Text>Get Order</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
        
        </View>
      ) : (
        <View>
          <FlatList
            data={order}
            renderItem={OrderItem}
            keyExtractor={(item) => item.id.toString()} // Ensure key is a string
            showsVerticalScrollIndicator={false}
          />
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.containerStyle}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <View style={{ alignItems: 'center' }}>
                <Text>Enter Date</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setDate(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2, borderBottomColor: '#000' }} />
                    <Text>Date:</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setMonth(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2 }} />
                    <Text>Month:</Text>
                  </View>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput onChangeText={(text) => setYear(text)} style={{ borderBottomWidth: 1, width: 70, margin: 2 }} />
                    <Text>Year:</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.buttonop} onPress={() => { handlegetOrderBydate() }}>
                  <Text>Get Order</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </Portal>
           
        </View>
      )}
        <FABComponent />
         
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonop: {
    width: "100%",
    height: 40,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
    marginBottom:2,
    backgroundColor: "pink" 
  },
  containerStyle: { 
    backgroundColor: "white", 
    padding: 20,
   
     
   },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: "#fff9",
    flex: 1,

    marginTop: StatusBar.currentHeight || 0,
  },
  button: {
    width: "100%",
    height: 30,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 6,
  },
  orderContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: {
    fontWeight: "bold",
  },
  orderDate: {
    color: "gray",
  },
  productContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productName: {
    fontWeight: "bold",
  },
  productPrice: {},
  productStatus: {
    color: "blue",
  },
});
