import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { Deal } from '../types';
import DealCard from '../components/DealCard';


// Mock data
const mockUser = {
    name: 'Alex Johnson',
    handler: '@alexj',
    profilePicture: 'https://i.pravatar.cc/150?img=12',
    totalFollowers: 125000,
    newFollowersLast30Days: 5420,
    avgViewsLast30Days: 45000,
    engagementStatus: 'high' as 'high' | 'medium' | 'low',
    totalEarnings: 15400,
    balance: 3450.50,
};

function formatCompactNumber(number: number): string {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return number.toString();
}

const mockActiveDeals: Deal[] = [
    {
        id: '1',
        businessName: 'TechGear Pro',
        category: 'Technology',
        totalAmount: 5000,
        description: 'Promote our latest wireless headphones to your audience',
        status: 'active',
        companyBanner: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80',
        companyBio: 'TechGear Pro is a leading provider of high-quality audio equipment for the modern creator.',
        milestones: [
            {
                id: 'm1',
                title: 'Initial Post',
                description: 'Create and publish introduction post',
                paymentAmount: 1500,
                deadline: new Date(Date.now() + 86400000 * 2),
                completed: true,
            },
            {
                id: 'm2',
                title: 'Product Review',
                description: 'Detailed review video',
                paymentAmount: 2000,
                deadline: new Date(Date.now() + 86400000 * 5),
                completed: true,
            },
            {
                id: 'm3',
                title: 'Follow-up Content',
                description: 'Share user testimonials',
                paymentAmount: 1500,
                deadline: new Date(Date.now() + 86400000 * 10),
                completed: false,
            },
        ],
        currentMilestoneIndex: 2,
        overallProgress: 70,
        createdAt: new Date(),
        startedAt: new Date(),
    },
    {
        id: '2',
        businessName: 'FitLife Nutrition',
        category: 'Health & Wellness',
        totalAmount: 3500,
        description: 'Showcase our protein supplements',
        status: 'active',
        companyBanner: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80',
        companyBio: 'Fueling your fitness journey with premium, organic supplements.',
        milestones: [
            {
                id: 'm1',
                title: 'Unboxing',
                description: 'Unboxing and first impressions',
                paymentAmount: 1200,
                deadline: new Date(Date.now() - 86400000),
                completed: true,
            },
            {
                id: 'm2',
                title: '30-Day Challenge',
                description: 'Document 30-day fitness journey',
                paymentAmount: 2300,
                deadline: new Date(Date.now() + 86400000 * 25),
                completed: false,
            },
        ],
        currentMilestoneIndex: 1,
        overallProgress: 40,
        createdAt: new Date(),
        startedAt: new Date(),
    },
];

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function HubScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleDealPress = (deal: Deal) => {
        navigation.navigate('DealDetail', { deal });
    };

    const getEngagementColor = () => {
        switch (mockUser.engagementStatus) {
            case 'high':
                return theme.colors.success;
            case 'medium':
                return theme.colors.warning;
            case 'low':
                return theme.colors.error;
            default:
                return theme.colors.text; // Value is 'high' | 'medium' | 'low'
        }
    };

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {/* Fixed Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <View>
                    <Text style={styles.balanceLabel}>Available Earnings</Text>
                    <Text style={styles.balanceAmount}>${formatCompactNumber(mockUser.balance)}</Text>
                </View>
                <Pressable
                    style={({ pressed }) => [
                        styles.withdrawButton,
                        pressed && styles.withdrawButtonPressed,
                    ]}
                    onPress={() => navigation.navigate('Withdraw')}
                >
                    <Text style={styles.withdrawButtonText}>Withdraw</Text>
                </Pressable>
            </View>

            {/* Fixed Profile Section */}
            <View style={styles.fixedProfileSection}>
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: mockUser.profilePicture }}
                        style={styles.profilePicture}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{mockUser.name}</Text>
                        <Text style={styles.userHandler}>{mockUser.handler}</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statBadge}>
                                <Ionicons
                                    name="people"
                                    size={14}
                                    color={theme.colors.textSecondary}
                                />
                                <Text style={styles.statBadgeText}>
                                    {formatCompactNumber(mockUser.totalFollowers)}
                                </Text>
                            </View>
                            <View style={styles.statBadge}>
                                <Ionicons
                                    name="wallet"
                                    size={14}
                                    color={theme.colors.success}
                                />
                                <Text style={[styles.statBadgeText, { color: theme.colors.success }]}>
                                    {formatCompactNumber(mockUser.totalEarnings)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            +{mockUser.newFollowersLast30Days.toLocaleString()}
                        </Text>
                        <Text style={styles.statLabel}>New Followers</Text>
                        <Text style={styles.statSubLabel}>Last 30 days</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>
                            {mockUser.avgViewsLast30Days.toLocaleString()}
                        </Text>
                        <Text style={styles.statLabel}>Avg Views</Text>
                        <Text style={styles.statSubLabel}>Last 30 days</Text>
                    </View>

                    <View style={styles.statCard}>
                        <View style={styles.engagementRow}>
                            <View
                                style={[
                                    styles.engagementDot,
                                    { backgroundColor: getEngagementColor() },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.statValue,
                                    { color: getEngagementColor(), fontSize: 18 },
                                ]}
                            >
                                {mockUser.engagementStatus.toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.statLabel}>Engagement</Text>
                        <Text style={styles.statSubLabel}>Current status</Text>
                    </View>
                </View>
            </View>

            {/* Scrollable Active Deals Section */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.dealsSection}>
                    <Text style={styles.sectionTitle}>Active Deals</Text>
                    <View style={styles.dealsGrid}>
                        {mockActiveDeals.map((deal) => (
                            <Pressable
                                key={deal.id}
                                style={({ pressed }) => [
                                    styles.dealCard,
                                    pressed && styles.dealCardPressed,
                                ]}
                                onPress={() => handleDealPress(deal)}
                            >
                                <View style={styles.cardHeader}>
                                    <Image
                                        source={{ uri: deal.businessIcon || `https://ui-avatars.com/api/?name=${deal.businessName}&background=random` }}
                                        style={styles.businessIcon}
                                    />
                                </View>

                                <View style={styles.cardContent}>
                                    <Text style={styles.businessName} numberOfLines={1}>{deal.businessName}</Text>
                                    <Text style={styles.dealType}>{deal.category}</Text>
                                    <View style={styles.progressBarContainer}>
                                        <View style={[styles.progressBar, { width: `${deal.overallProgress}%` }]} />
                                    </View>
                                    <Text style={styles.progressText}>{deal.overallProgress}% Complete</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Pure black
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
        backgroundColor: '#000000', // Ensure it covers scroll content
        zIndex: 10,
    },
    balanceLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    balanceAmount: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    withdrawButton: {
        backgroundColor: theme.colors.primary, // Purple background
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        // Removed border for a cleaner solid button look as per typical purple CTA
    },
    withdrawButtonPressed: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    withdrawButtonText: {
        ...theme.typography.body,
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        paddingTop: theme.spacing.md,
    },
    fixedProfileSection: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
        gap: theme.spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: theme.spacing.md,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    profilePicture: {
        width: 64,
        height: 64,
        borderRadius: theme.borderRadius.full,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    profileInfo: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    userName: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    userHandler: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: theme.borderRadius.full,
    },
    statBadgeText: {
        ...theme.typography.caption,
        color: theme.colors.text,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    statCard: {
        flex: 1,
        backgroundColor: theme.colors.backgroundCard,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.lg,
        gap: theme.spacing.xs,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    statValue: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },
    statLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    statSubLabel: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
        fontSize: 10,
    },
    engagementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    engagementDot: {
        width: 8,
        height: 8,
        borderRadius: theme.borderRadius.full,
    },
    dealsSection: {
        gap: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    dealsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
    },
    dealCard: {
        width: '47%', // 2 per row
        backgroundColor: 'transparent',
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.md,
        gap: theme.spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        aspectRatio: 0.85,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dealCardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    cardHeader: {
        alignItems: 'center',
        gap: theme.spacing.sm,
        width: '100%',
    },
    businessIcon: {
        width: 64,
        height: 64,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.background,
    },
    cardContent: {
        alignItems: 'center',
        gap: 4,
        width: '100%',
    },
    businessName: {
        ...theme.typography.body,
        fontWeight: '700',
        color: theme.colors.text,
        textAlign: 'center',
    },
    dealType: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        fontSize: 12,
        marginBottom: 4,
    },
    progressBarContainer: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        marginTop: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
    },
    progressText: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
        fontSize: 10,
        marginTop: 2,
    },
});
