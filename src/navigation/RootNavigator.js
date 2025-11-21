import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import ElectronicsProductDetailsScreen from '../screens/ElectronicsProductDetailsScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import { theme } from '../theme/theme';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.surface,
          elevation: 4,
          shadowColor: theme.colors.shadowDark,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 8,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          color: theme.colors.text,
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen 
            name="CategoryListing" 
            component={CategoryListingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ListingDetails" 
            component={ListingDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ElectronicsProductDetails" 
            component={ElectronicsProductDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ServiceDetails" 
            component={ServiceDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="JobDetails" 
            component={JobDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
