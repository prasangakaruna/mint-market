import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme, spacing, fontSize } from '../theme/theme';

const ProfileScreen = ({ navigation }) => {
  const isDark = false;

  const menuItems = [
    {
      id: 'listings',
      title: 'My Listings',
      icon: 'format-list-bulleted',
      onPress: () => {
        // Navigate to user's listings
      },
    },
    {
      id: 'favorites',
      title: 'Favorites',
      icon: 'heart-outline',
      onPress: () => {
        // Navigate to favorites
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'cog-outline',
      onPress: () => {
        // Navigate to settings
      },
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {
        // Navigate to help
      },
    },
    {
      id: 'about',
      title: 'About',
      icon: 'information-outline',
      onPress: () => {
        // Navigate to about
      },
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <TouchableOpacity style={[styles.editButton, { backgroundColor: theme.colors.backgroundSecondary }]}>
              <MaterialCommunityIcons
                name="camera-outline"
                size={20}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.name, { color: theme.colors.text }]}>
            John Doe
          </Text>
          <Text style={[styles.email, { color: theme.colors.textSecondary }]}>
            john.doe@example.com
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>12</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Listings</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>8</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Favorites</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.text }]}>4.8</Text>
              <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, { backgroundColor: theme.colors.surface }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: theme.colors.brandGreenLight }]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color={theme.colors.primary}
                  />
                </View>
                <Text style={[styles.menuItemText, { color: theme.colors.text }]}>
                  {item.title}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={theme.colors.textTertiary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => {
            // Handle logout
          }}
        >
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color={theme.colors.error}
          />
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>
            Logout
          </Text>
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: fontSize.xxl,
    fontWeight: '700',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.surface,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: 2,
  },
  email: {
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: fontSize.sm,
  },
  statDivider: {
    width: 1,
    height: 40,
    marginHorizontal: spacing.md,
  },
  menuContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
    borderRadius: theme.roundness * 1.5,
    marginBottom: spacing.sm,
    shadowColor: theme.colors.shadowDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.roundness * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  menuItemText: {
    fontSize: fontSize.md,
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    borderRadius: theme.roundness,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  logoutText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
});

export default ProfileScreen;

