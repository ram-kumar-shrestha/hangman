import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./form-group.css";

const FormGroup = ({
  inputMethod,
  styleProp = "",
  id,
  label,
  type = "",
  placeholder = "",
  options = "",
  onChange,
  onBlur,
  value,
  error = "",
  touched = false,
  readOnly = false,
}) => {
  const [icon, setIcon] = useState("show");
  const [field, setField] = useState();
  const [mappedOptions, setMappedOptions] = useState([]);

  const passwordRef = useRef();

  useEffect(() => {
    if (inputMethod === "input") {
      let tempfield = (
        <input
          type={type}
          name={id}
          className="form-control"
          id={id}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          checked={value && type === "checkbox" ? true : false}
          readOnly={readOnly}
          required={type === "checkbox" ? false : true}
          ref={passwordRef}
        />
      );

      setField(
        type === "password" ? (
          <div className="password-container">
            {tempfield}
            <span
              className="show-psswd"
              onClick={() => {
                if (passwordRef.current.type === "password") {
                  passwordRef.current.type = "text";
                  setIcon("show");
                } else {
                  passwordRef.current.type = "password";
                  setIcon("hide");
                }
              }}
            >
              {icon === "hide" ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        ) : (
          tempfield
        )
      );
    } else if (inputMethod === "select") {
      setField(
        <select
          name={id}
          id={id}
          className="form-control"
          onChange={onChange}
          onBlur={onBlur}
          value={value}
        >
          {options.map((opt) => {
            return (
              <option value={opt.id} key={opt.id}>
                {opt.name}
              </option>
            );
          })}
        </select>
      );
    } else {
    }
  }, [value, icon, options.length]);

  return (
    <div className={styleProp}>
      <label htmlFor={id}>{label}</label>
      {field}
      {error && touched ? <span className="error">{error}</span> : null}
    </div>
  );
};

export default FormGroup;
