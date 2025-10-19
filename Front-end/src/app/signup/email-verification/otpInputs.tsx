import React, { FormEvent, useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
import { User } from "@/Components/Types";
import { createUser } from "@/Components/fetchs";

type InputValues = {
  [key: string]: string;
};

interface OTPInputProps {
  id: string;
  previousId: string | null;
  nextId?: string;
  value: string;
  onValueChange: (inputId: string, value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

interface Prop {
  code: string;
  user: User;
}

const OTPInputGroup: React.FC<Prop> = ({ code, user }) => {
  const [inputValues, setInputValues] = useState<InputValues>({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const [verificationError, setVerificationError] = useState(false);

  const handleInputChange = (inputId: string, value: string) => {
    if (value === "" || /^[a-zA-Z0-9]$/.test(value)) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [inputId]: value,
      }));
    }
  };

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredCode = Object.values(inputValues).join("");
    if (enteredCode === code) {
      setVerificationError(false);
      let done = await createUser(user);
      let show = "1";
      const query = new URLSearchParams({ show }).toString();
      done ? router.push(`/login?${query}`) : router.push(`/signup?${query}`);
    } else {
      setVerificationError(true);
    }
  };

  return (
    <>
      <form
        id="OTPInputGroup"
        className={styles.digitGroup}
        data-autosubmit="true"
        onSubmit={handleSubmit}
      >
        {["input1", "input2", "input3", "input4", "input5", "input6"].map(
          (inputId, index, array) => (
            <OTPInput
              key={inputId}
              id={inputId}
              value={inputValues[inputId]}
              onValueChange={handleInputChange}
              previousId={index > 0 ? array[index - 1] : null}
              handleSubmit={handleSubmit}
              nextId={index < array.length - 1 ? array[index + 1] : undefined}
            />
          )
        )}
      </form>
      {verificationError && (
        <p className={styles.error} style={{ color: "red" }}>
          Invalid OTP. Please try again.
        </p>
      )}
    </>
  );
};

const OTPInput: React.FC<OTPInputProps> = ({
  id,
  previousId,
  nextId,
  value,
  onValueChange,
  handleSubmit,
}) => {
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (e.key === "Backspace" || e.key === "ArrowLeft") {
      const prev = previousId
        ? (document.getElementById(previousId) as HTMLInputElement)
        : null;
      if (prev) {
        prev.focus();
      }
      if (e.key === "Backspace") {
        onValueChange(id, "");
      }
    } else if (e.key.match(/^[a-zA-Z0-9]$/) || e.key === "ArrowRight") {
      const next = nextId
        ? (document.getElementById(nextId) as HTMLInputElement)
        : null;
      if (next) {
        next.focus();
      } else {
        const form = document.getElementById(
          "OTPInputGroup"
        ) as HTMLFormElement;
        if (form && form.dataset["autosubmit"] === "true") {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <input
      id={id}
      name={id}
      type="text"
      className={styles.digitInput}
      aria-autocomplete="none"
      value={value}
      maxLength={1}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
};

export default OTPInputGroup;
