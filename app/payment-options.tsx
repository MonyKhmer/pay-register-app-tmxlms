
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Alert } from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { IconCircle } from "@/components/IconCircle";
import { HeaderLogo } from "@/components/HeaderLogo";
import { appleBlue, appleGreen } from "@/constants/Colors";

export default function PaymentOptionsScreen() {
  console.log("PaymentOptionsScreen rendered");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const paymentOptions = [
    {
      id: 'credit-card',
      title: 'Credit/Debit Card',
      description: 'Pay securely with your card',
      emoji: '💳',
      color: appleBlue,
      fees: 'Processing fee: 2.9%',
    },
    {
      id: 'bank-transfer',
      title: 'Bank Transfer',
      description: 'Direct transfer from your bank',
      emoji: '🏦',
      color: appleGreen,
      fees: 'No additional fees',
    },
    {
      id: 'digital-wallet',
      title: 'Digital Wallet',
      description: 'Pay with Apple Pay, Google Pay',
      emoji: '📱',
      color: '#FF9500',
      fees: 'Processing fee: 1.5%',
    },
    {
      id: 'installments',
      title: 'Installment Plan',
      description: 'Split payment into monthly installments',
      emoji: '📅',
      color: '#AF52DE',
      fees: 'Interest may apply',
    },
  ];

  const handleOptionSelect = (optionId: string) => {
    console.log(`Payment option selected: ${optionId}`);
    setSelectedOption(optionId);
  };

  const handleProceedToPayment = () => {
    if (!selectedOption) {
      Alert.alert("Error", "Please select a payment option");
      return;
    }

    console.log(`Proceeding with payment option: ${selectedOption}`);
    Alert.alert(
      "Payment Processing",
      `You selected ${paymentOptions.find(opt => opt.id === selectedOption)?.title}. This would redirect to the payment gateway.`,
      [
        {
          text: "OK",
          onPress: () => router.push("/payment-history")
        }
      ]
    );
  };

  const renderPaymentOption = (option: typeof paymentOptions[0]) => (
    <Pressable
      key={option.id}
      style={[
        styles.optionCard,
        selectedOption === option.id && styles.selectedCard
      ]}
      onPress={() => handleOptionSelect(option.id)}
    >
      <IconCircle
        emoji={option.emoji}
        backgroundColor={option.color}
        size={50}
      />
      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
        <Text style={styles.optionFees}>{option.fees}</Text>
      </View>
      <View style={styles.radioButton}>
        {selectedOption === option.id && (
          <View style={styles.radioButtonSelected} />
        )}
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Payment Options",
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
          headerRight: () => (
            <HeaderLogo size={24} />
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.title}>Choose Payment Method</Text>
            <Text style={styles.subtitle}>
              Select your preferred way to pay for institute fees
            </Text>
          </View>

          <View style={styles.amountSection}>
            <Text style={styles.amountLabel}>Amount Due</Text>
            <Text style={styles.amountValue}>$2,500.00</Text>
            <Text style={styles.amountDescription}>
              Semester fees including tuition and materials
            </Text>
          </View>

          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            {paymentOptions.map(renderPaymentOption)}
          </View>

          <View style={styles.buttonSection}>
            <Button
              onPress={handleProceedToPayment}
              style={[
                styles.proceedButton,
                !selectedOption && styles.disabledButton
              ]}
              disabled={!selectedOption}
            >
              Proceed to Payment
            </Button>

            <Button
              variant="outline"
              onPress={() => router.push("/payment-history")}
            >
              View Payment History
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
  amountSection: {
    margin: 20,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: appleBlue,
    marginBottom: 8,
  },
  amountDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  optionsSection: {
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: appleBlue,
    backgroundColor: '#f0f8ff',
  },
  optionContent: {
    flex: 1,
    marginLeft: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  optionFees: {
    fontSize: 12,
    color: '#999',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: appleBlue,
  },
  buttonSection: {
    padding: 20,
    gap: 12,
  },
  proceedButton: {
    backgroundColor: appleBlue,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});
