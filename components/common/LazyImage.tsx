import React, { useState, useEffect } from 'react';
import {
  Image,
  ImageProps,
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import PlaceholderImage from './PlaceholderImage';

interface LazyImageProps extends Omit<ImageProps, 'source'> {
  source: ImageSourcePropType;
  placeholder?: ImageSourcePropType;
  loadingIndicatorColor?: string;
  fadeDuration?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  source,
  placeholder,
  style,
  loadingIndicatorColor,
  fadeDuration = 300,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: fadeDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading, fadeAnim, fadeDuration]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      {isLoading && (
        <View style={[StyleSheet.absoluteFillObject, styles.loadingContainer]}>
          {placeholder ? (
            <Image source={placeholder} style={[styles.placeholder, style]} />
          ) : (
            <ActivityIndicator
              color={loadingIndicatorColor || colors.primary}
              size="small"
            />
          )}
        </View>
      )}

      <Animated.Image
        {...props}
        source={source}
        style={[
          style,
          {
            opacity: fadeAnim,
          },
        ]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />

      {error && (
        <PlaceholderImage style={styles.errorContainer} iconSize={48} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default React.memo(LazyImage);
