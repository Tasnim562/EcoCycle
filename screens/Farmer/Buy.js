import { useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"

const { width } = Dimensions.get("window")

const COMPOST_PRODUCTS = [
  {
    id: "compost_1",
    name: "Premium Organic Compost",
    centerName: "EcoCompost Center",
    price: 25,
    quantity: 50,
    rating: 4.8,
    reviews: 156,
    npk: "5-4-3",
    certified: true,
    distance: 2.5,
    description: "Rich, nutrient-dense compost perfect for organic farming",
    deliveryTime: "2-3 days",
    image: "🌱"
  },
  {
    id: "compost_2",
    name: "Organic Rich Compost",
    centerName: "Green Earth Composting",
    price: 20,
    quantity: 100,
    rating: 4.6,
    reviews: 98,
    npk: "4-3-2",
    certified: true,
    distance: 5.0,
    description: "Balanced compost for general agricultural use",
    deliveryTime: "3-4 days",
    image: "🪴"
  },
  {
    id: "compost_3",
    name: "Standard Compost Blend",
    centerName: "Local Waste Management",
    price: 15,
    quantity: 200,
    rating: 4.4,
    reviews: 45,
    npk: "3-2-1",
    certified: false,
    distance: 8.0,
    description: "Affordable compost for large-scale farming",
    deliveryTime: "4-5 days",
    image: "🌿"
  },
]

export default function FarmerBuyScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filters = [
    { key: "all", label: "All Products", icon: "view-grid" },
    { key: "certified", label: "Certified", icon: "certificate" },
    { key: "nearest", label: "Nearest", icon: "map-marker" },
    { key: "best_rated", label: "Best Rated", icon: "star" },
    { key: "premium", label: "Premium", icon: "crown" },
  ]

  const renderCompostCard = ({ item }) => (
    <View style={styles.compostCardContainer}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
        style={styles.compostCard}
      >
        {/* Product Image & Header */}
        <View style={styles.cardHeader}>
          <LinearGradient
            colors={['rgba(240, 234, 210, 0.6)', 'rgba(221, 229, 182, 0.4)']}
            style={styles.productImage}
          >
            <Text style={styles.productImageText}>{item.image}</Text>
          </LinearGradient>
          
          <View style={styles.headerContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.compostName}>{item.name}</Text>
              {item.certified && (
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                  style={styles.certifiedBadge}
                >
                  <MaterialCommunityIcons name="check-decagram" size={14} color={COLORS.primary} />
                  <Text style={styles.certifiedText}>Certified</Text>
                </LinearGradient>
              )}
            </View>
            <Text style={styles.centerName}>{item.centerName}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>

        {/* NPK & Distance Info */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
            style={styles.npkContainer}
          >
            <View style={{flexDirection: "row" , alignItems:'center' , gap: 5}} >
              <MaterialCommunityIcons name="flask" size={16} color={COLORS.primary_2} />
              <Text style={styles.npkLabel}>NPK Ratio</Text>
            </View>
            <Text style={styles.npkValue}>{item.npk}</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(169, 132, 103, 0.1)', 'rgba(108, 88, 76, 0.05)']}
            style={styles.distanceContainer}
          >
            <View style={{flexDirection: "row" , alignItems:'center' , gap: 5}} >
              <MaterialCommunityIcons name="map-marker" size={16} color={COLORS.tertiary} />
              <Text style={styles.distanceLabel}>Distance</Text>
            </View>
            <Text style={styles.distanceValue}>{item.distance} km</Text>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(173, 193, 120, 0.1)', 'rgba(108, 88, 76, 0.05)']}
            style={styles.deliveryContainer}
          >
            <View style={{flexDirection: "row" , alignItems:'center' , gap: 5}} >
              <MaterialCommunityIcons name="truck-fast" size={16} color={COLORS.accent} />
              <Text style={styles.deliveryLabel}>Delivery</Text>
            </View>
            <Text style={styles.deliveryValue}>{item.deliveryTime}</Text>
          </LinearGradient>
        </View>

        {/* Rating & Reviews */}
        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <MaterialCommunityIcons
                  key={i}
                  name={i < Math.floor(item.rating) ? "star" : "star-outline"}
                  size={16}
                  color={COLORS.primary_2}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>

        {/* Price & Quantity */}
        <View style={styles.priceQuantityContainer}>
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>Price per bag</Text>
            <Text style={styles.price}>{item.price} DT</Text>
          </View>
          
          <View style={styles.quantitySection}>
            <Text style={styles.quantityLabel}>Available</Text>
            <View style={styles.quantityInfo}>
              <MaterialCommunityIcons name="package-variant" size={14} color={COLORS.tertiary} />
              <Text style={styles.quantity}>{item.quantity} bags</Text>
            </View>
          </View>
        </View>

        {/* Buy Button */}
        <TouchableOpacity style={styles.buyButton}>
          <LinearGradient
            colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
            style={styles.buyButtonGradient}
          >
            <MaterialCommunityIcons name="cart-plus" size={20} color={COLORS.primary} />
            <Text style={styles.buyButtonText}>Add to Cart</Text>
            <View style={styles.priceBadge}>
              <Text style={styles.priceBadgeText}>{item.price} DT</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Compost Marketplace</Text>
            <Text style={styles.headerSubtitle}>Premium organic soil for your farm</Text>
          </View>
          <View style={styles.headerStats}>
            <MaterialCommunityIcons name="earth" size={28} color={COLORS.primary} />
          </View>
        </View>
      </LinearGradient>

      {/* Enhanced Filter Section */}
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>Filter Products</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterContentContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <LinearGradient
                colors={selectedFilter === filter.key ? 
                  ['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)'] : 
                  ['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.filterButtonGradient}
              >
                <MaterialCommunityIcons 
                  name={filter.icon} 
                  size={18} 
                  color={selectedFilter === filter.key ? COLORS.primary : COLORS.primary_2} 
                />
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive
                ]}>
                  {filter.label}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Products Count & Sort */}
      <View style={styles.productsHeader}>
        <Text style={styles.productsCount}>{COMPOST_PRODUCTS.length} products available</Text>
      </View>

      {/* Enhanced Products List */}
      <FlatList
        data={COMPOST_PRODUCTS}
        renderItem={renderCompostCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        style={styles.productsList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
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
  headerStats: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '40',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
    marginTop: 10
  },
  filterSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 12,
  },
  filterScrollView: {
    marginHorizontal: -20,
  },
  filterContentContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  filterButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  filterButtonActive: {
    borderColor: COLORS.primary_2,
    shadowColor: COLORS.primary_2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  filterButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary_2,
  },
  filterButtonTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 16,
  },
  productsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  sortText: {
    fontSize: 14,
    color: COLORS.primary_2,
    fontWeight: '600',
  },
  productsList: {
    flex: 1,
    marginBottom: 70
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16,
  },
  compostCardContainer: {
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  compostCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  productImageText: {
    fontSize: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  compostName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },
  certifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  certifiedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  centerName: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: COLORS.tertiary,
    lineHeight: 20,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  npkContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  distanceContainer: {
    flex: 1,
    flexDirection: 'clumn',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(169, 132, 103, 0.3)',
  },
  deliveryContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(173, 193, 120, 0.3)',
  },
  npkLabel: {
    fontSize: 10,
    color: COLORS.tertiary,
    marginRight: 4,
  },
  npkValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  distanceLabel: {
    fontSize: 10,
    color: COLORS.tertiary,
    marginRight: 4,
  },
  distanceValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  deliveryLabel: {
    fontSize: 10,
    color: COLORS.tertiary,
    marginRight: 4,
  },
  deliveryValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stars: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
  },
  priceSection: {
    alignItems: 'flex-start',
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  quantitySection: {
    alignItems: 'flex-end',
  },
  quantityLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 4,
  },
  quantityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  buyButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buyButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  buyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
    marginLeft: 8,
  },
  priceBadge: {
    backgroundColor: COLORS.primary + '40',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  priceBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
})