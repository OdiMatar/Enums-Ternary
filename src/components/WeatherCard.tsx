import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { type WeatherIcon } from './WeatherResult';

export type WeatherMood = 'sun' | 'cloud' | 'rain' | 'snow' | 'night';

const palettes = {
  sun: { background: '#fbe4ad', foreground: '#634415', accent: '#95600a' },
  cloud: { background: '#e1e8de', foreground: '#344e40', accent: '#4d705c' },
  rain: { background: '#dce9ef', foreground: '#294d61', accent: '#396d88' },
  snow: { background: '#e7eef5', foreground: '#354e6d', accent: '#4b6f92' },
  night: { background: '#25394e', foreground: '#f2f5fa', accent: '#f6d38d' },
};

type Props = {
  icon: WeatherIcon;
  title: string;
  label: string;
  description: string;
  mood: WeatherMood;
};

export default function WeatherCard({ icon, title, label, description, mood }: Props) {
  const palette = palettes[mood];

  return (
    <View style={[local.card, { backgroundColor: palette.background }]}>
      <View style={local.top}>
        <Text style={[local.eyebrow, { color: palette.foreground }]}>JOUW WEERBERICHT</Text>
        <View style={local.badge}><Text style={[local.badgeText, { color: palette.foreground }]}>SIMULATIE</Text></View>
      </View>
      <View style={local.main}>
        <View style={local.titleContainer}>
          <Text accessibilityLiveRegion="polite" style={[local.title, { color: palette.foreground }]}>{title}</Text>
        </View>
        <View style={local.iconCircle}>
          <MaterialCommunityIcons name={icon} size={80} color={palette.accent}
            accessibilityRole="image" accessibilityLabel={label} />
        </View>
      </View>
      <Text accessibilityLiveRegion="polite" style={[local.label, { color: palette.foreground }]}>{label}</Text>
      <View style={local.divider} />
      <Text style={[local.description, { color: palette.foreground }]}>{description}</Text>
    </View>
  );
}

const local = StyleSheet.create({
  card: { padding: 24, borderRadius: 26, gap: 16 },
  top: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center', flexWrap: 'wrap' },
  eyebrow: { fontSize: 10, letterSpacing: 1.5, fontWeight: '700' },
  badge: { borderRadius: 20, backgroundColor: '#ffffff30', paddingVertical: 5, paddingHorizontal: 10 },
  badgeText: { fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  main: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 120 },
  titleContainer: { flex: 1 },
  title: { fontSize: 36, lineHeight: 40, fontWeight: '700', letterSpacing: -1.2 },
  iconCircle: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff26' },
  label: { fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#657b6d35' },
  description: { fontSize: 14, lineHeight: 22 },
});
