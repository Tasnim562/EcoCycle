import { useContext, useState } from "react"
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Dimensions } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { FarmerContext } from "../../context/FarmerContext"
import AddProductModal from "./Components/AddProductModal"
import { COLORS } from "../../colors"

const { width } = Dimensions.get("window")

export default function FarmerSellScreen() {
  const { products, addProduct } = useContext(FarmerContext)
  const [modalVisible, setModalVisible] = useState(false)

  const getProductImage = (productName) => {
    if (productName.toLowerCase().includes('tomato')) return '🍅'
    if (productName.toLowerCase().includes('potato')) return '🥔'
    if (productName.toLowerCase().includes('carrot')) return '🥕'
    if (productName.toLowerCase().includes('lettuce')) return '🥬'
    if (productName.toLowerCase().includes('onion')) return '🧅'
    if (productName.toLowerCase().includes('pepper')) return '🫑'
    return '🥦'
  }

  const getSalesPercentage = (sold, quantity) => {
    const total = sold + quantity
    return total > 0 ? Math.round((sold / total) * 100) : 0
  }

  const renderProductCard = ({ item }) => {
    const salesPercentage = getSalesPercentage(item.sold, item.quantity)
    
    return (
      <View style={styles.productCardContainer}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(245, 245, 245, 0.95)']}
          style={styles.productCard}
        >
          {/* Product Image & Header */}
          <View style={styles.cardHeader}>
            <LinearGradient
              colors={['rgba(240, 234, 210, 0.6)', 'rgba(221, 229, 182, 0.4)']}
              style={styles.productImageContainer}
            >
              <Text style={styles.productImage}>{getProductImage(item.name)}</Text>
            </LinearGradient>
            
            <View style={styles.productHeader}>
              <View style={styles.productTitle}>
                <Text style={styles.productName}>{item.name}</Text>
                <LinearGradient
                  colors={['rgba(76, 175, 80, 0.1)', 'rgba(56, 142, 60, 0.05)']}
                  style={styles.statusBadge}
                >
                  <MaterialCommunityIcons 
                    name={item.quantity > 0 ? "check-circle" : "clock"} 
                    size={12} 
                    color={item.quantity > 0 ? "#4CAF50" : "#FF9800"} 
                  />
                  <Text style={[
                    styles.statusText,
                    { color: item.quantity > 0 ? "#4CAF50" : "#FF9800" }
                  ]}>
                    {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </Text>
                </LinearGradient>
              </View>
              <Text style={styles.productPrice}>{item.price} DT/kg</Text>
            </View>
          </View>

          {/* Sales Progress */}
          <View style={styles.salesSection}>
            <View style={styles.salesHeader}>
              <Text style={styles.salesLabel}>Sales Progress</Text>
              <Text style={styles.salesPercentage}>{salesPercentage}% sold</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${salesPercentage}%` }
                ]} 
              />
            </View>
            <View style={styles.quantityRow}>
              <View style={styles.quantityItem}>
                <MaterialCommunityIcons name="package-variant" size={14} color={COLORS.primary_2} />
                <Text style={styles.quantityLabel}>Available</Text>
                <Text style={styles.quantityValue}>{item.quantity} kg</Text>
              </View>
              <View style={styles.quantityItem}>
                <MaterialCommunityIcons name="cash" size={14} color="#4CAF50" />
                <Text style={styles.quantityLabel}>Sold</Text>
                <Text style={styles.quantityValue}>{item.sold} kg</Text>
              </View>
              <View style={styles.quantityItem}>
                <MaterialCommunityIcons name="trending-up" size={14} color={COLORS.accent} />
                <Text style={styles.quantityLabel}>Revenue</Text>
                <Text style={styles.quantityValue}>{item.sold * item.price} DT</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <LinearGradient
                colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
                style={styles.editButtonBackground}
              >
                <MaterialCommunityIcons name="pencil" size={18} color={COLORS.primary_2} />
                <Text style={styles.editButtonText}>Edit</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.deleteButton}>
              <LinearGradient
                colors={['rgba(255, 107, 107, 0.1)', 'rgba(229, 62, 62, 0.05)']}
                style={styles.deleteButtonBackground}
              >
                <MaterialCommunityIcons name="delete" size={18} color="#FF6B6B" />
                <Text style={styles.deleteButtonText}>Delete</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>My Products</Text>
            <Text style={styles.headerSubtitle}>Manage your farm's harvest</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <LinearGradient
              colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
              style={styles.addButtonGradient}
            >
              <MaterialCommunityIcons name="plus-circle" size={24} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Add Product</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Stats Summary */}
        <View style={styles.statsSummary}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{products.length}</Text>
            <Text style={styles.statLabel}>Total Products</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {products.reduce((total, product) => total + product.quantity, 0)}
            </Text>
            <Text style={styles.statLabel}>Available Stock</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {products.reduce((total, product) => total + (product.sold * product.price), 0)} DT
            </Text>
            <Text style={styles.statLabel}>Total Revenue</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Products List */}
      <FlatList
        data={products}
        style={{marginBottom: 80}}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
              style={styles.emptyStateContainer}
            >
              <MaterialCommunityIcons name="sprout" size={64} color={COLORS.tertiary} />
              <Text style={styles.emptyTitle}>No Products Yet</Text>
              <Text style={styles.emptySubtitle}>
                Start selling your farm's harvest to restaurants and customers
              </Text>
              <TouchableOpacity 
                style={styles.emptyActionButton}
                onPress={() => setModalVisible(true)}
              >
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                  style={styles.emptyActionGradient}
                >
                  <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
                  <Text style={styles.emptyActionText}>Add Your First Product</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
      />

      {/* Add Product Modal */}
      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={(product) => {
          addProduct(product)
          setModalVisible(false)
        }}
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
    marginBottom: 20,
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
  addButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statsSummary: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '40',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.primary,
    opacity: 0.8,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.primary + '60',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  productCardContainer: {
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  productImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  productImage: {
    fontSize: 28,
  },
  productHeader: {
    flex: 1,
  },
  productTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    flex: 1,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  salesSection: {
    marginBottom: 16,
  },
  salesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  salesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  salesPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary_2,
  },
  progressBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary_2,
    borderRadius: 3,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quantityItem: {
    alignItems: 'center',
    flex: 1,
  },
  quantityLabel: {
    fontSize: 10,
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  editButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary_2,
  },
  deleteButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  deleteButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
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
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.tertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    maxWidth: 250,
  },
  emptyActionButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emptyActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 12,
  },
  emptyActionText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
})