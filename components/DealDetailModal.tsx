import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    Pressable,
    ScrollView,
    Image,
    ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { Deal } from '../types';

interface DealDetailModalProps {
    deal: Deal | null;
    visible: boolean;
    onClose: () => void;
}

export default function DealDetailModal({
    deal,
    visible,
    onClose,
}: DealDetailModalProps) {
    if (!deal) return null;

    const insets = useSafeAreaInsets();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="overFullScreen" // Changed to overFullScreen for better control
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} bounces={false}>
                    {/* Header with Banner and Icon */}
                    <View style={styles.headerContainer}>
                        <ImageBackground
                            source={{ uri: deal.companyBanner || 'https://via.placeholder.com/400x200' }} // Fallback banner
                            style={styles.banner}
                            resizeMode="cover"
                        >
                            <Pressable
                                onPress={onClose}
                                style={[styles.closeButton, { marginTop: insets.top + 10 }]} // Dynamic top margin
                            >
                                <Ionicons name="close-circle" size={32} color="rgba(0,0,0,0.6)" />
                            </Pressable>
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
                            {/* Earnings Label in user request context implies showing what you earn */}
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
                                                        Due: {milestone.deadline.toLocaleDateString()}
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

                        {/* Apply / Action Button Footer would go here ideally fixed, but currently scrolling */}
                    </View>
                </ScrollView>

                {/* Fixed Footer for Actions */}
                <View style={styles.footer}>
                    {deal.status === 'available' ? (
                        <Pressable
                            style={({ pressed }) => [
                                styles.actionButton,
                                pressed && styles.actionButtonPressed,
                            ]}
                            onPress={onClose}
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
                            onPress={onClose}
                        >
                            <Text style={styles.actionButtonText}>View Details / Submit</Text>
                        </Pressable>
                    )}
                </View>
            </View>
        </Modal>
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
        // width handled inline
        height: 180,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: theme.spacing.md,
    },
    closeButton: {
        backgroundColor: '#fff',
        borderRadius: theme.borderRadius.full,
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
        borderColor: theme.colors.background,
        backgroundColor: theme.colors.background,
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
        paddingBottom: 100, // Space for footer
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
        left: 15, // Center of dot (10 width / 2 + paddingLeft?) No, dot is 12 width. Left is paddingLeft + dotWidth/2 approx.
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
        marginTop: 6, // Align with text top
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
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
    },
    actionButtonPressed: {
        opacity: 0.8,
    },
    actionButtonText: {
        ...theme.typography.button,
        color: theme.colors.text,
    },
});
