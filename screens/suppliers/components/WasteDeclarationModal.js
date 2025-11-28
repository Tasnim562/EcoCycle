import { useState } from "react"
import { View, Modal, ScrollView, StyleSheet, TouchableOpacity, Text, TextInput, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../../colors"

const WASTE_TYPES = [
  {
    id: "organic_food",
    name: "Organic Food Waste",
    icon: "leaf",
    color: COLORS.primary_2,
    items: ["Vegetable scraps", "Fruit peels", "Leftover meals", "Egg shells", "Coffee grounds"],
  },
  {
    id: "carbon_rich",
    name: "Carbon-Rich Organic Waste",
    icon: "package",
    color: COLORS.secondary,
    items: ["Cardboard boxes", "Paper packaging", "Biodegradable fibers", "Wood chips", "Straw"],
  },
]

const WasteDeclarationModal = ({ visible, onClose, onDeclare }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [weight, setWeight] = useState("")
  const [location, setLocation] = useState("")
  const [notes, setNotes] = useState("")

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId)
    setSelectedItems([])
    setCurrentStep(2)
  }

  const handleItemToggle = (item) => {
    setSelectedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const handleNext = () => {
    if (currentStep === 2 && selectedItems.length === 0) {
      Alert.alert("Error", "Please select at least one item")
      return
    }
    if (currentStep === 3 && !weight) {
      Alert.alert("Error", "Please enter weight")
      return
    }
    setCurrentStep(currentStep + 1)
  }

  const handleDeclare = () => {
    if (!location) {
      Alert.alert("Error", "Please enter location")
      return
    }

    const wasteType = WASTE_TYPES.find((t) => t.id === selectedType)
    onDeclare({
      type: selectedType,
      items: selectedItems,
      weight: Number.parseFloat(weight),
      location,
      notes,
    })

    // Reset form
    setCurrentStep(1)
    setSelectedType(null)
    setSelectedItems([])
    setWeight("")
    setLocation("")
    setNotes("")
  }

  const handleClose = () => {
    setCurrentStep(1)
    setSelectedType(null)
    setSelectedItems([])
    setWeight("")
    setLocation("")
    setNotes("")
    onClose()
  }

  const currentWasteType = WASTE_TYPES.find((t) => t.id === selectedType)

  return (
    <Modal visible={visible}  animationType="slide" onRequestClose={handleClose}>
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary_2, COLORS.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <MaterialCommunityIcon name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Declare Waste</Text>
          <View style={styles.steps}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={[styles.stepDot, { backgroundColor: currentStep >= step ? "white" : "rgba(255,255,255,0.3)" }]}
              />
            ))}
          </View>
        </LinearGradient>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentStep === 1 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Select Waste Type</Text>
              <Text style={styles.stepDescription}>What type of waste are you declaring?</Text>
              {WASTE_TYPES.map((type) => (
                <TouchableOpacity key={type.id} style={styles.typeCard} onPress={() => handleTypeSelect(type.id)}>
                  <View
                    style={type.id === "organic_food" ? styles.typeCardGradient_organic : styles.typeCardGradient_carbon}
                  >
                    <MaterialCommunityIcon name={type.icon} size={32} color="white" />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={styles.typeCardTitle}>{type.name}</Text>
                      <Text style={styles.typeCardDesc}>{type.items.length} common items</Text>
                    </View>
                    <MaterialCommunityIcon name="chevron-right" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {currentStep === 2 && currentWasteType && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Select Items</Text>
              <Text style={styles.stepDescription}>What items are in your {currentWasteType.name.toLowerCase()}?</Text>
              {currentWasteType.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.checkboxItem, selectedItems.includes(item) && styles.checkboxItemSelected]}
                  onPress={() => handleItemToggle(item)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      selectedItems.includes(item) && { backgroundColor: currentWasteType.color },
                    ]}
                  >
                    {selectedItems.includes(item) && <MaterialCommunityIcon name="check" size={16} color="white" />}
                  </View>
                  <Text style={styles.checkboxLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedCount}>
                  {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
                </Text>
              </View>
            </View>
          )}

          {currentStep === 3 && (
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Weight & Details</Text>
              <Text style={styles.stepDescription}>How much waste are you declaring?</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter weight"
                    placeholderTextColor={COLORS.mediumText}
                    keyboardType="decimal-pad"
                    value={weight}
                    onChangeText={setWeight}
                  />
                  <Text style={styles.inputUnit}>kg</Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g., Kitchen Area 1"
                  placeholderTextColor={COLORS.mediumText}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Additional Notes (Optional)</Text>
                <TextInput
                  style={[styles.textInput, styles.textInputMultiline]}
                  placeholder="Any special instructions..."
                  placeholderTextColor={COLORS.mediumText}
                  multiline
                  numberOfLines={3}
                  value={notes}
                  onChangeText={setNotes}
                />
              </View>
            </View>
          )}

          {currentStep === 4 && (
            <View style={styles.stepContent}>
              <MaterialCommunityIcon name="check-circle" size={64} color={COLORS.primary_2} style={styles.confirmIcon} />
              <Text style={styles.confirmTitle}>Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Waste Type:</Text>
                  <Text style={styles.summaryValue}>{currentWasteType?.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Items:</Text>
                  <Text style={styles.summaryValue}>{selectedItems.length} items</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Weight:</Text>
                  <Text style={styles.summaryValue}>{weight} kg</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Location:</Text>
                  <Text style={styles.summaryValue}>{location}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Earning:</Text>
                  <Text style={[styles.summaryValue, { color: COLORS.primary_2, fontWeight: "bold" }]}>+10 points</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          {currentStep > 1 && (
            <>
            <TouchableOpacity
              style={{borderRadius:10 , borderWidth: 1 , padding: 15, alignSelf: "center"}}
              onPress={() => setCurrentStep(currentStep - 1)}
            >
              <MaterialCommunityIcon name="arrow-left" size={16} color="black"  />
            </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, currentStep > 1 && { flex: 1 }]}
            onPress={currentStep === 4 ? handleDeclare : handleNext}
          >
            <Text style={styles.primaryButtonText}>{currentStep === 4 ? "Confirm Declaration" : "Next"}</Text>
          </TouchableOpacity>
          </>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
  },
  closeButton: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  steps: {
    flexDirection: "row",
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.mediumText,
    marginBottom: 20,
  },
  typeCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  typeCardGradient_organic: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#38A169"
  },
  typeCardGradient_carbon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#6C584C"
  },
  typeCardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  typeCardDesc: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.lightAccent,
  },
  checkboxItemSelected: {
    borderColor: COLORS.primary_2,
    backgroundColor: "rgba(173, 193, 120, 0.1)",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.lightAccent,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: COLORS.darkText,
    fontWeight: "500",
  },
  selectedInfo: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "rgba(173, 193, 120, 0.1)",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary_2,
  },
  selectedCount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkText,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkText,
    marginBottom: 8,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightAccent,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: COLORS.background,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.darkText,
  },
  textInputMultiline: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  inputUnit: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.mediumText,
    marginLeft: 8,
  },
  confirmIcon: {
    alignSelf: "center",
    marginBottom: 15,
  },
  confirmTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.darkText,
    textAlign: "center",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightAccent,
  },
  summaryLabel: {
    fontSize: 14,
    color: COLORS.mediumText,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.darkText,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: COLORS.primary_2,
    flex: 1,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a2600ff",
  },
  secondaryButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.lightAccent,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.darkText,
  },
})

export default WasteDeclarationModal
