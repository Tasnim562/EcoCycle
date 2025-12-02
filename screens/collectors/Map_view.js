import { useContext, useEffect, useState } from "react"
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Modal, ScrollView , Platform , PermissionsAndroid, Dimensions, TextInput  } from "react-native"
import MapView, { Marker } from "react-native-maps"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { NGOContext } from "../../context/NGOContext"
import { COLORS } from "../../colors"
import LinearGradient from "react-native-linear-gradient"
import Geolocation from '@react-native-community/geolocation';

const { width } = Dimensions.get('window')

const Map_view = ({ navigation }) => {
  const { compostingCenters, suppliers } = useContext(NGOContext)
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [markerDetailsModal, setMarkerDetailsModal] = useState(false)
  const [filter_centers, setfilter_centers] = useState(true)
  const [filter_supplier, setfilter_supplier] = useState(true)

  const initialRegion = { // needs to be chnaged to the current location of the collectors in the DB 
    latitude: 36.8065,
    longitude: 10.1967,
    latitudeDelta: 0.1, // Zoomed in closer for better view
    longitudeDelta: 0.1,
  }

    useEffect(() => {
        const requestLocationPermission = async () => {
        try {
            // iOS does NOT request permissions manually via JS
            if (Platform.OS === 'ios') {
            return; 
            }

            // Android
            const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message:
                "This app needs access to your location to show nearby points and provide real-time tracking.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn("Location permission denied");
            }
        } catch (err) {
            console.warn("Permission error:", err);
        }
        };

        requestLocationPermission();
    }, []);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker)
    setMarkerDetailsModal(true)
  }

  return (
    <SafeAreaView style={styles.container}>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.darkText} />
        </TouchableOpacity>

        <View style={{flexDirection:'column',alignItems:'center',gap:20,position:'absolute',zIndex:50,top:60,right:10}}>
            <TouchableOpacity onPress={()=>setfilter_supplier(!filter_supplier)}
            style={{backgroundColor:COLORS.dark,gap:10,flexDirection:'row',alignItems:'center',padding:15,borderWidth:2,borderColor:'white',borderRadius:100}}>
                <MaterialCommunityIcons name="office-building-outline" color={'white'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setfilter_centers(!filter_centers)}
            style={{gap:10,flexDirection:'row',alignItems:'center',padding:15,borderWidth:2,borderColor:'#ffffff',borderRadius:100,backgroundColor:'#05802cff'}}>
                <MaterialCommunityIcons name="food-apple" color='#ffffff' size={25} />
            </TouchableOpacity>
        </View>

      <View style={styles.mapContainer}>
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* Assigned Deliveries - Green Markers */}
          {filter_supplier && suppliers.map((supplier , id) => (
            <Marker
              key={id}
              coordinate={{
                latitude: supplier.location.lat,
                longitude: supplier.location.lng,
              }}
              pinColor={COLORS.success}
              onPress={() => handleMarkerPress(supplier)}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { backgroundColor: "#05802cff" , borderColor: 'white'}]}>
                  <MaterialCommunityIcons name="food-apple" size={16} color="#ffffff" />
                </View>
              </View>
            </Marker>
          ))}

          {/* Composting Requests - Orange/Warning Markers */}
          {filter_centers && compostingCenters.map((center , id) => (
            <Marker
              key={id}
              coordinate={{
                latitude: center.location.lat,
                longitude: center.location.lng,
              }}
              pinColor={COLORS.warning}
              onPress={() => handleMarkerPress(center)}
            >
              <View style={styles.markerContainer}>
                <View style={[styles.marker, { backgroundColor: COLORS.dark , borderColor: 'white' }]}>
                  <MaterialCommunityIcons name="office-building-outline" size={16} color={COLORS.white} />
                </View>
              </View>
            </Marker>
          ))}
          <Marker
              coordinate={{
                latitude: 36.8100,
                longitude: 10.1880,
              }}
              pinColor="black"
            >
              <View style={styles.markerContainer}>
                <View style={[styles.marker_collector, { backgroundColor: "white" }]}>
                  <MaterialCommunityIcons name="truck" size={16} color={COLORS.black} />
                </View>
              </View>
            </Marker>
        </MapView>
      </View>

      {/* Map Controls */}
      <View style={styles.controlPanel}>

    {/* Main Control Content */}
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.98)', 'rgba(255, 255, 255, 0.95)']}
      style={styles.panelContent}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialCommunityIcons name="magnify" size={22} color={"rgba(148, 148, 148, 1)"} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search suppliers or centers..."
          placeholderTextColor={COLORS.mediumGray}
        />
        <TouchableOpacity style={styles.searchFilterButton}>
          <MaterialCommunityIcons name="filter-variant" size={20} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      {/* Quick Actions Row */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.quickActions}
        contentContainerStyle={styles.quickActionsContent}
      >
        {/* Expiring Soon Card */}
        <TouchableOpacity style={[styles.actionCard, styles.expiringCard]} activeOpacity={0.9}>
          <LinearGradient
            colors={['rgba(229, 62, 62, 0.1)', 'rgba(229, 62, 62, 0.05)']}
            style={styles.actionCardGradient}
          >
            <View style={styles.actionCardIcon}>
              <MaterialCommunityIcons name="clock-alert" size={24} color={COLORS.error} />
            </View>
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Expiring Soon</Text>
              <Text style={styles.actionCardSubtitle}>
                <Text style={styles.highlightText}>3</Text> organic wastes {"<"} 6h
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.error} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Organic Food Demand Card */}
        <TouchableOpacity style={[styles.actionCard, styles.demandCard]} activeOpacity={0.9}>
          <LinearGradient
            colors={['rgba(56, 161, 105, 0.1)', 'rgba(56, 161, 105, 0.05)']}
            style={styles.actionCardGradient}
          >
            <View style={styles.actionCardIcon}>
              <MaterialCommunityIcons name="food-apple" size={24} color={COLORS.success} />
            </View>
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Organic Demand</Text>
              <Text style={styles.actionCardSubtitle}>
                <Text style={styles.highlightText}>5</Text> centers need food waste
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.success} />
          </LinearGradient>
        </TouchableOpacity>

        {/* Supplier Posts Card */}
        <TouchableOpacity style={[styles.actionCard, styles.supplierCard]} activeOpacity={0.9}>
          <LinearGradient
            colors={['rgba(108, 88, 76, 0.1)', 'rgba(108, 88, 76, 0.05)']}
            style={styles.actionCardGradient}
          >
            <View style={styles.actionCardIcon}>
              <MaterialCommunityIcons name="post" size={24} color={COLORS.tertiary} />
            </View>
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Supplier Posts</Text>
              <Text style={styles.actionCardSubtitle}>
                <Text style={styles.highlightText}>8</Text> active waste listings
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={COLORS.tertiary} />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

    </LinearGradient>
  </View>

      {/* Marker Details Modal */}
      <Modal
        visible={markerDetailsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setMarkerDetailsModal(false)}
      >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
            
            {/* Modal Header with Gradient */}
            <LinearGradient
                colors={['rgba(108, 88, 76, 0.98)', 'rgba(169, 132, 103, 0.98)']}
                style={styles.modalHeader}
            >
                <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setMarkerDetailsModal(false)}
                >
                <MaterialCommunityIcons name="chevron-down" size={28} color={COLORS.primary} />
                </TouchableOpacity>
                
                <View style={styles.headerContent}>
                <View style={styles.markerTypeBadge}>
                    <MaterialCommunityIcons 
                    name={selectedMarker?.type === "supplier" ? "storefront" : "factory"} 
                    size={20} 
                    color={COLORS.primary} 
                    />
                    <Text style={styles.markerTypeText}>
                    {selectedMarker?.type === "supplier" ? "Supplier" : "Composting Center"}
                    </Text>
                </View>
                <Text style={styles.modalTitle}>Delivery Details</Text>
                <Text style={styles.modalSubtitle}>Ready for pickup</Text>
                </View>
            </LinearGradient>

            {selectedMarker && (
                <ScrollView 
                style={styles.modalBody}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalBodyContent}
                >
                {/* Main Info Card */}
                <View style={styles.mainInfoCard}>
                    <LinearGradient
                    colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                    style={styles.mainInfoGradient}
                    >
                    <View style={styles.locationHeader}>
                        <View style={styles.locationIconContainer}>
                        <LinearGradient
                            colors={[COLORS.accent, '#9ABE73']}
                            style={styles.locationIconGradient}
                        >
                            <MaterialCommunityIcons name="map-marker" size={24} color={COLORS.white} />
                        </LinearGradient>
                        </View>
                        <View style={styles.locationInfo}>
                        <Text style={styles.locationName}>{selectedMarker.name}</Text>
                        <Text style={styles.locationAddress}>{selectedMarker.address || "Location address"}</Text>
                        </View>
                    </View>

                    {/* Quick Stats */}
                    <View style={styles.quickStats}>
                        <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: COLORS.success + '20' }]}>
                            <MaterialCommunityIcons name="scale" size={20} color={COLORS.success} />
                        </View>
                        <Text style={styles.statValue}>50 kg</Text>
                        <Text style={styles.statLabel}>Quantity</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: COLORS.primary + '20' }]}>
                            <MaterialCommunityIcons name="map-marker-distance" size={20} color={COLORS.primary} />
                        </View>
                        <Text style={styles.statValue}>60 km</Text>
                        <Text style={styles.statLabel}>Distance</Text>
                        </View>
                        
                        <View style={styles.statDivider} />
                        
                        <View style={styles.statItem}>
                        <View style={[styles.statIcon, { backgroundColor: selectedMarker?.type === "supplier" ? COLORS.error + '20' : COLORS.accent + '20' }]}>
                            <MaterialCommunityIcons 
                            name="clock" 
                            size={20} 
                            color={selectedMarker?.type === "supplier" ? COLORS.error : COLORS.accent} 
                            />
                        </View>
                        <Text style={[
                            styles.statValue,
                            { color: selectedMarker?.type === "supplier" ? COLORS.error : COLORS.accent }
                        ]}>
                            {selectedMarker?.type === "supplier" ? "20H" : "No Expiry"}
                        </Text>
                        <Text style={styles.statLabel}>Time</Text>
                        </View>
                    </View>
                    </LinearGradient>
                </View>

                {/* Detailed Information */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Detailed Information</Text>
                    
                    <View style={styles.detailsGrid}>
                    {/* Waste Type Card */}
                    <TouchableOpacity style={styles.detailCard} activeOpacity={0.9}>
                        <LinearGradient
                        colors={['rgba(240, 234, 210, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                        style={styles.detailCardGradient}
                        >
                        <View style={styles.detailIconContainer}>
                            <MaterialCommunityIcons name="leaf" size={24} color={COLORS.accent} />
                        </View>
                        <Text style={styles.detailLabel}>Waste Type</Text>
                        <Text style={styles.detailValue}>Organic Food</Text>
                        <Text style={styles.detailSubtext}>Carbon-Rich Available</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Contact Card */}
                    <TouchableOpacity style={styles.detailCard} activeOpacity={0.9}>
                        <LinearGradient
                        colors={['rgba(221, 229, 182, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                        style={styles.detailCardGradient}
                        >
                        <View style={styles.detailIconContainer}>
                            <MaterialCommunityIcons name="phone" size={24} color={COLORS.tertiary} />
                        </View>
                        <Text style={styles.detailLabel}>Contact</Text>
                        <Text style={styles.detailValue}>{selectedMarker.contactNumber}</Text>
                        <Text style={styles.detailSubtext}>Tap to call</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Priority Card */}
                    <TouchableOpacity style={styles.detailCard} activeOpacity={0.9}>
                        <LinearGradient
                        colors={['rgba(169, 132, 103, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                        style={styles.detailCardGradient}
                        >
                        <View style={styles.detailIconContainer}>
                            <MaterialCommunityIcons name="alert-circle" size={24} color={COLORS.error} />
                        </View>
                        <Text style={styles.detailLabel}>Priority</Text>
                        <Text style={[styles.detailValue, { color: COLORS.error }]}>High</Text>
                        <Text style={styles.detailSubtext}>Urgent pickup needed</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Estimated Time Card */}
                    <TouchableOpacity style={styles.detailCard} activeOpacity={0.9}>
                        <LinearGradient
                        colors={['rgba(173, 193, 120, 0.9)', 'rgba(255, 255, 255, 0.9)']}
                        style={styles.detailCardGradient}
                        >
                        <View style={styles.detailIconContainer}>
                            <MaterialCommunityIcons name="clock-check" size={24} color={COLORS.success} />
                        </View>
                        <Text style={styles.detailLabel}>ETA</Text>
                        <Text style={styles.detailValue}>45 min</Text>
                        <Text style={styles.detailSubtext}>Estimated arrival</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                    style={styles.chatButton}
                    activeOpacity={0.9}
                    >
                    <LinearGradient
                        colors={[COLORS.primary, COLORS.primary_2]}
                        style={styles.chatButtonGradient}
                    >
                        <MaterialCommunityIcons name="message-text" size={22} color={COLORS.white} />
                        <Text style={styles.chatButtonText}>Message Supplier</Text>
                    </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.navigationButton}
                    activeOpacity={0.9}
                    >
                    <LinearGradient
                        colors={[COLORS.accent, '#9ABE73']}
                        style={styles.navigationButtonGradient}
                    >
                        <View style={styles.navIconContainer}>
                        <MaterialCommunityIcons name="navigation" size={26} color={COLORS.white} />
                        </View>
                        <View style={styles.navTextContainer}>
                        <Text style={styles.navigationButtonText}>Start Navigation</Text>
                        <Text style={styles.navigationSubtext}>60 km • 45 min drive</Text>
                        </View>
                        <MaterialCommunityIcons name="arrow-right" size={24} color={COLORS.white} />
                    </LinearGradient>
                    </TouchableOpacity>
                </View>

                <View style={styles.footerSpacer} />
                </ScrollView>
            )}
            </View>
        </View>
        </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
    zIndex: 10
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  marker_collector: {
    width: 40,
    height: 40,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.black,
    borderWidth: 3
  },
  controls: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    zIndex: 50
  },
  controlButton: {
    position: "absolute",
    top: -710,
    left: 0,
    backgroundColor: COLORS.white,
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 50
  },
  legend: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.darkText,
  },
 modalOverlay: {
  flex: 1,
  justifyContent: 'flex-end',
},
  
