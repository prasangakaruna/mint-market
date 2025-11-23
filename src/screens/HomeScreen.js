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
import { LinearGradient } from 'expo-linear-gradient';
import { theme, spacing, fontSize } from '../theme/theme';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import ListingCard from '../components/ListingCard';
import MintLogo from '../components/MintLogo';
import { mockListings, categories } from '../constants/mockListings';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isDark = false;

  const featuredListings = mockListings.filter(listing => listing.featured);
  const recommendedListings = mockListings.slice(0, 6);

  const quickActions = [
    { label: 'Post Ad', icon: 'plus-circle', color: theme.colors.primary, onPress: () => navigation.navigate('PostAd') },
    { label: 'Services', icon: 'handshake', color: '#F59E0B', onPress: () => navigation.navigate('CategoryListing', { category: { name: 'Services' } }) },
    { label: 'Jobs', icon: 'briefcase', color: '#10B981', onPress: () => navigation.navigate('CategoryListing', { category: { name: 'Jobs' } }) },
    { label: 'Real Estate', icon: 'home', color: '#8B5CF6', onPress: () => navigation.navigate('CategoryListing', { category: { name: 'Real Estate' } }) },
  ];

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
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Search');
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact Header */}
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerTop}>
              <MintLogo width={80} height={36} color="#FFFFFF" />
              <TouchableOpacity style={styles.notificationButton}>
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={20}
                  color="#FFFFFF"
                />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationBadgeText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>{getGreeting()}</Text>
              <Text style={styles.title}>Find your perfect match</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search products, jobs, services..."
            onPress={handleSearchPress}
            isDark={isDark}
          />
        </View>

        {/* Quick Actions - Compact */}
        <View style={styles.quickActionsContainer}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { backgroundColor: theme.colors.surface }]}
              onPress={action.onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <MaterialCommunityIcons
                  name={action.icon}
                  size={22}
                  color={action.color}
                />
              </View>
              <Text style={[styles.quickActionLabel, { color: theme.colors.text }]} numberOfLines={1}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories - Compact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Categories
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: { name: 'All' } })}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>All</Text>
            </TouchableOpacity>
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

        {/* Featured Listings - Compact */}
        {featuredListings.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <MaterialCommunityIcons
                  name="star"
                  size={18}
                  color={theme.colors.amber}
                  style={styles.sectionIcon}
                />
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                  Featured
                </Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: { name: 'All' } })}>
                <Text style={[styles.seeAll, { color: theme.colors.primary }]}>All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={featuredListings}
              renderItem={renderCarouselItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.carousel}
              snapToInterval={screenWidth * 0.8 + spacing.sm}
              decelerationRate="fast"
              snapToAlignment="start"
            />
          </View>
        )}

        {/* Recommended Items Grid - Compact */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <MaterialCommunityIcons
                name="thumb-up"
                size={18}
                color={theme.colors.primary}
                style={styles.sectionIcon}
              />
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Recommended
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { category: { name: 'All' } })}>
              <Text style={[styles.seeAll, { color: theme.colors.primary }]}>All</Text>
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
    paddingBottom: 100,
  },
  // Compact Header
  headerGradient: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    paddingHorizontal: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
  headerContent: {
    marginTop: spacing.xs / 2,
  },
  greeting: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 2,
    fontWeight: '500',
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  // Search
  searchContainer: {
    marginTop: -spacing.sm,
    marginBottom: spacing.sm,
    zIndex: 10,
  },
  // Quick Actions - Compact
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    marginTop: spacing.xs,
  },
  quickActionCard: {
    flex: 1,
    padding: spacing.sm,
    borderRadius: 12,
    marginHorizontal: spacing.xs / 2,
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs / 2,
  },
  quickActionLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Sections - Compact
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: spacing.xs / 2,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  seeAll: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  // Categories
  categoriesList: {
    paddingHorizontal: spacing.md,
  },
  // Carousel - Compact
  carousel: {
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
  },
  carouselItem: {
    width: screenWidth * 0.8,
    paddingRight: spacing.sm,
  },
  carouselCard: {
    marginBottom: 0,
  },
  // Grid - Compact
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (screenWidth - spacing.md * 3) / 2,
    marginBottom: spacing.sm,
  },
  gridCard: {
    marginBottom: 0,
  },
});

export default HomeScreen;
