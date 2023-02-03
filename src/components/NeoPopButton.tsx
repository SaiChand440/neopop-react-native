import React, {useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

const DISABLED_BUTTON_COLOR = '#C0C0C0';
const BUTTON_DURATION = 50;
const BUTTON_DEPTH = 3;

const getShadowStyles = color => {
  // Add code to derive the shadow styles from the color
  return {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };
};

const NeopopButton = ({
  children,
  color,
  onPress,
  disabledColor = DISABLED_BUTTON_COLOR,
  animationDuration = BUTTON_DURATION,
  forwardDuration,
  reverseDuration,
  enabled = true,
  shadowColor,
  rightShadowColor,
  leftShadowColor,
  topShadowColor,
  bottomShadowColor,
  buttonPosition,
  depth = BUTTON_DEPTH,
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.timing(scaleValue, {
      toValue: depth,
      duration: forwardDuration || animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: reverseDuration || animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const disabled = !enabled;

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: disabled ? disabledColor : color,
            transform: [{scale: scaleValue}],
            ...getShadowStyles(shadowColor || color),
          },
        ]}>
        <Text style={styles.text}>{children}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NeopopButton;