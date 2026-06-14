import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SectionButton from "../components/SectionButton";

interface HomeScreenProps {
  onSelectScreen: (screen: "todo" | "array" | "state" | "input" | "viewText") => void;
}

export default function HomeScreen({ onSelectScreen }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native Lessons</Text>
      <Text style={styles.subtitle}>Chọn phần học để xem nội dung:</Text>
      <ScrollView contentContainerStyle={styles.list}>
        <SectionButton title="Todo App" onPress={() => onSelectScreen("todo")} />
        <SectionButton title="Array Example" onPress={() => onSelectScreen("array")} />
        <SectionButton title="State Demo" onPress={() => onSelectScreen("state")} />
        <SectionButton title="Input Example" onPress={() => onSelectScreen("input")} />
        <SectionButton title="View / Text / CSS" onPress={() => onSelectScreen("viewText")} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 24,
  },
});
