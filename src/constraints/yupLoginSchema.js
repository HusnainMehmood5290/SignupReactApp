import * as Yup from "yup";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  pass: Yup.string().min(8).required("Required"),
});
export default LoginSchema;
