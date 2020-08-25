import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { View, Text, Button } from "../components/Themed";
import Modal from "react-native-modal";
import DateTimePicker from "@react-native-community/datetimepicker";
import { wait, isEmptyObj } from "../components/Functions";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");
interface BvnModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  verify: (val: string) => void;
  verified: () => void;
}

const BvnModal: React.FC<BvnModalProps> = ({
  open,
  setOpen,
  verify,
  verified,
}) => {
  const [bvn, setBvn] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [bvnData, setBvnData] = useState<any>({});
  const scroll = useRef(null);
  const [date, setDate] = useState(new Date());
  const [validDob, setValidDob] = useState(false);
  const bvnFetched: any = useSelector(
    (state: {
      generic: {
        Success: {
          Bvn: {};
        };
      };
    }) => state.generic.Success.Bvn
  );

  useEffect(() => {
    bvnFetched &&
      (console.log("fetched", bvnFetched),
      setBvnData(bvnFetched),
      setVerifying(false),
      wait(1000).then(() => scroll.current.scrollTo({ x: width })));
  }, [bvnFetched]);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    !isEmptyObj(bvnData) &&
    currentDate.setHours(0, 0, 0, 0) ===
      new Date(bvnData.formatted_dob.toString()).setHours(0, 0, 0, 0)
      ? setValidDob(true)
      : setValidDob(false);
  };

  return (
    <Modal
      isVisible={open}
      style={{
        justifyContent: "flex-end",
        margin: 0,
        backgroundColor: "rgba(0,0,0,.1)",
        alignItems: "center",
      }}
      onSwipeComplete={() => setOpen(false)}
      swipeDirection={["down"]}
      onBackdropPress={() => setOpen(false)}
      animationInTiming={800}
      animationOutTiming={800}
    >
      <View
        width={100}
        height={40}
        backgroundColor="#f5f5f5"
        style={{ borderRadius: 30 }}
        center
        space="around"
      >
        <View flex={0.1} style={{ padding: 20 }}>
          <Text center font="rubikBold" color="#2a2a2a">
            Bvn Verification
          </Text>
        </View>
        <View flex>
          <ScrollView
            contentContainerStyle={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scroll}
            scrollEnabled={false}
            snapToInterval={width}
            scrollEventThrottle={10}
          >
            <View
              width={100}
              style={{ alignSelf: "stretch" }}
              space="around"
              center
            >
              <TextInput
                placeholder="Bank Verification Number"
                style={{
                  borderBottomColor: "#dbdae3",
                  borderBottomWidth: 1,
                  height: 50,
                  width: "40%",
                  textAlign: "center",
                }}
                secureTextEntry
                onChangeText={(text) => setBvn(text)}
                value={bvn}
              />
              <Button
                loading={verifying}
                onPress={() => (setVerifying(true), verify(bvn))}
                shadowless
                color="black"
                style={{ width: 60, borderRadius: 30, height: 60 }}
              >
                <Ionicons name="ios-arrow-forward" color="#fff" size={24} />
              </Button>
            </View>
            <View width={100} style={{ alignSelf: "stretch" }} space="around">
              <Text
                style={{ alignSelf: "center" }}
                center
                font="rubikBold"
                color="#2a2a2a"
              >
                Pick your DOB
              </Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                display="spinner"
                onChange={onChange}
                maximumDate={new Date()}
                // style={{ backgroundColor: "red" }}
              />
              <Button
                loading={verifying}
                onPress={() =>
                  !validDob
                    ? Alert.alert("Bvn Dob dont match")
                    : (setVerifying(true), verified())
                }
                shadowless
                color={validDob ? "#fff" : "black"}
                style={{
                  width: 60,
                  borderRadius: 30,
                  height: 60,
                  alignSelf: "center",
                }}
              >
                <Ionicons
                  name="ios-arrow-forward"
                  color={!validDob ? "#fff" : "black"}
                  size={24}
                />
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default BvnModal;
