import { User } from "@/Components/Types";
import styles from "./ContextMenuConver.module.css";
import Image from "next/image";
import { forwardRef } from "react";

interface Props {
  user: User;
  updateUser: (newState: User) => void;
  type: number;
  id: number|null
}

const ContextMenuConver = forwardRef<HTMLDivElement,Props>(({type}, ref) => {


  return (
    <div ref={ref} className={styles.menu_conv}>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <button className={styles.rennomer}>
            <span>Rennomer</span>
            <Image
              src="/rename.png"
              alt=""
              width={23}
              height={23}
              className={styles.icon}
            />
          </button>
        </li>{
          type==1 &&
          <li className={styles.li}>
          <button className={styles.archiver}>
            <span>Archiver</span>
            <Image
              src="/box (1).png"
              alt=""
              width={18}
              height={18}
              className={styles.icon}
            />
          </button>
        </li>
        }
        
        <li className={styles.li}>
          <button className={styles.supprimer}>
            <span>Supprimer</span>
            <Image
              src="/delete.png"
              alt=""
              width={20}
              height={20}
              className={styles.icon}
            />
          </button>
        </li>
      </ul>
    </div>
  );
});
ContextMenuConver.displayName = "ContextMenuConver";
export default ContextMenuConver;
