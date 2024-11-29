import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Avatar, Card } from "@ui-kitten/components";
import * as ImagePicker from "expo-image-picker";

const UpdateImage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string>("");
  const [showimage, setshowimage] = useState(false);

  // image uplaod section

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.canceled);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View>
        <Card
          style={{ marginHorizontal: 20, marginVertical: 20, borderRadius: 20 }}
        >
          <View style={styles.firstView}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Avatar
                size="giant"
                style={{ height: 200, width: 150 }}
                source={require("../assets/images/girl.png")}
              />
            </TouchableOpacity>
            <Text style={{}}>Plz Click this Image And Image Update</Text>
          </View>
        </Card>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              {/* Insdie Model */}
              <View style={{}}>
                <Card style={{ borderRadius: 20 }}>
                  <View style={{ gap: 20 }}>
                    <Text style={{ textAlign: "center" }}>Click the image</Text>
                    <TouchableOpacity onPress={pickImage}>
                      {image ? (
                        <Avatar
                          size="giant"
                          style={{ height: 200, width: 150 }}
                          source={{ uri: image }}
                        />
                      ) : (
                        <Avatar
                          size="giant"
                          style={{ height: 200, width: 150 }}
                          source={require("../assets/images/girl.png")}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: "auto",
                        backgroundColor: "#0068ff",
                        padding: 10,
                        borderRadius: 20,
                      }}
                    >
                      <Text style={styles.textStyle}>Image Upload</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        width: "auto",
                        backgroundColor: "#0068ff",
                        padding: 10,
                        borderRadius: 20,
                      }}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>Cancel Uplaod</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

export default UpdateImage;

const styles = StyleSheet.create({
  firstView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: "white",
    textAlign: "center",
  },
});
