import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const PlaceholderScreen = ({ route, navigation }) => {
  const { signIn } = useAuth();
  const screenName = route?.params?.name || 'Screen';

  const handleSignIn = async () => {
    // Auto sign in for demo purposes
    await signIn('demo@example.com', 'password');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <MaterialCommunityIcons
          name="store"
          size={80}
          color={theme.colors.primary}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to Marketplace
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Buy, sell, and discover amazing products
        </Text>
        <Button
          title="Get Started"
          onPress={handleSignIn}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
});

export default PlaceholderScreen;

