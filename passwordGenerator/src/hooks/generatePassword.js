import { useState } from "react";

export default function useGeneratePassword() {
  //   const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (inputTypes, inputLength) => {
    if (inputLength < 1) {
      setErrorMessage("password length should be greater than 0");
      return "";
    }
    if (inputTypes.filter((item) => !item.selected).length === 4) {
      setErrorMessage("select atleast one type");
      return "";
    }
    let charSet = "";
    inputTypes.forEach((item) => {
      if (item.type === "Include lowerCase." && item.selected) {
        charSet += "abcdefghijklmnopqrstuvwxyz";
      }
      if (item.type === "Include upperCase." && item.selected) {
        charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
      if (item.type === "Include numbers." && item.selected) {
        charSet += "0123456789";
      }
      if (item.type === "Include special characters." && item.selected) {
        charSet += "!@#$%^&*";
      }
    });

    let pass = "";
    for (let i = 0; i < inputLength; i++) {
      pass += charSet[Math.floor(Math.random() * charSet.length)];
    }
    setErrorMessage("");
    return pass;
  };

  return { generatePassword, errorMessage };
}
