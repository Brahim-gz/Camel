import styles from "./popup.module.css";

interface Prop {
  text: string;
}
const Popup: React.FC<Prop> = ({ text }) => {
  return (
    <div
      className={styles.container}
      style={{ left: text[0] == "C" ? "46%" : "41%" }}
    >
      <p className={styles.content}>{text}</p>
    </div>
  );
};

export default Popup;
