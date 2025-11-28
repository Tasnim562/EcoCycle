import { useContext, useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"
import { SupplierContext } from "../../context/SupplierContext"

const Pickups = () => {
  const { wasteDeclarations, updateWasteStatus } = useContext(SupplierContext)
  const [selectedWaste, setSelectedWaste] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Sort by urgency: organic food (expires soon) first, then by date
  const sortedWaste = [...wasteDeclarations].sort((a, b) => {
    const aIsUrgent = a.type === "organic_food" && new Date(a.expiresAt) - Date.now() < 48 * 60 * 60 * 1000
    const bIsUrgent = b.type === "organic_food" && new Date(b.expiresAt) - Date.now() < 48 * 60 * 60 * 1000

    if (aIsUrgent && !bIsUrgent) return -1
    if (!aIsUrgent && bIsUrgent) return 1
    return new Date(b.declaredAt) - new Date(a.declaredAt)
  })

  const getTimeRemaining = (expiresAt) => {
    if (!expiresAt) return null
    const now = new Date()
    const diff = new Date(expiresAt) - now
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getUrgencyLevel = (waste) => {
    if (waste.type !== "organic_food") return "normal"
    const timeLeft = new Date(waste.expiresAt) - Date.now()
    const hoursLeft = timeLeft / (1000 * 60 * 60)

    if (hoursLeft < 12) return "critical"
    if (hoursLeft < 24) return "high"
    return "normal"
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "collected":
        return "#4CAF50"
      case "pending":
        return "#FFA500"
      case "not_selected":
        return "#9E9E9E"
      default:
        return COLORS.mediumText
    }
  }

  const getStatusGradient = (status) => {
    switch (status) {
      case "collected":
        return ['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']
      case "pending":
        return ['rgba(255, 165, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']
      case "not_selected":
        return ['rgba(158, 158, 158, 0.9)', 'rgba(117, 117, 117, 0.9)']
      default:
        return ['rgba(108, 88, 76, 0.9)', 'rgba(169, 132, 103, 0.9)']
    }
  }

  const getUrgencyGradient = (urgency) => {
    switch (urgency) {
      case "critical":
        return ['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']
      case "high":
        return ['rgba(255, 152, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']
      default:
        return ['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']
    }
  }

  const handleStatusChange = (wasteId, newStatus) => {
    updateWasteStatus(wasteId, newStatus)
    setShowDetailModal(false)
    Alert.alert("Success", `Waste status updated to ${newStatus}`)
  }

  const handleMarkCollected = (wasteId) => {
    Alert.alert("Confirm Collection", "Mark this waste as collected?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Confirm",
        onPress: () => handleStatusChange(wasteId, "collected"),
      },
    ])
  }

  const urgentCount = sortedWaste.filter((w) => getUrgencyLevel(w) === "critical" || getUrgencyLevel(w) === "high").length
  const collectedCount = sortedWaste.filter((w) => w.status === "collected").length
  const pendingCount = sortedWaste.filter((w) => w.status === "pending").length

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Scheduled Pickups</Text>
            <Text style={styles.headerSubtitle}>Manage your waste collection schedule</Text>
          </View>
          <View style={styles.headerBadge}>
            <MaterialCommunityIcon name="truck-fast" size={24} color={COLORS.primary} />
            <Text style={styles.headerBadgeText}>{sortedWaste.length}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Enhanced Stats Cards */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle_1}>Collection Overview</Text>
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
            style={styles.statCard}
          >
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcon name="clock-alert" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statValue}>{urgentCount}</Text>
              <Text style={styles.statLabel}>Urgent</Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']}
            style={styles.statCard}
          >
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcon name="check-circle" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statValue}>{collectedCount}</Text>
              <Text style={styles.statLabel}>Collected</Text>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(255, 165, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']}
            style={styles.statCard}
          >
            <View style={styles.statIconContainer}>
              <MaterialCommunityIcon name="progress-clock" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.statText}>
              <Text style={styles.statValue}>{pendingCount}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Enhanced Waste List */}
      <View style={styles.listSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcon name="format-list-bulleted" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Waste Declarations</Text>
        </View>

        <View style={styles.listContainer}>
          {sortedWaste.map((waste) => {
            const urgency = getUrgencyLevel(waste)
            const timeRemaining = getTimeRemaining(waste.expiresAt)

            return (
              <TouchableOpacity
                key={waste.id}
                style={styles.wasteCardContainer}
                onPress={() => {
                  setSelectedWaste(waste)
                  setShowDetailModal(true)
                }}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
                  style={styles.wasteCard}
                >
                  {/* Urgency Indicator */}
                  {urgency !== "normal" && waste.type === "organic_food" && (
                    <LinearGradient
                      colors={getUrgencyGradient(urgency)}
                      style={styles.urgencyRibbon}
                    >
                      <MaterialCommunityIcon 
                        name={urgency === "critical" ? "alert-octagon" : "alert-circle"} 
                        size={16} 
                        color={COLORS.primary} 
                      />
                      <Text style={styles.urgencyRibbonText}>
                        {urgency === "critical" ? "URGENT PICKUP" : "HIGH PRIORITY"}
                      </Text>
                    </LinearGradient>
                  )}

                  {/* Card Header */}
                  <View style={styles.cardHeader}>
                    <View style={styles.typeInfo}>
                      <LinearGradient
                        colors={waste.type === "organic_food" ? 
                          ['rgba(205, 190, 130, 0.2)', 'rgba(205, 190, 130, 0.1)'] : 
                          ['rgba(173, 193, 120, 0.2)', 'rgba(173, 193, 120, 0.1)']}
                        style={styles.typeIconContainer}
                      >
                        <MaterialCommunityIcon
                          name={waste.type === "organic_food" ? "leaf" : "package-variant"}
                          size={24}
                          color={waste.type === "organic_food" ? COLORS.primary_2 : COLORS.accent}
                        />
                      </LinearGradient>
                      <View style={styles.typeText}>
                        <Text style={styles.wasteType}>
                          {waste.type === "organic_food" ? "Organic Food Waste" : "Carbon-Rich Waste"}
                        </Text>
                        <View style={styles.locationInfo}>
                          <MaterialCommunityIcon name="map-marker" size={14} color={COLORS.tertiary} />
                          <Text style={styles.location}>{waste.location}</Text>
                        </View>
                      </View>
                    </View>
                    <LinearGradient
                      colors={getStatusGradient(waste.status)}
                      style={styles.statusBadge}
                    >
                      <Text style={styles.statusText}>
                        {waste.status.charAt(0).toUpperCase() + waste.status.slice(1)}
                      </Text>
                    </LinearGradient>
                  </View>

                  {/* Card Body */}
                  <View style={styles.cardBody}>
                    <View style={styles.metricsRow}>
                      <View style={styles.metricItem}>
                        <LinearGradient
                          colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                          style={styles.metricIconContainer}
                        >
                          <MaterialCommunityIcon name="weight-kilogram" size={18} color={COLORS.dark} />
                        </LinearGradient>
                        <View>
                          <Text style={styles.metricLabel}>Weight</Text>
                          <Text style={styles.metricValue}>{waste.weight} kg</Text>
                        </View>
                      </View>

                      <View style={styles.metricItem}>
                        <LinearGradient
                          colors={['rgba(221, 229, 182, 0.3)', 'rgba(173, 193, 120, 0.2)']}
                          style={styles.metricIconContainer}
                        >
                          <MaterialCommunityIcon name="package-variant" size={18} color={COLORS.dark} />
                        </LinearGradient>
                        <View>
                          <Text style={styles.metricLabel}>Items</Text>
                          <Text style={styles.metricValue}>{waste.items.length}</Text>
                        </View>
                      </View>

                      {waste.expiresAt && (
                        <View style={styles.metricItem}>
                          <LinearGradient
                            colors={getUrgencyGradient(urgency)}
                            style={styles.metricIconContainer}
                          >
                            <MaterialCommunityIcon name="alarm" size={18} color={COLORS.primary} />
                          </LinearGradient>
                          <View>
                            <Text style={styles.metricLabel}>Expires</Text>
                            <Text style={[styles.metricValue, { color: urgency === "critical" ? "#FF6B6B" : COLORS.primary_2 }]}>
                              {timeRemaining}
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>

                    {/* Items Preview */}
                    <View style={styles.itemsPreview}>
                      <Text style={styles.itemsLabel}>Items:</Text>
                      <View style={styles.itemsTags}>
                        {waste.items.slice(0, 3).map((item, idx) => (
                          <LinearGradient
                            key={idx}
                            colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
                            style={styles.itemTag}
                          >
                            <Text style={styles.itemTagText}>{item}</Text>
                          </LinearGradient>
                        ))}
                        {waste.items.length > 3 && (
                          <LinearGradient
                            colors={['rgba(169, 132, 103, 0.1)', 'rgba(108, 88, 76, 0.05)']}
                            style={styles.itemTag}
                          >
                            <Text style={styles.itemTagText}>+{waste.items.length - 3}</Text>
                          </LinearGradient>
                        )}
                      </View>
                    </View>
                  </View>

                  {/* Card Footer */}
                  <View style={styles.cardFooter}>
                    <View style={styles.dateInfo}>
                      <MaterialCommunityIcon name="calendar-clock" size={16} color={COLORS.tertiary} />
                      <Text style={styles.dateText}>
                        Declared {new Date(waste.declaredAt).toLocaleDateString()}
                      </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                      <MaterialCommunityIcon name="chevron-right" size={20} color={COLORS.primary_2} />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      {/* Enhanced Detail Modal */}
      {selectedWaste && (
        <Modal
          visible={showDetailModal}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowDetailModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              {/* Enhanced Modal Header */}
              <LinearGradient
                colors={selectedWaste.type === "organic_food" ? 
                  ['rgba(205, 190, 130, 0.95)', 'rgba(173, 193, 120, 0.95)'] : 
                  ['rgba(169, 132, 103, 0.95)', 'rgba(108, 88, 76, 0.95)']}
                style={styles.modalHeader}
              >
                <TouchableOpacity onPress={() => setShowDetailModal(false)} style={styles.modalCloseButton}>
                  <MaterialCommunityIcon name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.modalTitleContainer}>
                  <MaterialCommunityIcon 
                    name={selectedWaste.type === "organic_food" ? "leaf" : "package-variant"} 
                    size={28} 
                    color={COLORS.primary} 
                  />
                  <Text style={styles.modalTitle}>Pickup Details</Text>
                </View>
                <View style={styles.modalSpacer} />
              </LinearGradient>

              {/* Enhanced Modal Content */}
              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <MaterialCommunityIcon name="information-outline" size={20} color={COLORS.dark} />
                    <Text style={styles.sectionTitle}>Waste Information</Text>
                  </View>
                  <DetailRow
                    icon="recycle"
                    label="Waste Type"
                    value={selectedWaste.type === "organic_food" ? "Organic Food Waste" : "Carbon-Rich Waste"}
                  />
                  <DetailRow
                    icon="weight-kilogram"
                    label="Total Weight"
                    value={`${selectedWaste.weight} kg`}
                  />
                  <DetailRow
                    icon="map-marker"
                    label="Storage Location"
                    value={selectedWaste.location}
                  />
                  <DetailRow
                    icon="progress-check"
                    label="Collection Status"
                    value={selectedWaste.status.charAt(0).toUpperCase() + selectedWaste.status.slice(1)}
                  />
                  {selectedWaste.expiresAt && (
                    <DetailRow
                      icon="alarm"
                      label="Expiration Time"
                      value={new Date(selectedWaste.expiresAt).toLocaleString()}
                    />
                  )}
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <MaterialCommunityIcon name="format-list-bulleted" size={20} color={COLORS.dark} />
                    <Text style={styles.sectionTitle}>Items ({selectedWaste.items.length})</Text>
                  </View>
                  <View style={styles.itemsGrid}>
                    {selectedWaste.items.map((item, idx) => (
                      <LinearGradient
                        key={idx}
                        colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
                        style={styles.detailItemTag}
                      >
                        <MaterialCommunityIcon name="check-circle" size={16} color={COLORS.primary_2} />
                        <Text style={styles.detailItemName}>{item}</Text>
                      </LinearGradient>
                    ))}
                  </View>
                </View>

                {selectedWaste.notes && (
                  <View style={styles.detailSection}>
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcon name="note-text" size={20} color={COLORS.dark} />
                      <Text style={styles.sectionTitle}>Additional Notes</Text>
                    </View>
                    <LinearGradient
                      colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                      style={styles.notesContainer}
                    >
                      <Text style={styles.noteText}>{selectedWaste.notes}</Text>
                    </LinearGradient>
                  </View>
                )}

                <View style={styles.detailSection}>
                  <View style={styles.sectionHeader}>
                    <MaterialCommunityIcon name="timeline" size={20} color={COLORS.dark} />
                    <Text style={styles.sectionTitle}>Collection Timeline</Text>
                  </View>
                  <DetailRow
                    icon="calendar-plus"
                    label="Declaration Date"
                    value={new Date(selectedWaste.declaredAt).toLocaleString()}
                  />
                  {selectedWaste.expiresAt && (
                    <DetailRow
                      icon="clock-fast"
                      label="Time Remaining"
                      value={getTimeRemaining(selectedWaste.expiresAt)}
                    />
                  )}
                </View>
              </ScrollView>

              {/* Enhanced Modal Footer */}
              <View style={styles.modalFooter}>
                {selectedWaste.status !== "collected" && (
                  <TouchableOpacity
                    style={styles.primaryActionButton}
                    onPress={() => handleMarkCollected(selectedWaste.id)}
                  >
                    <LinearGradient
                      colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                      style={styles.primaryActionGradient}
                    >
                      <MaterialCommunityIcon name="phone" size={22} color={COLORS.primary} />
                      <Text style={styles.primaryActionText}>Contact Composting Center</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.secondaryActionButton}
                  onPress={() => setShowDetailModal(false)}
                >
                  <Text style={styles.secondaryActionText}>Close Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  )
}

const DetailRow = ({ icon, label, value }) => (
  <View style={styles.detailRow}>
    <View style={styles.detailLabelContainer}>
      <MaterialCommunityIcon name={icon} size={18} color={COLORS.primary_2} />
      <Text style={styles.detailLabel}>{label}</Text>
    </View>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
     marginBottom: 70
  },
  header: {
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.primary,
    opacity: 0.9,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
  },
  headerBadgeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle_1: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 16,
    gap: 10,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  statIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '40',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
  },
  statText: {
    flex: 1,
  },
  statValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600" ,
    color: COLORS.primary,
    opacity: 0.9,
  },
  listSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 30,
  },
  listContainer: {
    gap: 16,
  },
  wasteCardContainer: {
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  wasteCard: {
    borderRadius: 20,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  urgencyRibbon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  urgencyRibbonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  typeInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  typeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  typeText: {
    flex: 1,
  },
  wasteType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  itemsPreview: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  itemsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 2,
  },
  itemsTags: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  itemTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  itemTagText: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  arrowContainer: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: 50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 234, 210, 0.3)',
  },
  modalCloseButton: {
    padding: 8,
    backgroundColor: COLORS.primary + '40',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
  },
  modalSpacer: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tertiary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    textAlign: 'right',
    flex: 1,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detailItemTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  detailItemName: {
    fontSize: 14,
    color: COLORS.dark,
    fontWeight: '500',
  },
  notesContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  noteText: {
    fontSize: 14,
    color: COLORS.dark,
    lineHeight: 20,
  },
  modalFooter: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
    gap: 12,
  },
  primaryActionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryActionGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  primaryActionText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  secondaryActionButton: {
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  secondaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    textAlign: 'center',
  },
})

export default Pickups
