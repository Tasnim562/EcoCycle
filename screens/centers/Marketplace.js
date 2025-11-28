import { useContext, useState } from "react"
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../colors"
import { CompostingCenterContext } from "../../context/CompostingCenterContext"
import AddCompostBatchModal from "./components/AddCompostBatchModel" 
import { LinearGradient } from 'react-native-linear-gradient';

export default function CompostShop() {
  const { compostBatches, addCompostBatch } = useContext(CompostingCenterContext)
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <View style={styles.container}>

    {/* Enhanced Header with Nature-inspired Design */}
    <LinearGradient
      colors={[COLORS.dark, COLORS.tertiary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View>
          <Text style={styles.headerTitle}>Premium Compost</Text>
          <Text style={styles.headerSubtitle}>Nature's Finest Soil Enrichment</Text>
        </View>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowAddModal(true)}
        >
          <LinearGradient
            colors={[COLORS.primary_2, COLORS.accent]}
            style={styles.addButtonGradient}
          >
            <MaterialCommunityIcons name="leaf" size={28} color={COLORS.dark} />
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </LinearGradient>


    {/* Background Pattern Container */}
    <View style={styles.backgroundPattern}>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {compostBatches.map((batch, index) => (
          <View key={batch.id} style={styles.productCardContainer}>

            {/* Card with Organic Shape */}
            <LinearGradient
              colors={[COLORS.white, COLORS.lightGray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.productCard}
            >

              {/* Product Image */}
              <View style={styles.productImageContainer}>
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.accent]}
                  style={styles.productImage}
                >
                  <View style={styles.sproutIconContainer}>
                    <MaterialCommunityIcons name="sprout" size={52} color={COLORS.dark} />
                  </View>

                  <View style={styles.organicBadge}>
                    <Text style={styles.organicBadgeText}>ORGANIC</Text>
                  </View>
                </LinearGradient>
              </View>


              <View style={styles.productInfo}>

                {/* Product Header */}
                <View style={styles.productHeader}>
                  <View style={styles.productTextContainer}>
                    <Text style={styles.productType}>{batch.type}</Text>
                    <Text style={styles.productDescription}>{batch.description}</Text>
                  </View>

                  <TouchableOpacity style={styles.heartButton}>
                    <MaterialCommunityIcons 
                      name="heart-outline" 
                      size={24} 
                      color={COLORS.tertiary}
                    />
                  </TouchableOpacity>
                </View>


                {/* NPK Section */}
                <View style={styles.qualitySection}>
                  <Text style={styles.qualityLabel}>Soil Nutrient Profile</Text>

                  <View style={styles.npkValues}>

                    {/* Nitrogen */}
                    <LinearGradient
                      colors={[
                        'rgba(205, 190, 130, 0.2)',
                        'rgba(205, 190, 130, 0.4)'
                      ]}
                      style={styles.npkItem}
                    >
                      <Text style={styles.npkLabel}>N</Text>
                      <Text style={styles.npkValue}>{batch.npk.nitrogen}%</Text>
                      <Text style={styles.npkDescription}>Nitrogen</Text>
                    </LinearGradient>

                    {/* Phosphorus */}
                    <LinearGradient
                      colors={[
                        'rgba(173, 193, 120, 0.2)',
                        'rgba(173, 193, 120, 0.4)'
                      ]}
                      style={styles.npkItem}
                    >
                      <Text style={styles.npkLabel}>P</Text>
                      <Text style={styles.npkValue}>{batch.npk.phosphorus}%</Text>
                      <Text style={styles.npkDescription}>Phosphorus</Text>
                    </LinearGradient>

                    {/* Potassium */}
                    <LinearGradient
                      colors={[
                        'rgba(169, 132, 103, 0.2)',
                        'rgba(169, 132, 103, 0.4)'
                      ]}
                      style={styles.npkItem}
                    >
                      <Text style={styles.npkLabel}>K</Text>
                      <Text style={styles.npkValue}>{batch.npk.potassium}%</Text>
                      <Text style={styles.npkDescription}>Potassium</Text>
                    </LinearGradient>

                  </View>
                </View>


                {/* Stock & Price */}
                <View style={styles.priceSection}>

                  <View style={styles.stockContainer}>
                    <Text style={styles.stockLabel}>Available Stock</Text>

                    <View style={styles.stockBar}>
                      <LinearGradient
                        colors={[COLORS.primary_2, COLORS.accent]}
                        style={[
                          styles.stockFill, 
                          { width: `${Math.min(100, (batch.quantity / 100) * 100)}%` }
                        ]}
                      />
                    </View>

                    <Text style={styles.stockValue}>{batch.quantity} kg</Text>
                  </View>

                  <LinearGradient
                    colors={[COLORS.primary_2, COLORS.dark]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.priceTag}
                  >
                    <Text style={styles.priceValue}>${batch.price}/kg</Text>
                    <Text style={styles.priceSubtext}>Premium Quality</Text>
                  </LinearGradient>

                </View>


                {/* Certifications */}
                <View style={styles.certificationsSection}>
                  <Text style={styles.certificationsLabel}>Quality Certifications</Text>

                  <View style={styles.certifications}>
                    {batch.certifications.map((cert, index) => (
                      <LinearGradient
                        key={index}
                        colors={[COLORS.white, COLORS.mediumGray]}
                        style={styles.certBadge}
                      >
                        <MaterialCommunityIcons 
                          name="check-decagram" 
                          size={16} 
                          color={COLORS.primary_2}
                        />
                        <Text style={styles.certText}>{cert}</Text>
                      </LinearGradient>
                    ))}
                  </View>
                </View>


                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.editButton}>
                    <LinearGradient
                      colors={[COLORS.white, COLORS.lightGray]}
                      style={styles.editButtonBackground}
                    >
                      <MaterialCommunityIcons name="pencil" size={18} color={COLORS.primary_2} />
                      <Text style={styles.editButtonText}>Edit Batch</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

              </View>
            </LinearGradient>

          </View>
        ))}
      </ScrollView>

    </View>


    {/* Add Compost Modal */}
    <AddCompostBatchModal 
      visible={showAddModal} 
      onClose={() => setShowAddModal(false)} 
      onAdd={addCompostBatch} 
    />

  </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
     marginBottom: 70
  },
  backgroundPattern: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
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
    letterSpacing: 0.3,
  },
  addButton: {
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 20,
  },
  productCardContainer: {
    marginBottom: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  productCard: {
    borderRadius: 24,
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  productImageContainer: {
    padding: 0,
  },
  productImage: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    position: 'relative',
  },
  sproutIconContainer: {
    backgroundColor: COLORS.primary + '80',
    padding: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  organicBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary_2,
  },
  organicBadgeText: {
    color: COLORS.dark,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  productInfo: {
    padding: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  productTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  productType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.tertiary,
    lineHeight: 18,
  },
  heartButton: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  qualitySection: {
    marginBottom: 20,
  },
  qualityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
  },
  npkValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  npkItem: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  npkLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  npkValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  npkDescription: {
    fontSize: 10,
    color: COLORS.tertiary,
    marginTop: 2,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  stockContainer: {
    flex: 1,
  },
  stockLabel: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 8,
  },
  stockBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  stockFill: {
    height: '100%',
    borderRadius: 3,
  },
  stockValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  priceTag: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: COLORS.primary_2,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  priceSubtext: {
    fontSize: 10,
    color: COLORS.primary,
    opacity: 0.9,
    marginTop: 2,
  },
  certificationsSection: {
    marginBottom: 20,
  },
  certificationsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
  },
  certifications: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  certBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  certText: {
    fontSize: 12,
    color: COLORS.dark,
    marginLeft: 4,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  editButton: {
    flex: 1,
  },
  editButtonBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary_2,
    marginLeft: 8,
  },
})