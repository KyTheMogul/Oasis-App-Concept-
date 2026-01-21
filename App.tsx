/**
 * Root application entry for the Oasis creator–brand deal marketplace.
 *
 * This file wires up:
 * - The root stack navigator for onboarding, auth, legal, and modal flows
 * - The bottom tab navigator for the authenticated main app experience
 * - The global grain overlay that sits visually above the entire app
 *
 * Navigation types are centralized in `types.ts` to keep routes type‑safe.
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from './theme';
import { RootStackParamList, MainTabParamList } from './types';
import GrainOverlay from './components/GrainOverlay';

// Auth & onboarding screens
import GetStartedScreen from './screens/GetStartedScreen';
import AuthScreen from './screens/AuthScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import OnboardingScreen from './screens/OnboardingScreen';

// Main app (authenticated) screens
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

// Centralized navigators typed with our shared navigation param lists
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Bottom tab navigator that powers the primary creator experience:
 * Hub (dashboard), Discover (browse deals), Messages, and Profile.
 */
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
          // Let the device safe‑area handle bottom insets instead of hard‑coding height
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

/**
 * Top‑level application component.
 *
 * Wraps the stack navigator in a `NavigationContainer` and places a global
 * animated grain overlay above all content for a consistent visual texture.
 */
export default function App() {
  return (
    <View style={styles.container}>
      {/* Main navigation tree */}
      <View style={{ flex: 1, zIndex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: theme.colors.background },
            }}
          >
            {/* Public / pre‑auth flows */}
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />

            {/* Main app and auxiliary screens */}
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
            {/* Root for the tabbed creator experience */}
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
