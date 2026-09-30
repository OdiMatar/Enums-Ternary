import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, styles } from '../styles';

export type WeatherIcon = ComponentProps<typeof MaterialCommunityIcons>['name'];

type Props = { icon: WeatherIcon; text: string; color?: string; compact?: boolean };

export default function WeatherResult({ icon, text, color = colors.primary, compact = false }: Props) {
  return (
    <View style={[localStyles.result, compact && localStyles.compact]}>
      <MaterialCommunityIcons
        name={icon}
        size={compact ? 32 : 64}
        color={color}
        accessibilityRole="image"
        accessibilityLabel={text}
      />
      <Text accessibilityLiveRegion="polite" style={[styles.label, localStyles.centered]}>
        {text}
      </Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  result: { alignItems: 'center', gap: 10, paddingVertical: 12 },
  compact: { flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.background, borderRadius: 14, padding: 12 },
  centered: { textAlign: 'center', flexShrink: 1 },
});
