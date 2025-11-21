import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GharrLogo = ({ size = 'md' }) => {
  const sizes = {
    sm: { icon: 24, fontSize: 16 },
    md: { icon: 32, fontSize: 20 },
    lg: { icon: 40, fontSize: 24 },
  };

  const { icon: iconSize, fontSize: textSize } = sizes[size] || sizes.md;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons 
          name="home" 
          size={iconSize} 
          color="#3B82F6" 
        />
        <MaterialCommunityIcons 
          name="key" 
          size={iconSize * 0.5} 
          color="#3B82F6" 
          style={styles.keyIcon}
        />
      </View>
      <Text style={[styles.text, { fontSize: textSize }]}>
        <Text style={styles.textDark}>Gharr</Text>
        <Text style={styles.textBlue}>For</Text>
        <Text style={styles.textDark}>.Sale</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textDark: {
    color: '#1A1A1A',
  },
  textBlue: {
    color: '#3B82F6',
  },
});

export default GharrLogo;






