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
import { Avatar, Card, Input, Spinner } from "@ui-kitten/components";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Haptics from "expo-haptics";

const postInput = yup.object({
  postcaption: yup
    .string()
    .required("Firstname is Required")
    .min(6, "Plz Minimum 6 Characters ")
    .max(16, "Plz Maximum 16 Characters "),
});

export type postInput = yup.InferType<typeof postInput>;

const PostCreation = () => {
  const [image, setImage] = useState<string>("");
  const [values, setValues] = useState(false);
  const [indigater, setindigater] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(postInput),
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onsubmit = async (fdata: postInput) => {
    if (!image && fdata.postcaption?.length === 0) {
      ToastAndroid.show("Register Not A Assign", ToastAndroid.SHORT);
    }
    if (image && (fdata.postcaption?.length as number) >= 6) {
      setindigater(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await new Promise<void>((r) => setTimeout(r, 3000));
      ToastAndroid.show("Register Assign", ToastAndroid.SHORT);
      setindigater(false);
      console.log(fdata);
    }
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10 }}>
        <Card style={{ marginHorizontal: 20, borderRadius: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Avatar
              size="medium"
              source={require("../assets/images/girl.png")}
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={styles.inputstyle}
                  placeholder="Post Image Caption"
                  size="small"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  status={errors.postcaption?.message ? "danger" : "primary"}
                />
              )}
              name="postcaption"
            />
          </View>
          <View
            style={{
              marginHorizontal: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FF0000",
                alignItems: "center",
              }}
            >
              {errors.postcaption?.message}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: 10,
              alignItems: "center",
              gap: 15,
              justifyContent: "flex-end",
            }}
          >
            <Entypo
              onPress={pickImage}
              style={{ marginTop: 5 }}
              name="upload"
              size={24}
              color="green"
            />
            <TouchableOpacity
              onPress={handleSubmit(onsubmit)}
              style={styles.touchbtn}
            >
              {indigater ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.btntext}>Post create</Text>
              )}
            </TouchableOpacity>
          </View>
          <View>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: 200,
                  marginBottom: 10,
                  marginTop: 20,
                  borderRadius: 20,
                }}
              />
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default PostCreation;

const styles = StyleSheet.create({
  touchbtn: {
    backgroundColor: "#0059ff",
    width: 100,
    height: 40,
    marginTop: 10,
    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  btntext: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },

  inputstyle: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    width: 220,
    // borderColor: "#00A6FF",
    borderBottomWidth: 4,
    shadowColor: "#D8D8D8",
  },
});
