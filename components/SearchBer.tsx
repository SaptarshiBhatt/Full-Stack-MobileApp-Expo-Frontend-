import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";

const SearchBer = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 25,
            padding: 5,
            color: "#008fff",
          }}
        >
          Welcome Facebook App
        </Text>
        <View style={{ marginHorizontal: 20 }}>
          <Input
            size="small"
            accessoryLeft={<AntDesign name="search1" size={23} color="black" />}
            style={styles.inputstyle}
            placeholder="Search All Freind's Post"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchBer;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    marginVertical: 10,
    // borderRadius: 20,
  },
  inputstyle: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    // borderColor: "#00A6FF",
    borderBottomWidth: 4,
    shadowColor: "#D8D8D8",
  },
});
