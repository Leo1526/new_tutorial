import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons"; // Kamera ikonu için
import { colors, fonts } from "../../design/themes"; // Gerekli renkler ve yazı tipleri
import { commonStyle } from "../../design/style";
import { ikraAxios, urlDev } from "../common";

const CreateLostPage = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const handleChoosePhoto = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Uygulamanın fotoğraflarınıza erişimi olması gerekiyor!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!pickerResult.canceled) {
      const myUri = pickerResult.assets[0].uri; // assets dizisinden URI alınır
      setImageUri(myUri);
    }
  };

  const handleSubmit = () => {
    if (!description || !imageUri || !idType) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    if (idType === "ID_KNOWN" && !idNumber) {
      alert("Lütfen kimlik bilgisi alanını doldurun!");
      return;
    }

    Alert.alert("Onay", "Kayıp eşya oluşturulacak. Onaylıyor musunuz?", [
      {
        text: "İptal",
        style: "cancel",
      },
      { text: "Evet", onPress: handleCreateLostItem },
    ]);
  };

  const handleCreateLostItem = async () => {
    const formData = new FormData();
    formData.append("lostAndFoundType", idType);
    formData.append("ownerInfo", idNumber);
    formData.append("description", description);
    if (imageUri) {
      const uriParts = imageUri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("file", {
        uri: imageUri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await ikraAxios({
        url: urlDev + "/lostAndFound",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onSuccess: (data) => {
          alert("Kayıp eşya bildirildi!");
          setDescription("");
          setIdType("");
          setIdNumber("");
          setImageUri(null);
        },
        onError: (error) => {
          console.error("Kayıp eşya bildirimi sırasında hata oluştu:", error);
          alert("Kayıp eşya bildirimi sırasında bir hata oluştu.");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={[styles.safeArea]}>
        <View style={[commonStyle.mainContainer]}>
          <ScrollView contentContainerStyle={[styles.scrollContainer]}>
            <Title
              style={[
                commonStyle.textLabel,
                {
                  fontSize: 24,
                  textAlign: "center",
                  marginBottom: 20,
                },
              ]}
            >
              Kayıp Eşya Bildir
            </Title>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePreview}
                resizeMode="contain"
              />
            )}
            <TouchableOpacity
              style={styles.photoButton}
              onPress={handleChoosePhoto}
            >
              <MaterialIcons
                name="camera-alt"
                size={24}
                color={colors.primary}
              />
              <Text
                style={[commonStyle.textLabel, { marginLeft: 8, fontSize: 18 }]}
              >
                Fotoğraf Yükle
              </Text>
            </TouchableOpacity>
            <TextInput
              label="Eşya Tanımı"
              value={description}
              onChangeText={setDescription}
              mode="outlined"
              style={[commonStyle.input]}
              theme={{ colors: { primary: colors.primary } }}
            />
            <View style={styles.spacer} />
            <RNPickerSelect
              selectedValue={idType}
              onValueChange={setIdType}
              items={[
                { label: "Kimliği Belli", value: "ID_KNOWN" },
                { label: "Diğer", value: "ID_NOT_KNOWN" },
              ]}
              style={pickerSelectStyles}
              placeholder={{
                label: "Bir kategori seçin",
                value: null,
              }}
            />
            {idType === "ID_KNOWN" && (
              <TextInput
                label="Kimlik Bilgisi"
                value={idNumber}
                onChangeText={setIdNumber}
                mode="outlined"
                style={commonStyle.input}
                theme={{ colors: { primary: colors.primary } }}
              />
            )}
            <Button
              mode="outlined"
              onPress={handleSubmit}
              style={commonStyle.secondaryButton}
              labelStyle={[commonStyle.secondaryButtonLabel, { fontSize: 16 }]}
            >
              Bildir
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  imagePreview: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    marginBottom: 16,
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 12,
    justifyContent: "center",
    marginBottom: 16,
  },
  spacer: {
    height: 20,
  },
  textInput: {
    marginBottom: 16,
    borderColor: colors.primary,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4F6F8",
    borderRadius: 6,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inputAndroid: {
    width: "100%",
    height: 50,
    backgroundColor: "#F4F6F8",
    borderRadius: 8,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default CreateLostPage;
