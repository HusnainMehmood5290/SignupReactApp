import { View, ActivityIndicator, Text } from "react-native";
import UserInput from "../components/userInput";
import styles from "../constraints/styleSheet";
import Button from "../components/button";
import { useState } from "react";
import axios from "axios";

const ForgetPass = (props) => {
  const [isLoading, setIsLoadinng] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [email, setEmail] = useState();
  const checkEmail = async () => {
    setIsLoadinng(true);
    // console.log(email);
    const result = await axios.post("http://192.168.0.116:3000/findEmail", {
      email: email,
    });
    // console.log(result.data);
    // console.log(email);
    setIsLoadinng(false);
    if (result.data == "valid") {
      setEmailError(false);
      props.navigation.navigate("Update Password", { email: email });
    } else if (result.data == "inValid") {
      setEmailError(true);
    }
  };
  return (
    <View style={styles.container}>
      <UserInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Enter Your Email"
      />
      {emailError && (
        <Text style={{ color: "red", marginBottom: 5 }}>
          Email doesn't exist
        </Text>
      )}
      {isLoading ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Button title="submit" onPress={checkEmail} />
      )}
    </View>
  );
};

export default ForgetPass;
