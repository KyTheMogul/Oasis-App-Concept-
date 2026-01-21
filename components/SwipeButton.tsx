import React, { useState, useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { theme } from '../theme';

const BUTTON_HEIGHT = 64;
const KNOB_SIZE = 56; // Slightly smaller than height for padding
const PADDING = 4;
const SWIPE_THRESHOLD = 0.4; // Responsive: trigger at 40% swipe

interface SwipeButtonProps {
    onSwipeComplete: () => void;
    text?: string;
}

export default function SwipeButton({ onSwipeComplete, text = "Get Started" }: SwipeButtonProps) {
    const [containerWidth, setContainerWidth] = useState(0);
    const [completed, setCompleted] = useState(false);

    // Animation value for the horizontal position of the knob
    const translateX = useRef(new Animated.Value(0)).current;

    // Track the actual pixel value for comparisons
    const translateXValue = useRef(0);

    // Track last haptic feedback position to create "ticks"
    const lastHapticValue = useRef(0);

    // Fallback width based on screen width - padding (lg * 2 = 48)
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const FALLBACK_WIDTH = SCREEN_WIDTH - 48;

    const effectiveWidth = containerWidth > 0 ? containerWidth : FALLBACK_WIDTH;

    // Maximum swipe distance (container width - knob width - padding)
    const rawMaxDist = effectiveWidth - KNOB_SIZE - (PADDING * 2);
    const maxSwipeDistance = rawMaxDist > 0 ? rawMaxDist : 0;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                translateX.stopAnimation();
                // Initial feedback
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            },
            onPanResponderMove: (_, gestureState) => {
                if (completed) return;
                if (maxSwipeDistance <= 0) return;

                let newX = gestureState.dx;

                if (newX < 0) newX = 0;
                if (newX > maxSwipeDistance) newX = maxSwipeDistance;

                translateX.setValue(newX);
                translateXValue.current = newX;

                // "Tick" effect: Trigger haptic every 10% or so
                // Using intervals of maxDist / 10
                const tickInterval = maxSwipeDistance / 10;
                if (Math.abs(newX - lastHapticValue.current) > tickInterval) {
                    Haptics.selectionAsync(); // Subtle tick
                    lastHapticValue.current = newX;
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (completed) return;
                if (maxSwipeDistance <= 0) return;

                if (translateXValue.current > maxSwipeDistance * SWIPE_THRESHOLD) {
                    // Success Feedback
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

                    Animated.timing(translateX, {
                        toValue: maxSwipeDistance,
                        duration: 200,
                        useNativeDriver: false,
                    }).start(() => {
                        if (!completed) {
                            setCompleted(true);
                            onSwipeComplete();
                        }
                    });
                } else {
                    // Reset Feedback
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: false,
                        bounciness: 10,
                    }).start();
                }
            },
        })
    ).current;

    const handleLayout = (event: LayoutChangeEvent) => {
        setContainerWidth(event.nativeEvent.layout.width);
    };

    // Interpolation ranges
    const fillWidth = translateX.interpolate({
        inputRange: [0, maxSwipeDistance > 0 ? maxSwipeDistance : 1],
        outputRange: [KNOB_SIZE + PADDING, effectiveWidth],
        extrapolate: 'clamp',
    });

    const textOpacity = translateX.interpolate({
        inputRange: [0, (maxSwipeDistance > 0 ? maxSwipeDistance : 1) / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <View style={styles.container} onLayout={handleLayout}>
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
                {/* Fill Background (Purple) */}
                <Animated.View
                    style={[
                        styles.fillContainer,
                        { width: fillWidth }
                    ]}
                />

                {/* Dynamic Text Label */}
                <View style={styles.textContainer}>
                    {/* Original "Get Started" that fades out */}
                    <Animated.View style={{ opacity: completed ? 0 : textOpacity, flexDirection: 'row', alignItems: 'center' }}>
                        <Animated.Text style={styles.text}>{text}</Animated.Text>
                        <View style={styles.arrowContainer}>
                            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.5)" />
                            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.3)" style={{ marginLeft: -10 }} />
                        </View>
                    </Animated.View>

                    {/* "Signing In..." Text that appears on completion */}
                    {completed && (
                        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Animated.Text style={styles.text}>Signing In...</Animated.Text>
                        </View>
                    )}
                </View>

                {/* Swipe Knob */}
                <Animated.View
                    style={[
                        styles.knob,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                    {...panResponder.panHandlers}
                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 100 }}
                >
                    <Ionicons name={completed ? "checkmark" : "arrow-forward"} size={24} color={theme.colors.primary} />
                </Animated.View>
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: BUTTON_HEIGHT,
        width: '100%',
        borderRadius: 999,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        zIndex: 1000,
    },
    blurContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: PADDING,
    },
    fillContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.colors.primary,
        opacity: 0.9,
        borderRadius: 999,
    },
    knob: {
        width: KNOB_SIZE,
        height: KNOB_SIZE,
        borderRadius: KNOB_SIZE / 2,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        paddingLeft: KNOB_SIZE, // Center text in empty space
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'System',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    arrowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    }
});
