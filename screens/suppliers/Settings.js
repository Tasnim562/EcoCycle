import { useContext, useState } from "react"
import { View, ScrollView, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Switch, Alert } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Icon from "react-native-vector-icons/Ionicons"
import { COLORS } from "../../colors"
import { SupplierContext } from "../../context/SupplierContext"

const Menu = ({navigation}) => {
  const { supplierData, setSupplierData } = useContext(SupplierContext)
  const [editingField, setEditingField] = useState(null)
  const [tempValue, setTempValue] = useState("")
  const [notifications, setNotifications] = useState({
    pickups: true,
    sales: true,
    marketplace: true,
    promotions: false,
  })

  const handleEditField = (field, currentValue) => {
    setEditingField(field)
    setTempValue(currentValue)
  }

  const handleSaveField = () => {
    setSupplierData({
      ...supplierData,
      [editingField]: tempValue,
    })
    setEditingField(null)
    Alert.alert("Success", "Information updated successfully")
  }

  const menuSections = [
    {
      title: "Profile Information",
      type: "editable",
      items: [
        { icon: "storefront", label: "Restaurant Name", value: supplierData.name, field: "name" },
        { icon: "email", label: "Email Address", value: supplierData.email, field: "email" },
        { icon: "phone", label: "Phone Number", value: supplierData.phone, field: "phone" },
        { icon: "map-marker", label: "Location", value: supplierData.location, field: "location" },
      ]
    },
    {
      title: "Business Analytics",
      type: "readonly",
      items: [
        { icon: "calendar-star", label: "Member Since", value: new Date(supplierData.establishedDate).toLocaleDateString() },
        { icon: "cash-multiple", label: "Total Sales Value", value: `${supplierData.totalSalesValue} DT` },
        { icon: "recycle", label: "Total Waste Declared", value: `${supplierData.totalWasteDeclared} kg` },
        { icon: "leaf", label: "CO₂ Emissions Saved", value: `${Math.round(supplierData.totalWasteDeclared * 2.5)} kg` },
      ]
    },
    {
      title: "Notification Preferences",
      type: "toggle",
      items: [
        { icon: "truck-fast", label: "Pickup Reminders", value: notifications.pickups, field: "pickups" },
        { icon: "chart-line", label: "Sales Updates", value: notifications.sales, field: "sales" },
        { icon: "shopping", label: "Marketplace Deals", value: notifications.marketplace, field: "marketplace" },
        { icon: "gift-outline", label: "Promotions & Offers", value: notifications.promotions, field: "promotions" },
      ]
    },
    {
      title: "Support & Information",
      type: "action",
      items: [
        { icon: "help-circle", label: "Help & Support", action: () => Alert.alert("Help", "Contact support at help@ecocycle.com") },
        { icon: "file-document", label: "Terms & Conditions", action: () => Alert.alert("Terms", "Opening terms and conditions...") },
        { icon: "shield-account", label: "Privacy Policy", action: () => Alert.alert("Privacy", "Opening privacy policy...") },
        { icon: "information", label: "About EcoCycle", action: () => Alert.alert("About", "EcoCycle v2.1.0 - Sustainable Waste Management") },
      ]
    }
  ]

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header */}
      <LinearGradient
        colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTitleRow}>
              <MaterialCommunityIcon name="cog-outline" size={28} color={COLORS.primary} />
              <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <Text style={styles.headerSubtitle}>Manage your account & preferences</Text>
          </View>
          <View style={styles.profileBadge}>
            <MaterialCommunityIcon name="account" size={24} color={COLORS.primary} />
          </View>
        </View>
      </LinearGradient>

      {/* Enhanced Sections */}
      {menuSections.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionDivider} />
          </View>

          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => {
              if (section.type === "editable") {
                return (
                  <EditableField
                    key={itemIndex}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    onEdit={() => handleEditField(item.field, item.value)}
                  />
                )
              } else if (section.type === "readonly") {
                return (
                  <ReadOnlyField
                    key={itemIndex}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                  />
                )
              } else if (section.type === "toggle") {
                return (
                  <ToggleField
                    key={itemIndex}
                    icon={item.icon}
                    label={item.label}
                    value={item.value}
                    onToggle={() => setNotifications({ ...notifications, [item.field]: !item.value })}
                  />
                )
              } else if (section.type === "action") {
                return (
                  <ActionField
                    key={itemIndex}
                    icon={item.icon}
                    label={item.label}
                    onPress={item.action}
                  />
                )
              }
            })}
          </View>
        </View>
      ))}

      {/* Enhanced Logout Button */}
      <View style={styles.logoutSection}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Login')}
        >
          <LinearGradient
            colors={['rgba(255, 107, 107, 0.9)', 'rgba(229, 62, 62, 0.9)']}
            style={styles.logoutGradient}
          >
            <MaterialCommunityIcon name="logout-variant" size={22} color={COLORS.primary} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.versionText}>EcoCycle v2.1.0</Text>
      </View>

      {/* Enhanced Edit Modal */}
      <Modal visible={editingField !== null} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {/* Enhanced Modal Header */}
            <LinearGradient
              colors={['rgba(108, 88, 76, 0.95)', 'rgba(169, 132, 103, 0.95)']}
              style={styles.modalHeader}
            >
              <TouchableOpacity onPress={() => setEditingField(null)} style={styles.modalCloseButton}>
                <MaterialCommunityIcon name="close" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <View style={styles.modalTitleContainer}>
                <MaterialCommunityIcon name="pencil" size={24} color={COLORS.primary} />
                <Text style={styles.modalTitle}>Edit Information</Text>
              </View>
              <View style={styles.modalSpacer} />
            </LinearGradient>

            <View style={styles.modalContent}>
              <Text style={styles.inputLabel}>
                {editingField ? editingField.charAt(0).toUpperCase() + editingField.slice(1) : ''}
              </Text>
              <TextInput
                style={styles.textInput}
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={`Enter ${editingField}`}
                placeholderTextColor={COLORS.tertiary}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.secondaryButton}
                onPress={() => setEditingField(null)}
              >
                <Text style={styles.secondaryButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.primaryButton}
                onPress={handleSaveField}
              >
                <LinearGradient
                  colors={['rgba(205, 190, 130, 0.9)', 'rgba(173, 193, 120, 0.9)']}
                  style={styles.primaryButtonGradient}
                >
                  <Text style={styles.primaryButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

// Enhanced Field Components
const EditableField = ({ icon, label, value, onEdit }) => (
  <TouchableOpacity style={styles.fieldContainer} onPress={onEdit}>
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
      style={styles.fieldContent}
    >
      <View style={styles.fieldLeft}>
        <View style={styles.fieldIconContainer}>
          <MaterialCommunityIcon name={icon} size={20} color={COLORS.primary_2} />
        </View>
        <View style={styles.fieldText}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <Text style={styles.fieldValue}>{value}</Text>
        </View>
      </View>
      <View style={styles.editButton}>
        <MaterialCommunityIcon name="pencil-outline" size={18} color={COLORS.primary_2} />
      </View>
    </LinearGradient>
  </TouchableOpacity>
)

const ReadOnlyField = ({ icon, label, value }) => (
  <View style={styles.fieldContainer}>
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
      style={styles.fieldContent}
    >
      <View style={styles.fieldLeft}>
        <View style={styles.fieldIconContainer}>
          <MaterialCommunityIcon name={icon} size={20} color={COLORS.primary_2} />
        </View>
        <View style={styles.fieldText}>
          <Text style={styles.fieldLabel}>{label}</Text>
          <Text style={styles.fieldValue}>{value}</Text>
        </View>
      </View>
    </LinearGradient>
  </View>
)

const ToggleField = ({ icon, label, value, onToggle }) => (
  <View style={styles.fieldContainer}>
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
      style={styles.fieldContent}
    >
      <View style={styles.fieldLeft}>
        <View style={styles.fieldIconContainer}>
          <MaterialCommunityIcon name={icon} size={20} color={COLORS.primary_2} />
        </View>
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: 'rgba(108, 88, 76, 0.2)', true: 'rgba(173, 193, 120, 0.7)' }}
        thumbColor={value ? COLORS.primary_2 : COLORS.mediumGray}
      />
    </LinearGradient>
  </View>
)

