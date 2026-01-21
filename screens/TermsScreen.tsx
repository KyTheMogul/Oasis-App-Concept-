import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

type TermsScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Terms'>;
};

export default function TermsScreen({ navigation }: TermsScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Terms of Service</Text>
                <Text style={styles.subtitle}>Last updated: January 2, 2026</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.paragraph}>
                    Welcome to Oasis. By accessing or using our mobile application, you agree to bound by these Terms of Service and our Privacy Policy.
                </Text>

                <Text style={styles.sectionTitle}>2. User Accounts</Text>
                <Text style={styles.paragraph}>
                    To use certain features of the App, you must create an account. You agree to provide accurate, current, and complete information during the registration process.
                </Text>

                <Text style={styles.sectionTitle}>3. Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and share your information.
                </Text>

                <Text style={styles.sectionTitle}>4. Content</Text>
                <Text style={styles.paragraph}>
                    You retain all rights to the content you post on Oasis. By posting content, you grant us a non-exclusive license to display and distribute it on the platform.
                </Text>

                <Text style={styles.sectionTitle}>5. Termination</Text>
                <Text style={styles.paragraph}>
                    We reserve the right to suspend or terminate your account at any time for violation of these Terms.
                </Text>

                <View style={styles.spacer} />
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Return to Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Pure black
    },
    header: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        ...theme.typography.h2,
        color: 'white',
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.xl,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: 'white',
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.sm,
    },
    paragraph: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
        lineHeight: 24,
    },
    spacer: {
        height: 40,
    },
    footer: {
        padding: theme.spacing.xl,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        backgroundColor: '#000000',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    buttonText: {
        ...theme.typography.button,
        color: 'white',
        fontSize: 16,
    },
});
