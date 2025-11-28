import { useContext } from "react"
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { BarChart } from "react-native-gifted-charts"
import { FarmerContext } from "../../context/FarmerContext"
import { COLORS } from "../../colors"

const { width } = Dimensions.get("window")

export default function FarmerHomeScreen({navigation}) {
  const { farmer, products, orders, compostOrders } = useContext(FarmerContext)

  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const pendingCompost = compostOrders.filter((o) => o.status === "pending_delivery").length

  const earningsData = [
    { value: 300, label: "Week 1" },
    { value: 450, label: "Week 2" },
    { value: 350, label: "Week 3" },
    { value: 400, label: "Week 4" },
  ]

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header with Welcome */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.welcomeText}>{farmer.name.split(" ")[0]}</Text>
            <Text style={styles.subText}>Ready for a productive farming day</Text>
          </View>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.farmerBadge}
          >
            <MaterialCommunityIcons name="sprout" size={28} color={COLORS.primary} />
          </LinearGradient>
        </View>
      </LinearGradient>

      {/* Enhanced Overview Section */}
      <View style={styles.overviewSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="chart-box" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Farm Overview</Text>
        </View>
        
        <View style={styles.cardsContainer}>
          {/* Total Sold Card */}
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.overviewCard}
          >
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="trending-up" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.cardNumber}>{farmer.weekSales} DT</Text>
            <Text style={styles.cardLabel}>Weekly Sales</Text>
          </LinearGradient>

          {/* Pending Orders Card */}
          <LinearGradient
            colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
            style={styles.overviewCard}
          >
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="clipboard-list" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.cardNumber}>{pendingOrders}</Text>
            <Text style={styles.cardLabel}>Pending Orders</Text>
            <Text style={styles.cardSubtext}>Need attention</Text>
          </LinearGradient>

          {/* Compost Purchases Card */}
          <LinearGradient
            colors={['rgba(173, 193, 120, 0.9)', 'rgba(108, 88, 76, 0.9)']}
            style={styles.overviewCard}
          >
            <View style={styles.cardIconContainer}>
              <MaterialCommunityIcons name="truck-delivery" size={32} color={COLORS.primary} />
            </View>
            <Text style={styles.cardNumber}>{pendingCompost}</Text>
            <Text style={styles.cardLabel}>Awaiting Delivery</Text>
            <Text style={styles.cardSubtext}>Compost orders</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Enhanced Action Buttons */}
      <View style={styles.actionsSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="lightning-bolt" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity onPress={()=>navigation.navigate('sell') } style={styles.actionButton}>
            <LinearGradient
              colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcons name="basket" size={36} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Sell Produce</Text>
              <Text style={styles.actionButtonSubtext}>List your harvest</Text>
              <View style={styles.actionArrow}>
                <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.primary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('buy') } style={styles.actionButton}>
            <LinearGradient
              colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
              style={styles.actionButtonGradient}
            >
              <View style={styles.actionIconContainer}>
                <MaterialCommunityIcons name="compost" size={36} color={COLORS.primary} />
              </View>
              <Text style={styles.actionButtonText}>Buy Compost</Text>
              <Text style={styles.actionButtonSubtext}>Enrich your soil</Text>
              <View style={styles.actionArrow}>
                <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.primary} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Enhanced Earnings Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="chart-bar" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Monthly Performance</Text>
        </View>
        
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
          style={styles.chartContainer}
        >
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Revenue Analytics</Text>
              <Text style={styles.chartSubtitle}>Last 4 weeks performance</Text>
            </View>
            <View style={styles.chartStats}>
              <Text style={styles.chartStatValue}>1,500 DT</Text>
              <Text style={styles.chartStatLabel}>Total Revenue</Text>
            </View>
          </View>
          
          <BarChart
            data={earningsData}
            width={Dimensions.get('window').width - 140}
            height={200}
            barWidth={35}
            spacing={25}
            barBorderRadius={12}
            frontColor={COLORS.primary_2}
            isAnimated
            animationDuration={1000}
            showGradient
            gradientColor={COLORS.accent}
            yAxisTextStyle={{ color: COLORS.tertiary, fontSize: 12 }}
            xAxisLabelTextStyle={{ color: COLORS.tertiary, fontSize: 11 }}
            showValuesOnTopOfBars
            valuesOnTopOfBarsColor={COLORS.dark}
            valuesOnTopOfBarsTextStyle={{ fontSize: 12, fontWeight: '600' }}
          />
          
          <View style={styles.chartFooter}>
            <View style={styles.chartLegend}>
              <View style={{flexDirection: 'row' , alignItems: 'center' , gap : 10}}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.primary_2 }]} />
                <Text style={styles.legendText}>Weekly Revenue</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Recent Activity Section */}
      <View style={styles.activitySection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons name="clock" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Recent Activity</Text>
        </View>
        
        <View style={styles.activityList}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
            style={styles.activityCard}
          >
            <View style={styles.activityIcon}>
              <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Order Completed</Text>
              <Text style={styles.activityDescription}>Tomatoes order delivered to Restaurant Al Zahra</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>+150 DT</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
            style={styles.activityCard}
          >
            <View style={styles.activityIcon}>
              <MaterialCommunityIcons name="truck" size={20} color={COLORS.primary_2} />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Compost Ordered</Text>
              <Text style={styles.activityDescription}>Premium compost scheduled for delivery</Text>
              <Text style={styles.activityTime}>5 hours ago</Text>
            </View>
            <Text style={styles.activityAmount}>-80 DT</Text>
          </LinearGradient>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginBottom:70
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
  farmerBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  overviewSection: {
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
    fontWeight: '700',
    color: COLORS.dark,
  },
  cardsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardIconContainer: {
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
  cardNumber: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 2,
  },
  cardTrend: {
    fontSize: 11,
    color: COLORS.primary,
    opacity: 0.8,
  },
  cardSubtext: {
    fontSize: 11,
    color: COLORS.primary,
    opacity: 0.7,
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
    position: 'relative',
  },
  actionIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
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
  actionArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  chartContainer: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  chartStats: {
    alignItems: 'flex-end',
  },
  chartStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 2,
  },
  chartStatLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  chartLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  chartGrowth: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  activitySection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 30,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: COLORS.tertiary,
    opacity: 0.7,
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
})