import useFormLoan from '@/src/hooks/useFormLoan';
import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';

const LoanCalculatorApp = () => {
  const {
    // STATE
    loanAmount, handleLoanAmountChange, // Mengganti setLoanAmount dengan handler
    interestRate, handleInterestRateChange, // Mengganti setInterestRate dengan handler
    loanTenor, handleLoanTenorChange, // Mengganti setLoanTenor dengan handler
    monthlyPayment,

    // FUNCTIONS
    calculateLoan,
    exportPDF
  } = useFormLoan();

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.header}>Kalkulator Cicilan</Text> */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50, }} showsVerticalScrollIndicator={false}>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Jumlah Pinjaman (Rp)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan jumlah pinjaman"
            keyboardType="numeric"
            value={loanAmount}
            onChangeText={handleLoanAmountChange}
          />

          <Text style={styles.label}>Suku Bunga Tahunan (%)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan suku bunga tahunan"
            keyboardType="numeric"
            value={interestRate}
            onChangeText={handleInterestRateChange}
          />

          <Text style={styles.label}>Tenor (tahun)</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan tenor pinjaman"
            keyboardType="numeric"
            value={loanTenor}
            onChangeText={handleLoanTenorChange}
          />
        </View>

        {monthlyPayment && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Cicilan Bulanan:</Text>
            <Text style={styles.resultText}>{monthlyPayment}</Text>
          </View>
        )}

      </ScrollView>

      {
        monthlyPayment && (
          <TouchableOpacity style={styles.button} onPress={exportPDF}>
            <AntDesign name="download" size={24} color="white" />
            <Text style={styles.buttonText}>DONWLOAD PDF</Text>
          </TouchableOpacity>
        )
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoanCalculatorApp;
