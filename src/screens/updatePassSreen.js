import { View, Text, ActivityIndicator } from "react-native";
import UserInput from "../components/userInput";
import styles from "../constraints/styleSheet";
import Button from "../components/button";
import yupUpdatePass from "../constraints/yupUpdatePass";
import axios from "axios";
import { useState } from "react";
import { Formik } from "formik";

const UpdatePass = (props) => {
  const email = props.route.params.email;
  const [isLoading, setIsLoadinng] = useState(false);

  const changePass = async (values) => {
    setIsLoadinng(true);
    const user = {
      email: email,
      pass: values.pass,
    };
    const result = await axios.post("http://192.168.0.116:3000/update", user);
    setIsLoadinng(false);
    if (result.data == "done") {
      props.navigation.navigate("Login");
    }
  };
  return (
    <Formik
      validationSchema={yupUpdatePass}
      initialValues={{ pass: "", confirmPass: "" }}
      onSubmit={changePass}
    >
      {({ handleChange, values, errors, handleSubmit }) => (
        <View style={styles.container}>
          <UserInput
            placeholder="Enter New Password"
            value={values.pass}
            onChangeText={handleChange("pass")}
          />
          {errors.pass && <Text style={{ color: "red" }}>{errors.pass}</Text>}
          <UserInput
            placeholder="Confirm Password"
            value={values.confirmPass}
            onChangeText={handleChange("confirmPass")}
          />
          {errors.confirmPass && (
            <Text style={{ color: "red" }}>{errors.confirmPass}</Text>
          )}
          {isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Button title="submit" onPress={handleSubmit} />
          )}
        </View>
      )}
    </Formik>
  );
};

export default UpdatePass;
