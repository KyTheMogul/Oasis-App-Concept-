import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
    Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';
import { UserLink } from '../types';

// Mock user data
const mockUser = {
    name: 'Alex Johnson',
    handle: '@alexjohnson',
    email: 'alex@example.com',
    profilePicture: 'https://i.pravatar.cc/300?img=12',
    bio: 'Content creator passionate about tech, fitness, and lifestyle. Helping brands connect with engaged audiences.',
    totalFollowers: 125000,
    avgViewsPerPost: 45000,
    dealsCompleted: 12,
};

const mockUserLinks: UserLink[] = [
    { id: '1', title: 'YouTube', url: 'https://youtube.com/@alexj' },
    { id: '2', title: 'Instagram', url: 'https://instagram.com/alexj' },
    { id: '3', title: 'TikTok', url: 'https://tiktok.com/@alexj' },
    { id: '4', title: 'Twitter', url: 'https://twitter.com/alexj' },
];

function formatCompactNumber(number: number): string {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (number >= 1000) {
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return number.toString();
}

function getPlatformIcon(title: string): string {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('youtube')) return 'logo-youtube';
    if (titleLower.includes('instagram')) return 'logo-instagram';
    if (titleLower.includes('tiktok')) return 'logo-tiktok';
    if (titleLower.includes('twitter') || titleLower.includes('x')) return 'logo-twitter';
    if (titleLower.includes('facebook')) return 'logo-facebook';
    if (titleLower.includes('linkedin')) return 'logo-linkedin';
    if (titleLower.includes('twitch')) return 'logo-twitch';
    if (titleLower.includes('discord')) return 'logo-discord';
    return 'link-outline'; // Default fallback
}

import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>();

    const handleLinkPress = (url: string) => {
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header with gradient background */}
                <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryDark]}
                    style={styles.headerGradient}
                >
                    {/* Top Icons Layer */}
                    <View style={[styles.topIcons, { top: insets.top + 10 }]}>
                        <Pressable
                            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                            onPress={() => navigation.navigate('QRCode')}
                        >
                            <Ionicons name="qr-code-outline" size={24} color="white" />
                        </Pressable>
                        <View style={styles.rightIcons}>
                            <Pressable
                                style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                                onPress={() => { }} // Placeholder for notifications
                            >
                                <Ionicons name="notifications-outline" size={24} color="white" />
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
                                onPress={() => navigation.navigate('Settings')}
                            >
                                <Ionicons name="settings-outline" size={24} color="white" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.profileHeader}>
                        <Image
                            source={{ uri: mockUser.profilePicture }}
                            style={styles.profilePicture}
                        />
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.userName}>{mockUser.name}</Text>
                            <Text style={styles.userHandle}>{mockUser.handle}</Text>
                            {mockUser.bio && (
                                <Text style={styles.headerBio}>{mockUser.bio}</Text>
                            )}
                        </View>
                    </View>
                    {/* Fade to Black Overlay */}
                    <LinearGradient
                        colors={['transparent', '#000000']}
                        style={styles.gradientOverlay}
                    />
                </LinearGradient>

                <View style={styles.content}>
                    {/* Stats Section with Glassmorphism Blur */}
                    <BlurView intensity={30} tint="dark" style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {formatCompactNumber(mockUser.totalFollowers)}
                            </Text>
                            <Text style={styles.statLabel}>Total Followers</Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {formatCompactNumber(mockUser.avgViewsPerPost)}
                            </Text>
                            <Text style={styles.statLabel}>Avg Views/Post</Text>
                        </View>

                        <View style={styles.statDivider} />

                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{mockUser.dealsCompleted}</Text>
                            <Text style={styles.statLabel}>Deals</Text>
                        </View>
                    </BlurView>

                    {/* Social Links Section */}
                    {mockUserLinks.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Social Links</Text>
                            {mockUserLinks.map((link) => {
                                // Helper to get platform config
                                const getAuthDetails = (url: string) => {
                                    const lowerUrl = url.toLowerCase();
                                    if (lowerUrl.includes('youtube')) return { icon: 'logo-youtube', color: '#FF0000', label: 'YouTube' };
                                    if (lowerUrl.includes('instagram')) return { icon: 'logo-instagram', color: '#E4405F', label: 'Instagram' };
                                    if (lowerUrl.includes('tiktok')) return { icon: 'musical-notes', color: '#000000', label: 'TikTok' };
                                    if (lowerUrl.includes('twitter') || lowerUrl.includes('x.com')) return { icon: 'logo-twitter', color: '#1DA1F2', label: 'Twitter' };
                                    if (lowerUrl.includes('twitch')) return { icon: 'logo-twitch', color: '#9146FF', label: 'Twitch' }; // Twitch Purple
                                    if (lowerUrl.includes('kick')) return { icon: 'square', color: '#53FC18', label: 'Kick' }; // Kick Green
                                    return { icon: 'link-outline', color: theme.colors.text, label: 'Website' };
                                };

                                const details = getAuthDetails(link.url);

                                return (
                                    <Pressable
                                        key={link.id}
                                        style={({ pressed }) => [
                                            styles.linkItem,
                                            pressed && styles.linkItemPressed,
                                        ]}
                                        onPress={() => handleLinkPress(link.url)}
                                    >
                                        <View style={[styles.linkIconContainer, { backgroundColor: details.color }]}>
                                            <Ionicons
                                                name={details.icon as any}
                                                size={20}
                                                color="#FFF"
                                            />
                                        </View>
                                        <Text style={styles.linkTitle}>{link.title}</Text>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={20}
                                            color={theme.colors.textTertiary}
                                        />
                                    </Pressable>
                                );
                            })}
                        </View>
                    )}
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xxl,
    },
    headerGradient: {
        paddingTop: theme.spacing.xxl * 3,
        paddingBottom: theme.spacing.xxl * 4,
        alignItems: 'center',
        position: 'relative',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 150,
    },
    topIcons: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
        zIndex: 10,
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: theme.borderRadius.full,
    },
    rightIcons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    pressed: {
        opacity: 0.7,
    },
    profileHeader: {
        alignItems: 'center',
        gap: theme.spacing.md,
        zIndex: 2,
        paddingHorizontal: theme.spacing.xl,
        marginTop: 20,
    },
    headerTextContainer: {
        alignItems: 'center',
        gap: 4,
    },
    profilePicture: {
        width: 128,
        height: 128,
        borderRadius: theme.borderRadius.full,
        borderWidth: 4,
        borderColor: theme.colors.text,
    },
    userName: {
        ...theme.typography.h1,
        color: theme.colors.text,
        textAlign: 'center',
    },
    userHandle: {
        ...theme.typography.body,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
        marginBottom: 8,
    },
    headerBio: {
        ...theme.typography.bodySmall,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        maxWidth: '90%',
        lineHeight: 20,
    },
    content: {
        padding: theme.spacing.xl,
        gap: theme.spacing.xl,
        marginTop: -180, // Pulled up even more
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    statValue: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    statLabel: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        fontSize: 10,
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    section: {
        gap: theme.spacing.md,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
    },

    linksContainer: {
        gap: theme.spacing.sm,
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundCard,
        padding: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        gap: theme.spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    linkItemPressed: {
        opacity: 0.7,
    },
    linkTitle: {
        ...theme.typography.body,
        color: theme.colors.text,
        flex: 1,
    },
    linkIconContainer: {
        width: 36,
        height: 36,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
