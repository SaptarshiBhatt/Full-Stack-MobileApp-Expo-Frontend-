import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";

import { Href, Link, router } from "expo-router";
import { Input, Spinner } from "@ui-kitten/components";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { sdk } from "@/utlis/sdk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@react-navigation/native";

// Schema vAlidation
const schemaValidationLogin = yup.object({
  email: yup

    .string()

    .email("Plz Enter a Valid Email")

    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")

    .min(3, "Minimum 3 Chracters")
    .max(15, "Maximum 15 Character"),
});

export type schemaValidationLoginType = yup.InferType<
  typeof schemaValidationLogin
>;

const LoginUsers = () => {
  const [value, setValue] = useState(false);

  const [datasubmit, setdatasubmit] = useState(false);

  const { colors } = useTheme();

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidationLogin),
  });

  //   main Function Connect To The Backned

  const logindataonSubmit = async (fdata: schemaValidationLoginType) => {
    const logindata = await sdk.login(fdata.email, fdata.password, {
      mode: "cookie",
    });
    console.log(logindata);

    try {
      // const jsonValue = JSON.stringify(logindata);
      await AsyncStorage.setItem(
        "access_token",
        logindata.access_token as string
      );
      // const value = await AsyncStorage.getItem("access_token");
      // console.log(value);
    } catch (error) {
      console.log(error);
    }

    const value = await AsyncStorage.getItem("access_token");
    console.log(value);

    if (value == null && value === undefined) {
      router.replace("/(modals)/register");
    } else if (value !== null && value !== undefined) {
      router.replace("/(tabs)");
    }
  };

  return (
    <ScrollView>
      <Image
        source={require("@/assets/images/girl.png")}
        style={styles.image}
      />
      <Text style={styles.textone}>Welcome Back</Text>
      <Text style={styles.texttwo}>Register Tou Your Development Platform</Text>

      {/* Login Form */}
      <View style={styles.conatiner}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              label="Email"
              size="small"
              placeholder="Enter Your Email"
              onBlur={onBlur}
              onChangeText={onChange}
              accessoryLeft={
                <MaterialIcons name="email" size={24} color="blue" />
              }
              value={value}
              status={errors.email?.message ? "danger" : "primary"}
            />
          )}
          name="email"
        />
        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>{errors.email?.message}</Text>
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              label="Password"
              placeholder="Enter Your Password"
              size="small"
              onBlur={onBlur}
              secureTextEntry={value ? true : false}
              accessoryRight={
                <TouchableOpacity onPress={() => setValue(!value)}>
                  {value ? (
                    <Entypo name="eye-with-line" size={24} color="black" />
                  ) : (
                    <AntDesign name="eye" size={24} color="black" />
                  )}
                </TouchableOpacity>
              }
              onChangeText={onChange}
              value={value}
              accessoryLeft={
                <MaterialCommunityIcons
                  name="onepassword"
                  size={24}
                  color="blue"
                />
              }
              status={errors.password?.message ? "danger" : "primary"}
            />
          )}
          name="password"
        />
        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>{errors.password?.message}</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={handleSubmit(logindataonSubmit)}
            disabled={datasubmit ? true : false}
            style={[styles.touchbtn, {}]}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 800,
              }}
            >
              {datasubmit ? (
                <>
                  {" "}
                  <View
                    style={{
                      flex: 0,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontStyle: "normal",
                        fontWeight: 800,
                      }}
                    >
                      Plz Wait a Minute
                    </Text>
                    <Spinner size="large" status="danger" />
                  </View>
                </>
              ) : (
                "User SignIn"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.touchbtn, {}]}>
            <Link
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 800,
              }}
              href={"/(modals)/register" as Href}
            >
              User SignUp
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginUsers;

const styles = StyleSheet.create({
  image: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 20,
  },
  textone: {
    textAlign: "center",
    fontSize: 24,
  },

  texttwo: {
    textAlign: "center",
    fontSize: 15,
    marginTop: 5,
    backgroundColor: "#00ffa6",
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  conatiner: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 5,
  },
  input: {
    borderWidth: 2,
    padding: 2,
    // borderColor: "#00A6FF",
    borderRadius: 200,
    borderBottomWidth: 2,
    shadowColor: "#D8D8D8",
  },
  touchbtn: {
    backgroundColor: "#0059ff",
    height: 40,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
