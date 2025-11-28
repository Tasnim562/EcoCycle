import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { StyleSheet, View , Text, Settings } from "react-native";
import CompostingCenterHomeScreen from "../screens/centers/Home_center";
import LinearGradient from "react-native-linear-gradient"
import RequestsScreen from "../screens/centers/Requests";
import SettingsScreen from "../screens/centers/Menu_composting";
import CompostShop from "../screens/centers/Marketplace";
import { COLORS } from "../colors"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const Home_composting = () => {
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
        component={CompostingCenterHomeScreen}
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
        name="requests" 
        component={RequestsScreen}
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
                  name={focused ? "clipboard-list" : "clipboard-list-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : COLORS.tertiary}
                />
              </LinearGradient>
              <Text style={[
                styles.tabLabel, 
                focused && styles.tabLabelFocused
              ]}>
                Requests
              </Text>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name="marketplace" 
        component={CompostShop}
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
                  name={focused ? "shopping" : "shopping-outline"} 
                  size={24} 
                  color={focused ? COLORS.primary : COLORS.tertiary}
                />
              </LinearGradient>
              <Text style={[
                styles.tabLabel, 
                focused && styles.tabLabelFocused
              ]}>
                Shop
              </Text>
              {focused && <View style={styles.activeDot} />}
            </View>
          ),
        }}
      />
      
      <Tab.Screen 
        name="settings" 
        component={SettingsScreen}
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

// Additional floating tab bar background component for extra visual appeal
const TabBarBackground = () => (
  <View style={tabBarBackgroundStyles.container}>
    <LinearGradient
      colors={['rgba(240, 234, 210, 0.95)', 'rgba(221, 229, 182, 0.9)']}
      style={tabBarBackgroundStyles.background}
    >
      <View style={tabBarBackgroundStyles.topBorder} />
    </LinearGradient>
  </View>
)

const tabBarBackgroundStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
  },
  background: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
  },
  topBorder: {
    height: 3,
    backgroundColor: 'rgba(205, 190, 130, 0.3)',
    marginHorizontal: 20,
    borderRadius: 2,
    marginTop: 5,
  },
})