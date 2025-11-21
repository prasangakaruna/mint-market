import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { theme } from '../theme/theme';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const [hasSeenWelcome, setHasSeenWelcome] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkWelcomeStatus();
  }, []);

  const checkWelcomeStatus = async () => {
    try {
      const seen = await AsyncStorage.getItem('hasSeenWelcome');
      setHasSeenWelcome(seen === 'true');
    } catch (error) {
      console.error('Error checking welcome status:', error);
      setHasSeenWelcome(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName={!hasSeenWelcome ? "Welcome" : "Onboarding"}
    >
      <Stack.Screen 
        name="Welcome" 
        component={WelcomeScreen}
      />
      <Stack.Screen 
        name="Onboarding" 
        component={PlaceholderScreen}
        initialParams={{ name: 'Onboarding' }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
