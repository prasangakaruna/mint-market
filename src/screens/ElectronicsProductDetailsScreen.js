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

const ElectronicsProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('Description');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const isDark = false;

  // Fallback if product is not provided
  const productData = product || {
    id: '1',
    name: 'iPhone 15 Pro Max',
    title: 'iPhone 15 Pro Max - 256GB',
    brand: 'Apple',
    model: 'A3101',
    condition: 'Brand New',
    shortDescription: 'Latest flagship smartphone with A17 Pro chip',
    rating: 4.8,
    reviewsCount: 1247,
    price: 1099,
    originalPrice: 1299,
    discount: 15,
    color: 'Natural Titanium',
    storage: '256GB',
    warranty: '1 Year Manufacturer Warranty',
    shipping: 'Free Shipping',
    returnPolicy: '30 Days Return Policy',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop',
    location: 'New York, NY',
    description: 'The iPhone 15 Pro Max features the revolutionary A17 Pro chip, delivering unprecedented performance and efficiency.',
    fullDescription: `The iPhone 15 Pro Max features the revolutionary A17 Pro chip, delivering unprecedented performance and efficiency. With a stunning 6.7-inch Super Retina XDR display, this device offers an immersive viewing experience.

Key Features:
• A17 Pro chip with 6-core CPU and 6-core GPU
• 6.7-inch Super Retina XDR display with ProMotion
• 48MP Main camera with 2x Telephoto zoom
• 12MP Ultra Wide and Telephoto cameras
• Action Button for quick access to functions
• Titanium design for durability and premium feel
• USB-C connectivity
• Up to 29 hours video playback
• iOS 17 with advanced privacy features`,
    specifications: [
      { icon: 'cpu-64-bit', label: 'A17 Pro', value: 'Chip' },
      { icon: 'memory', label: '8GB', value: 'RAM' },
      { icon: 'harddisk', label: '256GB', value: 'Storage' },
      { icon: 'monitor', label: '6.7"', value: 'Display' },
      { icon: 'battery', label: '4441mAh', value: 'Battery' },
      { icon: 'shield-check', label: '1 Year', value: 'Warranty' },
    ],
    seller: {
      name: 'TechStore Pro',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 4.9,
      verified: true,
      reviews: 5234,
    },
  };

  // Combine images for slider
  const mainImage = productData.image || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop';
  const allProductImages = [
    mainImage,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
  ];

  const imageSliderRef = useRef(null);

  const similarProducts = mockListings
    .filter(item => item.category === 'Electronics' && item.id !== productData.id)
    .slice(0, 4);

  const handleItemPress = (item) => {
    navigation.navigate('ElectronicsProductDetails', { product: item });
  };

  const handleSubmitContact = () => {
    if (!contactData.fullName || !contactData.email || !contactData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    // Handle contact form submission
    Alert.alert(
      'Message Sent',
      'Your message has been sent to the seller. They will contact you soon.',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowContactForm(false);
            setContactData({
              fullName: '',
              email: '',
              phone: '',
              message: '',
            });
          },
        },
      ]
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return (
          <View style={styles.tabContent}>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>
              {productData.description}
            </Text>
            {productData.fullDescription && (
              <Text style={[styles.descriptionText, { color: theme.colors.textSecondary, marginTop: spacing.md }]}>
                {productData.fullDescription}
              </Text>
            )}
          </View>
        );
      case 'Specifications':
        return (
          <View style={styles.tabContent}>
            {productData.specifications && productData.specifications.length > 0 && (
              <View style={styles.specsGrid}>
                {productData.specifications.map((spec, index) => (
                  <View key={index} style={[styles.specItem, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <MaterialCommunityIcons
                      name={spec.icon}
                      size={24}
                      color={theme.colors.primary}
                    />
                    <Text style={[styles.specLabel, { color: theme.colors.textSecondary }]}>
                      {spec.label}
                    </Text>
                    <Text style={[styles.specValue, { color: theme.colors.text }]}>
                      {spec.value}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        );
      case 'Reviews':
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
        {/* Header with Product Image */}
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
            {allProductImages.map((img, index) => (
              <View key={index} style={styles.sliderItem}>
                <Image
                  source={{ uri: img }}
                  style={styles.headerImage}
                  resizeMode="contain"
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
          {allProductImages.length > 1 && (
            <View style={styles.imageIndicator}>
              {allProductImages.map((_, index) => (
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
          {/* Brand and Condition */}
          <View style={styles.brandRow}>
            {productData.brand && (
              <View style={[styles.brandBadge, { backgroundColor: theme.colors.brandBlueLight }]}>
                <Text style={[styles.brandText, { color: theme.colors.primary }]}>
                  {productData.brand}
                </Text>
              </View>
            )}
            {productData.condition && (
              <View style={[styles.conditionBadge, { backgroundColor: theme.colors.backgroundSecondary }]}>
                <MaterialCommunityIcons
                  name="package-variant"
                  size={14}
                  color={theme.colors.success}
                />
                <Text style={[styles.conditionText, { color: theme.colors.success }]}>
                  {productData.condition}
                </Text>
              </View>
            )}
          </View>

          {/* Product Name */}
          <Text style={[styles.productName, { color: theme.colors.text }]}>
            {productData.name || productData.title}
          </Text>

          {/* Rating and Reviews */}
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons
                name="star"
                size={20}
                color={theme.colors.amber}
              />
              <Text style={[styles.ratingText, { color: theme.colors.text, marginLeft: spacing.xs }]}>
                {productData.rating || 4.8} ({productData.reviewsCount || 1247} reviews)
              </Text>
            </View>
          </View>

          {/* Price Section */}
          <View style={[styles.priceCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <View style={styles.priceRow}>
              <View style={styles.priceInfo}>
                <Text style={[styles.price, { color: theme.colors.primary }]}>
                  ${productData.price?.toLocaleString() || '1,099'}
                </Text>
                {productData.originalPrice && (
                  <Text style={[styles.originalPrice, { color: theme.colors.textSecondary }]}>
                    ${productData.originalPrice.toLocaleString()}
                  </Text>
                )}
              </View>
              {productData.discount && (
                <View style={[styles.discountBadge, { backgroundColor: theme.colors.error }]}>
                  <Text style={styles.discountText}>
                    -{productData.discount}%
                  </Text>
                </View>
              )}
            </View>
            {productData.shipping && (
              <View style={styles.shippingRow}>
                <MaterialCommunityIcons
                  name="truck-delivery"
                  size={18}
                  color={theme.colors.success}
                />
                <Text style={[styles.shippingText, { color: theme.colors.textSecondary }]}>
                  {productData.shipping}
                </Text>
              </View>
            )}
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoRow}>
            {productData.storage && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: spacing.md }]}>
                <MaterialCommunityIcons
                  name="harddisk"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {productData.storage}
                </Text>
              </View>
            )}
            {productData.color && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: spacing.md }]}>
                <MaterialCommunityIcons
                  name="palette"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {productData.color}
                </Text>
              </View>
            )}
            {productData.warranty && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: 0 }]}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  Warranty
                </Text>
              </View>
            )}
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabsContainer}>
            {['Description', 'Specifications', 'Reviews'].map((tab) => (
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

          {/* Seller Information */}
          {productData.seller && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Seller Information
              </Text>
              <View style={[styles.sellerCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                <View style={styles.sellerHeader}>
                  <Image
                    source={{ uri: productData.seller.avatar }}
                    style={styles.sellerAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.sellerInfo}>
                    <View style={styles.sellerNameRow}>
                      <Text style={[styles.sellerName, { color: theme.colors.text }]}>
                        {productData.seller.name}
                      </Text>
                      {productData.seller.verified && (
                        <MaterialCommunityIcons
                          name="check-circle"
                          size={18}
                          color={theme.colors.success}
                          style={styles.verifiedIcon}
                        />
                      )}
                    </View>
                    <View style={styles.sellerRating}>
                      <MaterialCommunityIcons
                        name="star"
                        size={16}
                        color={theme.colors.amber}
                      />
                      <Text style={[styles.sellerRatingText, { color: theme.colors.textSecondary }]}>
                        {productData.seller.rating} ({productData.seller.reviews || 5234} reviews)
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.contactButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setShowContactForm(true)}
            >
              <MaterialCommunityIcons
                name="message-text-outline"
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.contactButtonText}>
                Contact Seller
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.favoriteButton, { 
                backgroundColor: isFavorite ? theme.colors.error : theme.colors.backgroundSecondary 
              }]}
              onPress={() => setIsFavorite(!isFavorite)}
            >
              <MaterialCommunityIcons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#FFFFFF" : theme.colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Similar Products
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarList}
              >
                {similarProducts.map((item) => (
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

      {/* Contact Form Modal */}
      <Modal
        visible={showContactForm}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowContactForm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Contact Seller
              </Text>
              <TouchableOpacity
                onPress={() => setShowContactForm(false)}
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
              {/* Seller Info */}
              {productData.seller && (
                <View style={[styles.sellerInfoCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                  <Image
                    source={{ uri: productData.seller.avatar }}
                    style={styles.sellerInfoAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.sellerInfoText}>
                    <Text style={[styles.sellerInfoName, { color: theme.colors.text }]}>
                      {productData.seller.name}
                    </Text>
                    <Text style={[styles.sellerInfoProduct, { color: theme.colors.textSecondary }]}>
                      About: {productData.name || productData.title}
                    </Text>
                  </View>
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
                  value={contactData.fullName}
                  onChangeText={(text) => setContactData({ ...contactData, fullName: text })}
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
                  value={contactData.email}
                  onChangeText={(text) => setContactData({ ...contactData, email: text })}
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
                  value={contactData.phone}
                  onChangeText={(text) => setContactData({ ...contactData, phone: text })}
                />
              </View>

              {/* Message */}
              <View style={styles.formGroup}>
                <Text style={[styles.label, { color: theme.colors.text }]}>
                  Message
                </Text>
                <TextInput
                  style={[styles.textArea, { 
                    backgroundColor: theme.colors.backgroundSecondary,
                    color: theme.colors.text,
                    borderColor: theme.colors.border,
                  }]}
                  placeholder="Type your message to the seller..."
                  placeholderTextColor={theme.colors.textSecondary}
                  multiline
                  numberOfLines={5}
                  textAlignVertical="top"
                  value={contactData.message}
                  onChangeText={(text) => setContactData({ ...contactData, message: text })}
                />
              </View>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.cancelButton, { backgroundColor: theme.colors.backgroundSecondary }]}
                onPress={() => setShowContactForm(false)}
              >
                <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={styles.submitButtonContainer}>
                <Button
                  title="Send Message"
                  onPress={handleSubmitContact}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
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
    height: 300,
    position: 'relative',
    backgroundColor: theme.colors.backgroundSecondary,
  },
  imageSlider: {
    width: screenWidth,
    height: 300,
  },
  sliderItem: {
    width: screenWidth,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
  },
  headerImage: {
    width: '100%',
    height: '100%',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    marginHorizontal: 2.5,
  },
  indicatorDotActive: {
    backgroundColor: theme.colors.primary,
    width: 16,
  },
  // Content
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: theme.colors.background,
  },
  // Brand Row
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  brandBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.xs,
    marginBottom: spacing.xs / 2,
  },
  brandText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  conditionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.xs,
    marginBottom: spacing.xs / 2,
  },
  conditionText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginLeft: spacing.xs / 2,
  },
  // Product Name
  productName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
    lineHeight: 28,
  },
  // Rating Row
  ratingRow: {
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  // Price Card
  priceCard: {
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  priceInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginRight: spacing.xs,
  },
  originalPrice: {
    fontSize: fontSize.md,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: fontSize.sm,
    fontWeight: '700',
  },
  shippingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  // Quick Info
  quickInfoRow: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  quickInfoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 12,
    marginRight: spacing.sm,
  },
  quickInfoText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    marginLeft: spacing.xs,
    flex: 1,
  },
  // Navigation Tabs
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
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
    marginTop: spacing.sm,
  },
  descriptionText: {
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  // Specifications
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs / 2,
  },
  specItem: {
    width: (screenWidth - spacing.md * 2 - spacing.xs) / 2,
    padding: spacing.sm,
    borderRadius: 12,
    margin: spacing.xs / 2,
    alignItems: 'center',
  },
  specLabel: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs / 2,
    marginBottom: 2,
  },
  specValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  // Sections
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  // Seller Card
  sellerCard: {
    padding: spacing.sm,
    borderRadius: 12,
  },
  sellerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: spacing.md,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  sellerName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
  },
  sellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerRatingText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginRight: spacing.md,
  },
  contactButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
    color: '#FFFFFF',
  },
  favoriteButton: {
    width: 56,
    height: 56,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Similar Products
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
  sellerInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: theme.roundness,
    marginBottom: spacing.md,
  },
  sellerInfoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  sellerInfoText: {
    flex: 1,
  },
  sellerInfoName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.xs / 2,
  },
  sellerInfoProduct: {
    fontSize: fontSize.sm,
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
    minHeight: 120,
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

export default ElectronicsProductDetailsScreen;
