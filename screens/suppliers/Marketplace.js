import { useContext, useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"
import { SupplierContext } from "../../context/SupplierContext"
import { TextInput } from "react-native"

const Marketplace = () => {
  const { marketplaceProducts, points, purchaseMarketplaceItem } = useContext(SupplierContext)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [applyingPoints, setApplyingPoints] = useState(false)
  const [pointsToApply, setPointsToApply] = useState(0)

  const handleUsePoints = (pointsToUse) => {
    if (pointsToUse === 0) {
      Alert.alert("Error", "Please enter points to apply")
      return false
    }

    if (points < pointsToUse) {
      Alert.alert("Error", "Insufficient points")
      return false
    }

    // Simulate using points
    console.log(`Using ${pointsToUse} points`)
    return true
  }

  const handleApplyPoints = (productId) => {
    if (handleUsePoints(pointsToApply)) {
      purchaseMarketplaceItem(productId, pointsToApply)
      Alert.alert(
        "Success",
        `Purchase complete! ${pointsToApply} points used for ${Math.floor(pointsToApply / 100)}% discount.`,
      )
      setShowDetailModal(false)
      setPointsToApply(0)
    }
  }

  const calculateDiscount = (points) => {
    return Math.floor(points / 100)
  }

  const getProductImage = (productName) => {
    if (productName.toLowerCase().includes('tomato')) return '🍅'
    if (productName.toLowerCase().includes('potato')) return '🥔'
    if (productName.toLowerCase().includes('carrot')) return '🥕'
    if (productName.toLowerCase().includes('lettuce')) return '🥬'
    if (productName.toLowerCase().includes('compost')) return '🌱'
    return '🥦'
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Farmer's Marketplace</Text>
            <Text style={styles.headerSubtitle}>Fresh, Organic & Locally Grown</Text>
          </View>
          <MaterialCommunityIcon name="storefront-outline" size={32} color={COLORS.primary} />
        </View>
      </LinearGradient>

      {/* Enhanced Points Card */}
      <View style={styles.pointsSection}>
        <LinearGradient
          colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
          style={styles.pointsCard}
        >
          <View style={styles.pointsCardContent}>
            <View style={styles.pointsTextContent}>
              <Text style={styles.pointsCardLabel}>Your Eco Points</Text>
              <Text style={styles.pointsCardValue}>{points}</Text>
              <Text style={styles.pointsCardSubtitle}>
                {points >= 100 ? '🎉 Ready to redeem!' : `${100 - points} points until first discount`}
              </Text>
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
              <Text style={styles.pointsGoal}>100 points = 10% discount</Text>
            </View>
            <View style={styles.pointsIconContainer}>
              <MaterialCommunityIcon name="star-circle" size={60} color={COLORS.primary} />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Enhanced Products Grid */}
      <View style={styles.productsSection}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcon name="shopping" size={24} color={COLORS.dark} />
          <Text style={styles.sectionTitle}>Featured Products</Text>
        </View>
        
        <View style={styles.productsGrid}>
          {marketplaceProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCardContainer}
              onPress={() => {
                setSelectedProduct(product)
                setShowDetailModal(true)
                setPointsToApply(0)
              }}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
                style={styles.productCard}
              >
                {/* Product Image */}
                <View style={styles.productImageContainer}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                    style={styles.productImageBackground}
                  >
                    <Text style={styles.productImage}>{getProductImage(product.name)}</Text>
                  </LinearGradient>
                  
                  {product.discount > 0 && (
                    <LinearGradient
                      colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
                      style={styles.discountBadge}
                    >
                      <Text style={styles.discountText}>-{product.discount}%</Text>
                    </LinearGradient>
                  )}
                  
                  <View style={styles.organicBadge}>
                    <MaterialCommunityIcon name="leaf" size={12} color={COLORS.primary_2} />
                    <Text style={styles.organicText}>ORGANIC</Text>
                  </View>
                </View>

                {/* Product Info */}
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <View style={styles.farmerInfo}>
                    <MaterialCommunityIcon name="account" size={14} color={COLORS.tertiary} />
                    <Text style={styles.farmerName}>{product.farmer}</Text>
                  </View>
                  
                  <View style={styles.priceContainer}>
                    <View style={styles.priceRow}>
                      <Text style={styles.price}>{product.price} DT</Text>
                      {product.originalPrice && (
                        <Text style={styles.originalPrice}>{product.originalPrice} DT</Text>
                      )}
                    </View>
                    <Text style={styles.quantity}>{product.quantity}</Text>
                  </View>

                  {/* Rating */}
                  <View style={styles.ratingContainer}>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <MaterialCommunityIcon
                          key={i}
                          name={i <= 4 ? "star" : "star-outline"}
                          size={14}
                          color={COLORS.primary_2}
                        />
                      ))}
                    </View>
                    <Text style={styles.ratingText}>(120)</Text>
                  </View>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton}>
                  <MaterialCommunityIcon name="cart-plus" size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Enhanced Detail Modal */}
      {selectedProduct && (
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
                colors={['rgba(205, 190, 130, 0.95)', 'rgba(173, 193, 120, 0.95)']}
                style={styles.modalHeader}
              >
                <TouchableOpacity onPress={() => setShowDetailModal(false)} style={styles.modalCloseButton}>
                  <MaterialCommunityIcon name="close" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <View style={styles.modalTitleContainer}>
                  <MaterialCommunityIcon name="storefront" size={28} color={COLORS.primary} />
                  <Text style={styles.modalTitle}>Product Details</Text>
                </View>
                <View style={styles.modalSpacer} />
              </LinearGradient>

              {/* Enhanced Modal Content */}
              <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                {/* Product Image */}
                <View style={styles.modalImageContainer}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.6)', 'rgba(221, 229, 182, 0.4)']}
                    style={styles.modalImageBackground}
                  >
                    <Text style={styles.modalImageText}>{getProductImage(selectedProduct.name)}</Text>
                  </LinearGradient>
                </View>

                <View style={styles.modalProductDetails}>
                  {/* Product Header */}
                  <View style={styles.modalProductHeader}>
                    <View>
                      <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                      <View style={styles.modalRatingRow}>
                        <View style={styles.modalStars}>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <MaterialCommunityIcon
                              key={i}
                              name={i <= 4 ? "star" : "star-outline"}
                              size={18}
                              color={COLORS.primary_2}
                            />
                          ))}
                        </View>
                        <Text style={styles.modalRatingText}>4.2 • 120 reviews</Text>
                      </View>
                    </View>
                    <View style={styles.modalPriceSection}>
                      <Text style={styles.modalPrice}>{selectedProduct.price} DT</Text>
                      {selectedProduct.originalPrice && (
                        <Text style={styles.modalOriginalPrice}>{selectedProduct.originalPrice} DT</Text>
                      )}
                    </View>
                  </View>

                  {/* Farmer Info */}
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                    style={styles.farmerCard}
                  >
                    <MaterialCommunityIcon name="account-circle" size={40} color={COLORS.primary_2} />
                    <View style={styles.farmerCardText}>
                      <Text style={styles.farmerCardTitle}>Supplied by</Text>
                      <Text style={styles.farmerCardName}>{selectedProduct.farmer}</Text>
                      <Text style={styles.farmerCardLocation}>Local Organic Farm • Sfax, Tunisia</Text>
                    </View>
                    <MaterialCommunityIcon name="heart-outline" size={24} color={COLORS.primary_2} />
                  </LinearGradient>

                  {/* Product Information */}
                  <View style={styles.detailSection}>
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcon name="information-outline" size={20} color={COLORS.dark} />
                      <Text style={styles.sectionTitle}>Product Information</Text>
                    </View>
                    <View style={styles.detailGrid}>
                      <DetailItem icon="weight" label="Quantity" value={selectedProduct.quantity} />
                      <DetailItem icon="earth" label="Origin" value="Sfax, Tunisia" />
                      <DetailItem icon="certificate" label="Certification" value="Organic" />
                      <DetailItem icon="clock" label="Freshness" value="Harvested Today" />
                    </View>
                  </View>

                  {/* Points Discount Section */}
                  <LinearGradient
                    colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
                    style={styles.pointsSectionModal}
                  >
                    <View style={styles.sectionHeader}>
                      <MaterialCommunityIcon name="star-circle" size={20} color={COLORS.dark} />
                      <Text style={styles.sectionTitle}>Apply Eco Points</Text>
                    </View>
                    
                    <Text style={styles.pointsHelperText}>
                      Use your points for additional discounts! 100 points = 10% off
                    </Text>

                    <View style={styles.pointsInputContainer}>
                      <View style={styles.pointsInputHeader}>
                        <Text style={styles.pointsInputLabel}>Points to Apply</Text>
                        <Text style={styles.availablePoints}>Available: {points} pts</Text>
                      </View>
                      
                      <View style={styles.pointsControl}>
                        <TouchableOpacity
                          onPress={() => setPointsToApply(Math.max(0, pointsToApply - 100))}
                          style={styles.pointsButton}
                        >
                          <MaterialCommunityIcon name="minus" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                        
                        <View style={styles.pointsInputWrapper}>
                          <TextInput
                            style={styles.pointsInput}
                            value={String(pointsToApply)}
                            onChangeText={(val) =>
                              setPointsToApply(Math.min(Math.max(0, Number.parseInt(val) || 0), points))
                            }
                            keyboardType="number-pad"
                            placeholder="0"
                          />
                          <Text style={styles.pointsUnit}>pts</Text>
                        </View>
                        
                        <TouchableOpacity
                          onPress={() => setPointsToApply(Math.min(points, pointsToApply + 100))}
                          style={styles.pointsButton}
                        >
                          <MaterialCommunityIcon name="plus" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                      </View>

                      {pointsToApply > 0 && (
                        <LinearGradient
                          colors={['rgba(76, 175, 80, 0.2)', 'rgba(56, 142, 60, 0.1)']}
                          style={styles.discountPreview}
                        >
                          <MaterialCommunityIcon name="tag" size={20} color="#4CAF50" />
                          <View style={styles.discountPreviewContent}>
                            <Text style={styles.discountPreviewLabel}>
                              {calculateDiscount(pointsToApply)}% Discount Applied
                            </Text>
                            <Text style={styles.discountPreviewAmount}>
                              Save {((selectedProduct.originalPrice * calculateDiscount(pointsToApply)) / 100).toFixed(2)} DT
                            </Text>
                          </View>
                        </LinearGradient>
                      )}
                    </View>
                  </LinearGradient>
                </View>
              </ScrollView>

              {/* Enhanced Modal Footer */}
              <View style={styles.modalFooter}>
                <TouchableOpacity 
                  style={styles.buyButton}
                  onPress={() => handleApplyPoints(selectedProduct.id)}
                >
                  <LinearGradient
                    colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                    style={styles.buyButtonGradient}
                  >
                    <MaterialCommunityIcon 
                      name={pointsToApply > 0 ? "star-circle" : "cart"} 
                      size={24} 
                      color={COLORS.primary} 
                    />
                    <Text style={styles.buyButtonText}>
                      {pointsToApply > 0 ? `Buy with ${pointsToApply} Points` : "Add to Cart"}
                    </Text>
                    <Text style={styles.finalPrice}>
                      {pointsToApply > 0 
                        ? `${(selectedProduct.price * (1 - calculateDiscount(pointsToApply) / 100)).toFixed(2)} DT`
                        : `${selectedProduct.price} DT`
                      }
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <View style={styles.detailItem}>
    <View style={styles.detailItemIcon}>
      <MaterialCommunityIcon name={icon} size={16} color={COLORS.primary_2} />
    </View>
    <View style={styles.detailItemText}>
      <Text style={styles.detailItemLabel}>{label}</Text>
      <Text style={styles.detailItemValue}>{value}</Text>
    </View>
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
  pointsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  pointsCard: {
    borderRadius: 24,
    padding: 15,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  pointsCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsTextContent: {
    flex: 1,
  },
  pointsCardLabel: {
    fontSize: 13,
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
  pointsCardSubtitle: {
    fontSize: 10,
    color: COLORS.primary,
    opacity: 0.9,
  },
  pointsProgress: {
    marginTop: 12,
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
  },
  pointsIconContainer: {
    marginLeft: 16,
  },
  productsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCardContainer: {
    width: '48%',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productCard: {
    borderRadius: 20,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  productImageContainer: {
    position: 'relative',
    padding: 20,
    marginBottom:10,
    alignItems: 'center',
  },
  productImageBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  productImage: {
    fontSize: 32,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  organicBadge: {
    position: 'absolute',
    bottom: -7,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.primary_2 + '40',
  },
  organicText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.primary_2,
  },
  productInfo: {
    padding: 16,
    paddingTop: 0,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  farmerName: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  priceContainer: {
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  originalPrice: {
    fontSize: 12,
    color: COLORS.tertiary,
    textDecorationLine: 'line-through',
  },
  quantity: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  ratingText: {
    fontSize: 10,
    color: COLORS.tertiary,
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 12,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary_2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  },
  modalImageContainer: {
    padding: 24,
    alignItems: 'center',
  },
  modalImageBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.mediumGray,
  },
  modalImageText: {
    fontSize: 48,
  },
  modalProductDetails: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  modalProductHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  modalRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalStars: {
    flexDirection: 'row',
  },
  modalRatingText: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  modalPriceSection: {
    alignItems: 'flex-end',
  },
  modalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  modalOriginalPrice: {
    fontSize: 16,
    color: COLORS.tertiary,
    textDecorationLine: 'line-through',
  },
  farmerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  farmerCardText: {
    flex: 1,
  },
  farmerCardTitle: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  farmerCardName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  farmerCardLocation: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    gap: 8,
  },
  detailItemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(205, 190, 130, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailItemText: {
    flex: 1,
  },
  detailItemLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  detailItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  pointsSectionModal: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  pointsHelperText: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 16,
    lineHeight: 20,
  },
  pointsInputContainer: {
    gap: 12,
  },
  pointsInputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  availablePoints: {
    fontSize: 14,
    color: COLORS.primary_2,
    fontWeight: '600',
  },
  pointsControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  pointsInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    paddingHorizontal: 16,
  },
  pointsInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark,
    paddingVertical: 12,
    textAlign: 'center',
  },
  pointsUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '600',
  },
  discountPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  discountPreviewContent: {
    flex: 1,
  },
  discountPreviewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 2,
  },
  discountPreviewAmount: {
    fontSize: 14,
    color: '#4CAF50',
    opacity: 0.8,
  },
  modalFooter: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  buyButton: {
    borderRadius: 20,
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
    paddingVertical: 18,
    paddingHorizontal: 24,
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    flex: 1,
    marginLeft: 12,
  },
  finalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
})

export default Marketplace
