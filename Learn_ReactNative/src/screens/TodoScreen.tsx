import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface TodoItem {
  id: number;
  text: string;
}

export default function TodoScreen() {
  const [todos, setTodos] = useState<string>("");
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddOrUpdateTodo = () => {
    if (todos.trim() === "") {
      Alert.alert("Lỗi", "Bạn chưa nhập nội dung công việc!");
      return;
    }

    if (editId !== null) {
      setListTodo(
        listTodo.map((item) =>
          item.id === editId ? { ...item, text: todos } : item,
        ),
      );
      setEditId(null);
      setTodos("");
      Alert.alert("Thành công", "Đã cập nhật công việc!");
    } else {
      setListTodo([...listTodo, { id: Date.now(), text: todos }]);
      setTodos("");
      Alert.alert("Thành công", "Đã thêm công việc mới!");
    }
  };

  const startEdit = (item: TodoItem) => {
    setTodos(item.text);
    setEditId(item.id);
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa không?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          setListTodo(listTodo.filter((item) => item.id !== id));
          Alert.alert("Thành công", "Đã xóa thành công!");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo App</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.todoInput}
          placeholder="Nhập nội dung công việc"
          value={todos}
          onChangeText={(value) => setTodos(value)}
        />
        <Button
          title={editId ? "Cập nhật" : "Thêm công việc"}
          onPress={handleAddOrUpdateTodo}
          color={editId ? "#4CAF50" : "#FF9800"}
        />
      </View>

      <FlatList
        data={listTodo}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => startEdit(item)}
                style={{ marginRight: 20 }}
              >
                <Text style={styles.actionText}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
                <Text style={[styles.actionText, styles.deleteText]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#FF9800",
    paddingVertical: 20,
    alignItems: "center",
  },
  headerText: { fontSize: 32, fontWeight: "bold", color: "#FFF" },
  inputContainer: { padding: 20, backgroundColor: "#FFF" },
  todoInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 3,
  },
  todoText: { fontSize: 18, flex: 1 },
  actionButtons: { flexDirection: "row" },
  actionText: { color: "blue", fontWeight: "bold" },
  deleteText: { color: "red" },
});
