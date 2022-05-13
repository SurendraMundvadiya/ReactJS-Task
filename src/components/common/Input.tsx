import React from "react";
import "./Input.scss";

interface InputProps {
    type: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    error: boolean;
    helperText: string;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className={props.error ? "input error" : "input sucess"}>
            <label className="input__label">{props.label}</label>
            <input type={props.type} name={props.name} onChange={props.onChange} />
            {props.error && <span>*{props.helperText}</span>}
        </div>
    );
};

export default Input;
