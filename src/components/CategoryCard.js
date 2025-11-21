import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, darkTheme, spacing } from '../theme/theme';

const CategoryCard = ({ category, onPress, isDark = false }) => {
  const colors = isDark ? darkTheme.colors : theme.colors;
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.brandGreenLight }]}>
        <MaterialCommunityIcons 
          name={category.icon} 
          size={28} 
          color={colors.primary} 
        />
      </View>
      <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: theme.roundness * 1.5,
    marginRight: spacing.sm,
    backgroundColor: '#FFFFFF',
    shadowColor: theme.colors.shadowDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: theme.roundness * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CategoryCard;

