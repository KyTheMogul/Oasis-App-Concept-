import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SocialPlatform } from '../types';
import { onboardingSteps } from '../onboardingSteps';
import SocialConnectButton from '../components/SocialConnectButton';

type OnboardingScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(1));
    const scrollViewRef = useRef<ScrollView>(null);

    // Step States
    const [age, setAge] = useState('');
    const [connectedPlatforms, setConnectedPlatforms] = useState<Set<SocialPlatform>>(new Set());
    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
    const [selectedBrandPreferences, setSelectedBrandPreferences] = useState<Set<string>>(new Set());

    const currentStep = onboardingSteps[currentStepIndex];
    const isLastStep = currentStepIndex === onboardingSteps.length - 1;

    // Check if step requires sticky header + scrollable content
    const isScrollableStep = ['content-type', 'brand-preference', 'social-connect'].includes(currentStep.type);

    // Scroll to top when step changes
    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, [currentStepIndex]);

    const handleNext = () => {
        if (isLastStep) {
            navigation.navigate('MainApp');
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: theme.animation.fast,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStepIndex(currentStepIndex + 1);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: theme.animation.fast,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: theme.animation.fast,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStepIndex(currentStepIndex - 1);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: theme.animation.fast,
                    useNativeDriver: true,
                }).start();
            });
        }
    };

    const togglePlatform = (platform: SocialPlatform) => {
        const newConnected = new Set(connectedPlatforms);
        if (newConnected.has(platform)) {
            newConnected.delete(platform);
        } else {
            newConnected.add(platform);
        }
        setConnectedPlatforms(newConnected);
    };

    const toggleOption = (option: string, isMulti: boolean) => {
        if (currentStep.type === 'content-type') {
            setSelectedContentType(option === selectedContentType ? null : option);
        } else if (currentStep.type === 'brand-preference') {
            const newSet = new Set(selectedBrandPreferences);
            if (option === 'Any') {
                if (newSet.has('Any')) {
                    newSet.clear();
                } else {
                    newSet.clear();
                    newSet.add('Any');
                }
            } else {
                if (newSet.has('Any')) newSet.delete('Any');
                if (newSet.has(option)) {
                    newSet.delete(option);
                } else {
                    newSet.add(option);
                }
            }
            setSelectedBrandPreferences(newSet);
        }
    };

    const canProceed = () => {
        switch (currentStep.type) {
            case 'age':
                return age.length > 0 && parseInt(age) >= 13;
            case 'content-type':
                return selectedContentType !== null;
            case 'brand-preference':
                if (selectedBrandPreferences.has('Any')) return true;
                return selectedBrandPreferences.size >= (currentStep.minSelection || 0);
            case 'social-connect':
                return connectedPlatforms.size > 0;
            default:
                return true;
        }
    };

    const renderStepContent = () => {
        switch (currentStep.type) {
            case 'age':
                return (
                    <View style={styles.stepContent}>
                        <TextInput
                            style={styles.ageInput}
                            placeholder="Enter your age"
                            placeholderTextColor={theme.colors.textTertiary}
                            value={age}
                            onChangeText={setAge}
                            keyboardType="number-pad"
                            maxLength={3}
                        />
                    </View>
                );

            case 'content-type':
            case 'brand-preference':
                return (
                    <View style={styles.optionsGrid}>
                        {currentStep.options?.map((option) => {
                            const isSelected =
                                currentStep.type === 'content-type'
                                    ? selectedContentType === option
                                    : selectedBrandPreferences.has(option);

                            return (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        isSelected && styles.optionButtonActive
                                    ]}
                                    onPress={() => toggleOption(option, currentStep.multiSelect || false)}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        isSelected && styles.optionTextActive
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );

            case 'social-connect':
                const platforms: SocialPlatform[] = [
                    'youtube',
                    'tiktok',
                    'instagram',
                    'facebook',
                    'snapchat',
                    'twitter',
                    'linkedin',
                    'twitch',
                    'kick',
                ];
                return (
                    <View style={styles.stepContent}>
                        {platforms.map((platform) => (
                            <SocialConnectButton
                                key={platform}
                                platform={platform}
                                connected={connectedPlatforms.has(platform)}
                                onPress={() => togglePlatform(platform)}
                            />
                        ))}
                    </View>
                );

            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <View style={styles.progressContainer}>
                        {onboardingSteps.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.progressDot,
                                    index <= currentStepIndex && styles.progressDotActive,
                                ]}
                            />
                        ))}
                    </View>
                </View>

                <Animated.View style={[styles.mainContainer, { opacity: fadeAnim }]}>

                    {/* CONDITIONAL LAYOUT */}
                    {isScrollableStep ? (
                        /* Layout for LONG lists (Sticky Header + Scroll) */
                        <>
                            <View style={styles.staticContent}>
                                <Text style={styles.title}>{currentStep.title}</Text>
                                {currentStep.subtitle && (
                                    <Text style={styles.subtitle}>{currentStep.subtitle}</Text>
                                )}
                            </View>

                            <ScrollView
                                ref={scrollViewRef}
                                style={styles.scrollContainer}
                                contentContainerStyle={styles.scrollContent}
                                keyboardShouldPersistTaps="handled"
                                showsVerticalScrollIndicator={false}
                            >
                                <View style={styles.contentCentering}>
                                    {renderStepContent()}
                                </View>
                            </ScrollView>
                        </>
                    ) : (
                        /* Layout for SHORT content (Fully Centered) */
                        <View style={styles.centeredWrapper}>
                            <View style={styles.staticContent}>
                                <Text style={styles.title}>{currentStep.title}</Text>
                                {currentStep.subtitle && (
                                    <Text style={styles.subtitle}>{currentStep.subtitle}</Text>
                                )}
                            </View>
                            <View style={styles.contentCentering}>
                                {renderStepContent()}
                            </View>
                        </View>
                    )}

                </Animated.View>

                <View style={styles.footer}>
                    {currentStepIndex > 0 && (
                        <Pressable
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={handleBack}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </Pressable>
                    )}

                    <Pressable
                        style={({ pressed }) => [
                            styles.nextButton,
                            !canProceed() && styles.nextButtonDisabled,
                            pressed && styles.buttonPressed,
                            currentStepIndex === 0 && styles.nextButtonFull,
                        ]}
                        onPress={handleNext}
                        disabled={!canProceed()}
                    >
                        <Text style={styles.nextButtonText}>
                            {isLastStep ? 'Get Started' : 'Continue'}
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },
    progressContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        justifyContent: 'center',
    },
    progressDot: {
        width: 8,
        height: 8,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.backgroundCard,
    },
    progressDotActive: {
        backgroundColor: theme.colors.primary,
    },
    mainContainer: {
        flex: 1,
    },
    // New Wrapper for Centered Layout
    centeredWrapper: {
        flex: 1,
        justifyContent: 'center', // This restores vertical centering for Age/Social
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        marginTop: -60, // visual offset to account for footer/header balance
    },
    staticContent: {
        paddingHorizontal: theme.spacing.xl,
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
        zIndex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: 40,
    },
    contentCentering: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h1,
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: -5,
    },
    stepContent: {
        gap: theme.spacing.md,
        width: '100%',
    },
    ageInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 99,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 18,
        ...theme.typography.h2,
        color: 'white',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textAlign: 'center',
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
        justifyContent: 'center',
        width: '100%',
    },
    optionButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        backgroundColor: 'transparent',
    },
    optionButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
    optionText: {
        ...theme.typography.bodySmall,
        color: 'white',
        fontWeight: '600',
    },
    optionTextActive: {
        color: 'white',
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.xl,
        gap: theme.spacing.md,
        backgroundColor: '#000000',
    },
    backButton: {
        flex: 1,
        paddingVertical: 16,
        borderRadius: 99,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    backButtonText: {
        ...theme.typography.button,
        color: theme.colors.primary,
    },
    nextButton: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 99,
        alignItems: 'center',
        ...theme.shadows.medium,
    },
    nextButtonFull: {
        flex: 1,
    },
    nextButtonDisabled: {
        opacity: 0.5,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    nextButtonText: {
        ...theme.typography.button,
        color: 'white',
        fontSize: 16,
    },
});
