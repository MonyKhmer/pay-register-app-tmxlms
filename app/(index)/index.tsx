
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { appleBlue, appleGreen } from "@/constants/Colors";

export default function HomeScreen() {
  console.log("HomeScreen rendered");

  const features = [
    {
      title: "Student Registration",
      description: "Create your account and get started",
      route: "/register",
      emoji: "👤",
      color: appleBlue,
    },
    {
      title: "Login",
      description: "Access your existing account",
      route: "/login",
      emoji: "🔐",
      color: appleGreen,
    },
    {
      title: "Payment Options",
      description: "View available payment methods",
      route: "/payment-options",
      emoji: "💳",
      color: "#FF9500",
    },
    {
      title: "Payment History",
      description: "Track your payment records",
      route: "/payment-history",
      emoji: "📊",
      color: "#AF52DE",
    }
  ];

  const renderFeatureCard = (item: typeof features[0], index: number) => (
    <Pressable
      key={index}
      style={styles.featureCard}
      onPress={() => {
        console.log(`Navigating to ${item.route}`);
        router.push(item.route as any);
      }}
    >
      <IconCircle
        emoji={item.emoji}
        backgroundColor={item.color}
        size={60}
      />
      <View style={styles.featureContent}>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureDescription}>{item.description}</Text>
      </View>
      <IconSymbol name="chevron.right" color="#999" size={20} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Institute Payment",
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            color: '#333',
            fontSize: 20,
            fontWeight: '600',
          },
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.welcomeTitle}>Welcome to</Text>
            <Text style={styles.instituteTitle}>Institute Payment Portal</Text>
            <Text style={styles.subtitle}>
              Manage your payments and registration easily
            </Text>
          </View>

          <View style={styles.featuresSection}>
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>
              Need help? Contact our support team
            </Text>
            <Button
              variant="outline"
              size="sm"
              onPress={() => {
                console.log("Support pressed");
              }}
            >
              Get Support
            </Button>
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
    paddingTop: 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  instituteTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresSection: {
    padding: 20,
    gap: 16,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureContent: {
    flex: 1,
    marginLeft: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footerSection: {
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
