import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../styles';

type Props = {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  accessibilityLabel?: string;
};

export default function AppButton({ title, onPress, secondary = false, accessibilityLabel }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: { backgroundColor: colors.softGreen },
  pressed: { opacity: 0.7 },
  text: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  secondaryText: { color: colors.primary },
});
