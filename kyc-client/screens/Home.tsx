import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import { View, Text } from "../components/Themed";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Touchable from "react-native-platform-touchable";
import AsyncStorage from "@react-native-community/async-storage";
import { useDispatch, connect } from "react-redux";
import Layout from "../constants/Layout";
import EmailModal from "./EmailModal";
import firebase, { db, auth, storage } from "../redux/actions/firebase.js";
import BvnModal from "./BvnModal";
import { verifyBvn } from "../redux/actions/kyc";
import DateTimePicker from "@react-native-community/datetimepicker";
import PassportModal from "./PassportModal";
import { wait, _pickImage } from "../components/Functions";
import uuid from "uuid";
interface HomeProps {
  navigation: any;
  verifyBvn: (val: object) => void;
}

const Home: React.FC<HomeProps> = ({ navigation, verifyBvn }) => {
  const dispatch = useDispatch();
  const [emailModal, setEmailModal] = useState(false);
  const [bvnModal, setBvnModal] = useState(false);
  const [bvnVerified, setBvnVerified] = useState(false);
  const [passportVerified, setPassportVerified] = useState(false);

  const [passportModal, setPassportModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const user = auth.currentUser;
  const kycLevel = () => {
    let level = 0;
    if (user && user.emailVerified) level = level + 1;
    if (bvnVerified) level = level + 1;
    if (passportVerified) level = level + 1;
    console.log("level", level);
    return level;
  };
  const verifiedBvn = () => {
    db.collection("kycusers")
      .doc(user ? user.uid : "uid")
      .update({ bvnVerified: true })
      .then(() => (setBvnModal(false), Alert.alert("Verified")))
      .catch((err) => console.log("error saving to db", err));
  };

  useEffect(() => {
    checkBvnVerified();
    checkPassportVerified();
  }, []);
  const checkBvnVerified = () => {
    db.collection("kycusers")
      .doc(user ? user.uid : "uid")
      .onSnapshot(function (doc) {
        console.log("Current data: ", doc.data());
        const data = doc.data();
        setBvnVerified(data.bvnVerified);
      });
  };
  const checkPassportVerified = () => {
    db.collection("kycusers")
      .doc(user ? user.uid : "uid")
      .onSnapshot(function (doc) {
        console.log("Current data: ", doc.data());
        const data = doc.data();
        data.passport && setPassportVerified(data.passport.passportVerified);
      });
  };
  const uploadImage = (val) =>
    _pickImage(val, async (uri) => {
      setUploading(true);
      uploadToFire(uri);
    });
  async function uploadToFire(uri) {
    // Why are we using XMLHttpRequest? See:
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const newRef = "_" + Math.random().toString(36).substr(2, 9) + Date.now();
    let ref = storage.ref(`kyc/${newRef}`);

    let uploadTask = ref.put(blob);
    setPassportModal(true);
    // We're done with the blob, close and release it
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        console.log("upload error", error);
        setUploading(false);
      },
      () => {
        console.log("getting url");
        storage
          .ref("kyc")
          .child(newRef)
          .getDownloadURL()
          .then((url) => {
            console.log("url", url);
            db.collection("kycusers")
              .doc(user.uid)
              .update({
                passport: {
                  passportVerified: true,
                  newRef: url,
                },
              })
              .then(
                () => (
                  setPassportModal(false),
                  setUploading(false),
                  Alert.alert("Verified"),
                  blob.close()
                )
              )
              .catch(
                (err) => (
                  console.log("error saving to db", err), setUploading(false)
                )
              );
          });
      }
    );
  }
  return (
    <View flex style={{ ...styles.containerStyle }}>
      <View flex={0.3} row space="between" style={{ alignItems: "center" }}>
        <AntDesign
          style={{ transform: [{ rotateY: "180deg" }] }}
          name="logout"
          size={22}
          color="red"
          onPress={() =>
            AsyncStorage.removeItem("user", () => {
              console.log("removing user");
              auth.signOut().then(() =>
                dispatch({
                  type: "LOG_OUT",
                })
              );
            })
          }
        />
        <View style={{ justifyContent: "center" }}>
          <View row style={{ alignItems: "center" }}>
            <Text
              font="rubikMedium"
              color="#2a2a2a"
              style={{ paddingRight: 10 }}
            >
              Hi {(user && user.displayName) || ""}
            </Text>
            <Ionicons name="ios-contact" size={22} color="#050171" />
          </View>
          <Text
            style={{ textAlign: "right" }}
            size="tiny"
            font="rubikBold"
            color="#2a2a2a"
          >
            KYC Level {kycLevel()}
          </Text>
        </View>
      </View>
      <View flex>
        <View flex space="around">
          <View>
            <Text size="huge" font="rubikMedium" color="#2a2a2a">
              Welcome to,
            </Text>
            <Text size="big" font="rubikMedium" color="#2a2a2a">
              KYC Hacathon
            </Text>
          </View>
          <Text color="#aca2a6">
            Complete the following verifications to attain KYC Level 4
          </Text>
        </View>
        <View flex={3} row space="around" style={{ flexWrap: "wrap" }}>
          {Services.map((Service, index) => {
            const { Img, Name, link } = Service;
            const modal = () => {
              index === 0
                ? setEmailModal(true)
                : index === 1
                ? setBvnModal(true)
                : index === 2
                ? setPassportModal(true)
                : null;
            };
            const overlay =
              (index === 0 && user && user.emailVerified) ||
              (index === 1 && bvnVerified) ||
              (index === 2 && passportVerified);
            return (
              <Touchable
                onPress={() => !overlay && modal()}
                style={{
                  width: Layout["dim"](37, "w"),
                  marginTop: 50,
                  height: Layout["dim"](20, "h"),
                  backgroundColor: "#fff",
                  borderRadius: Layout["dim"](3, "w"),
                  shadowColor: "rgba(0,0,0,.2)",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.5,
                  shadowRadius: 6,
                  elevation: 0.6,
                  padding: 20,
                }}
              >
                <View space="around" style={{ width: "100%", height: "100%" }}>
                  <Text size="small" font="rubikMedium" bold color="#050171">
                    Level {index + 1}
                  </Text>
                  <Image source={Img} />
                  <Text size="tiny" font="rubikMedium" bold color="#050171">
                    {Name}
                  </Text>
                  {overlay && (
                    <View
                      style={{
                        borderRadius: Layout["dim"](3, "w"),
                        backgroundColor: "rgba(0,0,0,.2)",
                        position: "absolute",
                        width: "135%",
                        height: "130%",
                        left: -20,
                        top: -20,
                      }}
                      middle
                    >
                      <Ionicons
                        size={54}
                        name="ios-checkmark-circle"
                        color="green"
                      />
                    </View>
                  )}
                </View>
              </Touchable>
            );
          })}
        </View>
      </View>
      <View flex={0.3}></View>
      <EmailModal open={emailModal} setOpen={(val) => setEmailModal(val)} />
      <BvnModal
        open={bvnModal}
        setOpen={(val) => setBvnModal(val)}
        verify={(bvn) => verifyBvn({ bvn })}
        verified={() => verifiedBvn()}
      />
      <PassportModal
        open={passportModal}
        setOpen={(val) => (setPassportModal(val), setUploading(false))}
        callBack={(val) => (
          setPassportModal(false), wait(1000).then(() => uploadImage(val))
        )}
        uploading={uploading}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 30,
  },
});
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
  verifyBvn,
})(Home);

const Services = [
  {
    Name: "Email Verification",
    Img: require("../assets/images/washing.png"),
    link: "KycEmail",
  },
  {
    Name: "Bvn Verification",
    Img: require("../assets/images/ironing.png"),
    link: "KycEmail",
  },
  {
    Name: "Passport Verification",
    Img: require("../assets/images/fashion.png"),
    link: "KycEmail",
  },
  {
    Name: "Link Bank Account",
    Img: require("../assets/images/basket.png"),
    link: "KycEmail",
  },
];
