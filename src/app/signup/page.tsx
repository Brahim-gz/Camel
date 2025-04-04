"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getUser } from "../../Components/fetchs";
import Popup from "@/Components/popup";

const Signup = () => {
  const [name, setName] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParms = useSearchParams();
  const pp = searchParms.get("show") != null;
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !first_name || !email || !password) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 1 caractère majiscule, miniscule et au moins un numero avec une longueur de 8."
      );
      return;
    }
    try {
      const resp = await getUser(email);
      if (await resp) {
        setErrorMessage("Vous avez déjà un compte avec ce email.");
        return;
      }
      setErrorMessage("");
      localStorage.setItem("fn", first_name);
      localStorage.setItem("ln", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      router.push("/signup/email-verification");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main className={styles.main}>
      {pp && <Popup text=" problème de Serveur ressayer plustard " />}
      <div className={styles.container}>
        <Link href="/">
          <Image
            src="/camel_logo.png"
            alt="camel-logo"
            width={200}
            height={200}
          />
        </Link>
        <h1 className={styles.h1}>Créez votre compte</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nom</label>
          <br />
          <input
            type="text"
            name="Lastname"
            placeholder="Nom"
            aria-autocomplete="none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
            className={styles.input}
          />
          <label className={styles.label}>Prenom</label>
          <br />
          <input
            type="text"
            name="Firstname"
            placeholder="Prénom"
            aria-autocomplete="none"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
            maxLength={10}
            className={styles.input}
          />
          <label className={styles.label}>Email</label>
          <br />
          <input
            type="text"
            name="Email"
            placeholder="example@domain.com"
            aria-autocomplete="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <label className={styles.label}>Mot de pass</label>
          <br />
          <input
            type="password"
            placeholder="********"
            aria-autocomplete="none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <p className={styles.p}>
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className={styles.login}>
              Connectez-vous
            </Link>
          </p>
          <button type="submit" className={styles.button}>
            S`inscrire
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
