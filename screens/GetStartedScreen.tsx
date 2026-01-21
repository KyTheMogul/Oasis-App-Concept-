/**
 * Initial marketing / hero screen shown on first launch.
 *
 * This screen introduces the Oasis brand and core value prop
 * (“Monetize your influence. Connect with premium brands.”) and
 * funnels the user into the auth flow via a swipe interaction.
 */
import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types';
import SwipeButton from '../components/SwipeButton';
import { theme } from '../theme';

const { width, height } = Dimensions.get('window');

type GetStartedScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GetStarted'>;

export default function GetStartedScreen() {
    const navigation = useNavigation<GetStartedScreenNavigationProp>();

    /**
     * Handle completion of the swipe CTA.
     * A short delay allows the swipe animation to feel finished
     * before transitioning into the auth stack.
     */
    const handleGetStarted = () => {
        setTimeout(() => {
            navigation.navigate('Auth');
        }, 300);
    };

    return (
        <View style={styles.container}>
            {/* Background hero art matching the dark purple/black theme */}
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop' }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Helper gradient to slightly darken the image overall */}
                <View style={styles.overlay} />

                {/* Bottom Black Gradient (Transparent to Black) */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)', '#000000']}
                    locations={[0, 0.4, 0.7, 1]}
                    style={styles.bottomGradient}
                />

                <SafeAreaView style={styles.content}>
                    <View style={styles.spacer} />

                    {/* Text Content - Bottom Aligned, Left Aligned */}
                    <View style={styles.textContainer}>
                        <Text style={styles.appName}>Oasis</Text>
                        <Text style={styles.tagline}>
                            Monetize your influence.{'\n'}Connect with premium brands.
                        </Text>
                        {/* Removed detailed description as requested */}
                    </View>

                    {/* Swipe Button */}
                    <View style={styles.buttonContainer}>
                        <SwipeButton onSwipeComplete={handleGetStarted} />
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background, // Fallback
    },
    backgroundImage: {
        flex: 1,
        width: width,
        height: height,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10, 10, 15, 0.3)', // Subtle tint
    },
    bottomGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.6, // Covers bottom 60%
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    spacer: {
        flex: 1,
    },
    textContainer: {
        marginBottom: theme.spacing.xl,
        alignItems: 'flex-start', // Align left
    },
    appName: {
        fontSize: 48,
        fontWeight: '700',
        color: 'white',
        letterSpacing: -1,
        marginBottom: theme.spacing.sm,
    },
    tagline: {
        fontSize: 24,
        fontWeight: '600',
        color: 'white',
        lineHeight: 32,
        marginBottom: theme.spacing.md,
    },
    description: { // Keeping style in case we add text back later, but unused now
        fontSize: 16,
        color: theme.colors.textSecondary,
        lineHeight: 24,
        maxWidth: width * 0.8,
    },
    buttonContainer: {
        marginBottom: theme.spacing.lg,
        alignItems: 'center',
    },
});
