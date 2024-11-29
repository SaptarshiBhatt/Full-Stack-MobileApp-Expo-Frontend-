import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Avatar, Card } from "@ui-kitten/components";

const UserProfileCard = () => {
  return (
    <>
      <ScrollView>
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
          <Card style={{ borderRadius: 25 }}>
            <View style={styles.mainView}>
              <Avatar
                size="giant"
                style={{ height: 200, width: 150 }}
                source={require("../assets/images/girl.png")}
              />
            </View>
            <View style={{ marginVertical: 20, gap: 10 }}>
              {/* FirstName  */}

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 20 }}>First Name :</Text>
                <Text style={{ fontSize: 20 }}>Ranjana</Text>
              </View>
              {/* lastName */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={{ fontSize: 20 }}>Last Name :</Text>
                <Text style={{ fontSize: 20 }}>Kundu</Text>
              </View>
              {/* Email */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Email</Text>
                <Text style={{ fontSize: 20 }}>ranjanakundu@gmai.com</Text>
              </View>

              {/* Description */}
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Description :</Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  A React Native framework for creating stunning cross-platform
                  mobile applications. Design system-based, UI Kitten brings
                  your product from an MVP to the final product version. Forever
                  open source and free!
                </Text>
              </View>
            </View>
            {/* Button */}
            <View style={styles.btn}>
              <TouchableOpacity
                style={{
                  width: "auto",
                  backgroundColor: "#0068ff",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 15,
                  }}
                >
                  Image Update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "auto",
                  backgroundColor: "#0068ff",
                  padding: 10,
                  paddingHorizontal: 20,
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 15,
                  }}
                >
                  Profile Update
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  mainView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
});
