import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SectionList, ScrollView } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"
import { CompostingCenterContext } from "../../context/CompostingCenterContext"
import LinearGradient from "react-native-linear-gradient"

export default function RequestsScreen() {
  const { requests, updateRequestStatus } = useContext(CompostingCenterContext)
  const [expandedRequest, setExpandedRequest] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return COLORS.accent
      case "accepted":
        return COLORS.primary_2
      case "delivered":
        return COLORS.tertiary
      case "cancelled":
        return "#FF6B6B"
      default:
        return COLORS.neutral
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "clock-outline"
      case "accepted":
        return "truck-fast"
      case "delivered":
        return "check-circle"
      case "cancelled":
        return "close-circle"
      default:
        return "help-circle"
    }
  }

  const getStatusGradient = (status) => {
    switch (status) {
      case "pending":
        return ['rgba(173, 193, 120, 0.9)', 'rgba(173, 193, 120, 0.7)']
      case "accepted":
        return ['rgba(205, 190, 130, 0.9)', 'rgba(205, 190, 130, 0.7)']
      case "delivered":
        return ['rgba(169, 132, 103, 0.9)', 'rgba(169, 132, 103, 0.7)']
      case "cancelled":
        return ['rgba(255, 107, 107, 0.9)', 'rgba(255, 107, 107, 0.7)']
      default:
        return ['rgba(108, 88, 76, 0.9)', 'rgba(108, 88, 76, 0.7)']
    }
  }

  const groupedRequests = {
    pending: requests.filter((r) => r.status === "pending"),
    accepted: requests.filter((r) => r.status === "accepted"),
    delivered: requests.filter((r) => r.status === "delivered"),
    cancelled: requests.filter((r) => r.status === "cancelled"),
  }

  const sections = [
    { title: "🕒 Pending Requests", data: groupedRequests.pending, icon: "clock-outline" },
    { title: "🚚 Accepted & On The Way", data: groupedRequests.accepted, icon: "truck-fast" },
    { title: "✅ Delivered", data: groupedRequests.delivered, icon: "check-circle" },
    { title: "❌ Cancelled & Expired", data: groupedRequests.cancelled, icon: "close-circle" },
  ]

  const renderRequestCard = (request) => (
    <View key={request.id} style={styles.requestCardContainer}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
        style={styles.requestCard}
      >
        {/* Request Header */}
        <View style={styles.requestHeader}>
          <View style={styles.requestInfo}>
            <LinearGradient
              colors={request.type === "expiring_waste" ? 
                ['rgba(255, 152, 0, 0.2)', 'rgba(255, 152, 0, 0.1)'] : 
                ['rgba(76, 175, 80, 0.2)', 'rgba(76, 175, 80, 0.1)']}
              style={styles.typeIndicator}
            >
              <MaterialCommunityIcons
                name={request.type === "expiring_waste" ? "alarm-light" : "recycle"}
                size={22}
                color={request.type === "expiring_waste" ? "#FF9800" : "#4CAF50"}
              />
            </LinearGradient>
            <View style={styles.requestTextContainer}>
              <Text style={styles.requestTitle}>
                {request.type === "expiring_waste"
                  ? `${request.restaurantName}`
                  : "Center Collection"}
              </Text>
              <Text style={styles.requestType}>{request.wasteType}</Text>
            </View>
          </View>
          <LinearGradient
            colors={getStatusGradient(request.status)}
            style={styles.statusBadge}
          >
            <MaterialCommunityIcons name={getStatusIcon(request.status)} size={14} color={COLORS.primary} />
            <Text style={styles.statusText}>{request.status.charAt(0).toUpperCase() + request.status.slice(1)}</Text>
          </LinearGradient>
        </View>

        {/* Request Details */}
        <View style={styles.requestDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <LinearGradient
                colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                style={styles.detailIconContainer}
              >
                <MaterialCommunityIcons name="weight-kilogram" size={16} color={COLORS.dark} />
              </LinearGradient>
              <View>
                <Text style={styles.detailLabel}>Quantity</Text>
                <Text style={styles.detailValue}>{request.quantity} kg</Text>
              </View>
            </View>

            {request.type === "expiring_waste" && (
              <View style={styles.detailItem}>
                <LinearGradient
                  colors={['rgba(221, 229, 182, 0.3)', 'rgba(173, 193, 120, 0.2)']}
                  style={styles.detailIconContainer}
                >
                  <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.dark} />
                </LinearGradient>
                <View>
                  <Text style={styles.detailLabel}>Distance</Text>
                  <Text style={styles.detailValue}>{request.distance} km</Text>
                </View>
              </View>
            )}

            {request.type === "expiring_waste" && (
              <View style={styles.detailItem}>
                <LinearGradient
                  colors={['rgba(255, 152, 0, 0.2)', 'rgba(255, 152, 0, 0.1)']}
                  style={styles.detailIconContainer}
                >
                  <MaterialCommunityIcons name="alarm" size={16} color={COLORS.dark} />
                </LinearGradient>
                <View>
                  <Text style={styles.detailLabel}>Expires In</Text>
                  <Text style={styles.detailValue}>{request.expirationTime}</Text>
                </View>
              </View>
            )}
          </View>

          {/* Collector and Delivery Info */}
          {request.collectorName && (
            <View style={styles.infoRow}>
              <LinearGradient
                colors={['rgba(205, 190, 130, 0.2)', 'rgba(205, 190, 130, 0.1)']}
                style={styles.infoBadge}
              >
                <MaterialCommunityIcons name="account-tie" size={14} color={COLORS.primary_2} />
                <Text style={styles.collectorName}>Collector: {request.collectorName}</Text>
              </LinearGradient>
            </View>
          )}

          {request.deliveryDate && (
            <View style={styles.infoRow}>
              <LinearGradient
                colors={['rgba(169, 132, 103, 0.2)', 'rgba(169, 132, 103, 0.1)']}
                style={styles.infoBadge}
              >
                <MaterialCommunityIcons name="calendar-clock" size={14} color={COLORS.tertiary} />
                <Text style={styles.dateText}>Delivery: {request.deliveryDate.toLocaleDateString()}</Text>
              </LinearGradient>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {request.status === "pending" && (
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.acceptButton} 
              onPress={() => updateRequestStatus(request.id, "accepted")}
            >
              <LinearGradient
                colors={['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']}
                style={styles.acceptButtonGradient}
              >
                <MaterialCommunityIcons name="check" size={18} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Accept Request</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.rejectButton} 
              onPress={() => updateRequestStatus(request.id, "cancelled")}
            >
              <LinearGradient
                colors={['rgba(244, 67, 54, 0.9)', 'rgba(198, 40, 40, 0.9)']}
                style={styles.rejectButtonGradient}
              >
                <MaterialCommunityIcons name="close" size={18} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Reject</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {request.status === "accepted" && (
          <View style={styles.acceptedActions}>
            <TouchableOpacity style={styles.chatButton} onPress={() => alert("Chat with NGO coming soon!")}>
              <LinearGradient
                colors={['rgba(205, 190, 130, 0.2)', 'rgba(205, 190, 130, 0.1)']}
                style={styles.chatButtonBackground}
              >
                <MaterialCommunityIcons name="chat-processing" size={18} color={COLORS.primary_2} />
                <Text style={styles.chatButtonText}>Chat with Collector</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deliveredButton} onPress={() => updateRequestStatus(request.id, "delivered")}>
              <LinearGradient
                colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
                style={styles.deliveredButtonGradient}
              >
                <MaterialCommunityIcons name="check-circle" size={18} color={COLORS.primary} />
                <Text style={styles.actionButtonText}>Mark Delivered</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.headerContainer}
      >
        <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Request Management</Text>
          <View style={{flexDirection:'row', gap : 15}} >
            <Text style={styles.headerSubtitle}>Track & Manage Waste Operations</Text>
            <View style={styles.headerStats}>
              <Text style={styles.headerStatsText}>{requests.length} Requests</Text>
            </View>
          </View>
          
        </View>
      </LinearGradient>

      {/* Requests List */}
      <SectionList
        sections={sections.filter((s) => s.data.length > 0)}
        keyExtractor={(item, index) => item.id.toString() + index}
        renderItem={({ item }) => renderRequestCard(item)}
        renderSectionHeader={({ section: { title, data, icon } }) =>
          data.length > 0 ? (
            <LinearGradient
              colors={['rgba(240, 234, 210, 0.8)', 'rgba(221, 229, 182, 0.6)']}
              style={styles.sectionHeader}
            >
              <View style={styles.sectionHeaderContent}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.sectionBadge}>
                  <Text style={styles.sectionBadgeText}>{data.length}</Text>
                </View>
              </View>
            </LinearGradient>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />

      {/* Empty State */}
      {Object.values(groupedRequests).every((arr) => arr.length === 0) && (
        <View style={styles.emptyState}>
          <LinearGradient
            colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
            style={styles.emptyStateContainer}
          >
            <MaterialCommunityIcons name="inbox-outline" size={64} color={COLORS.tertiary} />
            <Text style={styles.emptyStateTitle}>No Requests Yet</Text>
            <Text style={styles.emptyStateSubtitle}>New waste collection requests will appear here</Text>
          </LinearGradient>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
     marginBottom: 70
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.9,
    marginTop: 4,
  },
  headerStats: {
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  headerStatsText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionHeader: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  sectionHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
  },
  sectionBadge: {
    backgroundColor: COLORS.dark,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  requestCardContainer: {
    marginBottom: 16,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  requestCard: {
    borderRadius: 20,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  requestInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  typeIndicator: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  requestTextContainer: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  requestType: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  requestDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  infoRow: {
    marginTop: 8,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    alignSelf: 'flex-start',
  },
  collectorName: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.primary_2,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.tertiary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  acceptButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  rejectButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  acceptedActions: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chatButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  chatButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
    padding: 5 ,
    borderColor: COLORS.primary_2 + '40',
  },
  deliveredButton: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  deliveredButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary_2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateContainer: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    borderStyle: 'dashed',
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
    textAlign: 'center',
    lineHeight: 20,
  },
})
