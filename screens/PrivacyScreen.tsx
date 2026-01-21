/**
 * PrivacyScreen - Privacy Policy legal document
 * 
 * Displays the platform's privacy policy in a scrollable format.
 * Required for compliance and user trust.
 * 
 * Note: Replace placeholder content with actual privacy policy
 * reviewed by your legal team and compliant with GDPR/CCPA
 * before production deployment.
 */
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { theme } from '../theme';

type PrivacyScreenProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Privacy'>;
};

export default function PrivacyScreen({ navigation }: PrivacyScreenProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.subtitle}>Last updated: January 2, 2026</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>1. Information Collection</Text>
                <Text style={styles.paragraph}>
                    We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us.
                </Text>

                <Text style={styles.sectionTitle}>2. Information Use</Text>
                <Text style={styles.paragraph}>
                    We use the information we collect to provide, maintain, and improve our services, such as to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, and send product updates and administrative messages.
                </Text>

                <Text style={styles.sectionTitle}>3. Information Sharing</Text>
                <Text style={styles.paragraph}>
                    We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows: Through our Services, we may share your information with other Users (e.g., Driver Partners and/or Delivery Partners).
                </Text>

                <Text style={styles.sectionTitle}>4. Security</Text>
                <Text style={styles.paragraph}>
                    We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
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
