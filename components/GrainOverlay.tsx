/**
 * GrainOverlay - Animated film grain texture overlay component
 * 
 * Creates a subtle, animated grain effect using SVG patterns.
 * Used globally in App.tsx to add depth and premium feel to the UI.
 * 
 * Features:
 * - Multiple noise layers (12) for non-repetitive animation
 * - Random layer cycling for organic movement
 * - Configurable opacity, density, and animation speed
 * - Performance optimized with useMemo and native animations
 * 
 * Design: Adds subtle texture without being distracting, enhancing
 * the premium dark theme aesthetic.
 */
import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Rect, Defs, Pattern } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GrainOverlayProps {
    animate?: boolean;
    patternWidth?: number;
    patternHeight?: number;
    grainOpacity?: number;
    grainDensity?: number;
    grainWidth?: number;
    grainHeight?: number;
    grainSpeed?: number; // ms per frame
}

// Number of noise layers to cycle through
// Increased to 12 to ensure zero perceived repetition - true "chaotic" film grain
const NUM_LAYERS = 12;

/**
 * Generates a random noise pattern array of Rect elements
 */
const createNoiseLayer = (
    width: number,
    height: number,
    density: number,
    grainW: number,
    grainH: number,
    opacity: number,
    keyPrefix: string
) => {
    const rects = [];
    let key = 0;

    for (let w = 0; w < width; w += density) {
        for (let h = 0; h < height; h += density) {
            if (Math.random() > 0.5) continue;

            const isWhite = Math.random() > 0.5;
            const color = isWhite
                ? `rgba(255, 255, 255, ${opacity})`
                : `rgba(0, 0, 0, ${opacity})`;

            rects.push(
                <Rect
                    key={`${keyPrefix}-${key++}`}
                    x={w}
                    y={h}
                    width={grainW}
                    height={grainH}
                    fill={color}
                />
            );
        }
    }
    return rects;
};

export default function GrainOverlay({
    animate = true,
    patternWidth = 100,
    patternHeight = 100,
    grainOpacity = 0.05, // reduced to 5% for extreme subtlety
    grainDensity = 1.6, // slight tweak to make grains deeper
    grainWidth = 1,
    grainHeight = 1,
    grainSpeed = 125, // ~8fps
}: GrainOverlayProps = {}) {
    // Opacity animated values for each layer
    const layerOpacities = useRef(
        Array(NUM_LAYERS).fill(0).map(() => new Animated.Value(0))
    ).current;

    // Generate multiple distinct static noise layers
    const noiseLayers = useMemo(() => {
        return Array(NUM_LAYERS).fill(0).map((_, i) => ({
            id: `layer-${i}`,
            pattern: createNoiseLayer(
                patternWidth,
                patternHeight,
                grainDensity,
                grainWidth,
                grainHeight,
                grainOpacity,
                `l${i}`
            )
        }));
    }, [patternWidth, patternHeight, grainDensity, grainOpacity, grainWidth, grainHeight]);

    useEffect(() => {
        if (!animate) {
            layerOpacities[0].setValue(1);
            return;
        }

        let isMounted = true;
        let currentStep = 0;

        const cycleLayers = () => {
            if (!isMounted) return;

            // Reset all to 0
            layerOpacities.forEach(op => op.setValue(0));

            // Pick a RANDOM layer explicitly
            let nextStep = Math.floor(Math.random() * NUM_LAYERS);

            // Ensure we don't pick the same layer twice in a row
            if (nextStep === currentStep) {
                nextStep = (nextStep + 1) % NUM_LAYERS;
            }

            layerOpacities[nextStep].setValue(1);
            currentStep = nextStep;

            setTimeout(cycleLayers, grainSpeed);
        };

        cycleLayers();

        return () => {
            isMounted = false;
        };
    }, [animate, grainSpeed]);

    return (
        <View style={styles.container} pointerEvents="none">
            {noiseLayers.map((layer, index) => (
                <Animated.View
                    key={layer.id}
                    style={[
                        styles.layerContainer,
                        { opacity: layerOpacities[index] }
                    ]}
                >
                    <View style={styles.tile}>
                        <Svg width="100%" height="100%">
                            <Defs>
                                <Pattern
                                    id={`grain-${layer.id}`}
                                    x="0"
                                    y="0"
                                    width={patternWidth}
                                    height={patternHeight}
                                    patternUnits="userSpaceOnUse"
                                >
                                    {layer.pattern}
                                </Pattern>
                            </Defs>
                            <Rect
                                x="0"
                                y="0"
                                width="100%"
                                height="100%"
                                fill={`url(#grain-${layer.id})`}
                            />
                        </Svg>
                    </View>
                </Animated.View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        elevation: 9999,
        overflow: 'hidden',
    },
    layerContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    tile: {
        width: '100%',
        height: '100%',
    },
});
