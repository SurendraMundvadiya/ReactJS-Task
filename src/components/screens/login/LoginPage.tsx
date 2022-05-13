import React, { useState } from "react";
import login from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";
import "./LoginPage.scss";
import CheckBox from "../../common/CheckBox";
import validation from "../../common/Validation";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState({ value: "", error: false, errorMessage: "" });
    const [password, setPassword] = useState({ value: "", error: false, errorMessage: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: false, errorMessage: "" });
    const [fullName, setFullName] = useState({ value: "", error: false, errorMessage: "" });
    const [phoneNumber, setPhoneNumber] = useState({ value: "", error: false, errorMessage: "" });
    const [isAgree, setIsAgree] = useState<Boolean | null>();

    const handleCrateAccount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (email.error || password.error || confirmPassword.error || fullName.error || phoneNumber.error || !isAgree) {
            return;
        } else {
            navigate("/graph");
        }
    };

    return (
        <div className="container">
            <div className="container__image">
                <img src={login} alt="login" />
            </div>
            <form className="container__form">
                <h3>Create an account</h3>

                <Input
                    label="Your email address"
                    type="email"
                    name="email"
                    onChange={async (e) => {
                        let temp = await validation("email", e.target.value);
                        if (temp.error) setEmail({ value: e.target.value, error: temp.error, errorMessage: temp.errorMessage });
                        else setEmail({ value: e.target.value, error: false, errorMessage: "" });
                    }}
                    error={email.error}
                    helperText={email.errorMessage}
                />

                <Input
                    label="Your password"
                    type="password"
                    name="password"
                    onChange={async (e) => {
                        let temp = await validation("password", e.target.value);
                        if (temp.error) setPassword({ value: e.target.value, error: temp.error, errorMessage: temp.errorMessage });
                        else setPassword({ value: e.target.value, error: false, errorMessage: "" });
                    }}
                    error={password.error}
                    helperText={password.errorMessage}
                />

                <Input
                    label="Confirm your password"
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => {
                        if (e.target.value === password.value) {
                            setConfirmPassword({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setConfirmPassword({ value: e.target.value, error: true, errorMessage: "Password does not match" });
                        }
                    }}
                    error={confirmPassword.error}
                    helperText={confirmPassword.errorMessage}
                />

                <Input
                    label="Your full name"
                    type="text"
                    name="fullName"
                    onChange={async (e) => {
                        let temp = await validation("fullName", e.target.value);
                        if (temp.error) setFullName({ value: e.target.value, error: temp.error, errorMessage: temp.errorMessage });
                        else setFullName({ value: e.target.value, error: false, errorMessage: "" });
                    }}
                    error={fullName.error}
                    helperText={fullName.errorMessage}
                />

                <Input
                    label="Your phone number"
                    type="number"
                    name="phoneNumber"
                    onChange={async (e) => {
                        let temp = await validation("phoneNumber", e.target.value);
                        if (temp.error) setPhoneNumber({ value: e.target.value, error: temp.error, errorMessage: temp.errorMessage });
                        else setPhoneNumber({ value: e.target.value, error: false, errorMessage: "" });
                    }}
                    error={phoneNumber.error}
                    helperText={phoneNumber.errorMessage}
                />
                <CheckBox
                    onChange={(e) => {
                        console.log(e.target.checked);
                        setIsAgree(e.target.checked);
                    }}
                    error={!isAgree}
                />

                <button onClick={(e) => handleCrateAccount(e)}>Create account</button>
            </form>
        </div>
    );
};

export default LoginPage;
