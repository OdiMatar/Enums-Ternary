import { StyleSheet } from 'react-native';

// Dezelfde kleuren en tekststijlen voor alle opdrachten.
export const colors = {
  background: '#f6f5ef',
  surface: '#ffffff',
  text: '#183b38',
  muted: '#596b65',
  primary: '#23675b',
  border: '#dce3da',
  amber: '#f6bf56',
  softGreen: '#e6eee4',
  night: '#25394e',
};

export const styles = StyleSheet.create({
  title: { fontSize: 34, lineHeight: 40, letterSpacing: -1.2, fontWeight: '700', color: colors.text },
  subtitle: { fontSize: 20, fontWeight: '600', color: colors.text },
  text: { fontSize: 16, lineHeight: 24, color: colors.text },
  hint: { fontSize: 14, lineHeight: 22, color: colors.muted },
  label: { fontSize: 16, fontWeight: '600', color: colors.text },
  card: {
    padding: 22,
    gap: 16,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  switchLabel: { flex: 1, gap: 4 },
  eyebrow: { fontSize: 11, letterSpacing: 1.8, fontWeight: '700', color: colors.muted },
  divider: { height: 1, backgroundColor: colors.border },
  wrappedRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  code: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    color: colors.primary,
    fontSize: 14,
    lineHeight: 22,
  },
});
