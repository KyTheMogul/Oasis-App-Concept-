import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Image,
    ImageBackground,
    Dimensions,
    StatusBar,
    Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { BlurView } from 'expo-blur';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'DealDetail'>;

export default function DealDetailScreen({ route, navigation }: Props) {
    const { deal } = route.params;
    const insets = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;

    const handleBack = () => {
        navigation.goBack();
    };

    const handleMessagePress = () => {
        // In a real app, you'd find an existing thread or create one
        navigation.navigate('Chat', {
            threadId: `new_${deal.id}`, // Placeholder ID
            businessName: deal.businessName,
            businessIcon: deal.businessIcon,
            category: deal.category,
        });
    };

    if (!deal) return null;

    // Blur opacity interpolation: 0 at top, 1 after scrolling 100px
    const headerBlurOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Floating Header Container */}
            <View style={[styles.floatingHeaderContainer, { height: insets.top + 60 }]}>
                {/* 1. Animated Blur Background (Fades in on scroll) */}
                <Animated.View
                    style={[
                        StyleSheet.absoluteFill,
                        { opacity: headerBlurOpacity }
                    ]}
                >
                    <BlurView
                        intensity={30}
                        tint="dark"
                        style={StyleSheet.absoluteFill}
                    />
                </Animated.View>

                {/* 2. Fixed Actions Layer (Always visible, no blur background) */}
                <View style={[styles.headerActions, { marginTop: insets.top + 10 }]}>
                    {/* Back Button */}
                    <Pressable
                        onPress={handleBack}
                        style={styles.iconButton}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={28}
                            color="#FFF"
                            style={styles.iconShadow}
                        />
                    </Pressable>

                    {/* Right Actions */}
                    <View style={styles.rightActions}>
                        <Pressable
                            style={styles.iconButton}
                            onPress={() => { }} // Placeholder more action
                        >
                            <Ionicons
                                name="ellipsis-vertical"
                                size={28}
                                color="#FFF"
                                style={styles.iconShadow}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>

            <Animated.ScrollView
                style={styles.scrollView}
                bounces={false}
                contentContainerStyle={{ paddingBottom: 0 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
            >
                {/* Header with Banner and Icon */}
                <View style={styles.headerContainer}>
                    <ImageBackground
                        source={{ uri: deal.companyBanner || 'https://via.placeholder.com/400x250' }} // Fallback banner
                        style={[styles.banner, { width: width }]} // Force screen width
                        resizeMode="cover"
                    >
                        {/* Actions moved to floating header */}
                    </ImageBackground>

                    <View style={styles.iconContainer}>
                        {deal.businessIcon ? (
                            <Image source={{ uri: deal.businessIcon }} style={styles.businessIcon} />
                        ) : (
                            <View style={styles.iconPlaceholder}>
                                <Text style={styles.iconText}>
                                    {deal.businessName.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Company Info */}
                    <View style={styles.companyInfo}>
                        <Text style={styles.businessName}>{deal.businessName}</Text>
                        <Text style={styles.category}>{deal.category}</Text>

                        {/* Progress Bar (Matches Hub Card) */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBarBackground}>
                                <View style={[styles.progressBarFill, { width: `${deal.overallProgress}%` }]} />
                            </View>
                            <Text style={styles.progressText}>{deal.overallProgress}% Complete</Text>
                        </View>

                        <Text style={styles.totalEarningsLabel}>Total Earnings: ${deal.totalAmount.toLocaleString()}</Text>

                        {deal.companyBio && (
                            <Text style={styles.bio}>{deal.companyBio}</Text>
                        )}
                    </View>

                    {/* Vertical Progress Timeline */}
                    <View style={styles.timelineSection}>
                        <Text style={styles.sectionTitle}>Roadmap</Text>

                        <View style={styles.timelineContainer}>
                            {/* Vertical Line */}
                            <View style={styles.timelineLine} />

                            {/* Start Node */}
                            <View style={styles.timelineItem}>
                                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineTitle}>Contract Started</Text>
                                    <Text style={styles.timelineDate}>$0.00</Text>
                                </View>
                            </View>

                            {/* Milestones */}
                            {deal.milestones.map((milestone, index) => {
                                const isCompleted = milestone.completed;
                                const isActive = index === deal.currentMilestoneIndex;

                                return (
                                    <View key={milestone.id} style={styles.timelineItem}>
                                        <View
                                            style={[
                                                styles.timelineDot,
                                                isCompleted && styles.timelineDotCompleted,
                                                isActive && styles.timelineDotActive
                                            ]}
                                        />
                                        <View style={styles.timelineContent}>
                                            <Text style={[styles.timelineTitle, isCompleted && { color: theme.colors.success }]}>
                                                {milestone.title}
                                            </Text>
                                            <Text style={styles.timelineDescription}>{milestone.description}</Text>
                                            {milestone.deadline && (
                                                <Text style={styles.timelineDate}>
                                                    Due: {new Date(milestone.deadline).toLocaleDateString()}
                                                </Text>
                                            )}
                                            <Text style={styles.timelineAmount}>
                                                +${milestone.paymentAmount.toLocaleString()}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}

                            {/* Completion Node */}
                            <View style={styles.timelineItem}>
                                <View style={[
                                    styles.timelineDot,
                                    deal.overallProgress === 100 && styles.timelineDotCompleted
                                ]} />
                                <View style={styles.timelineContent}>
                                    <Text style={styles.timelineTitle}>Deal Completed</Text>
                                    <Text style={styles.timelineDate}>Total: ${deal.totalAmount.toLocaleString()}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>

            {/* Fixed Footer for Actions */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                {/* Message Button */}
                <Pressable
                    style={({ pressed }) => [
                        styles.messageButton,
                        pressed && styles.buttonPressed,
                    ]}
                    onPress={handleMessagePress}
                >
                    <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFF" />
                </Pressable>

                {/* Main Action Button */}
                <View style={{ flex: 1 }}>
                    {deal.status === 'available' ? (
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                pressed && styles.actionButtonPressed,
                            ]}
                            onPress={handleBack}
                        >
                            <Text style={styles.actionButtonText}>Apply for Deal</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                { backgroundColor: theme.colors.backgroundCard, borderWidth: 1, borderColor: theme.colors.primary },
                                pressed && styles.actionButtonPressed,
                            ]}
                            onPress={handleBack}
                        >
                            <Text style={styles.actionButtonText}>View Details / Submit</Text>
                        </Pressable>
                    )}
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Pure black
    },
    scrollView: {
        flex: 1,
    },
    headerContainer: {
        marginBottom: 40, // Space for the overlapping icon
        width: '100%',
    },
    banner: {
        height: 240,
        justifyContent: 'flex-start', // Top aligned content
        padding: theme.spacing.md,
    },
    floatingHeaderContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    headerActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: theme.spacing.lg,
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    iconButton: {
        padding: 4,
    },
    iconShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        // Elevation support for Android text/icons sometimes requires textShadow
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    buttonPressed: {
        opacity: 0.8,
    },
    iconContainer: {
        position: 'absolute',
        bottom: -40, // Half of height (80/2)
        left: '50%',
        marginLeft: -40, // Centering
        width: 80,
        height: 80,
        borderRadius: theme.borderRadius.full,
        borderWidth: 4,
        borderColor: '#000000', // Match bg
        backgroundColor: '#000000',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        ...theme.shadows.medium,
    },
    businessIcon: {
        width: '100%',
        height: '100%',
    },
    iconPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    content: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: 150, // Space for footer
        gap: theme.spacing.xxl,
    },
    companyInfo: {
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    businessName: {
        ...theme.typography.h2,
        color: theme.colors.text,
        textAlign: 'center',
    },
    category: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    totalEarningsLabel: {
        ...theme.typography.h3,
        color: theme.colors.success,
        marginTop: theme.spacing.xs,
    },
    bio: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
        lineHeight: 22,
    },
    timelineSection: {
        gap: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    timelineContainer: {
        paddingLeft: 10,
    },
    timelineLine: {
        position: 'absolute',
        left: 15, // Center of dot
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    timelineItem: {
        flexDirection: 'row',
        paddingBottom: theme.spacing.xl,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: theme.colors.backgroundCard,
        borderWidth: 2,
        borderColor: theme.colors.textTertiary,
        marginRight: theme.spacing.lg,
        zIndex: 1,
        marginTop: 6,
    },
    timelineDotActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.background,
    },
    timelineDotCompleted: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    timelineContent: {
        flex: 1,
        gap: 4,
    },
    timelineTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text,
    },
    timelineDescription: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    timelineDate: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
        fontStyle: 'italic',
    },
    timelineAmount: {
        ...theme.typography.caption,
        color: theme.colors.success,
        fontWeight: '700',
        marginTop: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.xl,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    messageButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.backgroundCard,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        flex: 1,
    },
    actionButtonPressed: {
        opacity: 0.8,
    },
    actionButtonText: {
        ...theme.typography.button,
        color: theme.colors.text,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: theme.spacing.sm,
    },
    progressBarBackground: {
        width: '100%',
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
    },
    progressText: {
        ...theme.typography.caption,
        color: theme.colors.success,
        marginTop: 6,
        fontWeight: '600',
    },
});
