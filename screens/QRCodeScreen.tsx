/**
 * QRCodeScreen - QR code display and scanning functionality
 * 
 * Dual-mode screen:
 * 1. Show Mode: Displays creator's profile QR code with blurred background
 * 2. Scan Mode: Camera view for scanning other QR codes
 * 
 * Features:
 * - Camera permission handling
 * - Toggle between show/scan modes
 * - Profile picture blur effect in show mode
 * - Circular scan frame in scan mode
 * 
 * TODO: Production enhancements:
 * - QR code scanning logic implementation
 * - Deep linking for scanned codes
 * - Share QR code functionality
 */
import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import QRCode from 'react-native-qrcode-svg';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function QRCodeScreen() {
    const [mode, setMode] = useState<'scan' | 'show'>('show');
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Pressable onPress={requestPermission} style={styles.permissionButton}>
                    <Text style={styles.permissionText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {mode === 'scan' ? (
                <CameraView style={styles.camera} facing="back">
                    <View style={styles.cameraOverlay}>
                        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                            <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
                                <Ionicons name="close" size={28} color="white" />
                            </Pressable>
                            <Pressable
                                style={styles.toggleButton}
                                onPress={() => setMode('show')}
                            >
                                <Text style={styles.toggleText}>Show My Code</Text>
                            </Pressable>
                        </View>
                        <View style={styles.scanFrame} />
                        <Text style={styles.scanText}>Scan a QR code to connect</Text>
                    </View>
                </CameraView>
            ) : (
                <View style={styles.showContainer}>
                    {/* Background Blur simulating profile picture blur */}
                    {/* Background Blur simulating profile picture blur */}
                    <View style={styles.blurredBackground}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/300?img=12' }}
                            style={styles.backgroundImage}
                            resizeMode="cover"
                        />
                        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
                    </View>

                    <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
                        <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
                            <Ionicons name="close" size={28} color="white" />
                        </Pressable>
                        <Pressable
                            style={styles.toggleButton}
                            onPress={() => setMode('scan')}
                        >
                            <Text style={styles.toggleText}>Scan Code</Text>
                        </Pressable>
                    </View>

                    <View style={styles.qrContent}>
                        <View style={styles.qrCard}>
                            <QRCode
                                value="https://oasis.app/alexjohnson"
                                size={200}
                                backgroundColor="white"
                                color="black"
                            />
                        </View>
                        <Text style={styles.userName}>@alexjohnson</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: 'white',
    },
    permissionButton: {
        backgroundColor: theme.colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    permissionText: {
        color: 'white',
        fontWeight: 'bold',
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 100,
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        zIndex: 10,
    },
    iconButton: {
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: theme.borderRadius.full,
    },
    toggleButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: theme.borderRadius.full,
    },
    toggleText: {
        color: 'white',
        fontWeight: '600',
    },
    scanFrame: {
        width: 250,
        height: 250,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        backgroundColor: 'transparent',
        borderRadius: 125, // Circular
    },
    scanText: {
        color: 'white',
        fontSize: 16,
        marginTop: 20,
    },
    showContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blurredBackground: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    qrContent: {
        alignItems: 'center',
        gap: theme.spacing.xl,
    },
    qrCard: {
        padding: theme.spacing.xl,
        backgroundColor: 'white',
        borderRadius: theme.borderRadius.xl,
    },
    userName: {
        ...theme.typography.h2,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
});
