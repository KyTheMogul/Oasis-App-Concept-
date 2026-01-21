import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<any>(); // Replace with proper type when available

    const menuItems = [
        {
            title: 'Profile',
            icon: 'person-outline',
            onPress: () => navigation.navigate('Profile'),
        },
        {
            title: 'Statements',
            icon: 'document-text-outline',
            onPress: () => navigation.navigate('Statements'),
        },
        {
            title: 'Security',
            icon: 'shield-checkmark-outline',
            onPress: () => { }, // Placeholder
        },
        {
            title: 'Preferences',
            icon: 'options-outline',
            onPress: () => { }, // Placeholder
        },
    ];

    const handleLogout = () => {
        // Implement logout logic here
        navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
        });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
                </Pressable>
                <Text style={styles.title}>Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && styles.pressed,
                            ]}
                            onPress={item.onPress}
                        >
                            <View style={styles.itemLeft}>
                                <Ionicons name={item.icon as any} size={24} color={theme.colors.text} />
                                <Text style={styles.itemTitle}>{item.title}</Text>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={theme.colors.textTertiary}
                            />
                        </Pressable>
                    ))}
                </View>

                <Pressable
                    style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
                    onPress={handleLogout}
                >
                    <Text style={styles.logoutText}>Log Out</Text>
                </Pressable>
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        gap: theme.spacing.md,
    },
    backButton: {
        padding: 4,
    },
    title: {
        ...theme.typography.h2,
        color: theme.colors.text,
    },
    content: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xxl,
    },
    menuContainer: {
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        padding: theme.spacing.md,
        gap: theme.spacing.lg,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.sm,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    itemTitle: {
        ...theme.typography.body,
        fontSize: 16,
        color: theme.colors.text,
    },
    pressed: {
        opacity: 0.7,
    },
    logoutButton: {
        marginTop: theme.spacing.xxl,
        alignItems: 'center',
        padding: theme.spacing.md,
    },
    logoutText: {
        ...theme.typography.body,
        color: theme.colors.error,
        fontWeight: '600',
    },
});
