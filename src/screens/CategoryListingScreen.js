import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import ListingCard from '../components/ListingCard';
import { mockListings } from '../constants/mockListings';

const { width: screenWidth } = Dimensions.get('window');

const CategoryListingScreen = ({ route, navigation }) => {
  const { category } = route.params || { category: { name: 'All' } };
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const isDark = false;

  const filteredListings = category.name === 'All'
    ? mockListings
    : mockListings.filter(listing => listing.category === category.name);

  const handleItemPress = (item) => {
    if (item.category === 'Services') {
      navigation.navigate('ServiceDetails', { service: item });
    } else if (item.category === 'Electronics') {
      navigation.navigate('ElectronicsProductDetails', { product: item });
    } else if (item.category === 'Jobs') {
      navigation.navigate('JobDetails', { job: item });
    } else {
      navigation.navigate('ListingDetails', { listing: item });
    }
  };

  const renderGridItem = ({ item }) => (
    <View style={styles.gridItem}>
      <ListingCard
        listing={item}
        onPress={() => handleItemPress(item)}
        isDark={isDark}
        style={styles.gridCard}
      />
    </View>
  );

  const renderListItem = ({ item }) => (
    <ListingCard
      listing={item}
      onPress={() => handleItemPress(item)}
      isDark={isDark}
      style={styles.listCard}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          {category.name}
        </Text>
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            onPress={() => setViewMode('grid')}
            style={[
              styles.viewModeButton,
              viewMode === 'grid' && { backgroundColor: theme.colors.primary }
            ]}
          >
            <MaterialCommunityIcons
              name="view-grid"
              size={20}
              color={viewMode === 'grid' ? '#FFFFFF' : theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setViewMode('list')}
            style={[
              styles.viewModeButton,
              viewMode === 'list' && { backgroundColor: theme.colors.primary }
            ]}
          >
            <MaterialCommunityIcons
              name="view-list"
              size={20}
              color={viewMode === 'list' ? '#FFFFFF' : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Listings */}
      <FlatList
        data={filteredListings}
        key={viewMode}
        numColumns={viewMode === 'grid' ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={viewMode === 'grid' ? renderGridItem : renderListItem}
        contentContainerStyle={[styles.listContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="inbox-outline"
              size={64}
              color={theme.colors.textTertiary}
            />
            <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
              No listings found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  backButton: {
    marginRight: spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.roundness * 1.5,
    padding: 3,
  },
  viewModeButton: {
    padding: spacing.sm,
    borderRadius: theme.roundness * 1.2,
    minWidth: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: spacing.sm,
  },
  gridItem: {
    width: (screenWidth - spacing.sm * 3) / 2,
    marginBottom: spacing.sm,
    marginRight: spacing.sm,
  },
  gridCard: {
    marginBottom: 0,
  },
  listCard: {
    marginBottom: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
    marginTop: spacing.md,
  },
});

export default CategoryListingScreen;

