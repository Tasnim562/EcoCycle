import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SPACING, FONT_SIZE } from '../../colors';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const InputField = React.memo(
  ({
    label,
    field,
    icon,
    keyboardType,
    secureTextEntry,
    value,
    onChangeText,
    error,
    showPassword,
    togglePassword,
    loading,
  }) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={COLORS.accent}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={COLORS.mediumGray}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={!loading}
        />

        {field === "password" && (
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePassword}>
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color={COLORS.accent}
            />
          </TouchableOpacity>
        )}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  )
);


const FarmerRegister = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Username is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try{
    const userCredential = await auth().createUserWithEmailAndPassword(

      formData.email,
      formData.password
    );

    const uid = userCredential.user.uid;

    await firestore()
      .collection("users")
      .doc(uid) // document ID = same UID
      .set({
        uid: uid, // reference to the auth user
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        role: "farmer" , 
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    console.log("User created & saved successfully!");

    } catch (error) {
      console.log("Registration error:", error.message);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
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
            <Text style={styles.title}>Farmer Sign Up</Text>
            <Text style={styles.subtitle}>Create your farmer account</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <InputField
              label="Username"
              field="name"
              icon="account"
              value={formData.name}
              onChangeText={(v) => handleInputChange("name", v)}
              error={errors.name}
              loading={loading}
            />

            <InputField
              label="Phone Number"
              field="phone"
              icon="phone"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(v) => handleInputChange("phone", v)}
              error={errors.phone}
              loading={loading}
            />

            <InputField
              label="Email"
              field="email"
              icon="email-outline"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(v) => handleInputChange("email", v)}
              error={errors.email}
              loading={loading}
            />



            <InputField
              label="Password"
              field="password"
              icon="lock-outline"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(v) => handleInputChange("password", v)}
              error={errors.password}
              loading={loading}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
            />


            {/* Register Button */}
            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="sprout"
                size={22}
                color={COLORS.white}
                style={styles.buttonIcon}
              />
              <Text style={styles.registerButtonText}>
                {loading ? 'Creating Account...' : 'Create Farmer Account'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLink}>
              <Text style={styles.loginLinkText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLinkHighlight}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.lg,
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
  formContainer: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.dark,
    marginBottom: SPACING.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingHorizontal: SPACING.md,
    height: 52,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  inputIcon: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.dark,
  },
  eyeIcon: {
    padding: SPACING.sm,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  buttonIcon: {
    marginRight: SPACING.md,
  },
  registerButtonText: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SPACING.lg,
  },
  loginLinkText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.tertiary,
  },
  loginLinkHighlight: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
});

export default FarmerRegister;