"use client";
import Image from "next/image";
import styles from "./header.module.css";
import ContextMenuUser from "./ContextMenuUser";
import { useRef, useState, useEffect } from "react";
import { User } from "@/Components/Types";

interface Props {
  user: User;
}

const Header: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const ClickOutside = (e: MouseEvent) => {
      if (menuRef.current && imgRef.current && 
          !menuRef.current.contains(e.target as Node) && 
          !imgRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('click', ClickOutside);
    return () => {
      window.removeEventListener('click', ClickOutside);
    };
  }, [menuRef,imgRef]);
  return (
    <div className={styles.header}>
      <span className={styles.camel}>CAMEL</span>
        <Image
          ref={imgRef}
          src="/profile-user.png"
          alt="user-pfp"
          width={45}
          height={45}
          onClick={() => setOpen(!open)}
          style={{cursor:"pointer",zIndex:"20"}}
        />
        {open && <ContextMenuUser ref={menuRef} user={user}/>}
    </div>
  );
};

export default Header;
