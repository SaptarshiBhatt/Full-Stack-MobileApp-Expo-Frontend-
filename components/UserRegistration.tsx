import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Input, Spinner } from "@ui-kitten/components";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import * as Yup from "yup";
import { sdk } from "@/utlis/sdk";
import { createUser } from "@directus/sdk";
import { router } from "expo-router";

// Schema vAlidation
const schemaValidation = yup.object({
  role: yup.string(),
  first_name: yup

    .string()

    .required("Firstname is Required")

    .min(3, "Minimum 3 Chracters")
    .max(15, "Maximum 15 Character"),

  last_name: yup

    .string()

    .required("Lastname is Required")

    .min(3, "Minimum 3 Chracters")
    .max(15, "Maximum 15 Character"),

  email: yup

    .string()

    .email("Plz Enter a Valid Email")

    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")

    .min(3, "Minimum 3 Chracters")
    .max(15, "Maximum 15 Character"),

  confrimpassword: yup
    .string()
    .min(3, "Minimum 3 Chracters")
    .max(15, "Maximum 15 Character")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export type schemaValidationType = yup.InferType<typeof schemaValidation>;

const UserRegistration = () => {
  const [value, setValue] = useState(false);
  const [datasubmit, setdatasubmit] = useState(false);
  const [password, setPassword] = useState("");
  // React Hook Form code

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      role: "63b08ca8-0560-4593-af71-dfb5a2b020ef",
    },
  });

  const onSubmit = async (fdata: schemaValidationType) => {
    try {
      const register = await sdk.request(createUser(fdata));
      console.log(register);
      ToastAndroid.show("Register Successfully", ToastAndroid.SHORT);
    } catch (error: any) {
      ToastAndroid.show("Register Not A Assign", ToastAndroid.SHORT);
    }

    router.push("/(modals)/login");
  };

  return (
    <ScrollView>
      <Image
        source={require("@/assets/images/girl.png")}
        style={styles.image}
      />
      <Text style={styles.textone}>Welcome Back</Text>
      <Text style={styles.texttwo}>Register Tou Your Development Platform</Text>
      <View style={styles.conatiner}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={{ display: "none" }}
              placeholder="Enter Your First Name"
              onBlur={onBlur}
              size="small"
              label="First Name"
              onChangeText={onChange}
              value={value}
              accessoryLeft={<FontAwesome name="user" size={24} color="blue" />}
              status={errors.role?.message ? "danger" : "primary"}
            />
          )}
          name="role"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              placeholder="Enter Your First Name"
              onBlur={onBlur}
              size="small"
              label="First Name"
              onChangeText={onChange}
              value={value}
              accessoryLeft={<FontAwesome name="user" size={24} color="blue" />}
              status={errors.first_name?.message ? "danger" : "primary"}
            />
          )}
          name="first_name"
        />
        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>{errors.first_name?.message}</Text>
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              label="Last Name"
              placeholder="Enter Your Last name"
              size="small"
              onBlur={onBlur}
              accessoryLeft={<FontAwesome name="user" size={24} color="blue" />}
              onChangeText={onChange}
              value={value}
              status={errors.last_name?.message ? "danger" : "primary"}
            />
          )}
          name="last_name"
        />

        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>{errors.last_name?.message}</Text>
        </View>

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
        <View>
          {password.length === 0 ? (
            <>
              <View
                style={{
                  width: 290,
                  marginHorizontal: 20,
                  backgroundColor: "#ffffff",
                  height: 5,
                  borderRadius: 20,
                }}
              ></View>
            </>
          ) : (
            <>
              {password.length <= 5 ? (
                <>
                  <View
                    style={{
                      width: 290,
                      marginHorizontal: 20,
                      backgroundColor: "#ff0000",
                      height: 5,
                      borderRadius: 20,
                    }}
                  ></View>
                </>
              ) : (
                <>
                  {password.length >= 5 && password.length <= 15 ? (
                    <>
                      <View
                        style={{
                          width: 290,
                          marginHorizontal: 20,
                          backgroundColor: "#0cff00",
                          height: 5,
                          borderRadius: 20,
                        }}
                      ></View>
                    </>
                  ) : (
                    <>
                      <Text></Text>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </View>
        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>{errors.password?.message}</Text>
        </View>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.input}
              label="Confirm Password"
              placeholder="Enter Your Confirm Password"
              onBlur={onBlur}
              size="small"
              onChangeText={onChange}
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
              value={value}
              accessoryLeft={
                <MaterialIcons name="confirmation-num" size={24} color="blue" />
              }
              status={errors.confrimpassword?.message ? "danger" : "primary"}
            />
          )}
          name="confrimpassword"
        />
        <View style={{ marginHorizontal: 2 }}>
          <Text style={{ color: "#FF0000" }}>
            {errors.confrimpassword?.message}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
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
              "User Registration"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UserRegistration;

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
