
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    checkbox: {
      width: 12,
      height: 12,
      borderWidth: 1,
      borderColor: '#000',
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxMark: {
      fontSize: 10,
    },
    label: {
      fontSize: 12,
    },
  });
  
const CheckboxPdf = ({ label, checked }) => (
    <View style={styles.checkboxContainer}>
      <View style={styles.checkbox}>
        {checked && <Text style={styles.checkboxMark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );

  export default CheckboxPdf