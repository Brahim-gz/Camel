"use client";
import styles from "./page.module.css";
import Header from "./header";
import Input from "./Input";
import Content from "./Content";
import Side from "./Side";
import { User } from "../../Components/Types";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUserDetails } from "@/Components/fetchs";
import Loader from "@/Components/Loader";
import { useSearchParams, useRouter } from "next/navigation";

let u: User;

const Main: React.FC = () => {
  const search = useSearchParams();
  const idtest = search.get("id");
  const [user, setUser] = useState<User | null>(u);
  const id = idtest != null ? parseInt(idtest) : (user?.conversations[0]?.id||null);
  const jwt = Cookies.get("jwt") || "";
  const router = useRouter();
  if(jwt=="")router.push("/login");
  const updateUserState = (newState: User) => {
    setUser(newState);
  };

  useEffect(() => {
    const loadPage = async () => {
      const userDetails = await getUserDetails(jwt);
      if (userDetails == null) {
        router.push("/login");
      } else {
        setUser(userDetails);
      }
    };

    loadPage();
  }, [jwt, router, user]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className={styles.page_layout}>
      <Side user={user} updateUser={updateUserState} />
      <main className={styles.main}>
        <Header user={user} />
        <Content user={user} id={id} />
        <Input id={id} state={user} fonction={updateUserState} />
      </main>
    </div>
  );
};

export default Main;
