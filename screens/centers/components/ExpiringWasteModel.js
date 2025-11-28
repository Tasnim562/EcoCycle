import { useState } from "react"
import { View, Modal, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../../colors"

export default function ExpiringWasteModal({ visible, onClose, expiringWastes, onClaimWaste }) {
  const [selectedWaste, setSelectedWaste] = useState(null)

  const handleClaimWaste = (waste) => {
    onClaimWaste(waste.id, waste.restaurantName, waste.wasteType, waste.quantity, waste.distance, waste.expirationTime)
    alert(`Successfully claimed ${waste.restaurantName}'s waste!`)
    setSelectedWaste(null)
    onClose()
  }

  const getUrgencyColor = (expirationTime) => {
    const hours = Number.parseInt(expirationTime);
    if (hours < 6) return ['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']; // High urgency - red
    if (hours < 12) return ['rgba(255, 152, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']; // Medium urgency - orange
    return ['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']; // Low urgency - green
  }

  const getUrgencyIcon = (expirationTime) => {
    const hours = Number.parseInt(expirationTime);
    if (hours < 6) return "alert-octagon";
    if (hours < 12) return "alert-circle";
    return "clock-alert";
  }

  const getUrgencyText = (expirationTime) => {
    const hours = Number.parseInt(expirationTime);
    if (hours < 6) return "URGENT";
    if (hours < 12) return "SOON";
    return "AVAILABLE";
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Enhanced Header */}
        <LinearGradient
          colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
          style={styles.header}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <MaterialCommunityIcons name="alarm-light" size={28} color={COLORS.primary} />
            <View>
              <Text style={styles.headerTitle}>Expiring Waste Nearby</Text>
              <Text style={styles.headerSubtitle}>Claim before it goes to waste</Text>
            </View>
          </View>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {expiringWastes.length === 0 ? (
            <View style={styles.emptyState}>
              <LinearGradient
                colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                style={styles.emptyStateContainer}
              >
                <MaterialCommunityIcons name="inbox-outline" size={64} color={COLORS.tertiary} />
                <Text style={styles.emptyStateTitle}>No Expiring Waste</Text>
                <Text style={styles.emptyStateSubtitle}>
                  Check back later for new expiring waste opportunities in your area
                </Text>
              </LinearGradient>
            </View>
          ) : (
            <View style={styles.wasteList}>
              {expiringWastes.map((waste) => (
                <View key={waste.id} style={styles.wasteCardContainer}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
                    style={styles.wasteCard}
                  >
                    {/* Waste Header */}
                    <View style={styles.wasteHeader}>
                      <View style={styles.restaurantInfo}>
                        <LinearGradient
                          colors={['rgba(205, 190, 130, 0.2)', 'rgba(173, 193, 120, 0.1)']}
                          style={styles.restaurantIconContainer}
                        >
                          <MaterialCommunityIcons name="storefront" size={24} color={COLORS.primary_2} />
                        </LinearGradient>
                        <View style={styles.restaurantText}>
                          <Text style={styles.restaurantName}>{waste.restaurantName}</Text>
                          <Text style={styles.wasteType}>{waste.wasteType}</Text>
                        </View>
                      </View>
                      
                      <LinearGradient
                        colors={getUrgencyColor(waste.expirationTime)}
                        style={styles.urgencyBadge}
                      >
                        <MaterialCommunityIcons 
                          name={getUrgencyIcon(waste.expirationTime)} 
                          size={16} 
                          color={COLORS.primary} 
                        />
                        <View style={styles.urgencyTextContainer}>
                          <Text style={styles.urgencyLevel}>{getUrgencyText(waste.expirationTime)}</Text>
                          <Text style={styles.urgencyTime}>{waste.expirationTime}</Text>
                        </View>
                      </LinearGradient>
                    </View>

                    {/* Waste Details */}
                    <View style={styles.wasteDetails}>
                      <View style={styles.detailRow}>
                        <View style={styles.detailItem}>
                          <LinearGradient
                            colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                            style={styles.detailIconContainer}
                          >
                            <MaterialCommunityIcons name="weight-kilogram" size={18} color={COLORS.dark} />
                          </LinearGradient>
                          <View>
                            <Text style={styles.detailLabel}>Quantity</Text>
                            <Text style={styles.detailValue}>{waste.quantity} kg</Text>
                          </View>
                        </View>

                        <View style={styles.detailItem}>
                          <LinearGradient
                            colors={['rgba(221, 229, 182, 0.3)', 'rgba(173, 193, 120, 0.2)']}
                            style={styles.detailIconContainer}
                          >
                            <MaterialCommunityIcons name="map-marker" size={18} color={COLORS.dark} />
                          </LinearGradient>
                          <View>
                            <Text style={styles.detailLabel}>Distance</Text>
                            <Text style={styles.detailValue}>{waste.distance} km</Text>
                          </View>
                        </View>
                      </View>

                      {/* Environmental Impact */}
                      <View style={styles.impactContainer}>
                        <MaterialCommunityIcons name="earth" size={16} color={COLORS.primary_2} />
                        <Text style={styles.impactText}>
                          Saving {waste.quantity}kg from landfill ≈ {Math.round(waste.quantity * 2.5)}kg CO₂ avoided
                        </Text>
                      </View>
                    </View>

                    {/* Claim Button */}
                    <TouchableOpacity 
                      style={styles.claimButton} 
                      onPress={() => handleClaimWaste(waste)}
                    >
                      <LinearGradient
                        colors={getUrgencyColor(waste.expirationTime)}
                        style={styles.claimButtonGradient}
                      >
                        <MaterialCommunityIcons name="truck-fast" size={22} color={COLORS.primary} />
                        <Text style={styles.claimButtonText}>Request Immediate Pickup</Text>
                        <MaterialCommunityIcons name="chevron-right" size={18} color={COLORS.primary} />
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              ))}
            </View>
          )}

          {/* Info Section */}
          {expiringWastes.length > 0 && (
            <View style={styles.infoSection}>
              <MaterialCommunityIcons name="lightbulb-on" size={20} color={COLORS.primary_2} />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Quick Claim Process</Text>
                <Text style={styles.infoText}>
                  Claiming expiring waste helps reduce food waste and supports local businesses. 
                  Our team will coordinate pickup within hours.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: 50,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 234, 210, 0.3)',
  },
  closeButton: {
    padding: 8,
    backgroundColor: COLORS.primary + '40',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.8,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  wasteList: {
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
  wasteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingBottom: 16,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  restaurantIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  restaurantText: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  wasteType: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '500',
  },
  urgencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    minWidth: 80,
  },
  urgencyTextContainer: {
    alignItems: 'center',
  },
  urgencyLevel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    textTransform: 'uppercase',
  },
  urgencyTime: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  wasteDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  detailIconContainer: {
    width: 44,
    height: 44,
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
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(205, 190, 130, 0.1)',
    padding: 12,
    borderRadius: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.2)',
  },
  impactText: {
    fontSize: 13,
    color: COLORS.primary_2,
    fontWeight: '500',
    flex: 1,
  },
  claimButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  claimButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    gap: 10,
  },
  claimButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.3,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(173, 193, 120, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.3)',
    gap: 12,
    marginTop: 20,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.tertiary,
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
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
    maxWidth: 250,
  },
})