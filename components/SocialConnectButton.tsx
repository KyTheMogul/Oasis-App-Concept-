import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { SocialPlatform } from '../types';

interface SocialConnectButtonProps {
    platform: SocialPlatform;
    connected: boolean;
    onPress: () => void;
}

const platformConfig: Record<
    SocialPlatform,
    { icon: keyof typeof Ionicons.glyphMap; label: string; color: string }
> = {
    youtube: { icon: 'logo-youtube', label: 'YouTube', color: '#FF0000' },
    tiktok: { icon: 'musical-notes', label: 'TikTok', color: '#000000' },
    instagram: { icon: 'logo-instagram', label: 'Instagram', color: '#E4405F' },
    facebook: { icon: 'logo-facebook', label: 'Facebook', color: '#1877F2' },
    snapchat: { icon: 'logo-snapchat', label: 'Snapchat', color: '#FFFC00' },
    twitter: { icon: 'logo-twitter', label: 'Twitter', color: '#1DA1F2' },
    linkedin: { icon: 'logo-linkedin', label: 'LinkedIn', color: '#0A66C2' },
    twitch: { icon: 'logo-twitch', label: 'Twitch', color: '#9146FF' },
    kick: { icon: 'square', label: 'Kick', color: '#53FC18' },
};

export default function SocialConnectButton({
    platform,
    connected,
    onPress,
}: SocialConnectButtonProps) {
    const config = platformConfig[platform];

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                connected && styles.buttonConnected,
                pressed && styles.buttonPressed,
            ]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <Ionicons name={config.icon} size={24} color={config.color} />
            </View>
            <Text style={styles.label}>{config.label}</Text>
            {connected && (
                <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundCard,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        borderRadius: theme.borderRadius.md,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        gap: theme.spacing.md,
    },
    buttonConnected: {
        borderColor: theme.colors.success,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
    },
    buttonPressed: {
        opacity: 0.7,
    },
    iconContainer: {
        width: 32,
        height: 32,
        backgroundColor: theme.colors.text,
        borderRadius: theme.borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        ...theme.typography.body,
        color: theme.colors.text,
        flex: 1,
    },
});
