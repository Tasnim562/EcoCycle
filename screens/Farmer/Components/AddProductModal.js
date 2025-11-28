import { useState } from "react"
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Slider from "@react-native-community/slider"
import { COLORS } from "../../../colors"

const { width, height } = Dimensions.get("window")

const PRODUCT_CATEGORIES = [
  { id: "tomato", name: "Tomatoes", icon: "food-turkey", emoji: "🍅", color: '#FF6B6B' },
  { id: "lettuce", name: "Lettuce", icon: "leaf", emoji: "🥬", color: '#4CAF50' },
  { id: "carrot", name: "Carrots", icon: "carrot", emoji: "🥕", color: '#FF9800' },
  { id: "orange", name: "Oranges", icon: "fruit-citrus", emoji: "🍊", color: '#FFA726' },
  { id: "apple", name: "Apples", icon: "fruit-pineapple", emoji: "🍎", color: '#EF5350' },
  { id: "pepper", name: "Peppers", icon: "pepper", emoji: "🫑", color: '#66BB6A' },
  { id: "cucumber", name: "Cucumbers", icon: "cucumber", emoji: "🥒", color: '#81C784' },
  { id: "potato", name: "Potatoes", icon: "french-fries", emoji: "🥔", color: '#8D6E63' },
]

export default function AddProductModal({ visible, onClose, onAdd }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: null,
    name: "",
    image: null,
    quantity: 10,
    price: 1.0,
    description: "",
  })

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category })
  }

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    if (formData.category && formData.quantity > 0 && formData.price > 0) {
      onAdd({
        category: formData.category,
        name: PRODUCT_CATEGORIES.find((c) => c.id === formData.category)?.name || "Product",
        quantity: formData.quantity,
        price: formData.price,
        description: formData.description,
        image: formData.image,
      })
      resetForm()
    }
  }

  const resetForm = () => {
    setFormData({
      category: null,
      name: "",
      image: null,
      quantity: 10,
      price: 1.0,
      description: "",
    })
    setStep(1)
  }

  const getStepTitles = () => {
    const titles = ["Select Category", "Add Photos", "Quantity", "Set Price", "Review"]
    return titles.map((title, index) => ({
      title,
      number: index + 1,
      active: step === index + 1,
      completed: step > index + 1
    }))
  }

  const updateQuantity = (change) => {
    const newQuantity = Math.max(1, Math.min(500, formData.quantity + change))
    setFormData({ ...formData, quantity: newQuantity })
  }

  const updatePrice = (change) => {
    const newPrice = Math.max(0.5, Math.min(20, Number((formData.price + change).toFixed(2))))
    setFormData({ ...formData, price: newPrice })
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle_1}>Select Product Category</Text>
              <Text style={styles.stepDescription}>Choose the type of produce you want to sell</Text>
            </View>
            
            <View style={styles.categoriesGrid}>
              {PRODUCT_CATEGORIES.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryCardContainer}
                  onPress={() => handleCategorySelect(item.id)}
                >
                  <LinearGradient
                    colors={formData.category === item.id ? 
                      ['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)'] : 
                      ['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                    style={[
                      styles.categoryCard,
                      formData.category === item.id && styles.categoryCardActive
                    ]}
                  >
                    <View style={styles.categoryIconContainer}>
                      <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                    </View>
                    <Text style={[
                      styles.categoryName,
                      formData.category === item.id && styles.categoryNameActive
                    ]}>
                      {item.name}
                    </Text>
                    {formData.category === item.id && (
                      <View style={styles.selectedIndicator}>
                        <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.primary} />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )

      case 2:
        return (
          <View style={styles.stepContainer_1}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Add Product Photos</Text>
              <Text style={styles.stepDescription}>Showcase your fresh, high-quality produce</Text>
            </View>
            
            <View style={styles.photoSection}>
              <LinearGradient
                colors={['rgba(240, 234, 210, 0.5)', 'rgba(221, 229, 182, 0.3)']}
                style={styles.photoPlaceholder}
              >
                <MaterialCommunityIcons name="camera-plus" size={48} color={COLORS.primary_2} />
                <Text style={styles.photoPlaceholderText}>Add Product Photos</Text>
                <Text style={styles.photoPlaceholderSubtext}>High-quality images help sell faster</Text>
              </LinearGradient>
              
              <View style={styles.photoButtons}>
                <TouchableOpacity style={styles.photoButton}>
                  <LinearGradient
                    colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                    style={styles.photoButtonGradient}
                  >
                    <MaterialCommunityIcons name="camera" size={24} color={COLORS.primary} />
                    <Text style={styles.photoButtonText}>Take Photo</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.photoButton}>
                  <LinearGradient
                    colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
                    style={styles.photoButtonGradient}
                  >
                    <MaterialCommunityIcons name="image" size={24} color={COLORS.primary} />
                    <Text style={styles.photoButtonText}>Upload Photo</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )

      case 3:
        return (
          <View style={styles.stepContainer_1}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Set Quantity Available</Text>
              <Text style={styles.stepDescription}>How many kilograms are you selling?</Text>
            </View>
            
            <View style={styles.quantitySection}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.quantityCard}
              >
                <View style={styles.quantityHeader}>
                  <MaterialCommunityIcons name="scale" size={24} color={COLORS.primary_2} />
                  <Text style={styles.quantityLabel}>Total Weight Available</Text>
                </View>
                
                <View style={styles.quantityInputContainer}>
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(-1)}
                  >
                    <LinearGradient
                      colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
                      style={styles.quantityButtonGradient}
                    >
                      <MaterialCommunityIcons name="minus" size={24} color={COLORS.primary} />
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <View style={styles.quantityDisplay}>
                    <Text style={styles.quantityValue}>{Math.round(formData.quantity)}</Text>
                    <Text style={styles.quantityUnit}>kilograms</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(1)}
                  >
                    <LinearGradient
                      colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                      style={styles.quantityButtonGradient}
                    >
                      <MaterialCommunityIcons name="plus" size={24} color={COLORS.primary} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Adjust quantity: 1kg - 500kg</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={500}
                    step={1}
                    value={formData.quantity}
                    onValueChange={(value) => setFormData({ ...formData, quantity: value })}
                    minimumTrackTintColor={COLORS.primary_2}
                    maximumTrackTintColor={COLORS.lightGray}
                    thumbTintColor={COLORS.primary_2}
                  />
                </View>
              </LinearGradient>
            </View>
          </View>
        )

      case 4:
        return (
          <View style={styles.stepContainer_1}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Set Your Price</Text>
              <Text style={styles.stepDescription}>Price per kilogram (DT)</Text>
            </View>
            
            <View style={styles.priceSection}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                style={styles.priceCard}
              >
                <View style={styles.priceHeader}>
                  <MaterialCommunityIcons name="cash" size={24} color={COLORS.primary_2} />
                  <Text style={styles.priceLabel}>Price per Kilogram</Text>
                </View>
                
                <View style={styles.priceInputContainer}>
                  <TouchableOpacity 
                    style={styles.priceButton}
                    onPress={() => updatePrice(-0.1)}
                  >
                    <LinearGradient
                      colors={['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']}
                      style={styles.priceButtonGradient}
                    >
                      <MaterialCommunityIcons name="minus" size={20} color={COLORS.primary} />
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <View style={styles.priceDisplay}>
                    <Text style={styles.priceValue}>{formData.price.toFixed(2)}</Text>
                    <Text style={styles.priceUnit}>DT / kg</Text>
                  </View>
                  
                  <TouchableOpacity 
                    style={styles.priceButton}
                    onPress={() => updatePrice(0.1)}
                  >
                    <LinearGradient
                      colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                      style={styles.priceButtonGradient}
                    >
                      <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.sliderContainer}>
                  <Text style={styles.sliderLabel}>Adjust price: 0.5 DT - 20 DT</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0.5}
                    maximumValue={20}
                    step={0.1}
                    value={formData.price}
                    onValueChange={(value) => setFormData({ ...formData, price: value })}
                    minimumTrackTintColor={COLORS.primary_2}
                    maximumTrackTintColor={COLORS.lightGray}
                    thumbTintColor={COLORS.primary_2}
                  />
                </View>
                
                <View style={styles.totalPreview}>
                  <Text style={styles.totalLabel}>Total Value:</Text>
                  <Text style={styles.totalValue}>
                    {(formData.quantity * formData.price).toFixed(2)} DT
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </View>
        )

      case 5:
        const selectedCategory = PRODUCT_CATEGORIES.find((c) => c.id === formData.category)
        return (
          <View style={styles.stepContainer_1}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepTitle}>Review Your Listing</Text>
              <Text style={styles.stepDescription}>Confirm your product details</Text>
            </View>
            
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
              style={styles.summaryCard}
            >
              <View style={styles.summaryHeader}>
                <View style={styles.summaryImage}>
                  <Text style={styles.summaryEmoji}>{selectedCategory?.emoji}</Text>
                </View>
                <View style={styles.summaryTitle}>
                  <Text style={styles.summaryProductName}>{selectedCategory?.name}</Text>
                  <Text style={styles.summaryCategory}>Fresh Produce</Text>
                </View>
              </View>
              
              <View style={styles.summaryDetails}>
                <SummaryRow icon="scale" label="Quantity" value={`${Math.round(formData.quantity)} kg`} />
                <SummaryRow icon="cash" label="Price per kg" value={`${formData.price.toFixed(2)} DT`} />
                <SummaryRow icon="calculator" label="Total Value" value={`${(formData.quantity * formData.price).toFixed(2)} DT`} />
                <SummaryRow icon="calendar" label="Listed Date" value={new Date().toLocaleDateString()} />
              </View>
              
              <View style={styles.earningsPreview}>
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.1)', 'rgba(173, 193, 120, 0.05)']}
                  style={styles.earningsContainer}
                >
                  <MaterialCommunityIcons name="trending-up" size={24} color={COLORS.primary_2} />
                  <View style={styles.earningsText}>
                    <Text style={styles.earningsLabel}>Potential Earnings</Text>
                    <Text style={styles.earningsValue}>{(formData.quantity * formData.price).toFixed(2)} DT</Text>
                  </View>
                </LinearGradient>
              </View>
            </LinearGradient>
          </View>
        )

      default:
        return null
    }
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.modal}>
          {/* Enhanced Header */}
          <LinearGradient
            colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
            style={styles.header}
          >
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={20} color={COLORS.primary} />
            </TouchableOpacity>
            
            <View style={styles.headerContent}>
              <View style={styles.headerTitleContainer}>
                <MaterialCommunityIcons name="basket" size={28} color={COLORS.primary} />
                <Text style={styles.headerTitle}>Sell Your Produce</Text>
              </View>
              
              {/* Fixed Progress Steps */}
              <View style={styles.progressContainer}>
                {getStepTitles().map((stepItem, index) => (
                  <View key={stepItem.number} style={styles.stepContainer}>
                    {/* Step Line */}
                    {index > 0 && (
                      <View 
                        style={[
                          styles.stepLine,
                          stepItem.completed && styles.stepLineCompleted
                        ]} 
                      />
                    )}
                    
                    {/* Step Circle */}
                    <View style={styles.stepCircleContainer}>
                      <LinearGradient
                        colors={stepItem.active || stepItem.completed ? 
                          ['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)'] : 
                          ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.2)']}
                        style={styles.stepCircle}
                      >
                        {stepItem.completed ? (
                          <MaterialCommunityIcons name="check" size={14} color={COLORS.primary} />
                        ) : (
                          <Text style={[
                            styles.stepNumber,
                            (stepItem.active || stepItem.completed) && styles.stepNumberActive
                          ]}>
                            {stepItem.number}
                          </Text>
                        )}
                      </LinearGradient>
                    </View>
                    
                    {/* Step Title */}
                    <Text style={[
                      styles.stepTitle,
                      stepItem.active && styles.stepTitleActive,
                      stepItem.completed && styles.stepTitleCompleted
                    ]}>
                      {stepItem.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {renderStep()}
          </ScrollView>

          {/* Enhanced Footer */}
          <View style={styles.footer}>
            {step > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
              >
                <MaterialCommunityIcons name="arrow-left" size={20} color={COLORS.dark} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            {step === 5 ? (
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleSubmit}
              >
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                  style={styles.primaryButtonGradient}
                >
                  <MaterialCommunityIcons name="check-circle" size={22} color={COLORS.primary} />
                  <Text style={styles.primaryButtonText}>Confirm Product</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  !formData.category && step === 1 && styles.buttonDisabled
                ]}
                onPress={handleNext}
                disabled={!formData.category && step === 1}
              >
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>
                    Continue to {getStepTitles()[step]?.title}
                  </Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.primary} />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const SummaryRow = ({ icon, label, value }) => (
  <View style={styles.summaryRow}>
    <View style={styles.summaryLabelContainer}>
      <MaterialCommunityIcons name={icon} size={18} color={COLORS.primary_2} />
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
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
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 234, 210, 0.3)',
  },
  closeButton: {
    position: "absolute" , 
    top: 20 , left : 20 ,
    padding: 8,
    backgroundColor: COLORS.primary + '40',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '60',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
    marginTop: 15
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    position: 'relative',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
    zIndex: 2,
  },
  stepContainer_1: {
    flex: 1,
  },
  stepLine: {
    position: 'absolute',
    top: 18,
    left: -20,
    right: -20,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1,
  },
  stepLineCompleted: {
    backgroundColor: COLORS.primary,
  },
  stepCircleContainer: {
    marginBottom: 8,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '40',
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  stepNumberActive: {
    color: COLORS.primary,
  },
  stepTitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 12,
  },
  stepTitle_1: {
    fontSize: 10,
    color: 'rgba(101, 101, 101, 0.6)',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 12,
  },
  stepTitleActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  stepTitleCompleted: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  stepHeader: {
    marginBottom: 24,
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.tertiary,
    lineHeight: 22,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCardContainer: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  categoryCard: {
    padding: 16,
    alignItems: 'center',
    position: 'relative',
  },
  categoryCardActive: {
    borderColor: COLORS.primary_2,
    shadowColor: COLORS.primary_2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.dark,
    textAlign: 'center',
  },
  categoryNameActive: {
    color: COLORS.primary,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  photoSection: {
    gap: 20,
  },
  photoPlaceholder: {
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.dark,
    marginTop: 12,
    marginBottom: 4,
  },
  photoPlaceholderSubtext: {
    fontSize: 14,
    color: COLORS.tertiary,
    textAlign: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  quantitySection: {
    gap: 16,
  },
  quantityCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  quantityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quantityButton: {
    width: 50,
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quantityButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityDisplay: {
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  quantityUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginTop: 4,
  },
  sliderContainer: {
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    height: 40,
  },
  priceSection: {
    gap: 16,
  },
  priceCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    overflow: 'hidden',
  },
  priceButtonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceDisplay: {
    alignItems: 'center',
  },
  priceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  priceUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginTop: 4,
  },
  totalPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary_2,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  summaryImage: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: 'rgba(240, 234, 210, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  summaryEmoji: {
    fontSize: 28,
  },
  summaryTitle: {
    flex: 1,
  },
  summaryProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 4,
  },
  summaryCategory: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  summaryDetails: {
    gap: 12,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tertiary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  earningsPreview: {
    marginTop: 8,
  },
  earningsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  earningsText: {
    flex: 1,
  },
  earningsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tertiary,
    marginBottom: 2,
  },
  earningsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary_2,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    gap: 8,
    minWidth: 100,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
  },
  primaryButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})