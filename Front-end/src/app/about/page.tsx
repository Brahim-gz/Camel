import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.main}>
      <Link href="/">
        <Image src="/camel-logo_2.png" alt="Logo" width={250} height={200} />
      </Link>
      <div className={styles.mil}>
        <h1 className={styles.h1}> À propos de Camel</h1>
        <p className={styles.text}>
          Nous avons entrepris de concevoir un chatbot utilisant le modèle Llama
          2 réglé, avec pour mission principale la neutralisation des biais,
          notamment ceux relatifs à la délicate question de la Palestine. Ce
          chatbot sera spécialement élaboré afin de délivrer des informations
          impartiales et objectives sur ce sujet, garantissant une interaction
          neutre avec les utilisateurs
        </p>
      </div>
    </div>
  );
}
