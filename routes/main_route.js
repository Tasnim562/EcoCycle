import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/auth/LoginScreen";
import FarmerRegister from "../screens/auth/FarmerRegister";
import CollectorsRegister from "../screens/auth/CollectorsRegister";
import CentersRegister from "../screens/auth/CentersRegister";
import SupplierRegister from "../screens/auth/SupplierRegister";
import RegisterType from "../screens/auth/RegisterType";
import MembershipPaymentScreen from "../screens/auth/Membership";
import { Home_supplier } from "./supplier";
import { SupplierProvider } from "../context/SupplierContext";
import { CompostingCenterProvider } from "../context/CompostingCenterContext";
import { Home_composting } from "./composting_center";
import { Home_farmer } from "./farmer";
import { FarmerProvider } from "../context/FarmerContext";
import { Home_collectors } from "./collectors";
import { NGOContextProvider } from "../context/NGOContext";
import { useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const Stack = createNativeStackNavigator();

function RootStack() {
  const [initializing, setInitializing] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (user) => {
  if (user) {
    try {
      const doc = await firestore().collection('users').doc(user.uid).get();
      if (doc.exists) {
        const role = doc.data()?.role; // optional chaining
        if (role) {
          setUserRole(role);
        } else {
          console.log("User doc exists but role missing:", doc.data());
          setUserRole(null);
        }
      } else {
        console.log("No user doc found for uid:", user.uid);
        setUserRole(null);
      }
    } catch (error) {
      console.log("Firestore fetch error:", error);
      setUserRole(null);
    }
  } else {
    setUserRole(null);
  }

  if (initializing) setInitializing(false);
});


    return subscriber;
  }, []);

  if (initializing) {
    return null; // or a loading spinner
  }

  return userRole ? <AppStack role={userRole} /> : <AuthStack />;
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="farmer_register" component={FarmerRegister} />
      <Stack.Screen name="collector_register" component={CollectorsRegister} />
      <Stack.Screen name="centers_register" component={CentersRegister} />
      <Stack.Screen name="supplier_register" component={SupplierRegister} />
      <Stack.Screen name="userType" component={RegisterType} />
      <Stack.Screen name="membership" component={MembershipPaymentScreen} />
    </Stack.Navigator>
  );
}


function AppStack({ role }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'supplier' && <Stack.Screen name="home_supplier" component={Home_supplier} />}
      {role === 'composte_center' && <Stack.Screen name="home_composting" component={Home_composting} />}
      {role === 'farmer' && <Stack.Screen name="home_farmer" component={Home_farmer} />}
      {role === 'collector' && <Stack.Screen name="home_collectors" component={Home_collectors} />}
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <NGOContextProvider>
        <FarmerProvider>
          <CompostingCenterProvider>
            <SupplierProvider>
            
              <RootStack />
          
            </SupplierProvider>
          </CompostingCenterProvider>
        </FarmerProvider>
      </NGOContextProvider>
    </NavigationContainer>
  );
}