import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'WithdrawSuccess'>;

export default function WithdrawSuccessScreen({ navigation, route }: Props) {
    const { method } = route.params;
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleDone = () => {
        navigation.popToTop(); // Return to Hub (assuming Hub is the start of this stack)
        // Or navigation.navigate('MainApp', { screen: 'Hub' });
    };

    const getMessage = () => {
        switch (method) {
            case 'bank':
                return "Your funds are on the way! They should arrive in your bank account within 3-5 business days.";
            case 'instant':
            case 'paypal':
                return "Success! Your funds should arrive shortly.";
            default:
                return "Your withdrawal request has been processed successfully.";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Animated.View style={[
                    styles.iconContainer,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim
                    }
                ]}>
                    <Ionicons name="checkmark-circle" size={100} color={theme.colors.success} />
                </Animated.View>

                <Animated.Text style={[styles.title, { opacity: opacityAnim }]}>
                    Withdrawal Initiated!
                </Animated.Text>

                <Animated.Text style={[styles.message, { opacity: opacityAnim }]}>
                    {getMessage()}
                </Animated.Text>
            </View>

            <View style={styles.footer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.doneButton,
                        pressed && styles.doneButtonPressed
                    ]}
                    onPress={handleDone}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        padding: theme.spacing.xl,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginBottom: theme.spacing.xl,
    },
    title: {
        ...theme.typography.h1,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    message: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.lg,
        lineHeight: 24,
    },
    footer: {
        width: '100%',
        paddingBottom: theme.spacing.xxl,
    },
    doneButton: {
        backgroundColor: theme.colors.backgroundCard,
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.textTertiary,
    },
    doneButtonPressed: {
        backgroundColor: theme.colors.textTertiary,
    },
    doneButtonText: {
        ...theme.typography.button,
        color: '#FFF',
    },
});
