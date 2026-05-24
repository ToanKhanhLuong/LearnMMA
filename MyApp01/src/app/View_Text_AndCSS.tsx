import React from 'react'

import { View, Text, StyleSheet } from "react-native";
const View_Text_AndCSS = () => {
  return (
  <>
    // View giống như div trong web, Text giống như p, span, h1, h2,... trong web
      <View style={styles.container}>
        <View >
          <Text style={styles.header}>ToanLk</Text>
          <Text style={styles.parent}>ToanLk <Text style={styles.Children}> DepTrai Vai nho</Text></Text>
        </View>
        <Text style={styles.hello1}>Home Screen</Text>
        <Text style={{color: "blue", fontSize: 16}}>Home Screen</Text>
      </View>
  </>
  )
}

// React native k có CSS, mà có StyleSheet để tạo style cho component
// css in js: viết css trong js, tạo style trong js rồi gán cho component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

   hello1: {
    color: "red",
    fontSize: 20,
    borderBlockColor: "green",
    borderWidth: 2,
      padding: 10,
  },

  header :{
    fontSize : 30,
    fontWeight : "bold",
  },
  parent :{
    backgroundColor : "yellow",
    color : "green",
  },
  Children:{
    color : "blue",
    fontSize: 50
  }
});

export default View_Text_AndCSS