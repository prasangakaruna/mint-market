import React, { useState } from 'react';
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

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cvFile: null,
    cvFileName: '',
  });
  const isDark = false;

  // Fallback if job is not provided
  const jobData = job || {
    id: '7',
    title: 'Senior Software Engineer - Remote',
    category: 'Jobs',
    location: 'Remote',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
    description: 'Looking for an experienced software engineer to join our growing team. Full-time remote position.',
    salary: '$120k - $150k',
    jobType: 'Full-time',
    experience: '5+ years',
    company: {
      name: 'Tech Corp',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
      rating: 4.9,
      size: '500-1000 employees',
      industry: 'Technology',
      website: 'www.techcorp.com',
    },
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of experience in software development',
      'Proficiency in JavaScript, React, Node.js',
      'Experience with cloud platforms (AWS, Azure)',
      'Strong problem-solving and communication skills',
    ],
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) matching',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget',
      'Unlimited PTO',
    ],
    postedDate: '2 days ago',
  };

  const similarJobs = mockListings
    .filter(item => item.category === 'Jobs' && item.id !== jobData.id)
    .slice(0, 4);

  const handleItemPress = (item) => {
    navigation.navigate('JobDetails', { job: item });
  };

  const handleCVUpload = () => {
    // In a real app, this would use expo-document-picker or similar
    // For now, we'll simulate file selection
    Alert.alert(
      'Upload CV',
      'Select CV file',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Choose File',
          onPress: () => {
            // Simulate file selection
            setFormData({
              ...formData,
              cvFile: { uri: 'file:///path/to/cv.pdf' },
              cvFileName: 'my_resume.pdf',
            });
          },
        },
      ]
    );
  };

  const handleSubmitApplication = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (!formData.cvFile) {
      Alert.alert('Error', 'Please upload your CV');
      return;
    }
    
    // Handle form submission
    Alert.alert(
      'Application Submitted',
      'Your application has been submitted successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            setShowApplicationForm(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              coverLetter: '',
              cvFile: null,
              cvFileName: '',
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
        {/* Header with Company Image */}
        <View style={styles.headerImageContainer}>
          <Image
            source={{ uri: jobData.image || jobData.company?.logo }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <View style={styles.headerOverlay}>
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
                    name={isFavorite ? "bookmark" : "bookmark-outline"}
                    size={24}
                    color={isFavorite ? theme.colors.amber : "#FFFFFF"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Company Logo and Info */}
          <View style={styles.companyHeader}>
            <View style={[styles.companyLogoContainer, { backgroundColor: theme.colors.surface }]}>
              <Image
                source={{ uri: jobData.company?.logo || jobData.image }}
                style={styles.companyLogo}
                resizeMode="cover"
              />
            </View>
            <View style={styles.companyInfo}>
              <Text style={[styles.companyName, { color: theme.colors.text }]}>
                {jobData.company?.name || jobData.seller?.name || 'Company Name'}
              </Text>
              {jobData.company?.rating && (
                <View style={styles.companyRating}>
                  <MaterialCommunityIcons
                    name="star"
                    size={16}
                    color={theme.colors.amber}
                  />
                  <Text style={[styles.ratingText, { color: theme.colors.textSecondary }]}>
                    {jobData.company.rating} ({jobData.company.size || '500-1000 employees'})
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Job Title */}
          <Text style={[styles.jobTitle, { color: theme.colors.text }]}>
            {jobData.title}
          </Text>

          {/* Job Meta Info */}
          <View style={styles.jobMeta}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="map-marker"
                size={18}
                color={theme.colors.textSecondary}
              />
              <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                {jobData.location}
              </Text>
            </View>
            {jobData.salary && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="currency-usd"
                  size={18}
                  color={theme.colors.textSecondary}
                />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  {jobData.salary}
                </Text>
              </View>
            )}
            {jobData.jobType && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="briefcase"
                  size={18}
                  color={theme.colors.textSecondary}
                />
                <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
                  {jobData.jobType}
                </Text>
              </View>
            )}
          </View>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoRow}>
            {jobData.experience && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: spacing.md }]}>
                <MaterialCommunityIcons
                  name="account-clock"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {jobData.experience}
                </Text>
              </View>
            )}
            {jobData.postedDate && (
              <View style={[styles.quickInfoCard, { backgroundColor: theme.colors.backgroundSecondary, marginRight: 0 }]}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text style={[styles.quickInfoText, { color: theme.colors.text }]}>
                  {jobData.postedDate}
                </Text>
              </View>
            )}
          </View>

          {/* Job Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Job Description
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary }]}>
              {jobData.description}
            </Text>
            <Text style={[styles.descriptionText, { color: theme.colors.textSecondary, marginTop: spacing.md }]}>
              We are looking for a talented Senior Software Engineer to join our dynamic team. You will be responsible for designing, developing, and maintaining high-quality software solutions. The ideal candidate will have a strong background in modern web technologies and a passion for creating innovative solutions.
            </Text>
          </View>

          {/* Requirements */}
          {jobData.requirements && jobData.requirements.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Requirements
              </Text>
              {jobData.requirements.map((req, index) => (
                <View key={index} style={styles.listItem}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={18}
                    color={theme.colors.primary}
                    style={styles.listIcon}
                  />
                  <Text style={[styles.listText, { color: theme.colors.textSecondary }]}>
                    {req}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Benefits */}
          {jobData.benefits && jobData.benefits.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Benefits & Perks
              </Text>
              <View style={styles.benefitsGrid}>
                {jobData.benefits.map((benefit, index) => (
                  <View key={index} style={[styles.benefitItem, { backgroundColor: theme.colors.backgroundSecondary }]}>
                    <MaterialCommunityIcons
                      name="star-circle"
                      size={20}
                      color={theme.colors.primary}
                    />
                    <Text style={[styles.benefitText, { color: theme.colors.text }]}>
                      {benefit}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Company Information */}
          {jobData.company && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                About the Company
              </Text>
              <View style={[styles.companyCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
                <View style={styles.companyDetailRow}>
                  <MaterialCommunityIcons
                    name="office-building"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <Text style={[styles.companyDetailText, { color: theme.colors.textSecondary }]}>
                    {jobData.company.size || '500-1000 employees'}
                  </Text>
                </View>
                {jobData.company.industry && (
                  <View style={styles.companyDetailRow}>
                    <MaterialCommunityIcons
                      name="domain"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.companyDetailText, { color: theme.colors.textSecondary }]}>
                      {jobData.company.industry}
                    </Text>
                  </View>
                )}
                {jobData.company.website && (
                  <View style={styles.companyDetailRow}>
                    <MaterialCommunityIcons
                      name="web"
                      size={20}
                      color={theme.colors.textSecondary}
                    />
                    <Text style={[styles.companyDetailText, { color: theme.colors.primary }]}>
                      {jobData.company.website}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Application Button */}
          <Button
            title="Apply Now"
            onPress={() => setShowApplicationForm(true)}
            style={styles.applyButton}
          />

          {/* Application Form Modal */}
          <Modal
            visible={showApplicationForm}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowApplicationForm(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
                <View style={styles.modalHeader}>
                  <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                    Apply for {jobData.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowApplicationForm(false)}
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
                      value={formData.fullName}
                      onChangeText={(text) => setFormData({ ...formData, fullName: text })}
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
                      value={formData.email}
                      onChangeText={(text) => setFormData({ ...formData, email: text })}
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
                      value={formData.phone}
                      onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    />
                  </View>

                  {/* Cover Letter */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Cover Letter
                    </Text>
                    <TextInput
                      style={[styles.textArea, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                      }]}
                      placeholder="Tell us why you're a great fit for this position..."
                      placeholderTextColor={theme.colors.textSecondary}
                      multiline
                      numberOfLines={6}
                      textAlignVertical="top"
                      value={formData.coverLetter}
                      onChangeText={(text) => setFormData({ ...formData, coverLetter: text })}
                    />
                  </View>

                  {/* CV Upload */}
                  <View style={styles.formGroup}>
                    <Text style={[styles.label, { color: theme.colors.text }]}>
                      Upload CV/Resume <Text style={{ color: theme.colors.error }}>*</Text>
                    </Text>
                    <TouchableOpacity
                      style={[styles.uploadButton, { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        borderColor: theme.colors.border,
                      }]}
                      onPress={handleCVUpload}
                    >
                      {formData.cvFile ? (
                        <View style={styles.uploadedFile}>
                          <MaterialCommunityIcons
                            name="file-document"
                            size={24}
                            color={theme.colors.primary}
                          />
                          <View style={styles.uploadedFileInfo}>
                            <Text style={[styles.uploadedFileName, { color: theme.colors.text }]}>
                              {formData.cvFileName}
                            </Text>
                            <Text style={[styles.uploadedFileSize, { color: theme.colors.textSecondary }]}>
                              Tap to change file
                            </Text>
                          </View>
                          <MaterialCommunityIcons
                            name="check-circle"
                            size={20}
                            color={theme.colors.success}
                          />
                        </View>
                      ) : (
                        <View style={styles.uploadPlaceholder}>
                          <MaterialCommunityIcons
                            name="cloud-upload-outline"
                            size={32}
                            color={theme.colors.primary}
                          />
                          <Text style={[styles.uploadText, { color: theme.colors.text }]}>
                            Tap to upload CV/Resume
                          </Text>
                          <Text style={[styles.uploadHint, { color: theme.colors.textSecondary }]}>
                            PDF, DOC, DOCX (Max 5MB)
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                {/* Modal Footer */}
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[styles.cancelButton, { backgroundColor: theme.colors.backgroundSecondary }]}
                    onPress={() => setShowApplicationForm(false)}
                  >
                    <Text style={[styles.cancelButtonText, { color: theme.colors.textSecondary }]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.submitButtonContainer}>
                    <Button
                      title="Submit Application"
                      onPress={handleSubmitApplication}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>

          {/* Similar Jobs */}
          {similarJobs.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                Similar Jobs
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.similarList}
              >
                {similarJobs.map((item) => (
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
    height: 180,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  // Content
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: theme.colors.background,
  },
  // Company Header
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -24,
    marginBottom: spacing.sm,
  },
  companyLogoContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    padding: 3,
    marginRight: spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyLogo: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: fontSize.md,
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  companyRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: fontSize.sm,
    marginLeft: spacing.xs,
  },
  // Job Title
  jobTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    marginBottom: spacing.sm,
    lineHeight: 28,
  },
  // Job Meta
  jobMeta: {
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
  // List Items
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  listIcon: {
    marginRight: spacing.sm,
    marginTop: 2,
  },
  listText: {
    fontSize: fontSize.md,
    lineHeight: 24,
    flex: 1,
  },
  // Benefits
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs / 2,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 12,
    margin: spacing.xs / 2,
    width: (screenWidth - spacing.md * 2 - spacing.xs) / 2,
  },
  benefitText: {
    fontSize: fontSize.xs,
    flex: 1,
    marginLeft: spacing.xs,
  },
  // Company Card
  companyCard: {
    padding: spacing.sm,
    borderRadius: 12,
  },
  companyDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  companyDetailText: {
    fontSize: fontSize.md,
    marginLeft: spacing.sm,
  },
  // Apply Button
  applyButton: {
    marginBottom: spacing.xl,
  },
  // Similar Jobs
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
  uploadButton: {
    borderRadius: theme.roundness,
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPlaceholder: {
    alignItems: 'center',
  },
  uploadText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  uploadHint: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  uploadedFile: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  uploadedFileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  uploadedFileName: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  uploadedFileSize: {
    fontSize: fontSize.sm,
    marginTop: spacing.xs / 2,
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
    marginLeft: spacing.md,
  },
});

export default JobDetailsScreen;

