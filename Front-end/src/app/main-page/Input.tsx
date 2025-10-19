"use client";
import Image from "next/image";
import styles from "./Input.module.css";
import { Message, User } from "@/Components/Types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMessage, renameConv } from "@/Components/fetchs";

interface Props {
  id: number | null;
  state: User;
  fonction: (newState: User) => void;
}

const Input: React.FC<Props> = ({ id, state, fonction }) => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id && value) {
      const newMsg: Message = {
        id: null,
        content: value,
        resp: "Model Response",
        timestamp: Date.now(),
      };
      setValue("");
      const updatedUser = state;
      const response = await createMessage(newMsg,id);
      const updated : boolean|null = (state.conversations.find(x=>x.id===id)?.messages.length===0) ?  await renameConv(newMsg.content,id) : true;
      if (response == null || updated == null) {
        router.push("/login");
      } else {
        fonction(updatedUser);
      }
      
    }
  };

  return (
    <div className={styles.inputDiv}>
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Disscuter avec Camel"
          className={styles.input}
          id="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className={styles.send}
          aria-label={"send prompt"}
        >
          <Image src="/send.png" alt="send-Icon" width={40} height={35} />
        </button>
      </form>
      <p className={styles.alert}>
        Camel can make mistakes, Consider checking important information
      </p>
    </div>
  );
};

export default Input;
