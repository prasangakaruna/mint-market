import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, darkTheme, spacing, fontSize } from '../theme/theme';

const ListingCard = ({ listing, onPress, isDark = false, style }) => {
  const colors = isDark ? darkTheme.colors : theme.colors;
  
  const getPriceLabel = () => {
    if (listing.category === 'Real Estate') {
      return listing.type === 'rent' ? 'For Rent' : 'For Sale';
    } else if (listing.category === 'Jobs') {
      return 'Job Vacancy';
    } else if (listing.price) {
      return `$${listing.price.toLocaleString()}`;
    }
    return 'Price on request';
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: listing.image || 'https://via.placeholder.com/300x200' }}
          style={styles.image}
          resizeMode="cover"
        />
        {listing.featured && (
          <View style={[styles.featuredBadge, { backgroundColor: colors.amber }]}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {listing.title}
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {getPriceLabel()}
          </Text>
        </View>
        
        {listing.location && (
          <View style={styles.locationRow}>
            <MaterialCommunityIcons 
              name="map-marker-outline" 
              size={14} 
              color={colors.textSecondary} 
            />
            <Text style={[styles.location, { color: colors.textSecondary }]} numberOfLines={1}>
              {listing.location}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.roundness * 1.5,
    overflow: 'hidden',
    marginBottom: spacing.md,
    backgroundColor: '#FFFFFF',
    shadowColor: theme.colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  imageContainer: {
    width: '100%',
    height: 150,
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  featuredBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  content: {
    padding: spacing.sm,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: 2,
  },
  priceRow: {
    marginBottom: 2,
  },
  price: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    fontSize: fontSize.sm,
    marginLeft: 4,
  },
});

export default ListingCard;

