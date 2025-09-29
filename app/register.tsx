
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { appleBlue } from "@/constants/Colors";

export default function RegisterScreen() {
  console.log("RegisterScreen rendered");

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    console.log(`Input changed: ${field} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegister = async () => {
    console.log("Register button pressed");
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Success", 
        "Registration successful! You can now login.",
        [
          {
            text: "OK",
            onPress: () => router.push("/login")
          }
        ]
      );
    }, 2000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Student Registration",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#333',
            fontSize: 18,
            fontWeight: '600',
          },
          headerLeft: () => (
            <Button
              variant="ghost"
              size="sm"
              onPress={() => router.back()}
              style={{ paddingLeft: 0 }}
            >
              <IconSymbol name="chevron.left" color={appleBlue} size={20} />
            </Button>
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Fill in your details to register for the institute
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                placeholder="Enter your first name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                placeholder="Enter your phone number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Student ID</Text>
              <TextInput
                style={styles.input}
                value={formData.studentId}
                onChangeText={(value) => handleInputChange('studentId', value)}
                placeholder="Enter your student ID (if available)"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Create a password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password *</Text>
              <TextInput
                style={styles.input}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm your password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.buttonSection}>
            <Button
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            >
              Create Account
            </Button>

            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>
                Already have an account?{' '}
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => router.push("/login")}
                style={{ paddingHorizontal: 0 }}
              >
                Login here
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  headerSection: {
    padding: 24,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  formSection: {
    padding: 20,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  buttonSection: {
    padding: 20,
    gap: 20,
  },
  registerButton: {
    backgroundColor: appleBlue,
  },
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 14,
    color: '#666',
  },
});
