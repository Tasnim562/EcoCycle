import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, View , Text, Settings } from "react-native";
import LinearGradient from "react-native-linear-gradient"
import { COLORS } from "../colors"
import Parameter from "../screens/collectors/Parameter";
import Clients from "../screens/collectors/Clients";
import Map_view from "../screens/collectors/Map_view";
import HomeScreen from "../screens/collectors/HomeScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const Home_collectors = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: COLORS.primary,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: COLORS.dark,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          position: 'absolute',
        },
      }}
    >
      <Tab.Screen 
        name="home_page" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <LinearGradient
                colors={focused ? 
                  ['rgba(173, 193, 120, 0.9)', 'rgba(205, 190, 130, 0.9)'] : 
                  ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={[
                  styles.tabIconContainer,
                  focused && styles.tabIconContainerFocused
                ]}
              >
                <MaterialCommunityIcon 
                  name={focused ? "home" : "home-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : COLORS.tertiary}
                />
              </LinearGradient>
              <Text style={[
                styles.tabLabel, 
                focused && styles.tabLabelFocused
              ]}>
                Home
              </Text>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />

       <Tab.Screen 
        name="clients_map_stack" 
        component={Clients_map_stack} 
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'clients';
            if (routeName === 'map_view') {
              return { display: 'none' };
            }
            return {
              height: 70,
              backgroundColor: COLORS.primary,
              borderTopWidth: 0,
              elevation: 0,
              shadowColor: COLORS.dark,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              position: 'absolute',
            };
          })(route),
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <LinearGradient
                colors={focused ? 
                  ['rgba(173, 193, 120, 0.9)', 'rgba(205, 190, 130, 0.9)'] : 
                  ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={[
                  styles.tabIconContainer,
                  focused && styles.tabIconContainerFocused
                ]}
              >
                <MaterialCommunityIcon 
                  name={focused ? "map" : "map-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : COLORS.tertiary}
                />
              </LinearGradient>
              <Text style={[
                styles.tabLabel, 
                focused && styles.tabLabelFocused
              ]}>
                Map
              </Text>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        })}
      />
      
      <Tab.Screen 
        name="settings" 
        component={Parameter}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <LinearGradient
                colors={focused ? 
                  ['rgba(173, 193, 120, 0.9)', 'rgba(205, 190, 130, 0.9)'] : 
                  ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                style={[
                  styles.tabIconContainer,
                  focused && styles.tabIconContainerFocused
                ]}
              >
                <MaterialCommunityIcon 
                  name={focused ? "cog" : "cog-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : COLORS.tertiary}
                />
              </LinearGradient>
              <Text style={[
                styles.tabLabel, 
                focused && styles.tabLabelFocused
              ]}>
                Menu
              </Text>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

function Clients_map_stack() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="clients" >

        <Stack.Screen name="map_view" component={Map_view} />
        <Stack.Screen name="clients" component={Clients} />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    width: 70,
    height: 70,
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(108, 88, 76, 0.1)',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tabIconContainerFocused: {
    shadowColor: COLORS.primary_2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.tertiary,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  tabLabelFocused: {
    color: COLORS.primary_2,
    fontWeight: '700',
    fontSize: 12,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary_2,
    marginTop: 4,
  },
})
