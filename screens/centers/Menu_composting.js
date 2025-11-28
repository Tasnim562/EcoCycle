import { useState } from "react"
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Switch } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    marketplaceNotifications: true,
    requestUpdates: true,
  })

  const [profileData] = useState({
    name: "EcoCycle Center Alpha",
    email: "center@ecocycle.com",
    phone: "+216 71 123 456",
    location: "Tunis, Tunisia",
    verificationStatus: "Verified",
  })

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
  }

  const settingItems = [
    {
      key: "notifications",
      label: "Push Notifications",
      icon: "bell-outline",
      description: "Receive app notifications and alerts"
    },
    {
      key: "emailNotifications",
      label: "Email Notifications",
      icon: "email-outline",
      description: "Get updates via email"
    },
    {
      key: "marketplaceNotifications",
      label: "Marketplace Updates",
      icon: "shopping-outline",
      description: "New compost batch alerts and updates"
    },
    {
      key: "requestUpdates",
      label: "Request Updates",
      icon: "clipboard-list-outline",
      description: "Waste collection request notifications"
    },
  ]

  const accountActions = [
    {
      label: "Edit Profile",
      icon: "account-edit",
      description: "Update your center information"
    },
    {
      label: "Change Password",
      icon: "lock-reset",
      description: "Set a new password for your account"
    },
    {
      label: "Privacy Settings",
      icon: "shield-account",
      description: "Manage your privacy preferences"
    }
  ]

  const supportActions = [
    {
      label: "Help & FAQs",
      icon: "help-box",
      description: "Find answers to common questions"
    },
    {
      label: "Contact Support",
      icon: "message-text-outline",
      description: "Get help from our support team"
    },
    {
      label: "About EcoCycle",
      icon: "information-outline",
      description: "Learn more about our mission"
    }
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Profile Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.profileHeader}
      >
        <View style={styles.profileContent}>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.profileAvatar}
          >
            <MaterialCommunityIcons name="leaf" size={36} color={COLORS.primary} />
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <View style={styles.verificationBadge}>
              <MaterialCommunityIcons name="check-decagram" size={16} color={COLORS.primary} />
              <Text style={styles.verificationText}>{profileData.verificationStatus}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Contact Information Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="card-account-details" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Contact Information</Text>
        </View>
        
        <View style={styles.infoGrid}>
          <LinearGradient
            colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
            style={styles.infoCard}
          >
            <View style={styles.infoIconContainer}>
              <MaterialCommunityIcons name="email" size={20} color={COLORS.primary_2} />
            </View>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>{profileData.email}</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(221, 229, 182, 0.3)', 'rgba(173, 193, 120, 0.2)']}
            style={styles.infoCard}
          >
            <View style={styles.infoIconContainer}>
              <MaterialCommunityIcons name="phone" size={20} color={COLORS.accent} />
            </View>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>{profileData.phone}</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(169, 132, 103, 0.3)', 'rgba(108, 88, 76, 0.2)']}
            style={styles.infoCard}
          >
            <View style={styles.infoIconContainer}>
              <MaterialCommunityIcons name="map-marker" size={20} color={COLORS.tertiary} />
            </View>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{profileData.location}</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(205, 190, 130, 0.3)', 'rgba(240, 234, 210, 0.2)']}
            style={styles.infoCard}
          >
            <View style={styles.infoIconContainer}>
              <MaterialCommunityIcons name="calendar-check" size={20} color={COLORS.primary_2} />
            </View>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>Jan 2024</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Notification Settings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="bell-outline" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Notification Preferences</Text>
        </View>
        
        <View style={styles.settingsGrid}>
          {settingItems.map((item) => (
            <View key={item.key} style={styles.settingCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.settingContent}
              >
                <View style={styles.settingHeader}>
                  <View style={styles.settingIconContainer}>
                    <MaterialCommunityIcons name={item.icon} size={20} color={COLORS.primary_2} />
                  </View>
                  <View style={styles.settingText}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Text style={styles.settingDescription}>{item.description}</Text>
                  </View>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{
                    false: 'rgba(108, 88, 76, 0.2)',
                    true: 'rgba(173, 193, 120, 0.7)',
                  }}
                  thumbColor={settings[item.key] ? COLORS.primary_2 : COLORS.mediumGray}
                />
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="cog-outline" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Account Settings</Text>
        </View>
        
        <View style={styles.actionsList}>
          {accountActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.actionContent}
              >
                <View style={styles.actionLeft}>
                  <View style={styles.actionIconContainer}>
                    <MaterialCommunityIcons name={action.icon} size={22} color={COLORS.primary_2} />
                  </View>
                  <View style={styles.actionText}>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primary_2} />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="lifebuoy" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Support & Information</Text>
        </View>
        
        <View style={styles.actionsList}>
          {supportActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.actionContent}
              >
                <View style={styles.actionLeft}>
                  <View style={styles.actionIconContainer}>
                    <MaterialCommunityIcons name={action.icon} size={22} color={COLORS.primary_2} />
                  </View>
                  <View style={styles.actionText}>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                    <Text style={styles.actionDescription}>{action.description}</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primary_2} />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Enhanced Logout Section */}
      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => alert("Logged out!")}
        >
          <LinearGradient
            colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
            style={styles.logoutGradient}
          >
            <MaterialCommunityIcons name="logout-variant" size={22} color={COLORS.primary} />
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>EcoCycle v2.1.0</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
     marginBottom: 70
  },
  profileHeader: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 3,
    borderColor: COLORS.primary + '80',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 6,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  verificationText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  infoCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  settingsGrid: {
    gap: 12,
  },
  settingCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: COLORS.tertiary,
    lineHeight: 16,
  },
  actionsList: {
    gap: 8,
  },
  actionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  actionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  actionText: {
    flex: 1,
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 12,
    color: COLORS.tertiary,
    lineHeight: 16,
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
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
    paddingVertical: 18,
    gap: 12,
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.tertiary,
    textAlign: 'center',
  },
})