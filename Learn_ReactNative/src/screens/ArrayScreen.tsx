import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Student {
  id: number;
  name: string;
  age: number;
}

export default function ArrayScreen() {
  const [students] = useState<Student[]>([
    { id: 1, name: "Eric1", age: 18 },
    { id: 2, name: "Eric2", age: 19 },
    { id: 3, name: "Eric3", age: 20 },
    { id: 4, name: "Eric4", age: 18 },
    { id: 5, name: "Eric5", age: 18 },
    { id: 6, name: "Eric6", age: 18 },
    { id: 7, name: "Eric7", age: 18 },
    { id: 8, name: "Eric8", age: 18 },
    { id: 9, name: "Eric9", age: 18 },
    { id: 10, name: "Eric10", age: 18 },
    { id: 11, name: "Eric11", age: 18 },
    { id: 12, name: "Eric12", age: 18 },
    { id: 13, name: "Eric13", age: 18 },
    { id: 14, name: "Eric14", age: 18 },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh sách học sinh</Text>

      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listStudent}>
            <Text style={styles.itemText}>Name: {item.name}</Text>
            <Text style={styles.itemText}>Age: {item.age}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 12,
  },
  listStudent: {
    padding: 18,
    backgroundColor: "#ffe4e1",
    marginBottom: 12,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
