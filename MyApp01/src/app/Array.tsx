import React, { useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const Array = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Eric1", age: 18 }, // flast list mặc đính lấy key
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
    <View style={styles.container}>
      <Text style={{ fontSize: 40 }}>Danh sách học sinh</Text>

      <FlatList
        data={students}
        keyExtractor={item => item.id +""} // viết thêm ở đây để cho nó chọn id làm key
        renderItem={({ item }) => (
          <View style={styles.listStudent}>
            <Text>Name: {item.name}</Text>
            <Text>Age: {item.age}</Text>
          </View>
        )}
      />


      {/* <ScrollView>
          {students.map((s) => (
            <View style={styles.listStudent} key={s.id}>
              <Text>Name: {s.name}</Text>
            </View>
        ))}
        </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  listStudent: {
    padding: 30,
    backgroundColor: "pink",
    marginBottom: 30,
  },
});

export default Array;




