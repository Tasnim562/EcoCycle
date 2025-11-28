import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, FONT_SIZE } from '../../colors';

const MembershipPaymentScreen = ({ navigation, route }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const plans = [
    {
      id: '1month',
      duration: '1 Month',
      price: '20 DT',
      priceValue: 20,
      features: ['Basic features', '30 days access', 'Email support'],
      popular: false,
    },
    {
      id: '3months',
      duration: '3 Months',
      price: '50 DT',
      priceValue: 50,
      features: ['All basic features', '90 days access', 'Priority email support'],
      popular: true,
    },
    {
      id: '1year',
      duration: '1 Year',
      price: '200 DT',
      priceValue: 200,
      features: ['Premium features', '365 days access', '24/7 support', 'Free updates'],
      popular: false,
    },
  ];

  const handlePayment = async () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Please select a membership plan');
      return;
    }

    setLoading(true);

    // Simulate payment process
    setTimeout(() => {
      // Show payment simulation dialog
      Alert.alert(
        'Payment Simulation',
        `Processing payment of ${selectedPlan.price}\n\nRedirecting to payment gateway...`,
        [
          {
            text: 'Simulate Payment Success',
            onPress: () => {
              setLoading(false);
              Alert.alert(
                'Payment Successful',
                'Your membership has been activated! Welcome to EcoCycle.',
                [
                  {
                    text: 'Continue',
                    onPress: () => navigation.navigate('Login'),
                  },
                ]
              );
            },
          },
          {
            text: 'Simulate Payment Failed',
            onPress: () => {
              setLoading(false);
              Alert.alert('Payment Failed', 'Your payment could not be processed. Please try again.');
            },
          },
        ],
        { cancelable: false }
      );
    }, 1000);
  };

  const PlanCard = ({ plan }) => (
    <TouchableOpacity
      style={[
        styles.planCard,
        selectedPlan?.id === plan.id && styles.planCardSelected,
        plan.popular && styles.planCardPopular,
      ]}
      onPress={() => setSelectedPlan(plan)}
      activeOpacity={0.9}
    >
      {plan.popular && (
        <View style={styles.popularBadge}>
          <MaterialCommunityIcons
            name="star"
            size={14}
            color={COLORS.white}
            style={styles.starIcon}
          />
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}

      <Text style={styles.duration}>{plan.duration}</Text>
      <Text style={styles.price}>{plan.price}</Text>

      <View style={styles.featuresContainer}>
        {plan.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color={COLORS.accent}
              style={styles.checkIcon}
            />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {selectedPlan?.id === plan.id && (
        <View style={styles.selectedIndicator}>
          <MaterialCommunityIcons
            name="check"
            size={24}
            color={COLORS.white}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <MaterialCommunityIcons
              name="credit-card"
              size={40}
              color={COLORS.accent}
            />
            <Text style={styles.title}>Select Your Plan</Text>
            <Text style={styles.subtitle}>Choose the perfect membership for your needs</Text>
          </View>
        </View>

        {/* Plans Container */}
        <View style={styles.plansContainer}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={COLORS.accent}
          />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Membership Benefits</Text>
            <Text style={styles.infoText}>
              Cancel anytime. No hidden fees. Upgrade or downgrade your plan at any time.
            </Text>
          </View>
        </View>

        {/* Selected Plan Summary */}
        {selectedPlan && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{selectedPlan.duration} Plan</Text>
              <Text style={styles.summaryValue}>{selectedPlan.price}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotal}>Total Amount</Text>
              <Text style={styles.summaryTotal}>{selectedPlan.price}</Text>
            </View>
          </View>
        )}

        {/* Payment Button */}
        <TouchableOpacity
          style={[
            styles.paymentButton,
            (!selectedPlan || loading) && styles.paymentButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!selectedPlan || loading}
        >
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color={COLORS.white}
            style={styles.lockIcon}
          />
          <Text style={styles.paymentButtonText}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Text>
        </TouchableOpacity>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <MaterialCommunityIcons
            name="shield-check"
            size={16}
            color={COLORS.accent}
          />
          <Text style={styles.securityText}>
            Your payment is secure and encrypted
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.tertiary,
    textAlign: 'center',
  },
  plansContainer: {
    marginBottom: SPACING.xl,
  },
  planCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    position: 'relative',
  },
  planCardSelected: {
    borderColor: COLORS.accent,
    backgroundColor: '#FFFBF0',
  },
  planCardPopular: {
    borderColor: COLORS.accent,
  },
  popularBadge: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
  },
  starIcon: {
    marginRight: SPACING.xs,
  },
  popularText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: SPACING.md,
  },
  featuresContainer: {
    marginBottom: SPACING.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  checkIcon: {
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.dark,
  },
  selectedIndicator: {
    position: 'absolute',
    top: SPACING.lg,
    right: SPACING.lg,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  infoContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.dark,
  },
  summarySection: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  summaryTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.tertiary,
  },
  summaryValue: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '600',
    color: COLORS.dark,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.secondary,
    marginVertical: SPACING.md,
  },
  summaryTotal: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.accent,
  },
  paymentButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
  },
  paymentButtonDisabled: {
    opacity: 0.5,
  },
  lockIcon: {
    marginRight: SPACING.md,
  },
  paymentButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
  },
  securityText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.tertiary,
    marginLeft: SPACING.sm,
  },
});

export default MembershipPaymentScreen;