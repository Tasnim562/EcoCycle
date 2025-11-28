import { useContext, useState } from "react"
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { BarChart } from "react-native-gifted-charts"
import { CompostingCenterContext } from "../../context/CompostingCenterContext"
import { COLORS } from "../../colors"
import RequestWasteCollectionModal from "./components/RequestWasteCollectionModal"
import ExpiringWasteModal from "./components/ExpiringWasteModel"

export default function CompostingCenterHomeScreen() {
  const { kpis, ecoScore, requests, claimExpiringWaste } = useContext(CompostingCenterContext)

  const [showRequestModal, setShowRequestModal] = useState(false)
  const [showExpiringModal, setShowExpiringModal] = useState(false)

  const expiringWastes = [
    {
      id: 1,
      restaurantName: "Green Bistro",
      wasteType: "Organic Food",
      quantity: 50,
      distance: 2.5,
      expirationTime: "18 hours",
    },
    {
      id: 2,
      restaurantName: "Urban Cafe",
      wasteType: "Organic Food",
      quantity: 30,
      distance: 1.8,
      expirationTime: "8 hours",
    },
  ]

  const kpiData = [
    { label: "Organic", value: kpis.organicWasteCollected / 100 },
    { label: "Carbon", value: kpis.carbonRichMaterialCollected / 100 },
    { label: "Compost", value: kpis.compostProduced / 100 },
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header with EcoScore */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Composting Center</Text>
            <Text style={styles.headerSubtitle}>Eco-Friendly Dashboard</Text>
          </View>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.ecoScoreBadge}
          >
            <MaterialCommunityIcons name="leaf" size={28} color={COLORS.primary} />
            <View style={styles.ecoScoreTextContainer}>
              <Text style={styles.ecoScoreValue}>{ecoScore}</Text>
              <Text style={styles.ecoScoreLabel}>Eco Score</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>

      {/* Enhanced KPI Cards Grid */}
      <View style={styles.kpiSection}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.kpiGrid}>
          <LinearGradient
            colors={['rgba(240, 234, 210, 0.9)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.kpiCard}
          >
            <View style={styles.kpiIconContainer}>
              <MaterialCommunityIcons name="leaf-circle" size={32} color={COLORS.primary_2} />
            </View>
            <Text style={styles.kpiValue}>{(kpis.organicWasteCollected / 1000).toFixed(1)}K</Text>
            <Text style={styles.kpiLabel}>Organic Waste</Text>
            <Text style={styles.kpiUnit}>kilograms</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(221, 229, 182, 0.9)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.kpiCard}
          >
            <View style={styles.kpiIconContainer}>
              <MaterialCommunityIcons name="package-variant" size={32} color={COLORS.accent} />
            </View>
            <Text style={styles.kpiValue}>{(kpis.carbonRichMaterialCollected / 1000).toFixed(1)}K</Text>
            <Text style={styles.kpiLabel}>Carbon Material</Text>
            <Text style={styles.kpiUnit}>kilograms</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.kpiCard}
          >
            <View style={styles.kpiIconContainer}>
              <MaterialCommunityIcons name="sprout" size={32} color={COLORS.tertiary} />
            </View>
            <Text style={styles.kpiValue}>{(kpis.compostProduced / 1000).toFixed(1)}K</Text>
            <Text style={styles.kpiLabel}>Compost Produced</Text>
            <Text style={styles.kpiUnit}>kilograms</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(169, 132, 103, 0.9)', 'rgba(255, 255, 255, 0.9)']}
            style={styles.kpiCard}
          >
            <View style={styles.kpiIconContainer}>
              <MaterialCommunityIcons name="trending-up" size={32} color={COLORS.dark} />
            </View>
            <Text style={styles.kpiValue}>{(kpis.compostSoldToFarmers / 1000).toFixed(1)}K</Text>
            <Text style={styles.kpiLabel}>Sold to Farmers</Text>
            <Text style={styles.kpiUnit}>kilograms</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Enhanced CO2 Savings Card */}
      <View style={styles.co2Section}>
        <LinearGradient
          colors={['rgba(173, 193, 120, 0.9)', 'rgba(108, 88, 76, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.co2Card}
        >
          <View style={styles.co2Content}>
            <View style={styles.co2IconContainer}>
              <MaterialCommunityIcons name="molecule-co2" size={40} color={COLORS.primary} />
            </View>
            <View style={styles.co2TextContainer}>
              <Text style={styles.co2Label}>CO₂ Emissions Avoided</Text>
              <Text style={styles.co2Value}>{kpis.co2EmissionAvoided} tons</Text>
              <Text style={styles.co2Subtitle}>Equivalent to planting {Math.round(kpis.co2EmissionAvoided * 50)} trees</Text>
            </View>
          </View>
          <View style={styles.co2Progress}>
            <View style={styles.co2ProgressBar}>
              <View 
                style={[
                  styles.co2ProgressFill, 
                  { width: `${Math.min(100, (kpis.co2EmissionAvoided / 100) * 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.co2ProgressText}>Annual Goal: 100 tons</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Waste Collection Analytics</Text>
          <Text style={styles.chartSubtitle}>Last 30 Days Performance</Text>
        </View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
          style={styles.chartContainer}
        >
          <BarChart
            data={kpiData}
            barWidth={40}
            barBorderRadius={12}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{ color: COLORS.tertiary, fontSize: 12 }}
            barColor={COLORS.primary_2}
            showGradient
            gradientColor={COLORS.accent}
            height={200}
            dashGap={5}
            spacing={30}
          />
        </LinearGradient>
      </View>

      {/* Enhanced Quick Action Buttons */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => setShowRequestModal(true)}>
            <LinearGradient
              colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcons name="plus-circle" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Request Waste</Text>
              <Text style={styles.actionButtonSubtext}>Schedule collection</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => setShowExpiringModal(true)}>
            <LinearGradient
              colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcons name="alarm-plus" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Expiring Waste</Text>
              <Text style={styles.actionButtonSubtext}>Urgent collections</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Expiring Waste Section */}
      <View style={styles.expiringWasteSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Expiring Waste</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
            <MaterialCommunityIcons name="chevron-right" size={16} color={COLORS.primary_2} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.expiringWasteList}>
          {expiringWastes.map((waste) => (
            <LinearGradient
              key={waste.id}
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
              style={styles.expiringWasteCard}
            >
              <View style={styles.expiringWasteContent}>
                <View style={styles.expiringWasteLeft}>
                  <Text style={styles.wasteRestaurant}>{waste.restaurantName}</Text>
                  <Text style={styles.wasteType}>{waste.wasteType}</Text>
                  <View style={styles.wasteInfo}>
                    <View style={styles.wasteInfoItem}>
                      <MaterialCommunityIcons name="weight-kilogram" size={14} color={COLORS.primary_2} />
                      <Text style={styles.wasteInfoText}>{waste.quantity} kg</Text>
                    </View>
                    <View style={styles.wasteInfoItem}>
                      <MaterialCommunityIcons name="map-marker" size={14} color={COLORS.accent} />
                      <Text style={styles.wasteInfoText}>{waste.distance} km</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.expiringWasteRight}>
                  <LinearGradient
                    colors={['rgba(255, 152, 0, 0.9)', 'rgba(255, 193, 7, 0.9)']}
                    style={styles.expirationBadge}
                  >
                    <MaterialCommunityIcons name="alarm" size={14} color={COLORS.primary} />
                    <Text style={styles.expirationTime}>{waste.expirationTime}</Text>
                  </LinearGradient>
                  <TouchableOpacity style={styles.claimButton}>
                    <Text style={styles.claimButtonText}>Claim</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Modals */}
      <RequestWasteCollectionModal visible={showRequestModal} onClose={() => setShowRequestModal(false)} />
      <ExpiringWasteModal
        visible={showExpiringModal}
        onClose={() => setShowExpiringModal(false)}
        expiringWastes={expiringWastes}
        onClaimWaste={claimExpiringWaste}
      />
    </ScrollView>
  )
}

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
  headerTextContainer: {
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
  ecoScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  ecoScoreTextContainer: {
    alignItems: 'center',
  },
  ecoScoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  ecoScoreLabel: {
    fontSize: 10,
    color: COLORS.primary,
    opacity: 0.8,
  },
  kpiSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: '48%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  kpiIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  kpiValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 2,
  },
  kpiLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  kpiUnit: {
    fontSize: 11,
    color: COLORS.tertiary,
    opacity: 0.7,
  },
  co2Section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  co2Card: {
    borderRadius: 24,
    padding: 24,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  co2Content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  co2IconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.primary + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
  },
  co2TextContainer: {
    flex: 1,
  },
  co2Label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  co2Value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  co2Subtitle: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
  },
  co2Progress: {
    marginTop: 8,
  },
  co2ProgressBar: {
    height: 6,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  co2ProgressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  co2ProgressText: {
    fontSize: 11,
    color: COLORS.primary,
    opacity: 0.7,
    textAlign: 'center',
  },
  chartSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  chartHeader: {
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  actionButtonGradient: {
    padding: 20,
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
    textAlign: 'center',
  },
  actionButtonSubtext: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
    textAlign: 'center',
  },
  expiringWasteSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary_2,
  },
  expiringWasteList: {
    gap: 12,
  },
  expiringWasteCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    overflow: 'hidden',
  },
  expiringWasteContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  expiringWasteLeft: {
    flex: 1,
  },
  wasteRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  wasteType: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  wasteInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  wasteInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  wasteInfoText: {
    fontSize: 12,
    color: COLORS.dark,
    fontWeight: '500',
  },
  expiringWasteRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  expirationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  expirationTime: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  claimButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.primary_2,
    borderRadius: 8,
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
})