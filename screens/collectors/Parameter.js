import { useContext, useState } from "react"
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Switch,
  Dimensions,
  Animated
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NGOContext } from "../../context/NGOContext"
import { COLORS } from "../../colors"

const { width } = Dimensions.get('window')

const Parameter = ({navigation}) => {
  const { collectorData } = useContext(NGOContext)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editedName, setEditedName] = useState(collectorData.name)

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#F5F0D8']}
        style={styles.backgroundGradient}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header with Elegant Design */}
          <View style={styles.headerContainer}>
            <LinearGradient
              colors={['rgba(173, 193, 120, 0.1)', 'rgba(221, 229, 182, 0.05)']}
              style={styles.headerBackground}
            >
              <Text style={styles.headerTitle}>Settings</Text>
              <Text style={styles.headerSubtitle}>Manage your preferences</Text>
            </LinearGradient>
          </View>

          {/* Profile Section - Elegant Card Design */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Profile Information</Text>

            <LinearGradient
              colors={[COLORS.primary_2, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileCard}
            >
              {/* Decorative Elements */}
              <View style={styles.profileDecoration} />
              
              <View style={styles.profileContent}>
                <View style={styles.profileHeader}>
                  <LinearGradient
                    colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                    style={styles.profileAvatarContainer}
                  >
                    <View style={styles.profileAvatar}>
                      <LinearGradient
                        colors={[COLORS.tertiary, COLORS.dark]}
                        style={styles.avatarGradient}
                      >
                        <MaterialCommunityIcons 
                          name="account" 
                          size={36} 
                          color={COLORS.white} 
                        />
                      </LinearGradient>
                    </View>
                  </LinearGradient>
                  
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{collectorData.name}</Text>
                    <Text style={styles.profilePhone}>{collectorData.phone}</Text>
                    <View style={styles.ratingBadge}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{collectorData.rating}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.editButton}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                    style={styles.editButtonGradient}
                  >
                    <MaterialCommunityIcons name="pencil" size={18} color={COLORS.white} />
                    <Text style={styles.editButtonText}>Edit Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* Contact Info Cards */}
            <View style={styles.contactCards}>
              <TouchableOpacity 
                style={styles.contactCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(240, 234, 210, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                  style={styles.contactCardGradient}
                >
                  <View style={styles.contactCardHeader}>
                    <View style={[styles.contactIcon, styles.emailIcon]}>
                      <MaterialCommunityIcons name="email" size={22} color={COLORS.white} />
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.mediumGray} />
                  </View>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>ahmed.benali@email.com</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.contactCard}
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['rgba(221, 229, 182, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                  style={styles.contactCardGradient}
                >
                  <View style={styles.contactCardHeader}>
                    <View style={[styles.contactIcon, styles.phoneIcon]}>
                      <MaterialCommunityIcons name="phone" size={22} color={COLORS.white} />
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.mediumGray} />
                  </View>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>{collectorData.phone}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Performance Section - Modern Metrics */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Performance Metrics</Text>

            <View style={styles.metricsContainer}>
              {[
                {
                  icon: "star",
                  value: collectorData.rating,
                  label: "Rating",
                  colors: [COLORS.accent, '#9ABE73'],
                  iconColor: "#FFD700"
                },
                {
                  icon: "truck-check",
                  value: collectorData.successfulDeliveries,
                  label: "Deliveries",
                  colors: [COLORS.tertiary, COLORS.dark],
                  iconColor: COLORS.white
                },
                {
                  icon: "percent",
                  value: `${collectorData.reliabilityScore}%`,
                  label: "Reliability",
                  colors: [COLORS.success, '#2F855A'],
                  iconColor: COLORS.white
                }
              ].map((metric, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.metricCard}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={metric.colors}
                    style={styles.metricGradient}
                  >
                    <View style={styles.metricIconContainer}>
                      <MaterialCommunityIcons 
                        name={metric.icon} 
                        size={28} 
                        color={metric.iconColor} 
                      />
                    </View>
                    <Text style={styles.metricValue}>{metric.value}</Text>
                    <Text style={styles.metricLabel}>{metric.label}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Notifications Section - Elegant Toggles */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Notifications</Text>

            <View style={styles.notificationCards}>
              {[
                {
                  icon: "bell",
                  label: "Request Notifications",
                  subtitle: "Get alerts for new pickup requests",
                  value: notificationsEnabled,
                  onValueChange: setNotificationsEnabled
                },
                {
                  icon: "message",
                  label: "Chat Notifications",
                  subtitle: "Messages from partners",
                  value: true
                },
                {
                  icon: "map-marker",
                  label: "Location Updates",
                  subtitle: "Allow location tracking for deliveries",
                  value: true
                }
              ].map((item, index) => (
                <View 
                  key={index} 
                  style={styles.notificationCard}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                    style={styles.notificationCardGradient}
                  >
                    <View style={styles.notificationContent}>
                      <View style={styles.notificationLeft}>
                        <View style={[
                          styles.notificationIconContainer,
                          { backgroundColor: COLORS.accent + '20' }
                        ]}>
                          <MaterialCommunityIcons 
                            name={item.icon} 
                            size={22} 
                            color={COLORS.accent} 
                          />
                        </View>
                        <View style={styles.notificationInfo}>
                          <Text style={styles.notificationLabel}>{item.label}</Text>
                          <Text style={styles.notificationSubtitle}>{item.subtitle}</Text>
                        </View>
                      </View>
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: COLORS.mediumGray, true: COLORS.accent + '99' }}
                        thumbColor={COLORS.white}
                        ios_backgroundColor={COLORS.mediumGray}
                      />
                    </View>
                  </LinearGradient>
                </View>
              ))}
            </View>
          </View>

          {/* Support Section - Elegant Menu */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Support & Legal</Text>

            <View style={styles.supportCards}>
              {[
                { icon: "help-circle", label: "Help Center", color: COLORS.accent },
                { icon: "file-document", label: "Terms & Conditions", color: COLORS.tertiary },
                { icon: "shield-lock", label: "Privacy Policy", color: COLORS.dark }
              ].map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.supportCard}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                    style={styles.supportCardGradient}
                  >
                    <View style={styles.supportCardContent}>
                      <View style={[
                        styles.supportIconContainer,
                        { backgroundColor: item.color + '20' }
                      ]}>
                        <MaterialCommunityIcons 
                          name={item.icon} 
                          size={22} 
                          color={item.color} 
                        />
                      </View>
                      <Text style={styles.supportLabel}>{item.label}</Text>
                      <MaterialCommunityIcons 
                        name="chevron-right" 
                        size={24} 
                        color={COLORS.mediumGray} 
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Logout Button - Elegant Design */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity 
              style={styles.logoutButton}
              activeOpacity={0.8} onPress={()=>navigation.navigate('Login') }
            >
              <LinearGradient
                colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
                style={styles.logoutButtonGradient}
              >
                <MaterialCommunityIcons name="logout" size={22} color={COLORS.primary} />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.footerSpacer} />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerBackground: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  sectionContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
    opacity: 0.8,
  },
  profileCard: {
    borderRadius: 28,
    marginBottom: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.3)',
  },
  profileDecoration: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileContent: {
    padding: 24,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileAvatarContainer: {
    padding: 6,
    borderRadius: 50,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
    marginLeft: 4,
  },
  editButton: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
  },
  contactCards: {
    flexDirection: 'row',
    gap: 16,
  },
  contactCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  contactCardGradient: {
    padding: 20,
    width : "100%" ,
    height : "100%" ,
    flex: 1
  },
  contactCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  emailIcon: {
    backgroundColor: COLORS.accent,
  },
  phoneIcon: {
    backgroundColor: COLORS.tertiary,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#949494ff",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  metricCard: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  metricGradient: {
    padding: 24,
    alignItems: "center",
    width: "100%" ,
    height: "100%" ,
    flex: 1
  },
  metricIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.9)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  notificationCards: {
    gap: 12,
  },
  notificationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.1)',
  },
  notificationCardGradient: {
    padding: 20,
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 4,
  },
  notificationSubtitle: {
    fontSize: 13,
    color: COLORS.tertiary,
  },
  supportCards: {
    gap: 12,
  },
  supportCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.1)',
  },
  supportCardGradient: {
    padding: 20,
  },
  supportCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  supportLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  logoutContainer: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  logoutButton: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(229, 62, 62, 0.2)',
    shadowColor: COLORS.error,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2
  },
  logoutButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    gap: 12,
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
  },
  footerSpacer: {
    height: 40,
  },
})

export default Parameter