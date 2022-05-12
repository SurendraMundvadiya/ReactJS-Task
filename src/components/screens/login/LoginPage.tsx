import React, { useState } from "react";
import login from "../../assets/login.png";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";
const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState({ value: "", error: false, errorMessage: "" });
    const [password, setPassword] = useState({ value: "", error: false, errorMessage: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: false, errorMessage: "" });
    const [fullName, setFullName] = useState({ value: "", error: false, errorMessage: "" });
    const [phoneNumber, setPhoneNumber] = useState({ value: "", error: false, errorMessage: "" });
    const [isAgree, setIsAgree] = useState({ value: false, error: false, errorMessage: "" });

    const handleCrateAccount = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (email.value === "") {
            setEmail({ ...email, error: true, errorMessage: "Email is required" });
        } else if (!emailRegx.test(email.value)) {
            setEmail({ ...email, error: true, errorMessage: "Email is not valid" });
        } else if (password.value === "") {
            setPassword({ ...password, error: true, errorMessage: "Password is required" });
        } else if (!passwordRegx.test(password.value)) {
            setPassword({ ...password, error: true, errorMessage: "Password is not valid" });
        } else if (confirmPassword.value === "") {
            setConfirmPassword({ ...confirmPassword, error: true, errorMessage: "Confirm password is required" });
        } else if (password.value !== confirmPassword.value) {
            setConfirmPassword({ ...confirmPassword, error: true, errorMessage: "Confirm password is not valid" });
        } else if (fullName.value === "") {
            setFullName({ ...fullName, error: true, errorMessage: "Full name is required" });
        } else if (phoneNumber.value === "") {
            setPhoneNumber({ ...phoneNumber, error: true, errorMessage: "Phone number is required" });
        } else if (!isAgree.value) {
            setIsAgree({ ...isAgree, error: true, errorMessage: "You must agree with our terms and conditions" });
        } else {
            console.log("success");
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
                <label className="container__form__labelText">Your email address</label>
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (emailRegx.test(e.target.value)) {
                            setEmail({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setEmail({ value: e.target.value, error: true, errorMessage: "Please enter a valid email address" });
                        }
                    }}
                />
                {email.error && <span className="container__form__error">{email.errorMessage}</span>}
                <label className="container__form__labelText">Your password</label>
                <input
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (passwordRegx.test(e.target.value)) {
                            setPassword({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setPassword({ value: e.target.value, error: true, errorMessage: "Please enter a valid 8 digit password" });
                        }
                        if (e.target.value !== confirmPassword.value) {
                            setConfirmPassword({ value: e.target.value, error: true, errorMessage: "Password does not match" });
                        }
                    }}
                />
                {password.error && <span className="container__form__error">{password.errorMessage}</span>}
                <label className="container__form__labelText">Confirm your password</label>
                <input
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === password.value) {
                            setConfirmPassword({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setConfirmPassword({ value: e.target.value, error: true, errorMessage: "Password does not match" });
                        }
                    }}
                />
                {confirmPassword.error && <span className="container__form__error">{confirmPassword.errorMessage}</span>}
                <label className="container__form__labelText">Your full name</label>
                <input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length > 3) {
                            setFullName({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setFullName({ value: e.target.value, error: true, errorMessage: "Please enter your full name" });
                        }
                    }}
                />
                {fullName.error && <span className="container__form__error">{fullName.errorMessage}</span>}
                <label className="container__form__labelText">Your phone number</label>
                <input
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value.length === 10) {
                            setPhoneNumber({ value: e.target.value, error: false, errorMessage: "" });
                        } else {
                            setPhoneNumber({ value: e.target.value, error: true, errorMessage: "Please enter your 10 digit phone number" });
                        }
                    }}
                />
                {phoneNumber.error && <span className="container__form__error">{phoneNumber.errorMessage}</span>}
                <span className="container__form__labelText">
                    <input
                        type="checkbox"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setIsAgree({ value: e.target.checked, error: false, errorMessage: "" });
                        }}
                    />
                    I read and and agree Terms and Conditions
                </span>
                {isAgree.error && <span className="container__form__error">You must agree to the terms and conditions</span>}

                <button onClick={(e) => handleCrateAccount(e)}>Create account</button>
            </form>
        </div>
    );
};

export default LoginPage;
