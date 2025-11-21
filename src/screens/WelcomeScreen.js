import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MintLogo from '../components/MintLogo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const onboardingData = [
    {
      id: 1,
      title: 'Discover Amazing Products',
      description: 'Browse through thousands of products, services, and job listings all in one place.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
      icon: 'store',
    },
    {
      id: 2,
      title: 'Buy & Sell Easily',
      description: 'Connect with buyers and sellers. List your items and find what you need.',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=400&fit=crop',
      icon: 'handshake',
    },
    {
      id: 3,
      title: 'Find Your Dream Job',
      description: 'Explore job opportunities and connect with employers. Your next career move is here.',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=400&fit=crop',
      icon: 'briefcase',
    },
    {
      id: 4,
      title: 'Get Started Today',
      description: 'Join thousands of users buying, selling, and discovering amazing opportunities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
      icon: 'rocket-launch',
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * screenWidth,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    // Navigate to the Onboarding screen which will auto sign in
    navigation.replace('Onboarding');
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    // Navigate to the Onboarding screen which will auto sign in
    navigation.replace('Onboarding');
  };

  const handleScroll = (event) => {
    const pageIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setCurrentPage(pageIndex);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <MintLogo width={100} height={45} color={theme.colors.brandGreen || '#1F7856'} />
      </View>

      {/* Skip Button */}
      {currentPage < onboardingData.length - 1 && (
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={[styles.skipText, { color: theme.colors.textSecondary }]}>
            Skip
          </Text>
        </TouchableOpacity>
      )}

      {/* Onboarding Slides */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
      >
        {onboardingData.map((item) => (
          <View key={item.id} style={styles.slide}>
            <View style={styles.slideContent}>
              {/* Image */}
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={[styles.iconContainer, { backgroundColor: theme.colors.brandGreenLight || '#D1FAE5' }]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={48}
                    color={theme.colors.brandGreen || '#1F7856'}
                  />
                </View>
              </View>

              {/* Content */}
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
                <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
                  {item.description}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Indicators */}
      <View style={styles.indicators}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor: index === currentPage ? (theme.colors.brandGreen || '#1F7856') : theme.colors.border,
                  width: index === currentPage ? 24 : 8,
                },
              ]}
          />
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {currentPage < onboardingData.length - 1 ? (
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: theme.colors.brandGreen || '#1F7856' }]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.customButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: theme.colors.brandGreen || '#1F7856' }]}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.customButtonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    position: 'absolute',
    top: spacing.lg,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 5,
    paddingTop: spacing.sm,
  },
  skipButton: {
    position: 'absolute',
    top: spacing.lg,
    right: spacing.md,
    zIndex: 10,
    padding: spacing.sm,
  },
  skipText: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  slide: {
    width: screenWidth,
    flex: 1,
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  imageContainer: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    marginBottom: spacing.xl,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: theme.roundness * 2,
  },
  iconContainer: {
    position: 'absolute',
    bottom: -spacing.md,
    right: -spacing.md,
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: fontSize.lg,
    textAlign: 'center',
    lineHeight: 28,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  actions: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  customButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: theme.roundness,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  customButtonText: {
    color: '#FFFFFF',
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});

export default WelcomeScreen;

