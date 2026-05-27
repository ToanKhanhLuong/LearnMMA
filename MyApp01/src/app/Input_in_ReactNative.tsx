import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export const Input_in_ReactNative = () => {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text>ToanLk 04</Text>
        <Text>Nhập tên: {name}</Text>
      <View>
        <TextInput
          multiline
          placeholder="Enter text here"
          style={styles.input}
          onChangeText={(value) => setName(value)}
        />
      </View>
      <Text>Nhập tuổi</Text>
      <Text>Nhập tuổi: {age}</Text>
      <View>
        <TextInput
        maxLength={2}
          multiline
          keyboardType="numeric"
          placeholder="Enter age here"
          style={styles.input}
          onChangeText={(value) => setAge(+value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 200,
    borderRadius: 10,
  },
});
