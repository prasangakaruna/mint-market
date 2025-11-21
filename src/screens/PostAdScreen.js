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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Using a simple dropdown approach instead of Picker
import { theme, spacing, fontSize } from '../theme/theme';
import Button from '../components/Button';
import { categories } from '../constants/mockListings';

const PostAdScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: '',
    type: 'sale', // For real estate
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
    if (images.length < 5) {
      setImages([...images, 'https://via.placeholder.com/300x200']);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    Alert.alert('Success', 'Your listing has been posted!');
    navigation.goBack();
  };

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
              onPress={() => {
                // In a real app, this would open a modal with category selection
                Alert.alert('Select Category', 'Category picker would open here');
              }}
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
              Price
            </Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.colors.backgroundSecondary, color: theme.colors.text }]}
              placeholder="Enter price"
              placeholderTextColor={theme.colors.textTertiary}
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
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
              Photos ({images.length}/5)
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
              {images.length < 5 && (
                <TouchableOpacity
                  style={[styles.uploadButton, { backgroundColor: theme.colors.backgroundSecondary }]}
                  onPress={handleImageUpload}
                >
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    size={32}
                    color={theme.colors.textSecondary}
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
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  form: {
    padding: spacing.md,
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    padding: spacing.md,
    borderRadius: theme.roundness,
    fontSize: fontSize.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textArea: {
    padding: spacing.md,
    borderRadius: theme.roundness,
    fontSize: fontSize.md,
    minHeight: 120,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryText: {
    flex: 1,
    fontSize: fontSize.md,
  },
  imageUploadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: theme.roundness,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  uploadButton: {
    width: 100,
    height: 100,
    borderRadius: theme.roundness,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});

export default PostAdScreen;

