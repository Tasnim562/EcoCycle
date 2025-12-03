import React, { useContext } from "react"
import { View, Text, ScrollView, Switch, StyleSheet, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { FarmerContext } from "../../context/FarmerContext"
import { COLORS } from "../../colors"
import auth from '@react-native-firebase/auth';

export default function FarmerSettingsScreen({navigation}) {
  const { farmer } = useContext(FarmerContext)
  const [notifications, setNotifications] = React.useState(true)
  const [offers, setOffers] = React.useState(true)

  const renderSettingsGroup = (title, items) => (
    <View style={styles.settingsGroup}>
      <View style={styles.groupHeader}>
        <Text style={styles.groupTitle}>{title}</Text>
      </View>
      <View style={styles.groupContent}>
        {items.map((item, index) => (
          <View key={item.id}>
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={item.onPress}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.settingCard}
              >
                <View style={styles.settingLeft}>
                  <View style={[
                    styles.settingIconContainer,
                    item.color && { backgroundColor: item.color + '20' }
                  ]}>
                    <MaterialCommunityIcons 
                      name={item.icon} 
                      size={22} 
                      color={item.color || COLORS.primary_2} 
                    />
                  </View>
                  <View style={styles.settingTextContainer}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    {item.value && <Text style={styles.settingValue}>{item.value}</Text>}
                  </View>
                </View>
                {item.toggle !== undefined ? (
                  <Switch
                    value={item.toggle}
                    onValueChange={item.onToggle}
                    trackColor={{ 
                      false: 'rgba(108, 88, 76, 0.2)', 
                      true: 'rgba(173, 193, 120, 0.7)' 
                    }}
                    thumbColor={item.toggle ? COLORS.primary_2 : COLORS.mediumGray}
                  />
                ) : (
                  <MaterialCommunityIcons 
                    name="chevron-right" 
                    size={22} 
                    color={COLORS.primary_2} 
                  />
                )}
              </LinearGradient>
            </TouchableOpacity>
            {index < items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  )

  const profileItems = [
    { 
      id: "name", 
      icon: "account", 
      label: "Full Name", 
      value: farmer.name,
      onPress: () => console.log("Edit name")
    },
    { 
      id: "email", 
      icon: "email", 
      label: "Email Address", 
      value: farmer.email,
      onPress: () => console.log("Edit email")
    },
    { 
      id: "phone", 
      icon: "phone", 
      label: "Phone Number", 
      value: farmer.phone,
      onPress: () => console.log("Edit phone")
    },
    { 
      id: "location", 
      icon: "map-marker", 
      label: "Location", 
      value: farmer.location,
      onPress: () => console.log("Edit location")
    },
  ]

  const notificationItems = [
    {
      id: "orders",
      icon: "bell",
      label: "Order Notifications",
      toggle: notifications,
      onToggle: setNotifications,
      onPress: () => setNotifications(!notifications)
    },
    {
      id: "offers",
      icon: "tag",
      label: "Special Offers",
      toggle: offers,
      onToggle: setOffers,
      color: COLORS.accent,
      onPress: () => setOffers(!offers)
    },
  ]

  const supportItems = [
    { 
      id: "help", 
      icon: "help-circle", 
      label: "Help & Support", 
      color: COLORS.accent,
      onPress: () => console.log("Open help")
    },
    { 
      id: "terms", 
      icon: "file-document", 
      label: "Terms & Conditions", 
      color: COLORS.dark,
      onPress: () => console.log("Open terms")
    },
    { 
      id: "privacy", 
      icon: "shield-account", 
      label: "Privacy Policy", 
      color: COLORS.tertiary,
      onPress: () => console.log("Open privacy policy")
    },
  ]

  const accountItems = [
    { 
      id: "logout", 
      icon: "logout", 
      label: "Logout", 
      color: "#FF6B6B",
      onPress: () => console.log("Logout")
    }
  ]

  const handleLogout = async () => {
    try {
      await auth().signOut();
      console.log("🔥 User logged out successfully!");
      setEmail(null)
      setPassword(null)
      setLoading(false)
    } catch (error) {
      console.log("❌ Logout error:", error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Profile Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.avatarContainer}
          >
            <MaterialCommunityIcons name="account" size={36} color={COLORS.primary} />
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{farmer.name}</Text>
            <Text style={styles.profileEmail}>{farmer.email}</Text>
            <View style={styles.farmerBadge}>
              <MaterialCommunityIcons name="sprout" size={14} color={COLORS.primary} />
              <Text style={styles.farmerBadgeText}>Certified Farmer</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Profile Section */}
      {renderSettingsGroup("Profile Information", profileItems)}

      {/* Notifications Section */}
      {renderSettingsGroup("Notification Preferences", notificationItems)}

      {/* Support Section */}
      {renderSettingsGroup("Support & Information", supportItems)}

      {/* Account Section */}
      <View style={styles.settingsGroup}>
        <View style={styles.groupHeader}>
          <Text style={styles.groupTitle}>Account</Text>
        </View>
        <View style={styles.groupContent}>
          <TouchableOpacity style={styles.logoutButton} onPress={()=>handleLogout()}>
            <LinearGradient
              colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
              style={styles.logoutGradient}
            >
              <MaterialCommunityIcons name="logout" size={22} color={COLORS.primary} />
              <Text style={styles.logoutText}>Sign Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Version */}
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>EcoCycle Farmer v2.1.0</Text>
        <Text style={styles.versionSubtext}>Sustainable Farming Platform</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginBottom: 60
  },
  header: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 3,
    borderColor: COLORS.primary + '40',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: COLORS.primary,
    opacity: 0.9,
    marginBottom: 8,
  },
  farmerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  farmerBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '40',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.primary + '60',
  },
  settingsGroup: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  groupHeader: {
    marginBottom: 16,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
  },
  groupContent: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  settingRow: {
    borderRadius: 0,
  },
  settingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.mediumGray,
    marginHorizontal: 16,
  },
  logoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  versionText: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: COLORS.tertiary,
    opacity: 0.7,
  },
})
