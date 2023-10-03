import React, { useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Heading from "../components/heading";
import Button from "../components/button";
import UserInput from "../components/userInput";
import styles from "../constraints/styleSheet";
import { Formik } from "formik";
import yupLoginSchema from "../constraints/yupLoginSchema";
import axios from "axios";

export default LoginScreen = (props) => {
  const [isLoading, setIsLoadinng] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const Login = async (values) => {
    setIsLoadinng(true);
    const result = await axios.post("http://192.168.0.116:3000/login", values);
    setIsLoadinng(false);
    if (result.data == false) {
      setEmailError(true);
    } else {
      setEmailError(false);
      props.navigation.navigate("Dashboard", { data: result.data });
    }
  };
  return (
    <Formik
      initialValues={{ email: "", pass: "" }}
      validationSchema={yupLoginSchema}
      onSubmit={Login}
    >
      {({ handleChange, handleSubmit, errors, values }) => (
        <View style={styles.container}>
          <Heading value="Login" />
          {emailError && (
            <Text style={{ color: "red" }}>
              Email or Password is incorrect try again or signup
            </Text>
          )}
          <UserInput
            placeholder="Enter Email"
            onChangeText={handleChange("email")}
            value={values.email}
          />
          {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
          <UserInput
            placeholder="Enter Password"
            onChangeText={handleChange("pass")}
            value={values.pass}
          />
          {errors.pass && <Text style={{ color: "red" }}>{errors.pass}</Text>}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Forget Password");
            }}
          >
            <Text
              style={{
                textDecorationLine: "underline",
                color: "blue",
                paddingBottom: 8,
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
          {isLoading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Button title="Login" onPress={handleSubmit} />
          )}
        </View>
      )}
    </Formik>
  );
};
