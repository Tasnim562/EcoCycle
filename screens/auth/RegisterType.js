import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, FONT_SIZE } from '../../colors';

const RegisterType = ({ navigation }) => {
  const userTypes = [
    {
      id: 'farmer',
      title: 'Farmer',
      description: 'Produce organic waste',
      icon: 'sprout',
      color: COLORS.secondary,
      route: 'farmer_register',
    },
    {
      id: 'ngo',
      title: 'NGO/Collector',
      description: 'Collect and manage waste',
      icon: 'hand-heart',
      color: COLORS.accent,
      route: 'collector_register',
    },
    {
      id: 'composting',
      title: 'Composting Center',
      description: 'Process waste into compost',
      icon: 'office-building',
      color: COLORS.tertiary,
      route: 'centers_register',
    },
    {
      id: 'restaurant',
      title: 'Restaurant/Hotel',
      description: 'Contribute organic waste',
      icon: 'silverware-fork-knife',
      color: COLORS.dark,
      route: 'supplier_register',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={COLORS.dark}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Select Your Role</Text>
          <Text style={styles.subtitle}>Choose your account type to get started</Text>
        </View>

        {/* User Type Cards */}
        <View style={styles.cardsContainer}>
          {userTypes.map((userType) => (
            <TouchableOpacity
              key={userType.id}
              style={[styles.card, { borderLeftColor: userType.color }]}
              onPress={() => navigation.navigate(userType.route)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: userType.color }]}>
                <MaterialCommunityIcons
                  name={userType.icon}
                  size={32}
                  color={COLORS.white}
                />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{userType.title}</Text>
                <Text style={styles.cardDescription}>{userType.description}</Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={COLORS.accent}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={COLORS.accent}
          />
          <Text style={styles.infoText}>
            Each account type has specialized features tailored to your role in the circular economy.
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.tertiary,
  },
  cardsContainer: {
    marginVertical: SPACING.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.lg,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.tertiary,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    padding: SPACING.lg,
    marginTop: SPACING.xl,
  },
  infoText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.dark,
    marginLeft: SPACING.md,
    flex: 1,
  },
});

export default RegisterType;