modalContainer: {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  height: 600,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.2,
  shadowRadius: 16,
  elevation: 16,
  overflow: 'hidden',
},
modalHeader: {
  paddingTop: 20,
  paddingBottom: 24,
  paddingHorizontal: 24,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(240, 234, 210, 0.2)',
},
closeButton: {
  position: 'absolute',
  top: 20,
  right: 24,
  zIndex: 1,
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: 'rgba(240, 234, 210, 0.2)',
  alignItems: 'center',
  justifyContent: 'center',
},
headerContent: {
  alignItems: 'center',
},
markerTypeBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(240, 234, 210, 0.3)',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 16,
  marginBottom: 12,
  gap: 6,
},
markerTypeText: {
  fontSize: 13,
  fontWeight: '700',
  color: COLORS.primary,
},
modalTitle: {
  fontSize: 28,
  fontWeight: '800',
  color: COLORS.primary,
  textAlign: 'center',
  marginBottom: 4,
  letterSpacing: -0.5,
},
modalSubtitle: {
  fontSize: 16,
  color: COLORS.primary,
  opacity: 0.9,
  textAlign: 'center',
},
modalBody: {
  flex: 1,
},
modalBodyContent: {
  paddingBottom: 40,
},
mainInfoCard: {
  marginHorizontal: 24,
  marginTop: 24,
  marginBottom: 20,
  borderRadius: 24,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 4,
  overflow: 'hidden',
},
mainInfoGradient: {
  padding: 24,
},
locationHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 24,
},
locationIconContainer: {
  marginRight: 16,
},
locationIconGradient: {
  width: 60,
  height: 60,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: 'rgba(255, 255, 255, 0.3)',
},
locationInfo: {
  flex: 1,
},
locationName: {
  fontSize: 22,
  fontWeight: '800',
  color: COLORS.dark,
  marginBottom: 4,
  letterSpacing: -0.5,
},
locationAddress: {
  fontSize: 14,
  color: COLORS.tertiary,
},
quickStats: {
  flexDirection: 'row',
  backgroundColor: 'rgba(240, 234, 210, 0.3)',
  borderRadius: 20,
  padding: 16,
  borderWidth: 1,
  borderColor: 'rgba(169, 132, 103, 0.1)',
},
statItem: {
  flex: 1,
  alignItems: 'center',
},
statIcon: {
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 8,
},
statValue: {
  fontSize: 18,
  fontWeight: '800',
  color: COLORS.dark,
  marginBottom: 4,
},
statLabel: {
  fontSize: 12,
  color: COLORS.tertiary,
  fontWeight: '600',
},
statDivider: {
  width: 1,
  backgroundColor: 'rgba(169, 132, 103, 0.2)',
},
detailsSection: {
  paddingHorizontal: 24,
  marginBottom: 24,
},
sectionTitle: {
  fontSize: 20,
  fontWeight: '800',
  color: "white",
  marginBottom: 20,
  letterSpacing: -0.5,
},
detailsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 16,
},
detailCard: {
  width: (width - 64) / 2 - 4,
  borderRadius: 20,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 6,
  elevation: 2,
  overflow: 'hidden',
},
detailCardGradient: {
  flex: 1,
  width: '100%',
  height: '100%',
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},
detailIconContainer: {
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 12,
},
detailLabel: {
  fontSize: 12,
  fontWeight: '700',
  color: COLORS.tertiary,
  marginBottom: 4,
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: 1,
},
detailValue: {
  fontSize: 18,
  fontWeight: '800',
  color: COLORS.dark,
  marginBottom: 4,
  textAlign: 'center',
},
detailSubtext: {
  fontSize: 11,
  color: COLORS.tertiary,
  textAlign: 'center',
  opacity: 0.8,
},
actionButtons: {
  paddingHorizontal: 24,
  marginBottom: 20,
  gap: 16,
},
chatButton: {
  borderRadius: 20,
  overflow: 'hidden',
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
},
chatButtonGradient: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 18,
  gap: 10,
  borderRadius: 20,
},
chatButtonText: {
  fontSize: 16,
  fontWeight: '700',
  color: COLORS.white,
},
navigationButton: {
  borderRadius: 24,
  overflow: 'hidden',
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6,
},
navigationButtonGradient: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 24,
  borderRadius: 24,
},
navIconContainer: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 16,
},
navTextContainer: {
  flex: 1,
},
navigationButtonText: {
  fontSize: 20,
  fontWeight: '800',
  color: COLORS.white,
  marginBottom: 4,
  letterSpacing: -0.5,
},
navigationSubtext: {
  fontSize: 14,
  color: 'rgba(255, 255, 255, 0.9)',
},
footerSpacer: {
  height: 20,
},
controlPanel: {
  position: 'absolute',
  top: 510,
  left: 0,
  right: 0,
  zIndex: 100,
  paddingTop: 60, // Safe area for status bar
},
backButton: {
  position: 'absolute',
  top: 20,
  left: 16,
  backgroundColor: COLORS.white,
  width: 48,
  height: 48,
  borderRadius: 24,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 8,
  elevation: 6,
  zIndex: 101,
  borderWidth: 1,
  borderColor: 'rgba(169, 132, 103, 0.1)',
},
panelContent: {
  marginHorizontal: 16,
  marginTop: 12,
  borderRadius: 24,
  padding: 12,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 16,
  elevation: 10,
  borderWidth: 1,
  borderColor: 'rgba(169, 132, 103, 0.1)',
},
searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(240, 234, 210, 0.3)',
  borderRadius: 16,
  paddingHorizontal: 5,
  paddingVertical: 5,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: 'rgba(169, 132, 103, 0.1)',
},
searchInput: {
  flex: 1,
  marginLeft: 12,
  fontSize: 16,
  color: COLORS.dark,
  fontWeight: '500',
},
searchFilterButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'rgba(173, 193, 120, 0.2)',
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 1,
  borderColor: 'rgba(173, 193, 120, 0.3)',
},
quickActions: {
  marginBottom: 10,
},
quickActionsContent: {
  gap: 12,
},
actionCard: {
  width: 260,
  borderRadius: 20,
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  overflow: 'hidden',
  marginRight: 12,
},
actionCardGradient: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  width: "100%" ,
  width: "100%" ,
  borderRadius: 20,
  flex: 1
},
actionCardIcon: {
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 12,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
},
actionCardText: {
  flex: 1,
},
actionCardTitle: {
  fontSize: 16,
  fontWeight: '700',
  color: COLORS.dark,
  marginBottom: 4,
},
actionCardSubtitle: {
  fontSize: 14,
  color: COLORS.tertiary,
},
highlightText: {
  fontWeight: '800',
  color: COLORS.dark,
},
// Expiring card specific
expiringCard: {
  borderWidth: 2,
  borderColor: 'rgba(229, 62, 62, 0.5)',
},
// Demand card specific
demandCard: {
  borderWidth: 2,
  borderColor: 'rgba(56, 161, 105, 0.5)',
},
// Supplier card specific
supplierCard: {
  borderWidth: 2,
  borderColor: 'rgba(108, 88, 76, 0.5)',
},
filterButtons: {
  flexDirection: 'row',
  gap: 12,
},
filterButton: {
  flex: 1,
  borderRadius: 16,
  borderWidth: 2,
  overflow: 'hidden',
},
filterButtonActive: {
  shadowColor: COLORS.dark,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 6,
},
filterButtonGradient: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 14,
  gap: 8,
  borderRadius: 16,
},
filterButtonText: {
  fontSize: 14,
  fontWeight: '700',
},
statsButton: {
  borderColor: COLORS.accent,
},
mapContainer: {
  flex: 1,
},
map: {
  flex: 1,
},
markerContainer: {
  alignItems: 'center',
  justifyContent: 'center',
},
marker: {
  width: 36,
  height: 36,
  borderRadius: 18,
  borderWidth: 2,
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 4,
},
})

export default Map_view
