import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StateScreen() {
  const [name, setName] = useState("ToanLk");
  const [test, setTest] = useState({
    name: "ToanLk",
    age: 22,
  });

  const [count, setCount] = useState(0);

  const decrementCount = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>State Demo</Text>
      <Text>Xin chào {name}</Text>
      <Text>Tuổi: {test.age}</Text>
      <Text>Tên: {test.name}</Text>
      <Text>Test: {JSON.stringify(test)}</Text>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Count: {count}</Text>
        <Button title="Tăng" onPress={() => setCount(count + 1)} />
        <Button title="Giảm" onPress={decrementCount} />
        <Button title="Reset" onPress={() => setCount(0)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },
  counterContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  counterText: {
    fontSize: 20,
    marginBottom: 12,
  },
});
