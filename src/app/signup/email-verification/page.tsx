"use client";
import Image from "next/image";
import OTPInputGroup from "./otpInputs";
import styles from "./style.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sendEmail from "./sendEmail";
import { User } from "@/Components/Types";

export default function Home() {
  const router = useRouter();
  const u: User = {
    id: null,
    firstName: localStorage.getItem("fn") || "",
    lastName: localStorage.getItem("ln") || "",
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
    conversations: [],
  };
  localStorage.clear;
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const generateVerificationCode = async () => {
    const randomCode = Math.floor(Math.random() * 900000) + 100000;
    setCode(randomCode.toString());
    await sendEmail(u, randomCode);
    setEmailSent(true);
  };

  useEffect(() => {
    if (!emailSent) {
      generateVerificationCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSent]);

  return (
    <div className={styles.main}>
      <Link href="/">
        <Image src="/camel-logo_2.png" alt="Logo" width={250} height={200} />
      </Link>
      <div className={styles.mil}>
        <h1 className={styles.h1}>Vérifier votre e-mail</h1>
        <p className={styles.text}>
          Vous y êtes presque! Nous avons envoyé un email à
          <br />
          <b>{u.email}</b>
          <br />
          Entrez le code que vous avez reçu dans l`input au dessous pour
          finaliser votre inscription. Si vous ne trouvez pas l`email
        </p>
        <OTPInputGroup code={code} user={u} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20%",
            width: "40%",
          }}
        >
          <button className={styles.button1} onClick={generateVerificationCode}>
            Renvoyer
          </button>
          <button
            onClick={() => router.push("/signup")}
            className={styles.button2}
          >
            Changer l`email
          </button>
        </div>
      </div>
    </div>
  );
}
