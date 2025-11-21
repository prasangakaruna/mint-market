import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, darkTheme, spacing, fontSize } from '../theme/theme';

const SearchBar = ({ placeholder = 'Search...', onPress, value, onChangeText, isDark = false }) => {
  const colors = isDark ? darkTheme.colors : theme.colors;
  
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.backgroundSecondary }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialCommunityIcons 
        name="magnify" 
        size={20} 
        color={colors.textSecondary} 
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        editable={!!onChangeText}
        pointerEvents={onChangeText ? 'auto' : 'none'}
      />
      {onChangeText && value && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <MaterialCommunityIcons 
            name="close-circle" 
            size={20} 
            color={colors.textSecondary} 
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: theme.roundness * 1.5,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    backgroundColor: '#FFFFFF',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    padding: 0,
  },
});

export default SearchBar;

