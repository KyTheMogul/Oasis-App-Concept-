/**
 * MessagesScreen - List of conversation threads with brands
 * 
 * Features:
 * - Searchable list of all brand conversations
 * - Unread message badges
 * - Last message preview with timestamps
 * - Empty state for new users
 * - Tap to open individual chat thread
 * 
 * TODO: Integrate with real-time messaging backend
 * - WebSocket connection for live updates
 * - Push notifications for new messages
 * - Mark threads as read when opened
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    TextInput,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { ChatThread, RootStackParamList } from '../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Mock chat threads
const mockChatThreads: ChatThread[] = [
    {
        id: 'c1',
        dealId: 'd1',
        businessName: 'TechGear Pro',
        businessIcon: undefined,
        category: 'Tech & Electronics',
        lastMessage: {
            id: 'm1',
            dealId: 'd1',
            senderId: 'brand1',
            senderName: 'TechGear Pro',
            senderType: 'brand',
            content: 'Great work on the review video! Looking forward to the follow-up.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            read: false,
        },
        unreadCount: 2,
    },
    {
        id: 'c2',
        dealId: 'd2',
        businessName: 'FitLife Nutrition',
        businessIcon: undefined,
        category: 'Health & Fitness',
        lastMessage: {
            id: 'm2',
            dealId: 'd2',
            senderId: 'user1',
            senderName: 'You',
            senderType: 'user',
            content: 'I can start the 30-day challenge next week!',
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            read: true,
        },
        unreadCount: 0,
    },
    {
        id: 'c3',
        dealId: 'd3',
        businessName: 'StyleHub Fashion',
        businessIcon: undefined,
        category: 'Fashion & Style',
        lastMessage: {
            id: 'm3',
            dealId: 'd3',
            senderId: 'brand3',
            senderName: 'StyleHub Fashion',
            senderType: 'brand',
            content: 'We loved your application! When can you start?',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            read: false,
        },
        unreadCount: 1,
    },
];

function formatTimestamp(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else {
        return `${diffDays}d ago`;
    }
}

export default function MessagesScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredThreads = mockChatThreads.filter((thread) => {
        const query = searchQuery.toLowerCase();
        return (
            thread.businessName.toLowerCase().includes(query) ||
            thread.lastMessage.content.toLowerCase().includes(query) ||
            thread.lastMessage.senderName.toLowerCase().includes(query)
        );
    });

    const handlePress = (thread: ChatThread) => {
        navigation.navigate('Chat', {
            threadId: thread.id,
            businessName: thread.businessName,
            businessIcon: thread.businessIcon,
            category: thread.category,
        });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: 60 }]}>
                {isSearchVisible ? (
                    <View style={styles.searchBarContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search messages..."
                            placeholderTextColor={theme.colors.textSecondary}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        <Pressable
                            onPress={() => {
                                setIsSearchVisible(false);
                                setSearchQuery('');
                            }}
                            style={styles.closeSearchButton}
                        >
                            <Ionicons name="close" size={20} color={theme.colors.text} />
                        </Pressable>
                    </View>
                ) : (
                    <>
                        <Text style={styles.title}>Messages</Text>
                        <Pressable
                            onPress={() => setIsSearchVisible(true)}
                            style={styles.headerIconButton}
                        >
                            <Ionicons name="search" size={24} color={theme.colors.text} />
                        </Pressable>
                    </>
                )}
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >
                {filteredThreads.map((thread) => (
                    <Pressable
                        key={thread.id}
                        style={({ pressed }) => [
                            styles.chatThread,
                            pressed && styles.chatThreadPressed,
                        ]}
                        onPress={() => handlePress(thread)}
                    >
                        <View style={styles.iconContainer}>
                            {thread.businessIcon ? (
                                <Image
                                    source={{ uri: thread.businessIcon }}
                                    style={styles.businessIcon}
                                />
                            ) : (
                                <View style={styles.iconPlaceholder}>
                                    <Text style={styles.iconText}>
                                        {thread.businessName.charAt(0).toUpperCase()}
                                    </Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.chatContent}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.businessName} numberOfLines={1}>
                                    {thread.businessName}
                                </Text>
                                <Text style={styles.timestamp}>
                                    {formatTimestamp(thread.lastMessage.timestamp)}
                                </Text>
                            </View>

                            <View style={styles.messageRow}>
                                <Text
                                    style={[
                                        styles.lastMessage,
                                        thread.unreadCount > 0 && styles.lastMessageUnread,
                                    ]}
                                    numberOfLines={1}
                                >
                                    {thread.lastMessage.senderType === 'user' ? 'You: ' : ''}
                                    {thread.lastMessage.content}
                                </Text>
                                {thread.unreadCount > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadBadgeText}>
                                            {thread.unreadCount}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </Pressable>
                ))}

                {filteredThreads.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons
                            name="chatbubbles-outline"
                            size={64}
                            color={theme.colors.textTertiary}
                        />
                        <Text style={styles.emptyStateText}>No messages yet</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Start applying for deals to connect with brands
                        </Text>
                    </View>
                )}
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
        paddingTop: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.md,
    },
    headerIconButton: {
        padding: 4,
        backgroundColor: 'transparent', // Fully transparent
        borderRadius: theme.borderRadius.full,
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)', // Light gray outline
        borderRadius: theme.borderRadius.full,
        paddingHorizontal: theme.spacing.md,
        height: 44,
        gap: theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        color: theme.colors.text,
        ...theme.typography.body,
        height: '100%',
    },
    closeSearchButton: {
        padding: 4,
    },
    title: {
        ...theme.typography.h1,
        color: theme.colors.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.lg, // Slightly reduced padding
        paddingBottom: theme.spacing.xl,
    },
    chatThread: {
        flexDirection: 'row',
        backgroundColor: 'transparent', // Transparent background
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.sm, // Reduced horizontal padding for fuller width feel
        gap: theme.spacing.md,
        borderBottomWidth: 1, // Divider line
        borderBottomColor: 'rgba(255, 255, 255, 0.1)', // Thin transparent divider
    },
    chatThreadPressed: {
        opacity: 0.7,
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle press state
    },
    iconContainer: {
        alignSelf: 'flex-start',
    },
    businessIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.full,
    },
    iconPlaceholder: {
        width: 48,
        height: 48,
        borderRadius: theme.borderRadius.full,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        ...theme.typography.body,
        fontWeight: '700',
        color: theme.colors.text,
    },
    chatContent: {
        flex: 1,
        gap: theme.spacing.xs,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    businessName: {
        ...theme.typography.body,
        fontWeight: '600',
        color: theme.colors.text,
        flex: 1,
    },
    timestamp: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    lastMessage: {
        ...theme.typography.bodySmall,
        color: theme.colors.textSecondary,
        flex: 1,
    },
    lastMessageUnread: {
        color: theme.colors.text,
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.xs,
    },
    unreadBadgeText: {
        ...theme.typography.caption,
        fontSize: 11,
        fontWeight: '700',
        color: theme.colors.text,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.xxl * 2,
        gap: theme.spacing.md,
    },
    emptyStateText: {
        ...theme.typography.h3,
        color: theme.colors.textSecondary,
    },
    emptyStateSubtext: {
        ...theme.typography.body,
        color: theme.colors.textTertiary,
        textAlign: 'center',
    },
});
