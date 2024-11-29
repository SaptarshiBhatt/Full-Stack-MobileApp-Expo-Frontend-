import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Card, Input } from "@ui-kitten/components";
import { AntDesign, EvilIcons, FontAwesome } from "@expo/vector-icons";

export default function PostCard() {
  const [comment, setcomment] = useState(false);
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

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <AntDesign name="like1" size={24} color="blue" />
          <Text style={{}}>Likes</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <FontAwesome name="comment" size={24} color="blue" />
          <TouchableOpacity onPress={() => setcomment(true)}>
            <Text style={{}}>Comments</Text>
          </TouchableOpacity>
        </View>

        {comment && (
          <View style={{ marginTop: 5 }}>
            <Input
              accessoryRight={
                <FontAwesome
                  style={{ marginVertical: 5 }}
                  name="send"
                  size={20}
                  color="blue"
                />
              }
              placeholder="Plz Coments Here"
              size="small"
              style={styles.textstyle}
            />
          </View>
        )}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  firstView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  textstyle: {
    borderWidth: 2,
    padding: 2,
    // borderColor: "#00A6FF",
    borderRadius: 200,
    borderBottomWidth: 2,
    shadowColor: "#D8D8D8",
  },
});
