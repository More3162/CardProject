import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useCurrentUser } from "../providers/UserProvider";
import useForm from "../../forms/hooks/useForm";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import signupSchema from "../models/signupSchema";
import { Container } from "@mui/material";
import SignupForm from "../components/SignupForm";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { signup, login } from "../services/usersApiService";
import { useNavigate } from "react-router-dom";
import { setTokenInLocalStorage } from "../services/localStorageService";
import useUsers from "../hooks/useUsers";




export default function SignupPage() {
  const { handleLogin } = useUsers();
  const { user, setToken } = useCurrentUser();

  const handleSignup = async (userDetails) => {
    const normalizedUser = normalizeUser(userDetails);
    const userLogin = { email: userDetails.email, password: userDetails.password };
    await signup(normalizedUser);
    await handleLogin(userLogin);
  };

  const {
    data,
    errors,
    handleChange,
    handleReset,
    validateForm,
    onSubmit,
    handleChangeCheckBox,
  } = useForm(initialSignupForm, signupSchema, handleSignup);

  if (user) return <Navigate to={ROUTES.ROOT} replace />;

  return (
    <Container
      sx={{
        paddingTop: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignupForm
        onSubmit={onSubmit}
        onReset={handleReset}
        validateForm={validateForm}
        title={"register form"}
        errors={errors}
        data={data}
        onInputChange={handleChange}
        handleChangeCheckBox={handleChangeCheckBox}
      />
    </Container>
  );
}
