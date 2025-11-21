import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Using FlatList for carousel instead of react-native-snap-carousel
import { theme, spacing, fontSize } from '../theme/theme';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ListingCard from '../components/ListingCard';
import MintLogo from '../components/MintLogo';
import { mockListings, categories } from '../constants/mockListings';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = false; // Can be made dynamic with context

  const featuredListings = mockListings.filter(listing => listing.featured);
  const recommendedListings = mockListings.slice(0, 6);

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

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <TouchableOpacity
        onPress={() => handleItemPress(item)}
        activeOpacity={0.9}
      >
        <ListingCard listing={item} isDark={isDark} style={styles.carouselCard} />
      </TouchableOpacity>
    </View>
  );

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryListing', { category });
  };

  const handleSearchPress = () => {
    // Navigate to Search tab - use jumpTo for tab navigation
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Search');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <MintLogo width={100} height={45} color={theme.colors.primary} />
          </View>
          <View style={styles.header}>
            <View>
              <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
                Good morning
              </Text>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                Find your perfect match
              </Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <MaterialCommunityIcons
                name="bell-outline"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search products, jobs, services..."
          onPress={handleSearchPress}
          isDark={isDark}
        />

        {/* Category Shortcuts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Categories
            </Text>
          </View>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => handleCategoryPress(item)}
                isDark={isDark}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Listings Carousel */}
        {featuredListings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Featured Listings
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: { name: 'All' } })}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featuredListings}
              renderItem={renderCarouselItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.carousel}
              snapToInterval={screenWidth * 0.85 + spacing.md}
              decelerationRate="fast"
              snapToAlignment="start"
            />
          </View>
        )}

        {/* Recommended Items Grid */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Recommended for You
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: { name: 'All' } })}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.grid}>
            {recommendedListings.map((listing) => (
              <View key={listing.id} style={styles.gridItem}>
                <ListingCard
                  listing={listing}
                  onPress={() => handleItemPress(listing)}
                  isDark={isDark}
                  style={styles.gridCard}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for floating tab bar
  },
  headerContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  greeting: {
    fontSize: fontSize.xs,
    marginBottom: 2,
    fontWeight: '500',
    opacity: 0.7,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  section: {
    marginTop: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  carousel: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  carouselItem: {
    width: screenWidth * 0.85,
    paddingRight: spacing.md,
  },
  carouselCard: {
    marginBottom: 0,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (screenWidth - spacing.md * 3) / 2,
    marginBottom: spacing.md,
  },
  gridCard: {
    marginBottom: 0,
  },
});

export default HomeScreen;

