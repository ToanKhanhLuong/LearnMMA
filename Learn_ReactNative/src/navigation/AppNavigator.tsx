import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ArrayScreen from "../screens/ArrayScreen";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import StateScreen from "../screens/StateScreen";
import TodoScreen from "../screens/TodoScreen";
import ViewTextScreen from "../screens/ViewTextScreen";

export type ScreenKey =
  | "home"
  | "todo"
  | "array"
  | "state"
  | "input"
  | "viewText";

export default function AppNavigator() {
  const [screen, setScreen] = useState<ScreenKey>("home");

  const renderScreen = () => {
    switch (screen) {
      case "todo":
        return <TodoScreen />;
      case "array":
        return <ArrayScreen />;
      case "state":
        return <StateScreen />;
      case "input":
        return <InputScreen />;
      case "viewText":
        return <ViewTextScreen />;
      default:
        return <HomeScreen onSelectScreen={setScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen !== "home" && (
        <View>
          <Button title="← Về Home" onPress={() => setScreen("home")} />
        </View>
      )}
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    bottom: 4,
  },
});
