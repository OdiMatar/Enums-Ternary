import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { type WeatherIcon } from '../components/WeatherResult';
import WeatherCard, { type WeatherMood } from '../components/WeatherCard';
import AppButton from '../components/AppButton';
import LearnNote from '../components/LearnNote';
import { colors, styles } from '../styles';
import { Weather } from '../types/Weather';

// De switch koppelt elk enum-weertype aan een ander icoon.
function getWeatherIcon(weather: Weather): WeatherIcon {
  switch (weather) {
    case Weather.Sunny:
      return 'weather-sunny';
    case Weather.Cloudy:
      return 'weather-cloudy';
    case Weather.Rainy:
      return 'weather-rainy';
    case Weather.Snowy:
      return 'weather-snowy';
  }
}

// De enum wordt ook gebruikt als sleutel voor de Nederlandse weerthema's.
const weatherDetails: Record<Weather, { title: string; description: string; mood: WeatherMood }> = {
  [Weather.Sunny]: { title: 'Zonnig', description: 'Een open hemel en volop licht. Tijd om naar buiten te gaan.', mood: 'sun' },
  [Weather.Cloudy]: { title: 'Bewolkt', description: 'Wolken trekken langs de hemel. Een rustige dag onder een grijs dek.', mood: 'cloud' },
  [Weather.Rainy]: { title: 'Regen', description: 'Druppels op het raam. Een paraplu komt vandaag goed van pas.', mood: 'rain' },
  [Weather.Snowy]: { title: 'Sneeuw', description: 'De wereld kleurt wit. Een mooie dag voor een warme sjaal.', mood: 'snow' },
};

export default function EnumExampleScreen() {
  // Deel 1: de huidige waarde is een Weather-enum en begint bij Sunny.
  const [currentWeather, setCurrentWeather] = useState<Weather>(Weather.Sunny);
  const details = weatherDetails[currentWeather];

  return (
    <Screen title="Wat doet het weer?" subtitle="Vier keuzes, vier sferen. Stel jouw weerbericht samen.">
      <WeatherCard
        icon={getWeatherIcon(currentWeather)}
        title={details.title}
        label={`Het huidige weer is: ${currentWeather}`}
        description={details.description}
        mood={details.mood}
      />

      <View style={styles.card}>
        <Text style={styles.eyebrow}>MAAK HET JOUW DAG</Text>
        <Text style={styles.subtitle}>Kies een weertype</Text>
        <View style={localStyles.pickerContainer}>
          <Picker<Weather>
            accessibilityLabel="Kies het weer"
            selectedValue={currentWeather}
            onValueChange={(value) => setCurrentWeather(value)}
            mode="dropdown"
            style={localStyles.picker}
          >
            <Picker.Item label="Sunny" value={Weather.Sunny} />
            <Picker.Item label="Cloudy" value={Weather.Cloudy} />
            <Picker.Item label="Rainy" value={Weather.Rainy} />
            <Picker.Item label="Snowy" value={Weather.Snowy} />
          </Picker>
        </View>
        <Text style={styles.hint}>Je weerkaart verandert meteen mee.</Text>
      </View>
      <LearnNote
        title="Enum & switch statement"
        explanation="De Weather-enum bevat vier vaste waarden. De dropdown verandert currentWeather in de state. Een switch kiest het icoon; de enumwaarde bepaalt ook de tekst en de kleur van de weerkaart."
        code={`// Huidige keuze\ncurrentWeather = Weather.${currentWeather}\n\n// Voorbeeld uit de switch\ncase Weather.Sunny:\n  return 'weather-sunny';`}
      />
      <AppButton title="Verder naar dag & temperatuur" secondary onPress={() => router.replace('/ternary_example')} />
    </Screen>
  );
}

const localStyles = StyleSheet.create({
  pickerContainer: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, overflow: 'hidden' },
  picker: { width: '100%', minHeight: 52, color: colors.text, backgroundColor: colors.surface },
});
