
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, TextInput, Alert } from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { appleBlue } from "@/constants/Colors";

export default function LoginScreen() {
  console.log("LoginScreen rendered");

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    console.log(`Input changed: ${field} = ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogin = async () => {
    console.log("Login button pressed");
    
    // Basic validation
    if (!formData.email || !formData.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        "Success", 
        "Login successful! Welcome back.",
        [
          {
            text: "OK",
            onPress: () => router.push("/payment-options")
          }
        ]
      );
    }, 1500);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Student Login",
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
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Sign in to access your account and manage payments
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
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
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
              />
            </View>

            <Button
              variant="ghost"
              size="sm"
              onPress={() => {
                console.log("Forgot password pressed");
                Alert.alert("Info", "Password reset functionality will be available soon.");
              }}
              style={styles.forgotPasswordButton}
            >
              Forgot Password?
            </Button>
          </View>

          <View style={styles.buttonSection}>
            <Button
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            >
              Sign In
            </Button>

            <View style={styles.registerPrompt}>
              <Text style={styles.registerPromptText}>
                Don&apos;t have an account?{' '}
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onPress={() => router.push("/register")}
                style={{ paddingHorizontal: 0 }}
              >
                Register here
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
    paddingTop: 60,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
  },
  buttonSection: {
    padding: 20,
    gap: 20,
  },
  loginButton: {
    backgroundColor: appleBlue,
  },
  registerPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPromptText: {
    fontSize: 14,
    color: '#666',
  },
});
