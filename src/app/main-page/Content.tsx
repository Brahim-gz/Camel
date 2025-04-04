"use client";
import Image from "next/image";
import styles from "./Content.module.css";
import { User } from "@/Components/Types";

interface Props {
  user: User;
  id: number | null;
}

const Content: React.FC<Props> = ({ user, id }) => {
  const conversation = user.conversations.filter((x) => x.id === id);
  const messages = conversation[0]?.messages;

  const formatDate = (timestamp: string | number | Date): string => {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleTimeString() + " | " + date.toLocaleDateString();
  };

  if (id == null || (messages?.length||0)=== 0) {
    return (
      <div className={styles.blank}>
        <Image
          src="/graph.png"
          alt="shape"
          layout="fill"
          objectFit="contain"
          className={styles.shape}
        />
        <p className={styles.text}>
          Bonjour {user.firstName}, comment je peux vous aider ?
        </p>
      </div>
    );
  } else {
    return (
      <div className={styles.content}>
        {messages.map((x) => (
          <div key={x.id} className={styles.msg}>
            <div className={styles.msgcontent}>
              <div className={styles.msgbody}>
                <Image
                  src="/profile-user.png"
                  width={35}
                  height={35}
                  alt=""
                  className={styles.icon}
                />
                <div className={styles.wrapper}>{x.content}</div>
              </div>
              <span className={styles.timestamp}>
                {formatDate(x.timestamp)}
              </span>
            </div>
            <div className={styles.response}>
              <Image
                src="/camel_logo.png"
                width={45}
                height={45}
                alt=""
                className={styles.icon}
              />
              <div className={styles.wrapper}>{x.resp}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default Content;
