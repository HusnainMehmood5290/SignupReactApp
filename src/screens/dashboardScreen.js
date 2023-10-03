import { Text, View } from "react-native";
import styles from "../constraints/styleSheet";
import Heading from "../components/heading";

const Dashboard = (props) => {
  const { fname, lname, email } = props.route.params.data;
  return (
    <View style={styles.container}>
      <Heading value="Welcome To Dashboard" />
      <Text>{`Welcome ${fname} ${lname}`}</Text>
      <Text>{`Here is your email: ${email}`}</Text>
    </View>
  );
};
export default Dashboard;
