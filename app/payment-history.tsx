
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { Button } from "@/components/button";
import { IconSymbol } from "@/components/IconSymbol";
import { IconCircle } from "@/components/IconCircle";
import { appleBlue, appleGreen, appleRed } from "@/constants/Colors";

export default function PaymentHistoryScreen() {
  console.log("PaymentHistoryScreen rendered");

  const [selectedFilter, setSelectedFilter] = useState('all');

  const paymentHistory = [
    {
      id: '1',
      date: '2024-01-15',
      amount: 2500.00,
      description: 'Spring Semester Tuition',
      status: 'completed',
      method: 'Credit Card',
      transactionId: 'TXN-2024-001',
    },
    {
      id: '2',
      date: '2023-12-10',
      amount: 150.00,
      description: 'Lab Materials Fee',
      status: 'completed',
      method: 'Bank Transfer',
      transactionId: 'TXN-2023-089',
    },
    {
      id: '3',
      date: '2023-11-20',
      amount: 2500.00,
      description: 'Fall Semester Tuition',
      status: 'completed',
      method: 'Digital Wallet',
      transactionId: 'TXN-2023-067',
    },
    {
      id: '4',
      date: '2023-10-05',
      amount: 75.00,
      description: 'Library Fine',
      status: 'pending',
      method: 'Credit Card',
      transactionId: 'TXN-2023-045',
    },
    {
      id: '5',
      date: '2023-09-15',
      amount: 300.00,
      description: 'Parking Pass',
      status: 'failed',
      method: 'Bank Transfer',
      transactionId: 'TXN-2023-023',
    },
  ];

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' },
    { id: 'failed', label: 'Failed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return appleGreen;
      case 'pending':
        return '#FF9500';
      case 'failed':
        return appleRed;
      default:
        return '#666';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '📄';
    }
  };

  const filteredPayments = selectedFilter === 'all' 
    ? paymentHistory 
    : paymentHistory.filter(payment => payment.status === selectedFilter);

  const totalPaid = paymentHistory
    .filter(payment => payment.status === 'completed')
    .reduce((sum, payment) => sum + payment.amount, 0);

  const renderFilterButton = (filter: typeof filters[0]) => (
    <Pressable
      key={filter.id}
      style={[
        styles.filterButton,
        selectedFilter === filter.id && styles.activeFilterButton
      ]}
      onPress={() => {
        console.log(`Filter selected: ${filter.id}`);
        setSelectedFilter(filter.id);
      }}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter.id && styles.activeFilterButtonText
      ]}>
        {filter.label}
      </Text>
    </Pressable>
  );

  const renderPaymentItem = (payment: typeof paymentHistory[0]) => (
    <View key={payment.id} style={styles.paymentCard}>
      <IconCircle
        emoji={getStatusEmoji(payment.status)}
        backgroundColor={getStatusColor(payment.status)}
        size={40}
      />
      <View style={styles.paymentContent}>
        <Text style={styles.paymentDescription}>{payment.description}</Text>
        <Text style={styles.paymentDate}>
          {new Date(payment.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </Text>
        <Text style={styles.paymentMethod}>{payment.method}</Text>
        <Text style={styles.transactionId}>ID: {payment.transactionId}</Text>
      </View>
      <View style={styles.paymentAmount}>
        <Text style={styles.amountText}>${payment.amount.toFixed(2)}</Text>
        <Text style={[styles.statusText, { color: getStatusColor(payment.status) }]}>
          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Payment History",
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
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Payment Summary</Text>
            <Text style={styles.totalPaidAmount}>${totalPaid.toFixed(2)}</Text>
            <Text style={styles.totalPaidLabel}>Total Paid This Year</Text>
          </View>

          <View style={styles.filtersSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtersContainer}
            >
              {filters.map(renderFilterButton)}
            </ScrollView>
          </View>

          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>
              Transaction History ({filteredPayments.length})
            </Text>
            
            {filteredPayments.length === 0 ? (
              <View style={styles.emptyState}>
                <IconCircle
                  emoji="📄"
                  backgroundColor="#f0f0f0"
                  size={60}
                />
                <Text style={styles.emptyStateText}>
                  No payments found for the selected filter
                </Text>
              </View>
            ) : (
              filteredPayments.map(renderPaymentItem)
            )}
          </View>

          <View style={styles.buttonSection}>
            <Button
              onPress={() => router.push("/payment-options")}
              style={styles.newPaymentButton}
            >
              Make New Payment
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
  summarySection: {
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
  summaryTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  totalPaidAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: appleGreen,
    marginBottom: 4,
  },
  totalPaidLabel: {
    fontSize: 14,
    color: '#666',
  },
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filtersContainer: {
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  activeFilterButton: {
    backgroundColor: appleBlue,
    borderColor: appleBlue,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  historySection: {
    padding: 20,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentContent: {
    flex: 1,
    marginLeft: 12,
  },
  paymentDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  paymentMethod: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  transactionId: {
    fontSize: 10,
    color: '#ccc',
  },
  paymentAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    gap: 16,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  buttonSection: {
    padding: 20,
  },
  newPaymentButton: {
    backgroundColor: appleBlue,
  },
});
