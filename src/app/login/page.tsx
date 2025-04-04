"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Popup from "@/Components/popup";
import { auth } from "@/Components/fetchs";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParms = useSearchParams();
  const pp = (searchParms.get('show')!=null);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Tous les champs sont obligatoires.");
      return;
    }
    const data = await auth(email,password);
    if(data==null){
      setErrorMessage("Email ou mot de passe est sésie incorrectement.");
      return;
    }
    Cookies.set('jwt', data['access-token'], { expires: 30, secure: true, sameSite: 'Strict' });
    setErrorMessage("");
    router.push(`/main-page`);
  };
  return (
    <main className={styles.main}>
      {pp && <Popup text="Compte créé" />}
      <div className={styles.center}>
        <Link href="/">
          <Image src="/camel_logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <h1 className={styles.h1}>Bienvenue </h1>
        <form onSubmit={handleSubmit} className={styles.formulaire}>
          <label htmlFor="email" className={styles.label}>
            Adress e-mail
          </label>
          <br />
          <input
            type="text"
            placeholder="exemple@domain.com"
            aria-autocomplete="none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <br />
          <label htmlFor="password" className={styles.label}>
            Mot de passe
          </label>
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
          <p className={styles.paragraph}>
            Vous n`avez pas de compte ?
            <Link href="/signup" className={styles.inscription}>
              Inscrivez-vous
            </Link>
          </p>
          <button type="submit" className={styles.button}>
            Se connecter
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
