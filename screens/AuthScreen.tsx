import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert // Imprted Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type AuthScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export default function AuthScreen({ navigation }: AuthScreenProps) {
    const [isLogin, setIsLogin] = useState(false);

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleContinue = () => {
        // Simulation Mode:
        // We bypass strict backend validation to allow exploring the UI

        if (!isLogin) {
            if (password !== confirmPassword) {
                Alert.alert("Password Mismatch", "Please ensure your passwords match.");
                return;
            }
        }

        // Navigate immediately to Onboarding
        // In a real app, this would happen after API success
        navigation.navigate('Onboarding');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                {/* Main Content (Scrollable) */}
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.contentWrapper}>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.title}>
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </Text>
                            <Text style={styles.subtitle}>
                                {isLogin ? 'Log in to continue' : 'Join Oasis and start connecting'}
                            </Text>
                        </View>

                        {/* Form Fields */}
                        <View style={styles.form}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email address"
                                placeholderTextColor={theme.colors.textTertiary}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor={theme.colors.textTertiary}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />

                            {!isLogin && (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm password"
                                    placeholderTextColor={theme.colors.textTertiary}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />
                            )}

                            {/* Main Action Button */}
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleContinue}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>
                                    {isLogin ? 'Log In' : 'Continue'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Conditional Footer: Forgot Password (Login) vs Legal (Signup) */}
                        <View style={styles.legalContainer}>
                            {isLogin ? (
                                <TouchableOpacity onPress={() => console.log('Forgot Password pressed')}>
                                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                                </TouchableOpacity>
                            ) : (
                                <>
                                    <Text style={styles.legalText}>
                                        By registering, you accept our
                                    </Text>
                                    <View style={styles.legalLinksRow}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                                            <Text style={styles.legalLink}>Terms of Service</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.legalText}> and </Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                                            <Text style={styles.legalLink}>Privacy Policy</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.legalText}>.</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Toggle (Pinned to Bottom) */}
                <View style={styles.footer}>
                    <View style={styles.toggleContainer}>
                        <Text style={styles.toggleText}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </Text>
                        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                            <Text style={styles.toggleLink}>
                                {isLogin ? "Sign Up." : "Log In."}
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    contentWrapper: {
        paddingHorizontal: theme.spacing.lg,
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    header: {
        marginBottom: theme.spacing.xl,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.h1,
        color: 'white',
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    form: {
        gap: theme.spacing.md,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 99,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: 18,
        ...theme.typography.body,
        color: 'white',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 99,
        alignItems: 'center',
        marginTop: theme.spacing.sm,
        ...theme.shadows.medium,
    },
    buttonText: {
        ...theme.typography.button,
        color: 'white',
        fontSize: 16,
    },
    legalContainer: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
        height: 60,
        justifyContent: 'flex-start',
    },
    legalText: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
        textAlign: 'center',
    },
    legalLinksRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 2,
    },
    legalLink: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    forgotPasswordText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
    },
    footer: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
        backgroundColor: '#000000',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    toggleText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
    },
    toggleLink: {
        ...theme.typography.bodySmall,
        color: theme.colors.primary,
        fontWeight: '700',
    },
});
