import { useState } from "react";
import _ from "lodash";
import { inputType, passwordCopied } from "./constants/inputTypeData";
import "./styles.css";
import useGeneratePassword from "./hooks/generatePassword";

export default function App() {
  const [inputTypes, setInputTypes] = useState(inputType);
  const [password, setPassword] = useState("");
  const [inputLength, setInputLength] = useState(0);
  const { generatePassword, errorMessage } = useGeneratePassword();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handlePasswordLength = (e) => {
    const passwordLength = e.target.value;
    setInputLength(passwordLength);
  };

  const handleTypeChange = (e, index) => {
    const newInputTypes = [...inputTypes];
    newInputTypes[index].selected = e.target.checked;
    setInputTypes(newInputTypes);
  };

  const handleGeneratePassword = () => {
    const pass = generatePassword(inputTypes, inputLength);
    if (pass) setPassword(pass);
  };

  const removeCopiedMessage = () => {
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setShowCopiedMessage(true);
    removeCopiedMessage();
  };

  return (
    <div className="container">
      <div className="header">
        <p className="password__text">{password}</p>
        {showCopiedMessage && (
          <span className="password__copy">{passwordCopied}</span>
        )}
        <button
          className="button"
          disabled={!password.length}
          onClick={handleCopy}
        >
          copy
        </button>
      </div>
      <div>
        <div className="password__length">
          <sub>0</sub>
          <sub>{inputLength}</sub>
          <sub>20</sub>
        </div>
        <input
          type="range"
          className="input__range"
          min={0}
          max={20}
          value={inputLength}
          onChange={(e) => handlePasswordLength(e)}
        ></input>
      </div>
      <div className="input__types">
        {inputTypes.map((item, index) => (
          <div key={item.type}>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={(e) => handleTypeChange(e, index)}
            ></input>
            <span>{item.type}</span>
          </div>
        ))}
      </div>
      {errorMessage && <p className="error__message">{errorMessage}</p>}
      <div className="generate__button">
        <button className="button big__button" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>
    </div>
  );
}
