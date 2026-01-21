import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Image,
    Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Message } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

// Mock messages for a specific thread
const mockMessages: Message[] = [
    {
        id: 'm1',
        dealId: 'd1',
        senderId: 'brand1',
        senderName: 'TechGear Pro',
        senderType: 'brand',
        content: 'Hi! We saw your profile and love your tech reviews.',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        read: true,
    },
    {
        id: 'm2',
        dealId: 'd1',
        senderId: 'user1',
        senderName: 'You',
        senderType: 'user',
        content: 'Thank you! I am really interested in your new headphones.',
        timestamp: new Date(Date.now() - 80000000), // ~22 hours ago
        read: true,
    },
    {
        id: 'm3',
        dealId: 'd1',
        senderId: 'brand1',
        senderName: 'TechGear Pro',
        senderType: 'brand',
        content: 'Great! We would like to offer you a sponsorship for a review video. Are you available?',
        timestamp: new Date(Date.now() - 72000000), // ~20 hours ago
        read: true,
    },
    {
        id: 'm4',
        dealId: 'd1',
        senderId: 'user1',
        senderName: 'You',
        senderType: 'user',
        content: 'Yes, definitely! What are the terms?',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
    },
    {
        id: 'm5',
        dealId: 'd1',
        senderId: 'brand1',
        senderName: 'TechGear Pro',
        senderType: 'brand',
        content: 'We can offer $1,500 for a dedicated review and 2 Instagram stories.',
        timestamp: new Date(Date.now() - 1800000), // 30 mins ago
        read: true,
    },
];

export default function ChatScreen({ navigation, route }: Props) {
    const { businessName, businessIcon, category } = route.params;
    console.log('ChatScreen params:', route.params);
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<Message[]>(mockMessages.reverse()); // Reverse for inverted list
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            dealId: 'd1',
            senderId: 'user1',
            senderName: 'You',
            senderType: 'user',
            content: inputText.trim(),
            timestamp: new Date(),
            read: true,
        };

        setMessages([newMessage, ...messages]);
        setInputText('');
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.senderType === 'user';
        return (
            <View style={[
                styles.messageRow,
                isUser ? styles.messageRowUser : styles.messageRowBrand
            ]}>
                {!isUser && (
                    <View style={styles.avatarContainer}>
                        {businessIcon ? (
                            <Image source={{ uri: businessIcon }} style={styles.avatar} />
                        ) : (
                            <View style={styles.avatarPlaceholder}>
                                <Text style={styles.avatarText}>{businessName.charAt(0)}</Text>
                            </View>
                        )}
                    </View>
                )}
                <View style={{ maxWidth: '75%' }}>
                    {!isUser && (
                        <Text style={styles.senderName}>{item.senderName}</Text>
                    )}
                    <View style={[
                        styles.messageBubble,
                        isUser ? styles.messageBubbleUser : styles.messageBubbleBrand
                    ]}>
                        <Text style={[
                            styles.messageText,
                            isUser ? styles.messageTextUser : styles.messageTextBrand
                        ]}>
                            {item.content}
                        </Text>
                        <Text style={[
                            styles.timestamp,
                            isUser ? styles.timestampUser : styles.timestampBrand
                        ]}>
                            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </Pressable>

                <View style={styles.headerInfo}>
                    <Text style={styles.headerTitle}>{businessName}</Text>
                    <Text style={styles.headerSubtitle}>{category}</Text>
                </View>

                <Pressable style={styles.headerAction}>
                    <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
                </Pressable>
            </View>

            {/* Messages */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                inverted
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={[styles.inputContainer, { paddingBottom: insets.bottom + 10 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        placeholderTextColor={theme.colors.textTertiary}
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                        maxLength={500}
                    />
                    <Pressable
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={handleSend}
                        disabled={!inputText.trim()}
                    >
                        <Ionicons name="send" size={20} color="#FFF" />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        backgroundColor: '#000000',
        zIndex: 10,
    },
    backButton: {
        padding: 4,
    },
    headerInfo: {
        flex: 1,
        marginLeft: theme.spacing.sm, // Reduced from md
    },
    headerTitle: {
        ...theme.typography.body,
        fontWeight: '700',
        color: '#FFF',
    },
    headerSubtitle: {
        ...theme.typography.caption,
        color: theme.colors.success,
    },
    headerAction: {
        padding: 4,
    },
    listContent: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.xl,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: theme.spacing.md,
        alignItems: 'flex-end',
    },
    messageRowUser: {
        justifyContent: 'flex-end',
    },
    messageRowBrand: {
        justifyContent: 'flex-start',
    },
    avatarContainer: {
        marginRight: theme.spacing.xs,
        marginBottom: 4,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    senderName: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginLeft: 4,
        marginBottom: 4,
        fontSize: 12,
    },
    messageBubble: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        borderRadius: 20,
    },
    headerLogoContainer: {
        marginLeft: theme.spacing.md,
    },
    headerLogo: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    headerLogoPlaceholder: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLogoText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageBubbleUser: {
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: 4,
    },
    messageBubbleBrand: {
        backgroundColor: theme.colors.backgroundCard,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    messageText: {
        ...theme.typography.body,
        fontSize: 15,
        lineHeight: 22,
    },
    messageTextUser: {
        color: '#FFF',
    },
    messageTextBrand: {
        color: theme.colors.text,
    },
    timestamp: {
        ...theme.typography.caption,
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    timestampUser: {
        color: 'rgba(255,255,255,0.7)',
    },
    timestampBrand: {
        color: theme.colors.textTertiary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.md,
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        gap: theme.spacing.sm,
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: 24,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: 12, // Fixed padding for multiline
        paddingTop: 12, // Ensure text starts at top for ios
        color: '#FFF',
        maxHeight: 100,
        ...theme.typography.body,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2, // Align with input bottom
    },
    sendButtonDisabled: {
        backgroundColor: theme.colors.backgroundCard,
        opacity: 0.5,
    },
});
