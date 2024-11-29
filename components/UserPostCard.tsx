import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Card } from "@ui-kitten/components";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const UserPostCard = () => {
  const [deletepost, setDeletPost] = useState(false);

  // Delete Function

  const deleteFunction = async () => {
    setDeletPost(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise<void>((r) => setTimeout(r, 3000));
    setDeletPost(false);
    ToastAndroid.show("Your Post Deleted", ToastAndroid.SHORT);
    console.log("Data Deleted");
  };

  return (
    <ScrollView>
      <Card
        style={{ marginHorizontal: 20, borderRadius: 20, marginVertical: 10 }}
      >
        <View style={styles.firstView}>
          <Avatar size="medium" source={require("../assets/images/girl.png")} />
          <View>
            <Text style={{ marginTop: 6 }}>Sourav Bhattacharyya</Text>
            <Text style={{}}>Time Stamp Monday 3 :10</Text>
          </View>
        </View>
        <Image
          style={{
            width: "100%",
            height: 200,
            marginBottom: 10,
            marginTop: 20,
            borderRadius: 20,
          }}
          source={require("../assets/images/pic.webp")}
        />
        <TouchableOpacity
          disabled={deletepost ? true : false}
          onPress={deleteFunction}
          style={{
            width: "auto",
            backgroundColor: "#0068ff",
            padding: 10,
            borderRadius: 20,
          }}
        >
          {deletepost ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={{ textAlign: "center", color: "#ffffff" }}>
              Delete Button
            </Text>
          )}
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

export default UserPostCard;

const styles = StyleSheet.create({
  firstView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
});
