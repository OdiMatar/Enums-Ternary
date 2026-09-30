import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { type PropsWithChildren } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles } from '../styles';

type Props = PropsWithChildren<{ title: string; subtitle: string; showBack?: boolean }>;

export default function Screen({ title, subtitle, showBack = true, children }: Props) {
  return (
    <SafeAreaView style={layout.safeArea}>
      <ScrollView contentContainerStyle={layout.scroll}>
        <View style={layout.content}>
          <View style={layout.brandRow}>
            <View style={styles.row}>
              <View style={layout.logo}>
                <MaterialCommunityIcons name="weather-partly-cloudy" size={25} color={colors.text} />
              </View>
              <Text style={layout.brand}>weerwijs<Text style={layout.brandDot}>.</Text></Text>
            </View>
            <Text style={styles.eyebrow}>WEERATELIER</Text>
          </View>
          {showBack && (
            <Pressable accessibilityRole="button" accessibilityLabel="Terug naar menu"
              onPress={() => router.navigate('/')} style={layout.back}>
              <MaterialCommunityIcons name="arrow-left" size={19} color={colors.primary} />
              <Text style={layout.backText}>Terug naar menu</Text>
            </Pressable>
          )}
          <View style={layout.heading}>
            <Text accessibilityRole="header" style={styles.title}>{title}</Text>
            <Text style={styles.text}>{subtitle}</Text>
          </View>
          {children}
          <View style={layout.footer}>
            <View style={layout.dot} />
            <Text style={styles.hint}>Zelf samengesteld · Geen live weersverwachting</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const layout = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scroll: { flexGrow: 1, padding: 20, paddingBottom: 32 },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', gap: 22 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  logo: { width: 40, height: 40, backgroundColor: colors.amber, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 25, fontWeight: '800', color: colors.text, letterSpacing: -1 },
  brandDot: { color: colors.primary },
  heading: { gap: 10 },
  back: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', minHeight: 44 },
  backText: { color: colors.primary, fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap', paddingVertical: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary },
});
