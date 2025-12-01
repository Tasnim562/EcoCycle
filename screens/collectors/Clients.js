import { useContext, useState } from "react"
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Dimensions,
  ImageBackground
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NGOContext } from "../../context/NGOContext"
import { COLORS } from "../../colors"
import ChatModal from "./ChatModal"

const { width } = Dimensions.get('window')

const Clients = ({ navigation }) => {
  const { assignedDeliveries, compostingRequests, deliveryHistory, acceptRequest, completeDelivery } =
    useContext(NGOContext)
  const [selectedSection, setSelectedSection] = useState("assigned")
  const [chatModalVisible, setChatModalVisible] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)

  const openChat = (delivery) => {
    setSelectedChat(delivery)
    setChatModalVisible(true)
  }

  const getWasteTypeLabel = (type) => {
    return type === "organic_food" ? "Organic Food" : "Carbon-Rich"
  }

  const getWasteTypeColor = (type) => {
    return type === "organic_food" ? COLORS.success : COLORS.quaternary
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const renderRequestCard = (request, isCompostingCenter = false) => (
    <TouchableOpacity 
      key={request.id} 
      style={styles.requestCard}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
        style={styles.cardGradient}
      >
        {/* Card Header */}
        <View style={styles.cardHeader}>
          <View style={[
            styles.wasteTypeTag,
            { backgroundColor: request.type === "organic_food" ? COLORS.success + '30' : COLORS.quaternary + '30' }
          ]}>
            <MaterialCommunityIcons
              name={request.type === "organic_food" ? "leaf" : "recycle"}
              size={18}
              color={request.type === "organic_food" ? COLORS.success : COLORS.quaternary}
            />
            <Text style={[
              styles.wasteTypeLabel,
              { color: request.type === "organic_food" ? COLORS.success : COLORS.quaternary }
            ]}>
              {getWasteTypeLabel(request.type)}
            </Text>
          </View>
          
          <LinearGradient
            colors={isCompostingCenter ? ['#D69E2E', '#B7791F'] : [COLORS.success, '#2F855A']}
            style={styles.statusBadge}
          >
            <Text style={styles.statusText}>{request.status}</Text>
          </LinearGradient>
        </View>

        {/* Card Body */}
        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="storefront" size={16} color={COLORS.accent} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>From:</Text>
              <Text style={styles.infoValue}>{request.supplier || request.composting_center}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="scale" size={16} color={COLORS.accent} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Quantity:</Text>
              <Text style={styles.infoValue}>
                {request.quantity || request.requested_quantity} {request.unit}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialCommunityIcons name="map-marker-distance" size={16} color={COLORS.accent} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Distance:</Text>
              <Text style={styles.infoValue}>{request.distance} km</Text>
            </View>
          </View>

          {request.expiresIn && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialCommunityIcons name="clock-alert" size={16} color={COLORS.error} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Expires:</Text>
                <Text style={[styles.infoValue, { color: COLORS.error }]}>{request.expiresIn}</Text>
              </View>
            </View>
          )}

          {request.priority && (
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialCommunityIcons 
                  name={request.priority === "high" ? "alert-circle" : "clock"} 
                  size={16} 
                  color={request.priority === "high" ? COLORS.error : '#D69E2E'} 
                />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Priority:</Text>
                <Text style={[
                  styles.infoValue, 
                  { color: request.priority === "high" ? COLORS.error : '#D69E2E' }
                ]}>
                  {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          {isCompostingCenter ? (
            <TouchableOpacity 
              style={styles.acceptButton}
              activeOpacity={0.8}
              onPress={() => acceptRequest(request.id)}
            >
              <LinearGradient
                colors={[COLORS.success, '#2F855A']}
                style={styles.acceptButtonGradient}
              >
                <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.white} />
                <Text style={styles.buttonText}>Accept Request</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.chatButton}
                activeOpacity={0.8}
                onPress={() => openChat(request)}
              >
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primary_2]}
                  style={styles.chatButtonGradient}
                >
                  <MaterialCommunityIcons name="message-text" size={18} color={COLORS.white} />
                  <Text style={styles.buttonText}>Chat</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.completeButton}
                activeOpacity={0.8}
                onPress={() => completeDelivery(request.id)}
              >
                <LinearGradient
                  colors={[COLORS.success, '#2F855A']}
                  style={styles.completeButtonGradient}
                >
                  <MaterialCommunityIcons name="check-all" size={18} color={COLORS.white} />
                  <Text style={styles.buttonText}>Complete</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, '#F8F5E6']}
        style={styles.backgroundGradient}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Big Map Navigation Button */}
          <TouchableOpacity 
            style={styles.mapButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("map_view")}
          >
            <LinearGradient
              colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
              style={styles.mapButtonGradient}
            >
              <View style={styles.mapIconContainer}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
                  style={styles.mapIconBackground}
                >
                  <MaterialCommunityIcons name="map" size={42} color={COLORS.dark} />
                </LinearGradient>
              </View>
              <View style={styles.mapButtonContent}>
                <Text style={styles.mapButtonTitle}>Live Delivery Map</Text>
                <Text style={styles.mapButtonSubtitle}>View all active deliveries in real-time</Text>
              </View>
              <MaterialCommunityIcons name="arrow-right" size={28} color={COLORS.primary} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Section Tabs - Filters */}
          <View style={styles.sectionTabsContainer}>
            <LinearGradient
              colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
              style={styles.sectionTabs}
            >
              {["assigned", "composting", "history"].map((section) => (
                <TouchableOpacity
                  key={section}
                  style={[styles.tab, selectedSection === section && styles.activeTab]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedSection(section)}
                >
                  <LinearGradient
                    colors={selectedSection === section ? 
                      ['rgba(173, 193, 120, 0.2)', 'rgba(173, 193, 120, 0.1)'] : 
                      ['transparent', 'transparent']
                    }
                    style={styles.tabBackground}
                  >
                    <View style={styles.tabContent}>
                      <MaterialCommunityIcons
                        name={
                          section === "assigned" ? "truck" : 
                          section === "composting" ? "recycle" : 
                          "history"
                        }
                        size={20}
                        color={selectedSection === section ? COLORS.accent : COLORS.mediumGray}
                      />
                      <Text style={[
                        styles.tabText, 
                        selectedSection === section && styles.activeTabText
                      ]}>
                        {section === "assigned" ? "Assigned" : 
                         section === "composting" ? "Requests" : 
                         "History"}
                      </Text>
                    </View>
                    {selectedSection === section && (
                      <View style={styles.activeTabIndicator} />
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </LinearGradient>
          </View>

          {/* Assigned Deliveries Section */}
          {selectedSection === "assigned" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Active Deliveries</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>{assignedDeliveries.length}</Text>
                </View>
              </View>
              {assignedDeliveries.length === 0 ? (
                <View style={styles.emptyState}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                    style={styles.emptyStateGradient}
                  >
                    <MaterialCommunityIcons name="truck-remove" size={56} color={COLORS.mediumGray} />
                    <Text style={styles.emptyStateTitle}>No Active Deliveries</Text>
                    <Text style={styles.emptyStateText}>All your deliveries are completed!</Text>
                  </LinearGradient>
                </View>
              ) : (
                assignedDeliveries.map((delivery) => renderRequestCard(delivery))
              )}
            </View>
          )}

          {/* Composting Center Requests Section */}
          {selectedSection === "composting" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>New Requests</Text>
                <View style={[styles.sectionBadge, styles.requestBadge]}>
                  <Text style={styles.sectionBadgeText}>{compostingRequests.length}</Text>
                </View>
              </View>
              {compostingRequests.length === 0 ? (
                <View style={styles.emptyState}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                    style={styles.emptyStateGradient}
                  >
                    <MaterialCommunityIcons name="inbox-remove" size={56} color={COLORS.mediumGray} />
                    <Text style={styles.emptyStateTitle}>No New Requests</Text>
                    <Text style={styles.emptyStateText}>Check back later for new composting requests</Text>
                  </LinearGradient>
                </View>
              ) : (
                compostingRequests.map((request) => renderRequestCard(request, true))
              )}
            </View>
          )}

          {/* History Section */}
          {selectedSection === "history" && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Delivery History</Text>
                <View style={[styles.sectionBadge, styles.historyBadge]}>
                  <Text style={styles.sectionBadgeText}>{deliveryHistory.length}</Text>
                </View>
              </View>
              {deliveryHistory.length === 0 ? (
                <View style={styles.emptyState}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                    style={styles.emptyStateGradient}
                  >
                    <MaterialCommunityIcons name="history" size={56} color={COLORS.mediumGray} />
                    <Text style={styles.emptyStateTitle}>No History Yet</Text>
                    <Text style={styles.emptyStateText}>Complete your first delivery to see history</Text>
                  </LinearGradient>
                </View>
              ) : (
                deliveryHistory.map((delivery) => (
                  <TouchableOpacity key={delivery.id} style={styles.historyCard} activeOpacity={0.9}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                      style={styles.historyCardGradient}
                    >
                      <View style={styles.historyIconContainer}>
                        <LinearGradient
                          colors={[COLORS.success, '#2F855A']}
                          style={styles.historyIconGradient}
                        >
                          <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.white} />
                        </LinearGradient>
                      </View>
                      <View style={styles.historyInfo}>
                        <Text style={styles.historySupplier}>{delivery.supplier}</Text>
                        <Text style={styles.historyDetails}>
                          {delivery.quantity} {delivery.unit} of {getWasteTypeLabel(delivery.type)}
                        </Text>
                        <View style={styles.historyFooter}>
                          <View style={styles.historyDate}>
                            <MaterialCommunityIcons name="calendar" size={14} color={COLORS.tertiary} />
                            <Text style={styles.historyDateText}>{formatDate(delivery.completedAt)}</Text>
                          </View>
                          <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                            <Text style={styles.ratingText}>4.8</Text>
                          </View>
                        </View>
                      </View>
                      <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.mediumGray} />
                    </LinearGradient>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          <View style={styles.footerSpacer} />
        </ScrollView>
      </LinearGradient>

      {/* Chat Modal */}
      <ChatModal visible={chatModalVisible} onClose={() => setChatModalVisible(false)} partner={selectedChat} />
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
  // Map Button Styles
  mapButton: {
    marginHorizontal: 24,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 28,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  mapButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  mapIconContainer: {
    marginRight: 20,
  },
  mapIconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  mapButtonContent: {
    flex: 1,
  },
  mapButtonTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  mapButtonSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.9,
  },
  // Section Tabs
  sectionTabsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTabs: {
    flexDirection: "row",
    borderRadius: 20,
    padding: 8,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.1)',
  },
  tab: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  tabBackground: {
    paddingVertical: 16,
    borderRadius: 16,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.mediumGray,
  },
  activeTabText: {
    color: COLORS.accent,
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '25%',
    right: '25%',
    height: 3,
    backgroundColor: COLORS.accent,
    borderRadius: 1.5,
  },
  // Section Styles
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: -0.5,
  },
  sectionBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  requestBadge: {
    backgroundColor: '#D69E2E',
  },
  historyBadge: {
    backgroundColor: COLORS.tertiary,
  },
  sectionBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.white,
  },
  // Request Card Styles
  requestCard: {
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(169, 132, 103, 0.1)',
  },
  wasteTypeTag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 8,
  },
  wasteTypeLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.white,
    textTransform: "capitalize",
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoIcon: {
    width: 32,
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.tertiary,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
  },
  cardFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(169, 132, 103, 0.1)',
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  acceptButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  acceptButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 10,
  },
  chatButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chatButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  completeButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  completeButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.white,
  },
  // History Card Styles
  historyCard: {
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  historyCardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
  },
  historyIconContainer: {
    marginRight: 16,
  },
  historyIconGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyInfo: {
    flex: 1,
  },
  historySupplier: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 4,
  },
  historyDetails: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  historyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  historyDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  historyDateText: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.dark,
  },
  // Empty State Styles
  emptyState: {
    marginTop: 20,
  },
  emptyStateGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(169, 132, 103, 0.1)',
    borderStyle: 'dashed',
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: COLORS.tertiary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  footerSpacer: {
    height: 40,
  },
})

export default Clients