import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Href, Link } from "expo-router";
import { useAtom } from "jotai";
import { darkAtom } from "@/utlis/darkatom";
import { useTheme } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

const profile = () => {
  const [dark, setDark] = useAtom(darkAtom);

  const { colors } = useTheme();
  return (
    <View>
      <Link href={"/(modals)/login" as Href}>
        <Text style={{ color: colors.text }}>Log In</Text>
      </Link>
      <Link href={"/(modals)/register" as Href}>
        <Text style={{ color: colors.text }}>User Register </Text>
      </Link>

      <View>
        <TouchableOpacity onPress={() => setDark(!dark)}>
          {dark ? (
            <Entypo name="moon" size={24} color={colors.text} />
          ) : (
            <Ionicons name="sunny-sharp" size={24} color={colors.text} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});
