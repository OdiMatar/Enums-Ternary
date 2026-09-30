import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import { colors, styles } from '../styles';

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  return (
    <Screen
      title="Jouw weeratelier."
      subtitle="Maak je eigen weerbericht. Ontdek wat één keuze verandert."
      showBack={false}
    >
      <View style={local.intro}>
        <View style={local.introCopy}>
          <Text style={local.introEyebrow}>ONTDEK WEERWIJS</Text>
          <Text style={local.introTitle}>{'Zon of sneeuw.\nJij kiest.'}</Text>
          {width >= 680 && <Text style={local.introText}>Van een zonnige middag tot een koude nacht.</Text>}
        </View>
        <MaterialCommunityIcons name="weather-partly-cloudy" size={88} color={colors.amber} />
      </View>
      <View style={local.sectionHeader}>
        <Text style={styles.subtitle}>Aan de slag</Text>
        <Text style={styles.eyebrow}>02 ONDERDELEN</Text>
      </View>
      <View style={[local.menu, width >= 680 && local.wideMenu]}>
        <View style={[styles.card, local.menuCard]}>
          <View style={local.sectionHeader}>
            <View style={local.sunIcon}><MaterialCommunityIcons name="weather-sunny" size={28} color="#805714" /></View>
            <Text style={styles.eyebrow}>01 / ENUM</Text>
          </View>
          <Text style={styles.subtitle}>Vier soorten weer.</Text>
          <Text style={[styles.text, local.description]}>Zon, wolken, regen of sneeuw. Geef je weerbericht een eigen sfeer.</Text>
          <AppButton title="Weer kiezen" onPress={() => router.navigate('/enum_example')} />
        </View>
        <View style={[styles.card, local.menuCard]}>
          <View style={local.sectionHeader}>
            <View style={local.moonIcon}><MaterialCommunityIcons name="weather-night" size={28} color={colors.primary} /></View>
            <Text style={styles.eyebrow}>02 / TERNARY</Text>
          </View>
          <Text style={styles.subtitle}>Van dag naar nacht.</Text>
          <Text style={[styles.text, local.description]}>Speel met licht, bewolking en graden. Zie hoe alles samen verandert.</Text>
          <AppButton title="Dag & temperatuur" onPress={() => router.navigate('/ternary_example')} />
        </View>
      </View>
      <View style={local.schoolNote}>
        <MaterialCommunityIcons name="school-outline" size={22} color={colors.primary} />
        <Text style={local.noteText}>Gemaakt om te ontdekken. Open ‘Hoe werkt dit?’ voor de code achter het weer.</Text>
      </View>
    </Screen>
  );
}

const local = StyleSheet.create({
  intro: { backgroundColor: colors.text, padding: 24, borderRadius: 26, flexDirection: 'row', alignItems: 'center', gap: 12 },
  introCopy: { flex: 1, gap: 14 },
  introEyebrow: { color: '#c3d6c5', fontSize: 10, letterSpacing: 1.8, fontWeight: '700' },
  introTitle: { color: '#ffffff', fontSize: 26, lineHeight: 32, fontWeight: '600', letterSpacing: -0.6 },
  introText: { color: '#dce7de', fontSize: 14, lineHeight: 22 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  menu: { gap: 16 },
  wideMenu: { flexDirection: 'row' },
  menuCard: { flex: 1 },
  description: { flexGrow: 1 },
  sunIcon: { backgroundColor: '#fbe8bb', padding: 12, borderRadius: 16 },
  moonIcon: { backgroundColor: colors.softGreen, padding: 12, borderRadius: 16 },
  schoolNote: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 4 },
  noteText: { flex: 1, color: colors.muted, fontSize: 14, lineHeight: 22 },
});
