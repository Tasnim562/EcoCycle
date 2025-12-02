import { useState, useEffect } from "react"
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  Animated
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"

const { width } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
  const [collectorData, setCollectorData] = useState({
    name: "Ahmed Ben Ali",
    phone: "+216 92 123 456",
    rating: 4.8,
    successfulDeliveries: 47,
    totalKilometers: 1240,
    pendingPickups: 3,
    ecoPerformance: "Excellent",
    reliabilityScore: 96,
    punctualityScore: 94,
  })

  const [assignedDeliveries, setAssignedDeliveries] = useState([
    {
      id: 1,
      type: "organic_food",
      quantity: 25,
      unit: "kg",
      supplier: "Restaurant Le Jardin",
      location: { lat: 36.8065, lng: 10.1967 },
      distance: 2.3,
      expiresIn: "20 hours",
      timestamp: "2024-01-15T10:30:00",
      status: "assigned",
      contactPhone: "+216 71 123 456",
    },
    {
      id: 2,
      type: "carbon_rich",
      quantity: 40,
      unit: "kg",
      supplier: "Hotel Djerba Menzel",
      location: { lat: 36.8125, lng: 10.2025 },
      distance: 3.8,
      expiresIn: "No expiry",
      timestamp: "2024-01-15T11:15:00",
      status: "assigned",
      contactPhone: "+216 75 456 789",
    },
    {
      id: 3,
      type: "organic_food",
      quantity: 15,
      unit: "kg",
      supplier: "Cafe Al Medina",
      location: { lat: 36.7995, lng: 10.185 },
      distance: 1.5,
      expiresIn: "18 hours",
      timestamp: "2024-01-15T12:00:00",
      status: "assigned",
      contactPhone: "+216 72 789 012",
    },
  ])

  const getEcoPerformanceBadgeColor = (performance) => {
    if (performance === "Excellent") return COLORS.success
    if (performance === "Good") return '#D69E2E'
    return COLORS.error
  }

  const getEcoPerformanceGradient = (performance) => {
    if (performance === "Excellent") return ['rgba(56, 161, 105, 0.1)', 'rgba(56, 161, 105, 0.05)']
    if (performance === "Good") return ['rgba(214, 158, 46, 0.1)', 'rgba(214, 158, 46, 0.05)']
    return ['rgba(229, 62, 62, 0.1)', 'rgba(229, 62, 62, 0.05)']
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#F8F5E6']}
        style={styles.backgroundGradient}
      >
        {/* Elegant Header */}
        <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
        >
        <View style={styles.headerContent}>
            <View style={styles.headerText}>
                <Text style={styles.welcomeText}>{collectorData.name.split(" ")[0]}</Text>
                <Text style={styles.subText}>Making eco-friendly deliveries count</Text>
            </View>
            <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.collectorBadge}
            >
                <MaterialCommunityIcons name="truck" size={28} color={COLORS.primary} />
            </LinearGradient>
        </View>
        
        {/* Stats Bar */}
        <View style={styles.statsBar}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{collectorData.successfulDeliveries}</Text>
                <Text style={styles.statLabel}>Deliveries</Text>
            </View>
            <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{collectorData.punctualityScore}%</Text>
                    <Text style={styles.statLabel}>On Time</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{collectorData.rating}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
            </View>
        </LinearGradient>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
            

          {/* Featured Rating Card */}
          <TouchableOpacity 
            style={styles.featuredCardContainer}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primary_2, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featuredCard}
            >
              <View style={styles.featuredCardDecoration}>
                <View style={styles.decorationCircle1} />
                <View style={styles.decorationCircle2} />
              </View>
              
              <View style={styles.ratingContent}>
                <View style={styles.ratingIconContainer}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']}
                    style={styles.ratingIconGradient}
                  >
                    <MaterialCommunityIcons name="star" size={40} color="#FFD700" />
                  </LinearGradient>
                </View>
                <View style={styles.ratingTextContainer}>
                  <Text style={styles.ratingValue}>{collectorData.rating}</Text>
                  <Text style={styles.ratingLabel}>Community Rating</Text>
                  <Text style={styles.ratingSubLabel}>
                    Based on {collectorData.successfulDeliveries} successful deliveries
                  </Text>
                </View>
              </View>
              <View style={styles.ratingFooter}>
                <Text style={styles.ratingFooterText}>🎯 Top 10% of collectors</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Metrics Dashboard */}
          <View style={styles.metricsSection}>
            <Text style={styles.sectionTitle}>Your Impact Dashboard</Text>
            
            <View style={styles.metricsGrid}>
              {/* Deliveries Metric */}
              <TouchableOpacity style={styles.metricCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={[COLORS.secondary, '#C8D79E']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricIconContainer}>
                    <View style={[styles.metricIcon, { backgroundColor: 'rgba(173, 193, 120, 0.3)' }]}>
                      <MaterialCommunityIcons name="truck-check" size={32} color={COLORS.accent} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>{collectorData.successfulDeliveries}</Text>
                  <Text style={styles.metricLabel}>Deliveries</Text>
                  <Text style={styles.metricPeriod}>This Month</Text>
                  <View style={styles.metricTrend}>
                    <MaterialCommunityIcons name="trending-up" size={16} color={COLORS.success} />
                    <Text style={styles.trendText}>+12% from last month</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Kilometers Metric */}
              <TouchableOpacity style={styles.metricCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={[COLORS.tertiary, '#B68F6C']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricIconContainer}>
                    <View style={[styles.metricIcon, { backgroundColor: 'rgba(169, 132, 103, 0.3)' }]}>
                      <MaterialCommunityIcons name="map-marker-distance" size={32} color={COLORS.white} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>{collectorData.totalKilometers}</Text>
                  <Text style={styles.metricLabel}>Kilometers</Text>
                  <Text style={styles.metricPeriod}>Total Traveled</Text>
                  <View style={styles.metricTrend}>
                    <MaterialCommunityIcons name="map-marker-radius" size={16} color={COLORS.white} />
                    <Text style={[styles.trendText, { color: 'rgba(255,255,255,0.9)' }]}>Saves 124kg CO₂</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Pending Pickups */}
              <TouchableOpacity style={styles.metricCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={[COLORS.accent, '#9ABE73']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricIconContainer}>
                    <View style={[styles.metricIcon, { backgroundColor: 'rgba(173, 193, 120, 0.3)' }]}>
                      <MaterialCommunityIcons name="package-variant" size={32} color={COLORS.white} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>{assignedDeliveries.length}</Text>
                  <Text style={styles.metricLabel}>Pending</Text>
                  <Text style={styles.metricPeriod}>Pickups Today</Text>
                  <View style={styles.metricTrend}>
                    <MaterialCommunityIcons name="clock-fast" size={16} color={COLORS.white} />
                    <Text style={[styles.trendText, { color: 'rgba(255,255,255,0.9)' }]}>Ready for pickup</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Reliability Score */}
              <TouchableOpacity style={styles.metricCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={[COLORS.dark, '#7D6854']}
                  style={styles.metricCardGradient}
                >
                  <View style={styles.metricIconContainer}>
                    <View style={[styles.metricIcon, { backgroundColor: 'rgba(108, 88, 76, 0.3)' }]}>
                      <MaterialCommunityIcons name="shield-check" size={32} color={COLORS.white} />
                    </View>
                  </View>
                  <Text style={styles.metricValue}>{collectorData.reliabilityScore}%</Text>
                  <Text style={styles.metricLabel}>Reliability</Text>
                  <Text style={styles.metricPeriod}>Score</Text>
                  <View style={styles.metricTrend}>
                    <MaterialCommunityIcons name="chart-line" size={16} color={COLORS.white} />
                    <Text style={[styles.trendText, { color: 'rgba(255,255,255,0.9)' }]}>Consistent performer</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Eco Performance Badge */}
          <TouchableOpacity style={styles.ecoBadgeContainer} activeOpacity={0.9}>
            <LinearGradient
              colors={getEcoPerformanceGradient(collectorData.ecoPerformance)}
              style={styles.ecoBadge}
            >
              <View style={styles.ecoBadgeContent}>
                <LinearGradient
                  colors={[getEcoPerformanceBadgeColor(collectorData.ecoPerformance), '#FFFFFF']}
                  style={styles.ecoIconContainer}
                >
                  <MaterialCommunityIcons
                    name="leaf"
                    size={36}
                    color={COLORS.white}
                  />
                </LinearGradient>
                <View style={styles.ecoBadgeText}>
                  <Text style={styles.ecoBadgeTitle}>Environmental Impact</Text>
                  <Text style={styles.ecoBadgeValue}>{collectorData.ecoPerformance}</Text>
                  <Text style={styles.ecoBadgeSubtitle}>
                    Your work prevented 2.4 tons of waste this month
                  </Text>
                </View>
                <View style={styles.ecoBadgeArrow}>
                  <MaterialCommunityIcons name="chevron-right" size={28} color={getEcoPerformanceBadgeColor(collectorData.ecoPerformance)} />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* Today's Missions */}
          <View style={styles.missionsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Missions</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All ({assignedDeliveries.length})</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.missionsGrid}>
              {assignedDeliveries.slice(0, 2).map((delivery) => (
                <TouchableOpacity 
                  key={delivery.id} 
                  style={styles.missionCard}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={[COLORS.white, '#FCFAF2']}
                    style={styles.missionCardGradient}
                  >
                    <View style={styles.missionHeader}>
                      <View style={[
                        styles.missionIconContainer,
                        { backgroundColor: delivery.type === "organic_food" ? COLORS.accent + '30' : COLORS.tertiary + '30' }
                      ]}>
                        <MaterialCommunityIcons
                          name={delivery.type === "organic_food" ? "leaf" : "recycle"}
                          size={24}
                          color={delivery.type === "organic_food" ? COLORS.accent : COLORS.tertiary}
                        />
                      </View>
                      <View style={styles.missionStatus}>
                        <View style={[
                          styles.statusDot,
                          { backgroundColor: COLORS.success }
                        ]} />
                        <Text style={styles.statusText}>Ready</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.missionSupplier}>{delivery.supplier}</Text>
                    <Text style={styles.missionDetails}>
                      {delivery.quantity} {delivery.unit} • {delivery.distance} km away
                    </Text>
                    
                    <View style={styles.missionFooter}>
                      <View style={styles.missionTime}>
                        <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.tertiary} />
                        <Text style={styles.missionTimeText}>{delivery.expiresIn}</Text>
                      </View>
                      <View style={styles.missionAction}>
                        <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.accent} />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("RequestsStack")}
            >
              <LinearGradient
                colors={[COLORS.accent, '#9ABE73']}
                style={styles.actionButtonGradient}
              >
                <View style={styles.actionIconContainer}>
                  <MaterialCommunityIcons name="clipboard-list" size={28} color={COLORS.white} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionButtonTitle}>Active Requests</Text>
                  <Text style={styles.actionButtonSubtitle}>View all pickup requests</Text>
                </View>
                <MaterialCommunityIcons name="arrow-right-circle" size={24} color={COLORS.white} />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.actionButton}
              activeOpacity={0.9}
              onPress={() => navigation.navigate("MapView")}
            >
              <LinearGradient
                colors={[COLORS.primary_2, COLORS.tertiary]}
                style={styles.actionButtonGradient}
              >
                <View style={styles.actionIconContainer}>
                  <MaterialCommunityIcons name="map" size={28} color={COLORS.white} />
                </View>
                <View style={styles.actionTextContainer}>
                  <Text style={styles.actionButtonTitle}>Live Map</Text>
                  <Text style={styles.actionButtonSubtitle}>Track real-time locations</Text>
                </View>
                <MaterialCommunityIcons name="arrow-right-circle" size={24} color={COLORS.white} />
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
 header: {
  paddingTop: 20,
  paddingBottom: 20,
  paddingHorizontal: 24,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  marginBottom: 10,
},
headerContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
},
headerText: {
  flex: 1,
},
greeting: {
  fontSize: 16,
  color: COLORS.primary,
  opacity: 0.9,
  marginBottom: 4,
},
welcomeText: {
  fontSize: 28,
  fontWeight: 'bold',
  color: COLORS.primary,
  marginBottom: 4,
},
subText: {
  fontSize: 16,
  color: COLORS.primary,
  opacity: 0.8,
},
collectorBadge: {
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 2,
  borderColor: COLORS.primary + '40',
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 4,
},
statsBar: {
  flexDirection: 'row',
  backgroundColor: 'rgba(240, 234, 210, 0.3)',
  borderRadius: 16,
  padding: 10,
  borderWidth: 1,
  borderColor: COLORS.primary + '30',
},
statItem: {
  flex: 1,
  alignItems: 'center',
},
statValue: {
  fontSize: 20,
  fontWeight: "800",
  color: COLORS.primary,
  marginBottom: 4,
},
statLabel: {
  fontSize: 12,
  color: COLORS.primary,
  opacity: 0.9,
  fontWeight: "600",
},
statDivider: {
  width: 1,
  backgroundColor: 'rgba(240, 234, 210, 0.5)',
},
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  role: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: "600",
    backgroundColor: 'rgba(173, 193, 120, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  avatarContainer: {
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredCardContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  featuredCard: {
    borderRadius: 28,
    padding: 28,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  featuredCardDecoration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  decorationCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorationCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  ratingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIconContainer: {
    marginRight: 20,
  },
  ratingIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ratingTextContainer: {
    flex: 1,
  },
  ratingValue: {
    fontSize: 42,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: -1,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.white,
    opacity: 0.95,
    marginTop: 4,
  },
  ratingSubLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  ratingFooter: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  ratingFooterText: {
    fontSize: 14,
    fontWeight: "600",
    color: 'rgba(255, 255, 255, 0.9)',
  },
  metricsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricCard: {
    width: (width - 64) / 2,
    borderRadius: 24,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  metricCardGradient: {
    padding: 20,
  },
  metricIconContainer: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metricIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 2,
  },
  metricPeriod: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  metricTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trendText: {
    fontSize: 11,
    color: COLORS.white,
    marginLeft: 4,
    fontWeight: '600',
  },
  ecoBadgeContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  ecoBadge: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  ecoBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ecoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ecoBadgeText: {
    flex: 1,
  },
  ecoBadgeTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.tertiary,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  ecoBadgeValue: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.success,
    marginBottom: 4,
  },
  ecoBadgeSubtitle: {
    fontSize: 13,
    color: COLORS.tertiary,
    opacity: 0.8,
  },
  ecoBadgeArrow: {
    marginLeft: 12,
  },
  missionsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
  },
  missionsGrid: {
    gap: 16,
  },
  missionCard: {
    borderRadius: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  missionCardGradient: {
    padding: 20,
  },
  missionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  missionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(56, 161, 105, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.success,
  },
  missionSupplier: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 8,
  },
  missionDetails: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 20,
  },
  missionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  missionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 234, 210, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  missionTimeText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.tertiary,
    marginLeft: 6,
  },
  missionAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(173, 193, 120, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 16,
  },
  actionButton: {
    borderRadius: 24,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },
  actionButtonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footerSpacer: {
    height: 40,
  },
})

export default HomeScreen