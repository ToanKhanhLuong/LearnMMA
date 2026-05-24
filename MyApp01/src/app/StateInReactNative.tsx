import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function StateInReactNative() {
  const [name, setName] = useState("ToanLk");
  const [test, setTest] = useState({
    name: "ToanLk",
    age: 22
  });

  const [count, setCount] = useState(0);
  
  // có thể viết hàm riêng để xử lý logic, rồi gán cho onPress
  const nutGiam = () => {
    setCount(count - 1);
  }

  return (
    <View style={styles.container}>
      <Text>Xin chào {name}</Text>
      <Text>Tuổi: {test.age}</Text>    {/* có thể truy cập vào các thuộc tính của object để hiển thị */}
      <Text>Tên: {test.name}</Text> 
      <Text>Test: {JSON.stringify(test)}</Text> {/* JSON.stringify để hiển thị object dưới dạng string */}

      <View>
        <Text>Count: {count}</Text>
        <Button title="Tăng" onPress={() => setCount(count + 1)}/> {/* có thể viết trực tiếp hàm xử lý logic trong onPress */}
        <Button title="Giảm" onPress={nutGiam}/>
        <Button title="Reset" onPress={() => setCount(0)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});