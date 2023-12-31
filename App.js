import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/navigations";

const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
