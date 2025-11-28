import { useState } from "react"
import { View, Modal, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../../colors"

export default function AddCompostBatchModal({ visible, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    quantity: "",
    price: "",
    certifications: "",
  })

  const handleSubmit = () => {
    if (!formData.type || !formData.description || !formData.quantity || !formData.price) {
      alert("Please fill in all required fields")
      return
    }

    const newBatch = {
      type: formData.type,
      description: formData.description,
      npk: {
        nitrogen: Number.parseFloat(formData.nitrogen) || 0,
        phosphorus: Number.parseFloat(formData.phosphorus) || 0,
        potassium: Number.parseFloat(formData.potassium) || 0,
      },
      quantity: Number.parseInt(formData.quantity),
      price: Number.parseFloat(formData.price),
      certifications: formData.certifications.split(",").map((c) => c.trim()),
    }

    onAdd(newBatch)
    alert("Compost batch added successfully!")
    setFormData({
      type: "",
      description: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      quantity: "",
      price: "",
      certifications: "",
    })
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Enhanced Header with Gradient */}
        <LinearGradient
          colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <MaterialCommunityIcons name="sprout" size={28} color={COLORS.primary} />
            <Text style={styles.headerTitle}>New Compost Batch</Text>
          </View>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        {/* Background Pattern */}
        <View style={styles.backgroundPattern}>
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* Compost Type */}
            <View style={styles.inputSection}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="tag-outline" size={16} color={COLORS.dark} />
                <Text style={styles.label}>Compost Type</Text>
                <Text style={styles.required}> *</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="e.g., Premium Organic, Standard Blend"
                value={formData.type}
                onChangeText={(text) => setFormData({ ...formData, type: text })}
                placeholderTextColor={COLORS.tertiary}
              />
            </View>

            {/* Description */}
            <View style={styles.inputSection}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="text-box-outline" size={16} color={COLORS.dark} />
                <Text style={styles.label}>Product Description</Text>
                <Text style={styles.required}> *</Text>
              </View>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe the quality, source materials, and benefits of your compost..."
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                multiline
                numberOfLines={4}
                placeholderTextColor={COLORS.tertiary}
              />
            </View>

            {/* NPK Values */}
            <View style={styles.inputSection}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="chart-bar" size={16} color={COLORS.dark} />
                <Text style={styles.label}>Nutrient Profile (NPK)</Text>
              </View>
              <Text style={styles.sectionSubtitle}>Percentage values for Nitrogen, Phosphorus, Potassium</Text>
              <View style={styles.npkInputsContainer}>
                <View style={styles.npkInputWrapper}>
                  <LinearGradient
                    colors={['rgba(240, 234, 210, 0.3)', 'rgba(205, 190, 130, 0.2)']}
                    style={styles.npkInputGradient}
                  >
                    <Text style={styles.npkLabel}>N</Text>
                    <TextInput
                      style={styles.npkInput}
                      placeholder="0.0"
                      value={formData.nitrogen}
                      onChangeText={(text) => setFormData({ ...formData, nitrogen: text })}
                      keyboardType="decimal-pad"
                      placeholderTextColor={COLORS.tertiary}
                    />
                    <Text style={styles.npkUnit}>%</Text>
                  </LinearGradient>
                </View>
                <View style={styles.npkInputWrapper}>
                  <LinearGradient
                    colors={['rgba(221, 229, 182, 0.3)', 'rgba(173, 193, 120, 0.2)']}
                    style={styles.npkInputGradient}
                  >
                    <Text style={styles.npkLabel}>P</Text>
                    <TextInput
                      style={styles.npkInput}
                      placeholder="0.0"
                      value={formData.phosphorus}
                      onChangeText={(text) => setFormData({ ...formData, phosphorus: text })}
                      keyboardType="decimal-pad"
                      placeholderTextColor={COLORS.tertiary}
                    />
                    <Text style={styles.npkUnit}>%</Text>
                  </LinearGradient>
                </View>
                <View style={styles.npkInputWrapper}>
                  <LinearGradient
                    colors={['rgba(169, 132, 103, 0.3)', 'rgba(108, 88, 76, 0.2)']}
                    style={styles.npkInputGradient}
                  >
                    <Text style={styles.npkLabel}>K</Text>
                    <TextInput
                      style={styles.npkInput}
                      placeholder="0.0"
                      value={formData.potassium}
                      onChangeText={(text) => setFormData({ ...formData, potassium: text })}
                      keyboardType="decimal-pad"
                      placeholderTextColor={COLORS.tertiary}
                    />
                    <Text style={styles.npkUnit}>%</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>

            {/* Quantity & Price Row */}
            <View style={styles.rowContainer}>
              <View style={[styles.inputSection, styles.flex1]}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="scale" size={16} color={COLORS.dark} />
                  <Text style={styles.label}>Quantity</Text>
                  <Text style={styles.required}> *</Text>
                </View>
                <View style={styles.quantityInputContainer}>
                  <TextInput
                    style={styles.quantityInput}
                    placeholder="0"
                    value={formData.quantity}
                    onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                    keyboardType="decimal-pad"
                    placeholderTextColor={COLORS.tertiary}
                  />
                  <Text style={styles.quantityUnit}>kg</Text>
                </View>
              </View>

              <View style={[styles.inputSection, styles.flex1]}>
                <View style={styles.labelContainer}>
                  <MaterialCommunityIcons name="currency-usd" size={16} color={COLORS.dark} />
                  <Text style={styles.label}>Price</Text>
                  <Text style={styles.required}> *</Text>
                </View>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="0.00"
                    value={formData.price}
                    onChangeText={(text) => setFormData({ ...formData, price: text })}
                    keyboardType="decimal-pad"
                    placeholderTextColor={COLORS.tertiary}
                  />
                  <Text style={styles.priceUnit}>/kg</Text>
                </View>
              </View>
            </View>

            {/* Certifications */}
            <View style={styles.inputSection}>
              <View style={styles.labelContainer}>
                <MaterialCommunityIcons name="certificate" size={16} color={COLORS.dark} />
                <Text style={styles.label}>Certifications</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Organic, Biodegradable, ISO Certified, etc."
                value={formData.certifications}
                onChangeText={(text) => setFormData({ ...formData, certifications: text })}
                placeholderTextColor={COLORS.tertiary}
              />
              <View style={styles.hintContainer}>
                <MaterialCommunityIcons name="information-outline" size={14} color={COLORS.primary_2} />
                <Text style={styles.hint}>Separate multiple certifications with commas</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Enhanced Submit Button */}
        <View style={styles.footer}>
          <LinearGradient
            colors={['rgba(205, 190, 130, 1)', 'rgba(108, 88, 76, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitButton}
          >
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButtonContent}>
              <MaterialCommunityIcons name="leaf" size={24} color={COLORS.primary} />
              <Text style={styles.submitButtonText}>Create Compost Batch</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 40,
  },
  backgroundPattern: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.dark,
  },
  required: {
    fontSize: 15,
    fontWeight: "600",
    color: '#E53E3E',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    color: COLORS.dark,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  textArea: {
    textAlignVertical: "top",
    paddingTop: 16,
    height: 100,
    lineHeight: 20,
  },
  npkInputsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  npkInputWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  npkInputGradient: {
    padding: 16,
    alignItems: 'center',
  },
  npkLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 8,
  },
  npkInput: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
    textAlign: 'center',
    width: '100%',
    padding: 0,
  },
  npkUnit: {
    fontSize: 12,
    color: COLORS.tertiary,
    marginTop: 4,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  quantityInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    paddingVertical: 16,
  },
  quantityUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '500',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    paddingVertical: 16,
  },
  priceUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '500',
    marginLeft: 4,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  hint: {
    fontSize: 12,
    color: COLORS.primary_2,
    fontStyle: 'italic',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
  },
  submitButton: {
    borderRadius: 20,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    gap: 12,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
})
