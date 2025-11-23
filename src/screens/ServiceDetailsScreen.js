import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import Button from '../components/Button';
import ListingCard from '../components/ListingCard';
import { mockListings } from '../constants/mockListings';

const { width: screenWidth } = Dimensions.get('window');

const ServiceDetailsScreen = ({ route, navigation }) => {
  const { service } = route.params || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    specialRequests: '',
  });
  const isDark = false;

  // Fallback if service is not provided
  const serviceData = service || {
    id: '10',
    title: 'Professional House Cleaning Service',
    category: 'Services',
    location: 'Boston, MA',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
    description: 'Experienced cleaning service for homes and offices. Fully insured and bonded.',
    price: 150,
    priceType: 'per visit',
    rating: 4.8,
    reviewsCount: 342,
    provider: {
      name: 'Clean Pro',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 4.8,
      verified: true,
      experience: '10+ years',
      location: 'Boston, MA',
    },
    serviceArea: 'Within 10 miles of downtown',
    availability: 'Available Mon-Sat, 8 AM - 6 PM',
    responseTime: 'Usually responds within 2 hours',
    features: [
      { icon: 'shield-check', label: 'Insured & Bonded' },
      { icon: 'clock-outline', label: 'Flexible Scheduling' },
      { icon: 'star', label: '5-Star Rated' },
      { icon: 'truck-delivery', label: 'Same Day Service' },
    ],
    packages: [
      {
        id: 'basic',
        name: 'Basic Cleaning',
        price: 120,
        duration: '2-3 hours',
        includes: ['Dusting', 'Vacuuming', 'Bathroom cleaning', 'Kitchen cleaning'],
      },
      {
        id: 'standard',
        name: 'Standard Cleaning',
        price: 150,
        duration: '3-4 hours',
        includes: [
          'Everything in Basic',
          'Window cleaning',
          'Deep kitchen cleaning',
          'Appliance cleaning',
        ],
        popular: true,
      },
      {
        id: 'premium',
        name: 'Premium Cleaning',
        price: 220,
        duration: '4-5 hours',
        includes: [
          'Everything in Standard',
          'Inside oven & fridge',
          'Baseboards & blinds',
          'Carpet spot treatment',
        ],
      },
    ],
    fullDescription: `Our professional house cleaning service provides thorough and reliable cleaning for your home or office. We use eco-friendly products and professional-grade equipment to ensure your space is spotless.

What We Offer:
• Regular weekly, bi-weekly, or monthly cleaning
• One-time deep cleaning services
• Move-in/move-out cleaning
• Post-construction cleanup
• Office and commercial cleaning

Our Process:
1. Initial consultation to understand your needs
2. Customized cleaning plan
3. Professional cleaning with quality products
4. Final inspection and satisfaction guarantee

Why Choose Us:
✓ Fully insured and bonded
✓ Background-checked professionals
✓ 100% satisfaction guarantee
✓ Flexible scheduling
✓ Eco-friendly cleaning products
✓ Same-day service available`,
  };

  // Combine images for slider
  const mainImage = serviceData.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop';
  const allServiceImages = [
    mainImage,
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&h=400&fit=crop',
  ];

  const imageSliderRef = useRef(null);

  const similarServices = mockListings
    .filter(item => item.category === 'Services' && item.id !== serviceData.id)
    .slice(0, 4);

  const handleItemPress = (item) => {
    navigation.navigate('ServiceDetails', { service: item });
  };

  const getPriceDisplay = () => {
    if (serviceData.priceType === 'per hour') {
      return `$${serviceData.price}/hour`;
    } else if (serviceData.priceType === 'per visit') {
      return `$${serviceData.price}/visit`;
    } else {
      return `$${serviceData.price}`;
    }
  };

  const handleSubmitBooking = () => {
    if (!bookingData.fullName || !bookingData.email || !bookingData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!selectedPackage) {
      Alert.alert('Error', 'Please select a service package');
      return;
    }
    
    // Handle booking submission
    Alert.alert(
      'Booking Submitted',
      'Your service booking has been submitted successfully! The provider will contact you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowBookingForm(false);
            setBookingData({
              fullName: '',
              email: '',
              phone: '',
              address: '',
              preferredDate: '',
              preferredTime: '',
              specialRequests: '',
            });
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Service Image */}
        <View style={styles.headerImageContainer}>
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
            {allServiceImages.map((img, index) => (
              <View key={index} style={styles.sliderItem}>
                <Image
                  source={{ uri: img }}
                  style={styles.headerImage}
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
                color="#FFFFFF"
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
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerIconButton, { marginLeft: spacing.sm }]}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <MaterialCommunityIcons
                  name={isFavorite ? "heart" : "heart-outline"}
                  size={24}
                  color={isFavorite ? '#EF4444' : "#FFFFFF"}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Indicator */}
          {allServiceImages.length > 1 && (
            <View style={styles.imageIndicator}>
              {allServiceImages.map((_, index) => (
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
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Provider Header */}
          <View style={styles.providerHeader}>
            <View style={[styles.providerAvatarContainer, { backgroundColor: theme.colors.surface }]}>
              <Image
                source={{ uri: serviceData.provider?.avatar || serviceData.image }}
                style={styles.providerAvatar}
                resizeMode="cover"
              />
              {serviceData.provider?.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color={theme.colors.success}
                  />
                </View>
              )}
            </View>
            <View style={styles.providerInfo}>
              <Text style={[styles.providerName, { color: theme.colors.text }]}>
                {serviceData.provider?.name || serviceData.seller?.name || 'Service Provider'}
              </Text>
              {serviceData.provider?.rating && (
                <View style={styles.providerRating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color={theme.colors.amber}
                  />
                  <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
                    {serviceData.provider.rating} ({serviceData.reviewsCount || 342} reviews)
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Service Title */}
          <Text style={[styles.serviceTitle, { color: theme.colors.text }]}>
            {serviceData.title}
          </Text>

          {/* Service Meta Info */}
          <View style={styles.serviceMeta}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={18}
                color={theme.colors.textSecondary}
              />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {serviceData.location}
              </Text>
            </View>
            {serviceData.price && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={18}
                  color={theme.colors.textSecondary}
                />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  {getPriceDisplay()}
                </Text>
              </View>
            )}
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoRow}>
            {serviceData.serviceArea && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: spacing.md }]}>
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {serviceData.serviceArea}
                </Text>
              </View>
            )}
            {serviceData.responseTime && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: 0 }]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {serviceData.responseTime}
                </Text>
              </View>
            )}
          </View>

          {/* Service Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              About This Service
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>
              {serviceData.description}
            </Text>
            {serviceData.fullDescription && (
              <Text style={[styles.descriptionText, { color: theme.colors.textSecondary, marginTop: spacing.md }]}>
                {serviceData.fullDescription}
              </Text>
            )}
          </View>

          {/* Features */}
          {serviceData.features && serviceData.features.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Features
              </Text>
              <View style={styles.featuresGrid}>
                {serviceData.features.map((feature, index) => (
                  <View key={index} style={[styles.featureItem, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <MaterialCommunityIcons
                      name={feature.icon}
                      size={24}
                      color={theme.colors.primary}
                    />
                    <Text style={[styles.featureText, { color: theme.colors.text }]}>
                      {feature.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Service Packages */}
          {serviceData.packages && serviceData.packages.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Service Packages
              </Text>
              {serviceData.packages.map((pkg) => (
                <TouchableOpacity
                  key={pkg.id}
                  onPress={() => setSelectedPackage(pkg.id)}
                  style={[
                    styles.packageCard,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: selectedPackage === pkg.id ? theme.colors.primary : theme.colors.border,
                      borderWidth: selectedPackage === pkg.id ? 2 : 1,
                    },
                  ]}
                >
                  {pkg.popular && (
                    <View style={[styles.popularBadge, { backgroundColor: theme.colors.amber }]}>
                      <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                  )}
                  <View style={styles.packageHeader}>
                    <Text style={[styles.packageName, { color: theme.colors.text }]}>
                      {pkg.name}
                    </Text>
                    <View style={styles.packagePriceRow}>
                      <Text style={[styles.packagePrice, { color: theme.colors.primary }]}>
                        ${pkg.price}
                      </Text>
                      <Text style={[styles.packageDuration, { color: theme.colors.textSecondary }]}>
                        {pkg.duration}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.packageIncludes}>
                    {pkg.includes && pkg.includes.map((item, idx) => (
                      <View key={idx} style={styles.packageIncludeItem}>
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={16}
                          color={theme.colors.success}
                          style={styles.includeIcon}
                        />
                        <Text style={[styles.packageIncludeText, { color: theme.colors.textSecondary }]}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Provider Information */}
          {serviceData.provider && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                About the Provider
              </Text>
              <View style={[styles.providerCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                {serviceData.provider.experience && (
                  <View style={styles.providerDetailRow}>
                    <MaterialCommunityIcons
                      name="account-clock"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.providerDetailText, { color: theme.colors.textSecondary }]}>
                      {serviceData.provider.experience} experience
                    </Text>
                  </View>
                )}
                {serviceData.provider.location && (
                  <View style={styles.providerDetailRow}>
                    <MaterialCommunityIcons
                      name="map-marker"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.providerDetailText, { color: theme.colors.textSecondary }]}>
                      {serviceData.provider.location}
                    </Text>
                  </View>
                )}
                {serviceData.availability && (
                  <View style={styles.providerDetailRow}>
                    <MaterialCommunityIcons
                      name="calendar-clock"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.providerDetailText, { color: theme.colors.textSecondary }]}>
                      {serviceData.availability}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Book Service Button */}
          <Button
            title="Book Service"
            onPress={() => setShowBookingForm(true)}
            style={styles.bookButton}
          />

          {/* Booking Form Modal */}
          <Modal
            visible={showBookingForm}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBookingForm(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                    Book {serviceData.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowBookingForm(false)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={24}
                      color={theme.colors.text}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  style={styles.modalBody}
                  contentContainerStyle={styles.modalBodyContent}
                  showsVerticalScrollIndicator={false}
                >
                  {/* Selected Package Display */}
                  {selectedPackage && serviceData.packages && (
                    <View style={[styles.selectedPackageCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                      <Text style={[styles.selectedPackageLabel, { color: theme.colors.textSecondary }]}>
                        Selected Package
                      </Text>
                      <Text style={[styles.selectedPackageName, { color: theme.colors.text }]}>
                        {serviceData.packages.find(p => p.id === selectedPackage)?.name || 'Standard Cleaning'}
                      </Text>
                      <Text style={[styles.selectedPackagePrice, { color: theme.colors.primary }]}>
                        ${serviceData.packages.find(p => p.id === selectedPackage)?.price || serviceData.price}
                      </Text>
                    </View>
                  )}

                  {/* Full Name */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Full Name <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Enter your full name"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={bookingData.fullName}
                      onChangeText={(text) => setBookingData({ ...bookingData, fullName: text })}
                    />
                  </View>

                  {/* Email */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Email <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Enter your email"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={bookingData.email}
                      onChangeText={(text) => setBookingData({ ...bookingData, email: text })}
                    />
                  </View>

                  {/* Phone */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Phone Number <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Enter your phone number"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="phone-pad"
                      value={bookingData.phone}
                      onChangeText={(text) => setBookingData({ ...bookingData, phone: text })}
                    />
                  </View>

                  {/* Address */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Service Address <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Enter service address"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={bookingData.address}
                      onChangeText={(text) => setBookingData({ ...bookingData, address: text })}
                    />
                  </View>

                  {/* Preferred Date */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Preferred Date <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Select preferred date"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={bookingData.preferredDate}
                      onChangeText={(text) => setBookingData({ ...bookingData, preferredDate: text })}
                    />
                  </View>

                  {/* Preferred Time */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Preferred Time <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TextInput
                      style={[styles.input, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="e.g., 10:00 AM - 2:00 PM"
                      placeholderTextColor={theme.colors.textSecondary}
                      value={bookingData.preferredTime}
                      onChangeText={(text) => setBookingData({ ...bookingData, preferredTime: text })}
                    />
                  </View>

                  {/* Special Requests */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Special Requests
                    </Text>
                    <TextInput
                      style={[styles.textArea, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Any special instructions or requests..."
                      placeholderTextColor={theme.colors.textSecondary}
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      value={bookingData.specialRequests}
                      onChangeText={(text) => setBookingData({ ...bookingData, specialRequests: text })}
                    />
                  </View>
                </ScrollView>

                {/* Modal Footer */}
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: theme.colors.backgroundSecondary }]}
                    onPress={() => setShowBookingForm(false)}
                  >
                    <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.submitButtonContainer}>
                    <Button
                      title="Submit Booking"
                      onPress={handleSubmitBooking}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* Similar Services */}
          {similarServices.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Similar Services
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarList}
              >
                {similarServices.map((item) => (
                  <View key={item.id} style={styles.similarItem}>
                    <ListingCard
                      listing={item}
                      onPress={() => handleItemPress(item)}
                      isDark={isDark}
                      style={styles.similarCard}
                    />
                  </View>
                ))}
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
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  // Header Image
  headerImageContainer: {
    width: screenWidth,
    height: 240,
    position: 'relative',
  },
  imageSlider: {
    width: screenWidth,
    height: 240,
  },
  sliderItem: {
    width: screenWidth,
    height: 240,
  },
  headerImage: {
    width: screenWidth,
    height: 240,
  },
  headerIcons: {
    position: 'absolute',
    top: spacing.md,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  // Image Indicator
  imageIndicator: {
    position: 'absolute',
    bottom: spacing.sm,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  indicatorDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 2.5,
  },
  indicatorDotActive: {
    backgroundColor: '#FFFFFF',
    width: 16,
  },
  // Content
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: theme.colors.background,
  },
  // Provider Header
  providerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -24,
    marginBottom: spacing.sm,
  },
  providerAvatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 3,
    marginRight: spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  providerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 29,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: 2,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  providerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  // Service Title
  serviceTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: 28,
  },
  // Service Meta
  serviceMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
    marginBottom: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.md,
    marginLeft: spacing.xs,
  },
  // Quick Info
  quickInfoRow: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  quickInfoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginRight: spacing.md,
  },
  quickInfoText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginLeft: spacing.sm,
    flex: 1,
  },
  // Sections
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  descriptionText: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  // Features
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs / 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 12,
    margin: spacing.xs / 2,
    width: (screenWidth - spacing.md * 2 - spacing.xs) / 2,
  },
  featureText: {
    fontSize: fontSize.xs,
    marginLeft: spacing.xs,
    flex: 1,
  },
  // Packages
  packageCard: {
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
  packageHeader: {
    marginBottom: spacing.md,
  },
  packageName: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  packagePriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  packagePrice: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginRight: spacing.sm,
  },
  packageDuration: {
    fontSize: fontSize.sm,
  },
  packageIncludes: {
    marginTop: spacing.sm,
  },
  packageIncludeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  includeIcon: {
    marginRight: spacing.sm,
  },
  packageIncludeText: {
    fontSize: fontSize.sm,
    flex: 1,
  },
  // Provider Card
  providerCard: {
    padding: spacing.md,
    borderRadius: theme.roundness,
  },
  providerDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  providerDetailText: {
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
  },
  // Book Button
  bookButton: {
    marginBottom: spacing.xl,
  },
  // Similar Services
  similarList: {
    paddingRight: spacing.md,
  },
  similarItem: {
    width: 280,
    marginRight: spacing.md,
  },
  similarCard: {
    marginBottom: 0,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: theme.roundness * 2,
    borderTopRightRadius: theme.roundness * 2,
    maxHeight: '90%',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
  },
  modalBodyContent: {
    padding: spacing.md,
    paddingBottom: spacing.md,
  },
  selectedPackageCard: {
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginBottom: spacing.md,
  },
  selectedPackageLabel: {
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  selectedPackageName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  selectedPackagePrice: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    height: 50,
    borderRadius: theme.roundness,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    fontSize: fontSize.md,
  },
  textArea: {
    minHeight: 100,
    borderRadius: theme.roundness,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    fontSize: fontSize.md,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.md,
    paddingBottom: 0,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    marginBottom: 0,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  submitButtonContainer: {
    flex: 2,
  },
});

export default ServiceDetailsScreen;
