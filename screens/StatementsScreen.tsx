import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const mockStatements = [
    { id: 'TX-8832', company: 'TechGear Pro', amount: 1500, date: 'Oct 24, 2025', status: 'Paid' },
    { id: 'TX-9921', company: 'FitLife Nutrition', amount: 1200, date: 'Oct 15, 2025', status: 'Paid' },
    { id: 'TX-7742', company: 'FashionHub', amount: 2000, date: 'Sep 28, 2025', status: 'Paid' },
];

export default function StatementsScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
                </Pressable>
                <Text style={styles.title}>Statements</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {mockStatements.map((item) => (
                    <View key={item.id} style={styles.statementCard}>
                        <View style={styles.row}>
                            <Text style={styles.companyName}>{item.company}</Text>
                            <Text style={styles.amount}>+${item.amount}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.idText}>ID: {item.id}</Text>
                            <Text style={styles.dateText}>{item.date}</Text>
                        </View>
                        <View style={styles.statusRow}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>{item.status}</Text>
                        </View>
                    </View>
                ))}
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
        gap: theme.spacing.md,
    },
    statementCard: {
        backgroundColor: theme.colors.backgroundCard,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        gap: theme.spacing.sm,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    companyName: {
        ...theme.typography.body,
        fontWeight: '700',
        color: theme.colors.text,
    },
    amount: {
        ...theme.typography.h3,
        color: theme.colors.success,
    },
    idText: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
    },
    dateText: {
        ...theme.typography.caption,
        color: theme.colors.textTertiary,
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: theme.colors.success,
    },
    statusText: {
        ...theme.typography.caption,
        color: theme.colors.success,
        fontWeight: '600',
    },
});
