import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { theme } from '../theme';
import { Deal, RootStackParamList } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Mock available deals
const mockAvailableDeals: Deal[] = [
    {
        id: 'd1',
        businessName: 'StyleHub',
        businessIcon: 'https://ui-avatars.com/api/?name=StyleHub&background=random',
        category: 'Fashion',
        totalAmount: 4500,
        description: 'Promote our new summer collection',
        status: 'available',
        companyBanner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
        companyBio: 'Curating the latest trends in fashion for the bold and beautiful.',
        milestones: [],
        currentMilestoneIndex: 0,
        overallProgress: 0,
        createdAt: new Date(),
    },
    {
        id: 'd2',
        businessName: 'GreenEco',
        businessIcon: 'https://ui-avatars.com/api/?name=GreenEco&background=random',
        category: 'Sustainability',
        totalAmount: 3000,
        description: 'Share our eco-friendly products',
        status: 'available',
        companyBanner: 'https://images.unsplash.com/photo-1542601906990-b4d3fb77c35a?auto=format&fit=crop&q=80',
        companyBio: 'Dedicated to sustainable living and eco-friendly products.',
        milestones: [],
        currentMilestoneIndex: 0,
        overallProgress: 0,
        createdAt: new Date(),
    },
    {
        id: 'd3',
        businessName: 'GameZone',
        businessIcon: 'https://ui-avatars.com/api/?name=GameZone&background=random',
        category: 'Gaming',
        totalAmount: 6000,
        description: 'Stream our latest game release',
        status: 'available',
        companyBanner: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80',
        companyBio: 'The ultimate destination for gamers and streamers.',
        milestones: [],
        currentMilestoneIndex: 0,
        overallProgress: 0,
        createdAt: new Date(),
    },
    {
        id: 'd4',
        businessName: 'TravelMore',
        businessIcon: 'https://ui-avatars.com/api/?name=TravelMore&background=random',
        category: 'Travel',
        totalAmount: 7500,
        description: 'Document your luxury resort stay',
        status: 'available',
        companyBanner: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80',
        companyBio: 'Explore the world in style with TravelMore.',
        milestones: [],
        currentMilestoneIndex: 0,
        overallProgress: 0,
        createdAt: new Date(),
    },
];

const categories = ['All', 'Fashion', 'Tech', 'Gaming', 'Travel', 'Eco'];

export default function DiscoverScreen() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const filteredDeals =
        selectedCategory === 'All'
            ? mockAvailableDeals
            : mockAvailableDeals.filter((deal) => deal.category === selectedCategory);

    const handleDealPress = (deal: Deal) => {
        navigation.navigate('DealDetail', { deal });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
                    <Text style={styles.searchPlaceholder}>Search</Text>
                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}
                >
                    {categories.map((category) => (
                        <Pressable
                            key={category}
                            style={({ pressed }) => [
                                styles.categoryChip,
                                selectedCategory === category && styles.categoryChipActive,
                                pressed && styles.categoryChipPressed,
                            ]}
                            onPress={() => setSelectedCategory(category)}
                        >
                            <Text
                                style={[
                                    styles.categoryChipText,
                                    selectedCategory === category && styles.categoryChipTextActive,
                                ]}
                            >
                                {category}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.dealsGrid}>
                    {filteredDeals.map((deal) => (
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
                                    source={{ uri: deal.businessIcon }}
                                    style={styles.businessIcon}
                                />
                                <View style={styles.badgeContainer}>
                                    <Text style={styles.categoryBadge}>{deal.category}</Text>
                                </View>
                            </View>

                            <View style={styles.cardContent}>
                                <Text style={styles.businessName} numberOfLines={1}>{deal.businessName}</Text>
                                <Text style={styles.dealType}>{deal.category}</Text>
                                <Text style={styles.amount}>${deal.totalAmount.toLocaleString()}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        paddingBottom: theme.spacing.md,
        gap: theme.spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: theme.spacing.xl,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: 12,
        borderRadius: theme.borderRadius.full,
        gap: theme.spacing.sm,
    },
    searchPlaceholder: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
    },
    categoriesContainer: {
        paddingHorizontal: theme.spacing.xl,
        gap: theme.spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borderRadius.full,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    categoryChipActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    categoryChipPressed: {
        opacity: 0.7,
    },
    categoryChipText: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        fontWeight: '600',
    },
    categoryChipTextActive: {
        color: theme.colors.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.xl,
    },
    dealsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
    },
    dealCard: {
        width: '47%', // 2 per row with gap
        backgroundColor: 'transparent', // Fully transparent background
        borderRadius: theme.borderRadius.xl, // More rounded
        padding: theme.spacing.md,
        gap: theme.spacing.sm,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        aspectRatio: 0.85, // Taller card
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
        width: 64, // Larger icon
        height: 64,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.background,
    },
    badgeContainer: {
        position: 'absolute',
        top: -8,
        right: -8,
    },
    categoryBadge: {
        ...theme.typography.caption,
        fontSize: 10,
        color: theme.colors.textSecondary,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
        display: 'none', // Hiding badge for cleaner look based on "center image" request, optional to show
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
        marginBottom: 2,
    },
    amount: {
        ...theme.typography.h3,
        color: theme.colors.primary,
        fontWeight: '700',
    },
});
