import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';  // Native StatusBar (no Expo prefix)
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/utils/auth';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}