import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import Button from '../components/Button';
import ListingCard from '../components/ListingCard';
import { mockListings } from '../constants/mockListings';

const { width: screenWidth } = Dimensions.get('window');

const ListingDetailsScreen = ({ route, navigation }) => {
  const { listing } = route.params || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('Gallery');
  const [isFavorite, setIsFavorite] = useState(false);
  const isDark = false;

  // Fallback if listing is not provided - using real estate example
  const listingData = listing || {
    id: '1',
    title: 'Woodland Apartment',
    category: 'Real Estate',
    price: 2500,
    type: 'rent',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    location: '1012 Ocean avenue, New yourk, USA',
    description: 'Beautiful modern apartment with great views. Fully furnished, available immediately. This stunning property features spacious rooms, modern amenities, and a prime location.',
    rating: 4.9,
    reviewCount: 6800,
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200, // square feet
    yearBuilt: 2018,
    parking: 1,
    floor: 5,
    totalFloors: 10,
  };

  // Combine main image with gallery images for slider
  const mainImage = listingData.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';
  const allGalleryImages = [
    mainImage,
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  ];
  
  // Thumbnail images for overlay (first 5 + more indicator)
  const thumbnailImages = allGalleryImages.slice(0, 5);
  
  const imageSliderRef = useRef(null);

  // Gallery images (400 total - showing sample)
  const galleryImageUrls = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop',
  ];
  const galleryImages = galleryImageUrls.map((uri, i) => ({
    id: i + 1,
    uri,
  }));

  const similarListings = mockListings
    .filter(item => item.category === listingData.category && item.id !== listingData.id)
    .slice(0, 4);

  const getPriceLabel = () => {
    if (listingData.category === 'Real Estate') {
      return listingData.type === 'rent' ? 'For Rent' : 'For Sale';
    } else if (listingData.category === 'Jobs') {
      return listingData.salary || 'Salary negotiable';
    } else if (listingData.price) {
      return `$${listingData.price.toLocaleString()}`;
    }
    return 'Price on request';
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>
              {listingData.description}
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary, marginTop: spacing.md }]}>
              This beautiful property offers modern living with all the amenities you need. Located in a prime area with easy access to shopping, dining, and entertainment. The apartment features spacious rooms, high ceilings, and large windows that let in plenty of natural light.
            </Text>
          </View>
        );
      case 'Details':
        return (
          <View style={styles.tabContent}>
            {/* Property Details */}
            {(listingData.bedrooms || listingData.bathrooms || listingData.area) && (
              <View style={[styles.propertyDetailsCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                <View style={styles.propertyDetailsGrid}>
                  {listingData.bedrooms && (
                    <View style={styles.propertyDetailItem}>
                      <MaterialCommunityIcons
                        name="bed"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={[styles.propertyDetailValue, { color: theme.colors.text }]}>
                        {listingData.bedrooms}
                      </Text>
                      <Text style={[styles.propertyDetailLabel, { color: theme.colors.textSecondary }]}>
                        Bedrooms
                      </Text>
                    </View>
                  )}
                  {listingData.bathrooms && (
                    <View style={styles.propertyDetailItem}>
                      <MaterialCommunityIcons
                        name="shower"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={[styles.propertyDetailValue, { color: theme.colors.text }]}>
                        {listingData.bathrooms}
                      </Text>
                      <Text style={[styles.propertyDetailLabel, { color: theme.colors.textSecondary }]}>
                        Bathrooms
                      </Text>
                    </View>
                  )}
                  {listingData.area && (
                    <View style={styles.propertyDetailItem}>
                      <MaterialCommunityIcons
                        name="square-foot"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={[styles.propertyDetailValue, { color: theme.colors.text }]}>
                        {listingData.area.toLocaleString()}
                      </Text>
                      <Text style={[styles.propertyDetailLabel, { color: theme.colors.textSecondary }]}>
                        Sq Ft
                      </Text>
                    </View>
                  )}
                  {listingData.parking !== undefined && (
                    <View style={styles.propertyDetailItem}>
                      <MaterialCommunityIcons
                        name="car"
                        size={24}
                        color={theme.colors.primary}
                      />
                      <Text style={[styles.propertyDetailValue, { color: theme.colors.text }]}>
                        {listingData.parking}
                      </Text>
                      <Text style={[styles.propertyDetailLabel, { color: theme.colors.textSecondary }]}>
                        Parking
                      </Text>
                    </View>
                  )}
                </View>
                
                {/* Additional Details Row */}
                {(listingData.yearBuilt || listingData.floor) && (
                  <View style={styles.additionalDetailsRow}>
                    {listingData.yearBuilt && (
                      <View style={styles.additionalDetailItem}>
                        <MaterialCommunityIcons
                          name="calendar"
                          size={18}
                          color={theme.colors.textSecondary}
                        />
                        <Text style={[styles.additionalDetailText, { color: theme.colors.textSecondary }]}>
                          Built {listingData.yearBuilt}
                        </Text>
                      </View>
                    )}
                    {listingData.floor && (
                      <View style={styles.additionalDetailItem}>
                        <MaterialCommunityIcons
                          name="office-building"
                          size={18}
                          color={theme.colors.textSecondary}
                        />
                        <Text style={[styles.additionalDetailText, { color: theme.colors.textSecondary }]}>
                          Floor {listingData.floor}{listingData.totalFloors ? ` of ${listingData.totalFloors}` : ''}
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}

            {/* Additional Property Information */}
            <View style={styles.detailsSection}>
              <Text style={[styles.detailsSectionTitle, { color: theme.colors.text }]}>
                Property Information
              </Text>
              
              {listingData.propertyType && (
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="home"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Property Type:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    {listingData.propertyType}
                  </Text>
                </View>
              )}

              {listingData.type && (
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="tag"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Listing Type:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    {listingData.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </Text>
                </View>
              )}

              {listingData.price && (
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="currency-usd"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Price:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    ${listingData.price.toLocaleString()}{listingData.type === 'rent' ? '/month' : ''}
                  </Text>
                </View>
              )}

              {listingData.location && (
                <View style={styles.detailRow}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text style={[styles.detailLabel, { color: theme.colors.textSecondary }]}>
                    Location:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                    {listingData.location}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      case 'Gallery':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.galleryTitle, { color: theme.colors.text }]}>
              Gallery (400)
            </Text>
            <View style={styles.galleryGrid}>
              {galleryImages.map((item) => (
                <TouchableOpacity key={item.id} style={styles.galleryItem}>
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.galleryImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'Review':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Reviews
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>
              Reviews will be displayed here.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Image Container with Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            ref={imageSliderRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
              setCurrentImageIndex(index);
            }}
            style={styles.imageSlider}
          >
            {allGalleryImages.map((img, index) => (
              <View key={index} style={styles.sliderItem}>
                <Image
                  source={{ uri: img }}
                  style={styles.mainImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          
          {/* Header Icons */}
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color={theme.colors.text}
              />
            </TouchableOpacity>
            <View style={styles.headerRightIcons}>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() => {
                  // Handle share
                }}
              >
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerIconButton, { marginLeft: spacing.sm }]}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <MaterialCommunityIcons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? '#EF4444' : theme.colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicator */}
          {allGalleryImages.length > 1 && (
            <View style={styles.imageIndicator}>
              {allGalleryImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicatorDot,
                    index === currentImageIndex && styles.indicatorDotActive,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Thumbnail Gallery Overlay */}
          <View style={styles.thumbnailContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.thumbnailScroll}
            >
              {thumbnailImages.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.thumbnailItem,
                    index === currentImageIndex && styles.thumbnailItemActive,
                  ]}
                  onPress={() => {
                    if (imageSliderRef.current) {
                      imageSliderRef.current.scrollTo({
                        x: index * screenWidth,
                        animated: true,
                      });
                      setCurrentImageIndex(index);
                    }
                  }}
                >
                  <Image
                    source={{ uri: img }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
              {allGalleryImages.length > 5 && (
                <TouchableOpacity 
                  style={styles.thumbnailMore}
                  onPress={() => {
                    setActiveTab('Gallery');
                  }}
                >
                  <View style={styles.thumbnailMoreOverlay}>
                    <Text style={styles.thumbnailMoreText}>
                      +{allGalleryImages.length - 5}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: thumbnailImages[thumbnailImages.length - 1] }}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
        </View>

        {/* Property Information */}
        <View style={styles.content}>
          {/* Rating and Property Type */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons
                name="star"
                size={20}
                color={theme.colors.amber}
              />
              <Text style={[styles.ratingText, { color: theme.colors.text, marginLeft: spacing.xs }]}>
                {listingData.rating || 4.9} ({((listingData.reviewCount || 6800) / 1000).toFixed(1)}K review)
              </Text>
            </View>
            {listingData.propertyType && (
              <View style={[styles.propertyTypeTag, { backgroundColor: theme.colors.brandBlueLight }]}>
                <Text style={[styles.propertyTypeText, { color: theme.colors.primary }]}>
                  {listingData.propertyType}
                </Text>
              </View>
            )}
          </View>

          {/* Property Name */}
          <Text style={[styles.propertyName, { color: theme.colors.text }]}>
            {listingData.title}
          </Text>

          {/* Address */}
          <Text style={[styles.address, { color: theme.colors.text }]}>
            {listingData.location}
          </Text>

          {/* Navigation Tabs */}
          <View style={styles.tabsContainer}>
            {['Description', 'Details', 'Gallery', 'Review'].map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tab}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: activeTab === tab ? theme.colors.primary : theme.colors.textSecondary,
                      fontWeight: activeTab === tab ? '600' : '400',
                    },
                  ]}
                >
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View style={[styles.tabIndicator, { backgroundColor: theme.colors.primary }]} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          {renderTabContent()}

          {/* Similar Items */}
          {similarListings.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Similar Properties
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarList}
              >
                {similarListings.map((item) => {
                  const handlePress = () => {
                    if (item.category === 'Services') {
                      navigation.navigate('ServiceDetails', { service: item });
                    } else if (item.category === 'Electronics') {
                      navigation.navigate('ElectronicsProductDetails', { product: item });
                    } else {
                      navigation.navigate('ListingDetails', { listing: item });
                    }
                  };
                  return (
                    <View key={item.id} style={styles.similarItem}>
                      <ListingCard
                        listing={item}
                        onPress={handlePress}
                        isDark={isDark}
                        style={styles.similarCard}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  // Main Image Container
  imageContainer: {
    width: screenWidth,
    height: 400,
    position: 'relative',
  },
  imageSlider: {
    width: screenWidth,
    height: 400,
  },
  sliderItem: {
    width: screenWidth,
    height: 400,
  },
  mainImage: {
    width: screenWidth,
    height: 400,
  },
  // Header Icons
  headerIcons: {
    position: 'absolute',
    top: spacing.lg,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    zIndex: 10,
  },
  headerRightIcons: {
    flexDirection: 'row',
  },
  headerIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Thumbnail Gallery
  thumbnailContainer: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
  },
  thumbnailScroll: {
    paddingRight: spacing.md,
  },
  thumbnailItem: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: spacing.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailItemActive: {
    borderColor: theme.colors.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailMore: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: spacing.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  thumbnailMoreOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  thumbnailMoreText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  // Image Indicator
  imageIndicator: {
    position: 'absolute',
    top: spacing.xl + 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  indicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 3,
  },
  indicatorDotActive: {
    backgroundColor: '#FFFFFF',
    width: 20,
  },
  // Content Section
  content: {
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  // Rating Row
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  propertyTypeTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  propertyTypeText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  // Property Name
  propertyName: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  // Address
  address: {
    fontSize: fontSize.md,
    marginBottom: spacing.md,
    color: theme.colors.text,
  },
  // Property Details
  propertyDetailsCard: {
    borderRadius: theme.roundness,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  propertyDetailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  propertyDetailItem: {
    alignItems: 'center',
    flex: 1,
  },
  propertyDetailValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginTop: spacing.xs,
    marginBottom: spacing.xs / 2,
  },
  propertyDetailLabel: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  additionalDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  additionalDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  additionalDetailText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  // Details Section
  detailsSection: {
    marginTop: spacing.lg,
  },
  detailsSectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
  },
  detailLabel: {
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
    flex: 1,
  },
  detailValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    flex: 2,
  },
  // Navigation Tabs
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: fontSize.md,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  // Tab Content
  tabContent: {
    marginTop: spacing.md,
  },
  descriptionText: {
    fontSize: fontSize.md,
    lineHeight: 24,
  },
  galleryTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  galleryItem: {
    width: (screenWidth - spacing.md * 2 - spacing.xs * 2) / 2,
    height: (screenWidth - spacing.md * 2 - spacing.xs * 2) / 2,
    margin: spacing.xs,
    borderRadius: 12,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: '100%',
  },
  // Section Styles
  section: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  similarList: {
    paddingRight: spacing.md,
  },
  similarItem: {
    width: 200,
    marginRight: spacing.md,
  },
  similarCard: {
    marginBottom: 0,
  },
});

export default ListingDetailsScreen;

