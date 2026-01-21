/**
 * DealCard - Reusable card component for displaying brand deals
 * 
 * Features:
 * - Business icon/logo display with fallback placeholder
 * - Deal category and total earnings amount
 * - Status-aware UI (available vs active deals)
 * - Progress bar for active deals
 * - "Apply" button for available deals
 * 
 * Used in: HubScreen (active deals), DiscoverScreen (available deals)
 */
import React from 'react';
import { Pressable, Text, StyleSheet, View, Image } from 'react-native';
import { theme } from '../theme';
import { Deal } from '../types';

interface DealCardProps {
    deal: Deal;
    onPress?: () => void;
}

export default function DealCard({ deal, onPress }: DealCardProps) {
    return (
        <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                {deal.businessIcon ? (
                    <Image source={{ uri: deal.businessIcon }} style={styles.icon} />
                ) : (
                    <View style={styles.iconPlaceholder}>
                        <Text style={styles.iconText}>
                            {deal.businessName.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.businessName} numberOfLines={1}>
                    {deal.businessName}
                </Text>
                <Text style={styles.category} numberOfLines={1}>
                    {deal.category}
                </Text>
                <Text style={styles.amount}>${deal.totalAmount.toLocaleString()}</Text>
            </View>

            {deal.status === 'available' && (
                <View style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </View>
            )}

            {deal.status === 'active' && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${deal.overallProgress}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>{deal.overallProgress}%</Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        gap: theme.spacing.md,
    },
    cardPressed: {
        opacity: 0.8,
    },
    iconContainer: {
        alignSelf: 'flex-start',
    },
    icon: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.md,
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    content: {
        gap: theme.spacing.xs,
    },
    businessName: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    category: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
    },
    amount: {
        ...theme.typography.h3,
        color: theme.colors.primary,
    },
    applyButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        alignSelf: 'flex-start',
    },
    applyButtonText: {
        ...theme.typography.button,
        fontSize: 14,
        color: theme.colors.text,
    },
    progressContainer: {
        gap: theme.spacing.xs,
    },
    progressBar: {
        height: 6,
        backgroundColor: theme.colors.backgroundSecondary,
        borderRadius: theme.borderRadius.full,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
    },
    progressText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
});
