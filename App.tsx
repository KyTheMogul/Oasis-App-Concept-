import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';
import { RootStackParamList, MainTabParamList } from './types';
import GrainOverlay from './components/GrainOverlay';

// Auth Screens
import GetStartedScreen from './screens/GetStartedScreen';
import AuthScreen from './screens/AuthScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import OnboardingScreen from './screens/OnboardingScreen';

// Main App Screens
import HubScreen from './screens/HubScreen';
import DiscoverScreen from './screens/DiscoverScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatementsScreen from './screens/StatementsScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import DealDetailScreen from './screens/DealDetailScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import WithdrawSuccessScreen from './screens/WithdrawSuccessScreen';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          paddingTop: 8,
          // Removed fixed height and bottom padding to allow Safe Area to handle it correctly
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Hub"
        component={HubScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, zIndex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          >
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Statements" component={StatementsScreen} />
            <Stack.Screen name="QRCode" component={QRCodeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="DealDetail"
              component={DealDetailScreen}
              options={{
                headerShown: false,
                animation: 'slide_from_bottom',
                gestureDirection: 'vertical',
              }}
            />
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
            <Stack.Screen
              name="Withdraw"
              component={WithdrawScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WithdrawSuccess"
              component={WithdrawSuccessScreen}
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>

      {/* Grain overlay effect - Explicitly highest Z-Index */}
      <View style={styles.overlayContainer} pointerEvents="none">
        <GrainOverlay
          animate={true}
          grainOpacity={0.05}
          grainDensity={2}
          grainSpeed={125}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    elevation: 9999, // For Android
  },
});