const ActionField = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.fieldContainer} onPress={onPress}>
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.9)', 'rgba(245, 245, 245, 0.9)']}
      style={styles.fieldContent}
    >
      <View style={styles.fieldLeft}>
        <View style={styles.fieldIconContainer}>
          <MaterialCommunityIcon name={icon} size={20} color={COLORS.primary_2} />
        </View>
        <Text style={styles.fieldLabel}>{label}</Text>
      </View>
      <MaterialCommunityIcon name="chevron-right" size={20} color={COLORS.primary_2} />
    </LinearGradient>
  </TouchableOpacity>
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
  headerTextContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.primary,
    opacity: 0.9,
  },
  profileBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary + '40',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary + '60',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.dark,
    marginBottom: 8,
  },
  sectionDivider: {
    height: 2,
    backgroundColor: COLORS.mediumGray,
    borderRadius: 1,
  },
  sectionContent: {
    gap: 8,
  },
  fieldContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  fieldContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  fieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  fieldIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  fieldText: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    color: COLORS.tertiary,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(205, 190, 130, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(205, 190, 130, 0.3)',
  },
  logoutSection: {
    marginTop: 32,
    marginBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoutButton: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoutGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.primary,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.tertiary,
    textAlign: 'center',
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
    padding: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: 12,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.dark,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 16,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: COLORS.mediumGray,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.dark,
    textAlign: 'center',
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
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary,
  },
})

export default Menu
