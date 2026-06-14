import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InputScreen() {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Input Example</Text>
      <Text>Nhập tên: {name}</Text>
      <View style={styles.fieldRow}>
        <TextInput
          placeholder="Enter name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Text>Nhập tuổi: {age}</Text>
      <View style={styles.fieldRow}>
        <TextInput
          maxLength={2}
          keyboardType="numeric"
          placeholder="Enter age"
          style={styles.input}
          value={age}
          onChangeText={setAge}
        />
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
  fieldRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    width: 220,
    borderRadius: 10,
  },
});
