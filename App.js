import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNav from './Navigator/AppNav';
import AuthProvider from './Context/AuthContext';
import { PaperProvider } from 'react-native-paper';
 
 

export default function App() {
 
  return (
    
    
   <AuthProvider>
    <PaperProvider>
    <StatusBar 
    backgroundColor='#009387'
    />
     <AppNav/>
     </PaperProvider>
   </AuthProvider>
  
    
     

  );
}
 
