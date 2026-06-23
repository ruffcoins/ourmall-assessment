import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, PanResponder, Animated, LayoutChangeEvent } from 'react-native';

interface RangeSliderProps {
  min: number;
  max: number;
  low: number;
  high: number;
  onValueChanged: (low: number, high: number) => void;
}

export function RangeSlider({ min, max, low, high, onValueChanged }: RangeSliderProps) {
  const [width, setWidth] = useState(0);

  // Animated values for thumb positions (in pixels)
  const lowAnim = useRef(new Animated.Value(0)).current;
  const highAnim = useRef(new Animated.Value(0)).current;

  // --- Mutable refs so PanResponders always see the latest values ---
  const widthRef = useRef(0);
  const onValueChangedRef = useRef(onValueChanged);
  const isDragging = useRef(false);

  // Pixel positions of each thumb
  const currentLowX = useRef(0);
  const currentHighX = useRef(0);

  // Semantic values (used to snapshot at gesture-start)
  const currentLow = useRef(low);
  const currentHigh = useRef(high);
  const startLow = useRef(low);
  const startHigh = useRef(high);

  // Keep callback ref fresh on every render
  useEffect(() => {
    onValueChangedRef.current = onValueChanged;
  });

  // Sync thumb positions whenever width or external values change (but not during a drag)
  useEffect(() => {
    if (widthRef.current <= 0) return;
    if (isDragging.current) return;

    const span = max - min;
    const lx = span > 0 ? ((low - min) / span) * widthRef.current : 0;
    const hx = span > 0 ? ((high - min) / span) * widthRef.current : widthRef.current;

    lowAnim.setValue(lx);
    highAnim.setValue(hx);
    currentLowX.current = lx;
    currentHighX.current = hx;
    currentLow.current = low;
    currentHigh.current = high;
  }, [width, low, high, min, max]);

  const pixelToValue = useCallback(
    (px: number) => Math.round(min + (px / widthRef.current) * (max - min)),
    [min, max]
  );

  // ---- Low thumb pan responder ----
  const panResponderLow = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging.current = true;
        startLow.current = currentLow.current;
      },
      onPanResponderMove: (_, { dx }) => {
        if (widthRef.current <= 0) return;

        const span = max - min;
        const startPx = span > 0 ? ((startLow.current - min) / span) * widthRef.current : 0;
        let newX = startPx + dx;
        newX = Math.max(0, Math.min(newX, currentHighX.current));

        lowAnim.setValue(newX);
        currentLowX.current = newX;

        const newLow = Math.round(min + (newX / widthRef.current) * (max - min));
        const clampedLow = Math.max(min, Math.min(newLow, currentHigh.current));
        if (clampedLow !== currentLow.current) {
          currentLow.current = clampedLow;
          onValueChangedRef.current(clampedLow, currentHigh.current);
        }
      },
      onPanResponderRelease: () => { isDragging.current = false; },
      onPanResponderTerminate: () => { isDragging.current = false; },
    })
  ).current;

  // ---- High thumb pan responder ----
  const panResponderHigh = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isDragging.current = true;
        startHigh.current = currentHigh.current;
      },
      onPanResponderMove: (_, { dx }) => {
        if (widthRef.current <= 0) return;

        const span = max - min;
        const startPx = span > 0 ? ((startHigh.current - min) / span) * widthRef.current : widthRef.current;
        let newX = startPx + dx;
        newX = Math.max(currentLowX.current, Math.min(newX, widthRef.current));

        highAnim.setValue(newX);
        currentHighX.current = newX;

        const newHigh = Math.round(min + (newX / widthRef.current) * (max - min));
        const clampedHigh = Math.max(currentLow.current, Math.min(newHigh, max));
        if (clampedHigh !== currentHigh.current) {
          currentHigh.current = clampedHigh;
          onValueChangedRef.current(currentLow.current, clampedHigh);
        }
      },
      onPanResponderRelease: () => { isDragging.current = false; },
      onPanResponderTerminate: () => { isDragging.current = false; },
    })
  ).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    widthRef.current = w;
    setWidth(w);
  };

  const trackLeft = lowAnim;
  const trackWidth = Animated.subtract(highAnim, lowAnim);

  return (
    <View
      className="h-10 justify-center relative w-full"
      onLayout={handleLayout}
    >
      {/* Background track */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: 4,
          backgroundColor: '#e2e8f0',
          borderRadius: 2,
        }}
      />

      {width > 0 && (
        <>
          {/* Selected range track */}
          <Animated.View
            style={{
              position: 'absolute',
              height: 4,
              backgroundColor: '#7d50a0',
              borderRadius: 2,
              left: trackLeft,
              width: trackWidth,
            }}
          />

          {/* Low thumb */}
          <Animated.View
            {...panResponderLow.panHandlers}
            style={{
              position: 'absolute',
              transform: [{ translateX: lowAnim }],
              marginLeft: -12,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'white',
              borderWidth: 2.5,
              borderColor: '#7d50a0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.18,
              shadowRadius: 3,
              elevation: 3,
              zIndex: 2,
            }}
          />

          {/* High thumb */}
          <Animated.View
            {...panResponderHigh.panHandlers}
            style={{
              position: 'absolute',
              transform: [{ translateX: highAnim }],
              marginLeft: -12,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: 'white',
              borderWidth: 2.5,
              borderColor: '#7d50a0',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.18,
              shadowRadius: 3,
              elevation: 3,
              zIndex: 3,
            }}
          />
        </>
      )}
    </View>
  );
}
