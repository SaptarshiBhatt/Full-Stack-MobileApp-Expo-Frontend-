import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import PostCard from "@/components/PostCard";
import UserPostCard from "@/components/UserPostCard";
import UserProfileCard from "@/components/UserProfileCard";

const explore = () => {
  return (
    <View>
      <ScrollView>
        <View>
          <Stack.Screen
            options={{
              title: "Your Profile",
              headerLeft: () => (
                <AntDesign
                  style={{ marginHorizontal: 10 }}
                  onPress={() => router.push("/(tabs)/")}
                  name="back"
                  size={24}
                  color="blue"
                />
              ),
            }}
          />
          {/* <PostCard /> */}
          <UserProfileCard />
          <UserPostCard />
        </View>
      </ScrollView>
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({});
