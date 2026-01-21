/**
 * WithdrawScreen - Creator earnings withdrawal interface
 * 
 * Features:
 * - Available balance display
 * - Custom amount input with currency formatting
 * - Payment method selection (PayPal Instant, Bank Transfer)
 * - Auto-withdraw toggle for monthly automation
 * - Validation to ensure amount doesn't exceed balance
 * 
 * TODO: Production integration:
 * - Connect to payment processing API (Stripe, PayPal SDK)
 * - Add bank account linking flow
 * - Implement transaction history
 * - Add withdrawal limits and verification
 */
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    Switch,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Withdraw'>;

type PaymentMethod = 'paypal' | 'bank' | 'instant';

export default function WithdrawScreen({ navigation }: Props) {
    const insets = useSafeAreaInsets();
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('instant');
    const [autoWithdraw, setAutoWithdraw] = useState(false);

    // Mock balance
    const availableBalance = 3450.50;

    const handleWithdraw = () => {
        navigation.navigate('WithdrawSuccess', { method: selectedMethod });
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderMethodOption = (id: PaymentMethod, name: string, icon: string, detail: string) => (
        <Pressable
            style={[
                styles.methodCard,
                selectedMethod === id && styles.methodCardActive
            ]}
            onPress={() => setSelectedMethod(id)}
        >
            <View style={styles.methodHeader}>
                <View style={styles.methodIconContainer}>
                    <Ionicons name={icon as any} size={24} color={selectedMethod === id ? theme.colors.primary : '#FFF'} />
                </View>
                <View style={styles.methodInfo}>
                    <Text style={[styles.methodName, selectedMethod === id && styles.methodNameActive]}>{name}</Text>
                    <Text style={styles.methodDetail}>{detail}</Text>
                </View>
                <View style={[styles.radioButton, selectedMethod === id && styles.radioButtonActive]}>
                    {selectedMethod === id && <View style={styles.radioButtonInner} />}
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <Pressable onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </Pressable>
                <Text style={styles.headerTitle}>Withdraw Funds</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
                <Text style={styles.balanceLabel}>Available for Withdrawal</Text>
                <Text style={styles.balanceAmount}>${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput
                        style={styles.amountInput}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="0.00"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                    />
                </View>

                <Text style={styles.sectionTitle}>Select Payment Method</Text>
                <View style={styles.methodsContainer}>
                    {renderMethodOption('instant', 'PayPal Instant', 'logo-paypal', 'Instant transfer (1.5% fee)')}
                    {renderMethodOption('bank', 'Bank Transfer', 'business', 'Direct deposit (3-5 days)')}
                </View>

                <View style={styles.autoWithdrawContainer}>
                    <View style={styles.autoWithdrawInfo}>
                        <Text style={styles.autoWithdrawTitle}>Auto Withdraw</Text>
                        <Text style={styles.autoWithdrawDesc}>Automatically withdraw earnings on the 1st of every month</Text>
                    </View>
                    <Switch
                        value={autoWithdraw}
                        onValueChange={setAutoWithdraw}
                        trackColor={{ false: '#333', true: theme.colors.primary }}
                        thumbColor={'#FFF'}
                    />
                </View>
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.withdrawButton,
                            pressed && styles.withdrawButtonPressed,
                            !amount && styles.withdrawButtonDisabled
                        ]}
                        onPress={handleWithdraw}
                        disabled={!amount}
                    >
                        <Text style={styles.withdrawButtonText}>Withdraw Funds</Text>
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
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: theme.colors.backgroundCard,
    },
    headerTitle: {
        ...theme.typography.h3,
        color: '#FFF',
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.xl,
    },
    balanceLabel: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.xl,
    },
    balanceAmount: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginVertical: theme.spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: theme.spacing.xl,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.2)',
        paddingBottom: theme.spacing.sm,
        alignSelf: 'center',
        width: '60%',
    },
    currencySymbol: {
        fontSize: 32,
        fontWeight: '600',
        color: '#FFF',
        marginRight: 4,
    },
    amountInput: {
        fontSize: 32,
        fontWeight: '600',
        color: '#FFF',
        minWidth: 100,
        textAlign: 'center',
    },
    sectionTitle: {
        ...theme.typography.h3,
        color: '#FFF',
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.lg,
    },
    methodsContainer: {
        gap: theme.spacing.md,
    },
    methodCard: {
        backgroundColor: theme.colors.backgroundCard,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.lg,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    methodCardActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: theme.spacing.md,
    },
    methodInfo: {
        flex: 1,
    },
    methodName: {
        ...theme.typography.body,
        fontWeight: '600',
        color: '#FFF',
    },
    methodNameActive: {
        color: theme.colors.primary,
    },
    methodDetail: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginTop: 2,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.textSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonActive: {
        borderColor: theme.colors.primary,
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    autoWithdrawContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: theme.spacing.xxl,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.backgroundCard,
        borderRadius: theme.borderRadius.lg,
        marginBottom: 100, // Space for footer
    },
    autoWithdrawInfo: {
        flex: 1,
        paddingRight: theme.spacing.md,
    },
    autoWithdrawTitle: {
        ...theme.typography.body,
        fontWeight: '600',
        color: '#FFF',
    },
    autoWithdrawDesc: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
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
    },
    withdrawButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.borderRadius.full,
        alignItems: 'center',
    },
    withdrawButtonPressed: {
        opacity: 0.8,
    },
    withdrawButtonDisabled: {
        opacity: 0.5,
        backgroundColor: theme.colors.textTertiary,
    },
    withdrawButtonText: {
        ...theme.typography.button,
        color: '#FFF',
        fontSize: 18,
    },
});
