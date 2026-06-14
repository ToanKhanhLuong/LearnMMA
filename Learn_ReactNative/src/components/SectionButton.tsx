import { Button, StyleSheet, View } from "react-native";

interface SectionButtonProps {
  title: string;
  onPress: () => void;
}

export default function SectionButton({ title, onPress }: SectionButtonProps) {
  return (
    <View style={styles.buttonRow}>
      <Button title={title} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    marginBottom: 12,
  },
});
