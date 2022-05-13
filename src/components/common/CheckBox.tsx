import React, { FC } from "react";
import "./CheckBox.scss";
interface InputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
}
const CheckBox: FC<InputProps> = (props) => {
    return (
        <div className="check-box__conatiner">
            <span>
                <input type="checkbox" onChange={props.onChange} />I read and and agree Terms and Conditions
            </span>
            {props.error && <span className="check-box__error">You must agree to the terms and conditions</span>}
        </div>
    );
};

export default CheckBox;
