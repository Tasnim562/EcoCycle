import { useState, useContext } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { BarChart, PieChart } from "react-native-gifted-charts"
import { COLORS } from "../../colors"
import { SupplierContext } from "../../context/SupplierContext"
import WasteDeclarationModal from "./components/WasteDeclarationModal"

const SupplierHomeScreen = () => {
  const { sales, wasteData, points, wasteDeclarations, addWasteDeclaration } = useContext(SupplierContext)

  const [showWasteModal, setShowWasteModal] = useState(false)

  const barChartData = sales.map((item, index) => ({
    value: item.amount,
    label: item.date,
    labelWidth: 40,
    labelTextStyle: { color: COLORS.darkText },
  }))

  const totalOrganicWaste = wasteData.find((w) => w.type === "organic_food")?.value || 0
  const totalCarbonWaste = wasteData.find((w) => w.type === "carbon_rich")?.value || 0
  const totalWaste = totalOrganicWaste + totalCarbonWaste

  const handleDeclareWaste = (wasteInfo) => {
    addWasteDeclaration(wasteInfo)
    setShowWasteModal(false)
    Alert.alert("Success", "Waste declared successfully! You earned 10 points.")
  }

  const urgentWaste = wasteDeclarations.filter((w) => w.type === "organic_food" && w.status === "pending").length

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Welcome back! </Text>
            <Text style={styles.subtitle}>Restaurant Al Zahra</Text>
          </View>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.pointsContainer}
          >
            <MaterialCommunityIcon name="star" size={24} color={COLORS.primary} />
            <View style={styles.pointsTextContainer}>
              <Text style={styles.pointsValue}>{points}</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>
          </LinearGradient>
        </View>
      </LinearGradient>

      {/* Enhanced Urgent Alert */}
      {urgentWaste > 0 && (
        <View style={styles.urgentAlertContainer}>
          <LinearGradient
            colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
            style={styles.urgentAlert}
          >
            <MaterialCommunityIcon name="alert-octagon" size={24} color={COLORS.primary} />
            <View style={styles.urgentTextContainer}>
              <Text style={styles.urgentTitle}>Urgent Action Needed</Text>
              <Text style={styles.urgentText}>{urgentWaste} organic waste items need pickup within 48 hours!</Text>
            </View>
          </LinearGradient>
        </View>
      )}

      {/* Enhanced Quick Action Buttons */}
      <View style={styles.quickActionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowWasteModal(true)}
          >
            <LinearGradient
              colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcon name="plus-circle" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Declare Waste</Text>
              <Text style={styles.actionButtonSubtext}>Report new waste</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcon name="phone" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Call Collector</Text>
              <Text style={styles.actionButtonSubtext}>Schedule pickup</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Sales Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcon name="chart-bar" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Weekly Sales Performance</Text>
        </View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
          style={styles.chartCard}
        >
          <BarChart
            data={barChartData}
            barWidth={30}
            barBorderRadius={8}
            frontColor={COLORS.primary_2}
            backgroundColor={COLORS.lightAccent}
            height={200}
            spacing={20}
            showValuesOnTopOfBars
            yAxisTextStyle={{ color: COLORS.tertiary, fontSize: 12 }}
            xAxisLabelTextStyle={{ color: COLORS.tertiary, fontSize: 10 }}
          />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Revenue</Text>
              <Text style={styles.statValue}>2,847 DT</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg Daily</Text>
              <Text style={styles.statValue}>407 DT</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Growth</Text>
              <Text style={[styles.statValue, { color: '#4CAF50' }]}>+12%</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Waste Analytics Section */}
      <View style={styles.wasteSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcon name="recycle" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Waste Analytics</Text>
        </View>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
          style={styles.wasteCard}
        >
          <View style={styles.wasteStatsContainer}>
            <PieChart
              data={[
                {
                  value: totalOrganicWaste,
                  color: COLORS.primary_2,
                  text: `${totalOrganicWaste}kg`,
                },
                {
                  value: totalCarbonWaste,
                  color: COLORS.accent,
                  text: `${totalCarbonWaste}kg`,
                },
              ]}
              donut
              radius={90}
              innerRadius={60}
              focusOnPress
              textSize={12}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>{totalWaste}kg</Text>
                  <Text style={styles.centerLabelSub}>Total Waste</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.wasteLegend}>
            <View style={styles.legendItem}>
              <LinearGradient
                colors={['rgba(205, 190, 130, 0.3)', 'rgba(205, 190, 130, 0.1)']}
                style={styles.legendItemContainer}
              >
                <View style={[styles.legendBox, { backgroundColor: COLORS.primary_2 }]} />
                <View style={styles.legendText}>
                  <Text style={styles.legendLabel}>Organic Food Waste</Text>
                  <Text style={styles.legendValue}>{totalOrganicWaste} kg</Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.legendItem}>
              <LinearGradient
                colors={['rgba(173, 193, 120, 0.3)', 'rgba(173, 193, 120, 0.1)']}
                style={styles.legendItemContainer}
              >
                <View style={[styles.legendBox, { backgroundColor: COLORS.accent }]} />
                <View style={styles.legendText}>
                  <Text style={styles.legendLabel}>Carbon-Rich Waste</Text>
                  <Text style={styles.legendValue}>{totalCarbonWaste} kg</Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Points Card */}
      <View style={styles.pointsSection}>
        <LinearGradient
          colors={['rgba(173, 193, 120, 0.9)', 'rgba(108, 88, 76, 0.9)']}
          style={styles.pointsCard}
        >
          <View style={styles.pointsCardContent}>
            <View style={styles.pointsTextContent}>
              <Text style={styles.pointsCardLabel}>Available Eco Points</Text>
              <Text style={styles.pointsCardValue}>{points}</Text>
              <Text style={points >= 100 ? styles.pointsRedeemable : styles.pointsInfo}>
                {points >= 100 ? '🎉 Ready to redeem!' : `${100 - points} points until discount`}
              </Text>
            </View>
            <View style={styles.pointsIconContainer}>
              <MaterialCommunityIcon name="star-circle" size={70} color="rgba(255,255,255,0.3)" />
            </View>
          </View>
          <View style={styles.pointsProgress}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(100, (points / 100) * 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.pointsGoal}>100 points = 10% marketplace discount</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Recent Declarations */}
      <View style={styles.declarationsSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcon name="clipboard-list" size={20} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Recent Declarations</Text>
        </View>
        <View style={styles.declarationsList}>
          {wasteDeclarations.slice(0, 2).map((waste) => (
            <LinearGradient
              key={waste.id}
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
              style={styles.declarationItem}
            >
              <View style={styles.declarationHeader}>
                <View style={styles.declarationType}>
                  <LinearGradient
                    colors={waste.type === "organic_food" ? 
                      ['rgba(205, 190, 130, 0.2)', 'rgba(205, 190, 130, 0.1)'] : 
                      ['rgba(173, 193, 120, 0.2)', 'rgba(173, 193, 120, 0.1)']}
                    style={styles.typeIconContainer}
                  >
                    <MaterialCommunityIcon
                      name={waste.type === "organic_food" ? "leaf" : "package-variant"}
                      size={20}
                      color={waste.type === "organic_food" ? COLORS.primary_2 : COLORS.accent}
                    />
                  </LinearGradient>
                  <View style={styles.declarationText}>
                    <Text style={styles.declarationTitle}>
                      {waste.type === "organic_food" ? "Organic Food Waste" : "Carbon-Rich Waste"}
                    </Text>
                    <Text style={styles.declarationDetails}>
                      {waste.weight} kg • {waste.items.join(", ")}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={waste.status === "pending" ? 
                    ['rgba(255, 152, 0, 0.9)', 'rgba(255, 193, 7, 0.9)'] : 
                    ['rgba(76, 175, 80, 0.9)', 'rgba(56, 142, 60, 0.9)']}
                  style={styles.statusBadge}
                >
                  <Text style={styles.statusText}>{waste.status.charAt(0).toUpperCase() + waste.status.slice(1)}</Text>
                </LinearGradient>
              </View>
            </LinearGradient>
          ))}
        </View>
      </View>

      {/* Waste Declaration Modal */}
      <WasteDeclarationModal
        visible={showWasteModal}
        onClose={() => setShowWasteModal(false)}
        onDeclare={handleDeclareWaste}
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
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    opacity: 0.9,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
  },
  pointsTextContainer: {
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  pointsLabel: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
  },
  urgentAlertContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  urgentAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  urgentTextContainer: {
    flex: 1,
  },
  urgentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,
  },
  urgentText: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.9,
    lineHeight: 18,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 20 ,
    fontWeight: '700',
    color: COLORS.dark,
  },
  quickActions: {
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
  chartSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  chartCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.mediumGray,
  },
  wasteSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  wasteCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  wasteStatsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  centerLabelSub: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginTop: 2,
  },
  wasteLegend: {
    gap: 12,
  },
  legendItem: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  legendItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    flex: 1,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  pointsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  pointsCard: {
    borderRadius: 24,
    padding: 24,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  pointsCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsTextContent: {
    flex: 1,
  },
  pointsCardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 4,
  },
  pointsCardValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  pointsRedeemable: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    opacity: 0.9,
  },
  pointsInfo: {
    fontSize: 14,
    color: COLORS.primary,
    opacity: 0.8,
  },
  pointsIconContainer: {
    opacity: 0.7,
  },
  pointsProgress: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  pointsGoal: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
    textAlign: 'center',
  },
  declarationsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 30,
  },
  declarationsList: {
    gap: 12,
  },
  declarationItem: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  declarationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  declarationType: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: 12,
  },
  typeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  declarationText: {
    flex: 1,
  },
  declarationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 4,
  },
  declarationDetails: {
    fontSize: 14,
    color: COLORS.tertiary,
    lineHeight: 18,
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
})

export default SupplierHomeScreen
