import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import { mockListings } from '../constants/mockListings';

const SearchScreen = ({ navigation, route }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const isDark = false;

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockListings.filter(
        listing =>
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.description?.toLowerCase().includes(query.toLowerCase()) ||
          listing.location?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const recentSearches = ['iPhone', 'Apartment', 'Software Engineer', 'Cleaning Service'];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface, borderBottomColor: theme.colors.border }]}>
        <TouchableOpacity
          onPress={() => {
            // If navigated from another screen, go back; otherwise navigate to Home tab
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              const parent = navigation.getParent();
              if (parent) {
                parent.navigate('Home');
              }
            }
          }}
          style={styles.backButton}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={theme.colors.text}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search products, jobs, services..."
            value={searchQuery}
            onChangeText={handleSearch}
            isDark={isDark}
          />
        </View>
      </View>

      {searchQuery ? (
        // Search Results
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              onPress={() => handleItemPress(item)}
              isDark={isDark}
              style={styles.resultCard}
            />
          )}
          contentContainerStyle={styles.resultsContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="magnify"
                size={64}
                color={theme.colors.textTertiary}
              />
              <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
                No results found
              </Text>
              <Text style={[styles.emptySubtext, { color: theme.colors.textTertiary }]}>
                Try different keywords
              </Text>
            </View>
          }
        />
      ) : (
        // Recent Searches / Suggestions
        <View style={styles.suggestionsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Recent Searches
          </Text>
          <View style={styles.recentSearches}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.searchChip, { backgroundColor: theme.colors.backgroundSecondary }]}
                onPress={() => handleSearch(search)}
              >
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={16}
                  color={theme.colors.textSecondary}
                />
                <Text style={[styles.searchChipText, { color: theme.colors.text }]}>
                  {search}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: spacing.md }]}>
            Popular Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {['Electronics', 'Real Estate', 'Jobs', 'Services'].map((category) => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryChip, { backgroundColor: theme.colors.surface }]}
                onPress={() => navigation.navigate('CategoryListing', { category: { name: category } })}
              >
                <Text style={[styles.categoryChipText, { color: theme.colors.text }]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
    marginRight: spacing.sm,
  },
  searchContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: spacing.md,
  },
  resultCard: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  suggestionsContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  recentSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  searchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: theme.roundness * 1.5,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchChipText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: theme.roundness * 1.5,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryChipText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

export default SearchScreen;

