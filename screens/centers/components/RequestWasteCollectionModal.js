import { useState } from "react"
import { View, Modal, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { COLORS } from "../../../colors"

export default function RequestWasteCollectionModal({ visible, onClose }) {
  const [wasteType, setWasteType] = useState("organic_food")
  const [quantity, setQuantity] = useState("")
  const [deadline, setDeadline] = useState("")
  const [notes, setNotes] = useState("")

  const wasteTypes = [
    { 
      id: "organic_food", 
      label: "Organic Food Waste", 
      icon: "leaf",
      description: "Fruits, vegetables, food scraps",
      gradient: ['rgba(173, 193, 120, 0.9)', 'rgba(205, 190, 130, 0.9)']
    },
    { 
      id: "carbon_rich", 
      label: "Carbon-Rich Material", 
      icon: "package-variant",
      description: "Dry leaves, paper, cardboard",
      gradient: ['rgba(169, 132, 103, 0.9)', 'rgba(108, 88, 76, 0.9)']
    },
  ]

  const handleSubmit = () => {
    if (!quantity || !deadline) {
      alert("Please fill in all required fields")
      return
    }
    alert("Waste collection request created successfully!")
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Enhanced Header */}
        <LinearGradient
          colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
          style={styles.header}
        >
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <MaterialCommunityIcons name="truck-plus" size={28} color={COLORS.primary} />
            <Text style={styles.headerTitle}>Request Waste Collection</Text>
          </View>
          <View style={styles.headerSpacer} />
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Waste Type Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="recycle" size={20} color={COLORS.dark} />
              <Text style={styles.sectionLabel}>Select Waste Type</Text>
            </View>
            <Text style={styles.sectionDescription}>Choose the type of waste you need collected</Text>
            
            <View style={styles.typeCardsContainer}>
              {wasteTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeCard,
                    wasteType === type.id && styles.typeCardActive
                  ]}
                  onPress={() => setWasteType(type.id)}
                >
                  <LinearGradient
                    colors={wasteType === type.id ? type.gradient : ['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
                    style={styles.typeCardGradient}
                  >
                    <View style={styles.typeCardHeader}>
                      <View style={[
                        styles.typeIconContainer,
                        wasteType === type.id && styles.typeIconContainerActive
                      ]}>
                        <MaterialCommunityIcons
                          name={type.icon}
                          size={24}
                          color={wasteType === type.id ? COLORS.primary : COLORS.primary_2}
                        />
                      </View>
                      <MaterialCommunityIcons
                        name={wasteType === type.id ? "check-circle" : "circle-outline"}
                        size={20}
                        color={wasteType === type.id ? COLORS.primary : COLORS.mediumGray}
                      />
                    </View>
                    
                    <Text style={[
                      styles.typeLabel,
                      wasteType === type.id && styles.typeLabelActive
                    ]}>
                      {type.label}
                    </Text>
                    
                    <Text style={[
                      styles.typeDescription,
                      wasteType === type.id && styles.typeDescriptionActive
                    ]}>
                      {type.description}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Input */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="scale" size={20} color={COLORS.dark} />
              <Text style={styles.sectionLabel}>Quantity</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <View style={styles.quantityInputContainer}>
              <TextInput
                style={styles.quantityInput}
                placeholder="Enter quantity in kilograms"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="decimal-pad"
                placeholderTextColor={COLORS.tertiary}
              />
              <Text style={styles.quantityUnit}>kg</Text>
            </View>
          </View>

          {/* Delivery Deadline */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="calendar-clock" size={20} color={COLORS.dark} />
              <Text style={styles.sectionLabel}>Delivery Deadline</Text>
              <Text style={styles.required}> *</Text>
            </View>
            <Text style={styles.sectionDescription}>When do you need this collected by?</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Within 2 days, By Friday, etc."
              value={deadline}
              onChangeText={setDeadline}
              placeholderTextColor={COLORS.tertiary}
            />
          </View>

          {/* Additional Notes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="note-text" size={20} color={COLORS.dark} />
              <Text style={styles.sectionLabel}>Additional Notes</Text>
            </View>
            <Text style={styles.sectionDescription}>Any special instructions for collection</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add any special instructions, location details, or notes for the collector..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              placeholderTextColor={COLORS.tertiary}
            />
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <MaterialCommunityIcons name="information-outline" size={18} color={COLORS.primary_2} />
            <Text style={styles.infoText}>
              Our team will contact you within 24 hours to confirm collection details and schedule pickup.
            </Text>
          </View>
        </ScrollView>

        {/* Enhanced Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <LinearGradient
              colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
              style={styles.submitButtonGradient}
            >
              <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.primary} />
              <Text style={styles.submitButtonText}>Submit Collection Request</Text>
              <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.primary} />
            </LinearGradient>
          </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  required: {
    fontSize: 16,
    fontWeight: "600",
    color: '#E53E3E',
  },
  sectionDescription: {
    fontSize: 14,
    color: COLORS.tertiary,
    marginBottom: 16,
    lineHeight: 18,
  },
  typeCardsContainer: {
    gap: 12,
  },
  typeCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  typeCardActive: {
    borderColor: COLORS.primary_2,
    shadowColor: COLORS.primary_2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  typeCardGradient: {
    padding: 20,
  },
  typeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  typeIconContainerActive: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary_2,
  },
  typeLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
    marginBottom: 4,
  },
  typeLabelActive: {
    color: COLORS.primary,
  },
  typeDescription: {
    fontSize: 14,
    color: COLORS.tertiary,
    lineHeight: 18,
  },
  typeDescriptionActive: {
    color: COLORS.primary,
    opacity: 0.9,
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
    fontWeight: "500",
    color: COLORS.dark,
    paddingVertical: 16,
  },
  quantityUnit: {
    fontSize: 14,
    color: COLORS.tertiary,
    fontWeight: '600',
    marginLeft: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
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
    height: 120,
    lineHeight: 20,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(205, 190, 130, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
    gap: 12,
    marginTop: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.primary_2,
    lineHeight: 18,
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
    overflow: 'hidden',
    shadowColor: COLORS.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonGradient: {
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