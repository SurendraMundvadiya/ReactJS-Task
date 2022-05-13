const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
const Validation = async (type: string, value: any) => {
    switch (type) {
        case "email":
            if (value === "") {
                return { error: true, errorMessage: "Email is required" };
            } else if (!emailRegx.test(value)) {
                return { error: true, errorMessage: "Email is not valid" };
            } else {
                return { error: false, errorMessage: "" };
            }
        case "password":
            if (value === "") {
                return { error: true, errorMessage: "Password is required" };
            } else if (!passwordRegx.test(value)) {
                return { error: true, errorMessage: "Password is not valid" };
            } else {
                return { error: false, errorMessage: "" };
            }

        case "fullName":
            if (value === "") {
                return { error: true, errorMessage: "Full name is required" };
            } else if (value.length < 3) {
                return { error: true, errorMessage: "Full name length should be greater then 3 digit" };
            } else {
                return { error: false, errorMessage: "" };
            }
        case "phoneNumber":
            if (value === "") {
                return { error: true, errorMessage: "Phone number is required" };
            } else if (value.length !== 10) {
                return { error: true, errorMessage: "Phone number should be 10 digit" };
            } else {
                return { error: false, errorMessage: "" };
            }

        default:
            return { error: false, errorMessage: "" };
    }
};

export default Validation;
