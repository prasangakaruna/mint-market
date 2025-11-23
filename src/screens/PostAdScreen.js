import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import Button from '../components/Button';

const { width: screenWidth } = Dimensions.get('window');

const LISTING_TYPES = [
  { id: 'product', label: 'Product', icon: 'package-variant', color: '#3B82F6' },
  { id: 'job', label: 'Job', icon: 'briefcase', color: '#10B981' },
  { id: 'service', label: 'Service', icon: 'handshake', color: '#F59E0B' },
  { id: 'realestate', label: 'Real Estate', icon: 'home', color: '#8B5CF6' },
];

const CATEGORIES = {
  product: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Toys', 'Books', 'Other'],
  job: ['Technology', 'Healthcare', 'Education', 'Finance', 'Marketing', 'Sales', 'Other'],
  service: ['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Tutoring', 'Beauty', 'Other'],
  realestate: ['Apartment', 'House', 'Villa', 'Land', 'Commercial', 'Office', 'Other'],
};

const PostAdScreen = ({ navigation }) => {
  const [listingType, setListingType] = useState('product');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    // Product specific
    brand: '',
    condition: 'new',
    warranty: '',
    // Job specific
    jobType: 'fulltime',
    salary: '',
    experience: '',
    // Service specific
    priceType: 'perhour',
    serviceArea: '',
    availability: '',
    // Real Estate specific
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
  });
  const [images, setImages] = useState([]);
  const isDark = false;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = () => {
    // In a real app, this would open image picker
    Alert.alert('Image Upload', 'Image picker would open here');
    // Mock adding an image
    if (images.length < 10) {
      setImages([...images, 'https://via.placeholder.com/300x200']);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleCategorySelect = (category) => {
    handleInputChange('category', category);
    setShowCategoryModal(false);
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.title || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (listingType === 'product' && !formData.price) {
      Alert.alert('Error', 'Please enter a price');
      return;
    }

    if (listingType === 'job' && !formData.salary) {
      Alert.alert('Error', 'Please enter salary information');
      return;
    }

    if (listingType === 'service' && !formData.price) {
      Alert.alert('Error', 'Please enter service price');
      return;
    }

    if (listingType === 'realestate' && !formData.price) {
      Alert.alert('Error', 'Please enter property price');
      return;
    }

    Alert.alert('Success', 'Your listing has been posted successfully!');
    navigation.goBack();
  };

  const renderProductFields = () => (
    <>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Brand
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="Enter brand name"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.brand}
          onChangeText={(value) => handleInputChange('brand', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Condition *
        </Text>
        <View style={styles.radioGroup}>
          {['new', 'used', 'refurbished'].map((condition) => (
            <TouchableOpacity
              key={condition}
              style={[
                styles.radioButton,
                {
                  backgroundColor: formData.condition === condition ? theme.colors.primary : theme.colors.backgroundSecondary,
                  borderColor: formData.condition === condition ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => handleInputChange('condition', condition)}
            >
              <Text
                style={[
                  styles.radioText,
                  {
                    color: formData.condition === condition ? '#FFFFFF' : theme.colors.text,
                    fontWeight: formData.condition === condition ? '600' : '400',
                  },
                ]}
              >
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Warranty
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="e.g., 1 Year Manufacturer Warranty"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.warranty}
          onChangeText={(value) => handleInputChange('warranty', value)}
        />
      </View>
    </>
  );

  const renderJobFields = () => (
    <>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Job Type *
        </Text>
        <View style={styles.radioGroup}>
          {['fulltime', 'parttime', 'contract', 'internship'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.radioButton,
                {
                  backgroundColor: formData.jobType === type ? theme.colors.primary : theme.colors.backgroundSecondary,
                  borderColor: formData.jobType === type ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => handleInputChange('jobType', type)}
            >
              <Text
                style={[
                  styles.radioText,
                  {
                    color: formData.jobType === type ? '#FFFFFF' : theme.colors.text,
                    fontWeight: formData.jobType === type ? '600' : '400',
                  },
                ]}
              >
                {type === 'fulltime' ? 'Full-time' : type === 'parttime' ? 'Part-time' : type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Salary Range *
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="e.g., $50k - $70k or Negotiable"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.salary}
          onChangeText={(value) => handleInputChange('salary', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Experience Required
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="e.g., 3-5 years"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.experience}
          onChangeText={(value) => handleInputChange('experience', value)}
        />
      </View>
    </>
  );

  const renderServiceFields = () => (
    <>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Price Type *
        </Text>
        <View style={styles.radioGroup}>
          {['perhour', 'pervisit', 'fixed'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.radioButton,
                {
                  backgroundColor: formData.priceType === type ? theme.colors.primary : theme.colors.backgroundSecondary,
                  borderColor: formData.priceType === type ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => handleInputChange('priceType', type)}
            >
              <Text
                style={[
                  styles.radioText,
                  {
                    color: formData.priceType === type ? '#FFFFFF' : theme.colors.text,
                    fontWeight: formData.priceType === type ? '600' : '400',
                  },
                ]}
              >
                {type === 'perhour' ? 'Per Hour' : type === 'pervisit' ? 'Per Visit' : 'Fixed Price'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Service Area
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="e.g., Within 10 miles of downtown"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.serviceArea}
          onChangeText={(value) => handleInputChange('serviceArea', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Availability
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
          placeholder="e.g., Mon-Sat, 8 AM - 6 PM"
          placeholderTextColor={theme.colors.textTertiary}
          value={formData.availability}
          onChangeText={(value) => handleInputChange('availability', value)}
        />
      </View>
    </>
  );

  const renderRealEstateFields = () => (
    <>
      <View style={styles.field}>
        <Text style={[styles.label, { color: theme.colors.text }]}>
          Property Type *
        </Text>
        <View style={styles.radioGroup}>
          {['apartment', 'house', 'villa', 'land', 'commercial'].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.radioButton,
                {
                  backgroundColor: formData.propertyType === type ? theme.colors.primary : theme.colors.backgroundSecondary,
                  borderColor: formData.propertyType === type ? theme.colors.primary : theme.colors.border,
                },
              ]}
              onPress={() => handleInputChange('propertyType', type)}
            >
              <Text
                style={[
                  styles.radioText,
                  {
                    color: formData.propertyType === type ? '#FFFFFF' : theme.colors.text,
                    fontWeight: formData.propertyType === type ? '600' : '400',
                  },
                ]}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1, marginRight: spacing.sm }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Bedrooms
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
            placeholder="0"
            placeholderTextColor={theme.colors.textTertiary}
            value={formData.bedrooms}
            onChangeText={(value) => handleInputChange('bedrooms', value)}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.field, { flex: 1, marginLeft: spacing.sm }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Bathrooms
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
            placeholder="0"
            placeholderTextColor={theme.colors.textTertiary}
            value={formData.bathrooms}
            onChangeText={(value) => handleInputChange('bathrooms', value)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1, marginRight: spacing.sm }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Area (sq ft)
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
            placeholder="0"
            placeholderTextColor={theme.colors.textTertiary}
            value={formData.area}
            onChangeText={(value) => handleInputChange('area', value)}
            keyboardType="numeric"
          />
        </View>

        <View style={[styles.field, { flex: 1, marginLeft: spacing.sm }]}>
          <Text style={[styles.label, { color: theme.colors.text }]}>
            Year Built
          </Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
            placeholder="2024"
            placeholderTextColor={theme.colors.textTertiary}
            value={formData.yearBuilt}
            onChangeText={(value) => handleInputChange('yearBuilt', value)}
            keyboardType="numeric"
          />
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
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
            Post New Listing
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Listing Type Selector */}
        <View style={styles.typeSelector}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Select Listing Type
          </Text>
          <View style={styles.typeGrid}>
            {LISTING_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.typeCard,
                  {
                    backgroundColor: listingType === type.id ? type.color + '15' : theme.colors.backgroundSecondary,
                    borderColor: listingType === type.id ? type.color : theme.colors.border,
                    borderWidth: listingType === type.id ? 2 : 1,
                  },
                ]}
                onPress={() => setListingType(type.id)}
              >
                <View
                  style={[
                    styles.typeIconContainer,
                    { backgroundColor: listingType === type.id ? type.color : theme.colors.backgroundSecondary },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={type.icon}
                    size={24}
                    color={listingType === type.id ? '#FFFFFF' : type.color}
                  />
                </View>
                <Text
                  style={[
                    styles.typeLabel,
                    {
                      color: listingType === type.id ? type.color : theme.colors.text,
                      fontWeight: listingType === type.id ? '600' : '400',
                    },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Title */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Title *
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
              placeholder="Enter listing title"
              placeholderTextColor={theme.colors.textTertiary}
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          {/* Category */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Category *
            </Text>
            <TouchableOpacity
              style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary }]}
              onPress={() => setShowCategoryModal(true)}
            >
              <Text style={[styles.categoryText, { color: formData.category ? theme.colors.text : theme.colors.textTertiary }]}>
                {formData.category || 'Select a category'}
              </Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color={theme.colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          {/* Price */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              {listingType === 'job' ? 'Salary Range' : listingType === 'service' ? 'Service Price' : 'Price'} *
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
              placeholder={listingType === 'job' ? 'e.g., $50k - $70k' : listingType === 'service' ? 'Enter service price' : 'Enter price'}
              placeholderTextColor={theme.colors.textTertiary}
              value={listingType === 'job' ? formData.salary : formData.price}
              onChangeText={(value) => handleInputChange(listingType === 'job' ? 'salary' : 'price', value)}
              keyboardType="numeric"
            />
          </View>

          {/* Location */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Location
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
              placeholder="Enter location"
              placeholderTextColor={theme.colors.textTertiary}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </View>

          {/* Type-specific fields */}
          {listingType === 'product' && renderProductFields()}
          {listingType === 'job' && renderJobFields()}
          {listingType === 'service' && renderServiceFields()}
          {listingType === 'realestate' && renderRealEstateFields()}

          {/* Description */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Description
            </Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
              placeholder="Describe your listing..."
              placeholderTextColor={theme.colors.textTertiary}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Image Upload */}
          <View style={styles.field}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
              Photos ({images.length}/10)
            </Text>
            <View style={styles.imageUploadContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri: image }} style={styles.previewImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <MaterialCommunityIcons name="close-circle" size={24} color={theme.colors.error} />
                  </TouchableOpacity>
                </View>
              ))}
              {images.length < 10 && (
                <TouchableOpacity
                  style={[styles.uploadButton, { backgroundColor: theme.colors.backgroundSecondary }]}
                  onPress={handleImageUpload}
                >
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    size={32}
                    color={theme.colors.primary}
                  />
                  <Text style={[styles.uploadText, { color: theme.colors.textSecondary }]}>
                    Add Photo
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Submit Button */}
          <Button
            title="Post Listing"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Select Category
              </Text>
              <TouchableOpacity
                onPress={() => setShowCategoryModal(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={theme.colors.text}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={CATEGORIES[listingType] || []}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    {
                      backgroundColor: formData.category === item ? theme.colors.primary + '15' : theme.colors.backgroundSecondary,
                    },
                  ]}
                  onPress={() => handleCategorySelect(item)}
                >
                  <Text
                    style={[
                      styles.categoryItemText,
                      {
                        color: formData.category === item ? theme.colors.primary : theme.colors.text,
                        fontWeight: formData.category === item ? '600' : '400',
                      },
                    ]}
                  >
                    {item}
                  </Text>
                  {formData.category === item && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
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
  content: {
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  typeSelector: {
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  typeCard: {
    width: (screenWidth - spacing.md * 2 - spacing.xs * 2) / 2,
    padding: spacing.md,
    borderRadius: 12,
    margin: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
  },
  typeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  typeLabel: {
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  form: {
    padding: spacing.md,
  },
  field: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  input: {
    padding: spacing.sm,
    borderRadius: 12,
    fontSize: fontSize.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  textArea: {
    padding: spacing.sm,
    borderRadius: 12,
    fontSize: fontSize.sm,
    minHeight: 100,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryText: {
    flex: 1,
    fontSize: fontSize.sm,
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  radioButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    margin: spacing.xs,
    borderWidth: 1,
  },
  radioText: {
    fontSize: fontSize.xs,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: spacing.xs,
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
  },
  uploadButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    margin: spacing.xs,
  },
  uploadText: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs / 2,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: spacing.xl,
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
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  categoryItemText: {
    fontSize: fontSize.md,
  },
});

export default PostAdScreen;
