import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, styles } from '../styles';

type Props = { title: string; explanation: string; code: string };

// De uitleg is uitklapbaar, zodat de bediening overzichtelijk blijft.
export default function LearnNote({ title, explanation, code }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={local.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Hoe werkt dit? ${title}`}
        accessibilityState={{ expanded: isOpen }}
        aria-expanded={isOpen}
        onPress={() => setIsOpen((previous) => !previous)}
        style={local.toggle}
      >
        <MaterialCommunityIcons name="code-tags" size={21} color={colors.primary} />
        <View style={local.label}>
          <Text style={styles.label}>Hoe werkt dit?</Text>
          <Text style={styles.hint}>{title}</Text>
        </View>
        <MaterialCommunityIcons name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color={colors.primary} />
      </Pressable>
      {isOpen && (
        <View style={local.details}>
          <Text style={styles.text}>{explanation}</Text>
          <Text selectable style={styles.code}>{code}</Text>
        </View>
      )}
    </View>
  );
}

const local = StyleSheet.create({
  container: { borderTopWidth: 1, borderTopColor: colors.border },
  toggle: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 18, minHeight: 48 },
  label: { flex: 1 },
  details: { gap: 12, paddingBottom: 14 },
});
