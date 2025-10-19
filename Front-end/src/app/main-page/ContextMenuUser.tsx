import styles from "./ContextMenuUser.module.css";
import { forwardRef } from "react";
import { User } from "@/Components/Types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Props {
  user: User;
}

const ContextMenuUser = forwardRef<HTMLDivElement, Props>(({ user }, ref) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('jwt');
    router.push("/");
  }
  return (
    <div ref={ref} className={styles.menu_user}>
      <ul className={styles.ul}>
        <li className={styles.li}>{user.firstName} {user.lastName}</li>
        <li className={styles.li}>{user.email}</li>
        <li className={styles.last_li}>
          <button className={styles.disconnect} onClick={handleLogout}>se déconnecter</button>
        </li>
      </ul>
    </div>
  );
});

ContextMenuUser.displayName = 'ContextMenuUser';

export default ContextMenuUser;
