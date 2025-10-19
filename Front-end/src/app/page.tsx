import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image
          src="/camel_logo.png"
          alt="camel logo"
          width={100}
          height={100}
        />
        <Link href="/about" className={styles.about}>
          à propos
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.h1}>CAMEL</h1>

          <div className={styles.p}>
            <p>Explorez un univers de conversations justes et équitables</p>
          </div>
          <div className={styles.btn}>
            <Link href="/login" className={styles.seconnecter}>
              Se connecter
            </Link>
            <Link href="/signup" className={styles.inscrire}>
              S`inscrire
            </Link>
          </div>
        </div>
        <div className={styles.gif}>
          <Image
            src="/graph (2).png"
            alt="shape"
            height={1000}
            width={1000}
            className={styles.graph}
          />
          <Image
            src="/camel_gif.gif"
            alt="camel-gif"
            height={600}
            width={1000}
            style={{ zIndex: "10", width: "90%", height: "60%" }}
            unoptimized
          />
        </div>
      </div>
    </main>
  );
}

export default App;
