import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Switch, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import WeatherResult, { type WeatherIcon } from '../components/WeatherResult';
import WeatherCard from '../components/WeatherCard';
import LearnNote from '../components/LearnNote';
import { colors, styles } from '../styles';

export default function TernaryExampleScreen() {
  // State heeft dezelfde beginwaarden als de opdracht, maar kan worden aangepast.
  const [isDayTime, setIsDayTime] = useState(true);
  const [isSunny, setIsSunny] = useState(true);
  const [temperature, setTemperature] = useState(20);

  // Deel 1: een ternary kiest tussen twee iconen.
  const dayIcon: WeatherIcon = isDayTime ? 'weather-sunny' : 'weather-night';

  // Deel 2: twee booleans leveren samen vier mogelijkheden op.
  const skyIcon: WeatherIcon = isDayTime
    ? (isSunny ? 'weather-sunny' : 'weather-cloudy')
    : (isSunny ? 'weather-night' : 'weather-night-partly-cloudy');
  const skyText = isDayTime
    ? (isSunny ? 'Dag + zonnig' : 'Dag + bewolkt')
    : (isSunny ? 'Nacht + helder' : 'Nacht + bewolkt');

  // Deel 3: vanaf 30 graden is het zeer warm, bij 0 of lager zeer koud.
  const temperatureIcon: WeatherIcon = temperature >= 30
    ? 'thermometer-high'
    : temperature <= 0
      ? 'snowflake'
      : isDayTime ? 'weather-sunny' : 'weather-night';
  const temperatureText = temperature >= 30
    ? 'Zeer warm'
    : temperature <= 0 ? 'Zeer koud' : 'Normale temperatuur';
  const temperatureColor = temperature >= 30 ? '#b64016' : colors.primary;

  // Met deze knop kun je je demonstratie opnieuw beginnen.
  function resetWeather() {
    setIsDayTime(true);
    setIsSunny(true);
    setTemperature(20);
  }

  return (
    <Screen title="Jouw dag. Jouw graden." subtitle="Verander het moment, de lucht en de temperatuur.">
      <WeatherCard
        icon={skyIcon}
        title={`${temperature}°C`}
        label={skyText}
        description={isDayTime ? 'Een nieuwe dag, precies zoals jij hem instelt.' : 'De avond valt. Ontdek het weer onder een nachtelijke hemel.'}
        mood={isDayTime ? (isSunny ? 'sun' : 'cloud') : 'night'}
      />
      <View style={styles.card}>
        <Text style={styles.eyebrow}>01 / HET MOMENT</Text>
        <Text style={styles.subtitle}>Dag of nacht?</Text>
        <View style={styles.row}>
          <View style={styles.switchLabel}>
            <Text style={styles.label}>Dagmodus</Text>
            <Text style={styles.hint}>{isDayTime ? 'De zon staat aan de hemel.' : 'De maan neemt het over.'}</Text>
          </View>
          <Switch
            accessibilityLabel="Dagmodus"
            value={isDayTime}
            onValueChange={setIsDayTime}
            trackColor={{ false: '#b7c2bc', true: colors.primary }}
            thumbColor="#ffffff"
          />
        </View>
        <WeatherResult compact icon={dayIcon} text={isDayTime ? 'Het is dag' : 'Het is nacht'} />
        <LearnNote title="Deel 1 · isDayTime"
          explanation="Een ternary kiest tussen twee mogelijkheden. Als isDayTime true is, zie je een zon. Anders zie je een maan."
          code={`isDayTime = ${isDayTime}\n\nisDayTime\n  ? 'weather-sunny'\n  : 'weather-night'`}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>02 / DE LUCHT</Text>
        <Text style={styles.subtitle}>Ruimte voor de zon.</Text>
        <View style={styles.row}>
          <View style={styles.switchLabel}>
            <Text style={styles.label}>Zonnig / heldere nacht</Text>
            <Text style={styles.hint}>{isSunny ? 'Een hemel zonder wolken.' : 'Er trekken wolken voorbij.'}</Text>
          </View>
          <Switch
            accessibilityLabel="Zonnig of helder"
            value={isSunny}
            onValueChange={setIsSunny}
            trackColor={{ false: '#b7c2bc', true: colors.primary }}
            thumbColor="#ffffff"
          />
        </View>
        <Text style={styles.hint}>
          Je ziet het resultaat op je weerkaart bovenaan. Bij nacht betekent deze schakelaar een heldere hemel.
        </Text>
        <LearnNote title="Deel 2 · isDayTime + isSunny"
          explanation="Hier staan ternary operators binnen elkaar. Eerst controleer ik dag of nacht. Daarna controleer ik of de hemel helder is. Zo ontstaan vier verschillende iconen."
          code={`isDayTime = ${isDayTime}\nisSunny = ${isSunny}\n\nisDayTime\n  ? (isSunny ? 'zon' : 'wolk')\n  : (isSunny ? 'maan' : 'maan met wolk')`}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.eyebrow}>03 / DE TEMPERATUUR</Text>
        <Text style={styles.subtitle}>Een graadje anders.</Text>
        <View style={local.stepper}>
          <AppButton
            title="−"
            accessibilityLabel="Temperatuur verlagen"
            onPress={() => setTemperature((previous) => previous - 1)}
          />
          <Text accessibilityLiveRegion="polite" style={local.temperature}>{temperature}°</Text>
          <AppButton
            title="+"
            accessibilityLabel="Temperatuur verhogen"
            onPress={() => setTemperature((previous) => previous + 1)}
          />
        </View>
        <Text accessibilityLiveRegion="polite" style={local.temperatureLabel}>Temperatuur: {temperature}°C</Text>
        <Text style={styles.hint}>Per stap 1°C, of probeer een situatie:</Text>
        <View style={styles.wrappedRow}>
          <AppButton title="Vorst · 0°" secondary onPress={() => setTemperature(0)} />
          <AppButton title="Lentedag · 20°" secondary onPress={() => setTemperature(20)} />
          <AppButton title="Hitte · 30°" secondary onPress={() => setTemperature(30)} />
        </View>
        <WeatherResult
          icon={temperatureIcon}
          text={`${temperatureText} · ${isDayTime ? 'overdag' : "'s nachts"}`}
          color={temperatureColor}
          compact
        />
        <Text style={styles.hint}>
          0°C of lager: zeer koud. 30°C of hoger: zeer warm. Daartussen zie je overdag een zon en in de nacht een maan.
        </Text>
        <LearnNote title="Deel 3 · temperature + isDayTime"
          explanation="Ik controleer eerst of het zeer warm is en dan of het vriest. Bij een normale temperatuur bepaalt isDayTime het icoon. De grenswaarden 0 en 30 tellen mee."
          code={`temperature = ${temperature}\n\ntemperature >= 30\n  ? 'thermometer-high'\n  : temperature <= 0\n    ? 'snowflake'\n    : isDayTime\n      ? 'weather-sunny'\n      : 'weather-night'`}
        />
      </View>
      <View style={styles.wrappedRow}>
        <AppButton title="Begin opnieuw" secondary onPress={resetWeather} />
        <AppButton title="Naar weer kiezen" secondary onPress={() => router.replace('/enum_example')} />
      </View>
    </Screen>
  );
}

const local = StyleSheet.create({
  stepper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingVertical: 8 },
  temperature: { flex: 1, textAlign: 'center', fontSize: 52, fontWeight: '600', letterSpacing: -2, color: colors.text },
  temperatureLabel: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});
