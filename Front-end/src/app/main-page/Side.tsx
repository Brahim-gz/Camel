import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createConversation } from "@/Components/fetchs";
import { Conversation, User } from "../../Components/Types";
import ContextMenuConver from "./ContextMenuConver";
import styles from "./Side.module.css";

interface Props {
  user: User;
  updateUser: (newState: User) => void;
}
interface menu {
  isOpen: boolean;
  id: number | null;
}

const Side: React.FC<Props> = ({ user, updateUser }) => {
  const [collapse, setCollapse] = useState(true);
  const toggleCollapse = () => setCollapse(!collapse);
  const router = useRouter();
  let menus: menu[] = [];
  user.conversations.forEach((x) => {
    let ret: menu = { id: x.id, isOpen: false };
    menus.push(ret);
  });
  const [openMenus, setOpenMenus] = useState<menu[]>(menus);
  const handleNewConversation = async () => {
    try {
      let newConv: Conversation;
      const existingNewConv = user.conversations.find(
        (conv) => conv.name === "Nouvelle_Conv"
      );

      if (existingNewConv) {
        newConv = existingNewConv;
      } else {
        newConv = {
          id: null,
          name: "Nouvelle_Conv",
          archived: false,
          messages: [],
        };
        const response = await createConversation(newConv, user.id || 0);
        if (response == null) {
          router.push("/login");
          return;
        }
        newConv.id = response.id;
        updateUser({
          ...user,
          conversations: [...user.conversations, newConv],
        });
      }

      router.push(
        `/main-page?${new URLSearchParams({
          id: newConv.id?.toString() || "",
        }).toString()}`
      );
    } catch (error) {
      console.error("Error creating new conversation:", error);
    }
  };
  const handleMenuClick = (index: number) => {
    setOpenMenus(
      openMenus.map((menu) =>
        menu.id === index ? { ...menu, isOpen: !menu.isOpen } : menu
      )
    );
  };

  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const newOpenMenus = openMenus.map((menu) => {
        if (menuRefs.current[menu.id || 0] && imgRefs.current[menu.id || 0]) {
          if (
            !menuRefs.current[menu.id || 0]?.contains(e.target as Node) &&
            !imgRefs.current[menu.id || 0]?.contains(e.target as Node)
          ) {
            return { ...menu, isOpen: false };
          }
        }
        return menu;
      });
      setOpenMenus(newOpenMenus);
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [menuRefs, imgRefs, openMenus]);

  return (
    <nav className={styles.side} data-collapse={collapse}>
      <button
        className={styles.collIconbutton}
        onClick={toggleCollapse}
        aria-label={collapse ? "Expand menu" : "Collapse menu"}
      >
        <Image
          src="/hamburger.png"
          alt="collapse-icon"
          width={50}
          height={50}
          className={styles.collapseIcon}
        />
      </button>
      <button
        className={styles.newDisc}
        aria-label="Create new discussion"
        onClick={handleNewConversation}
      >
        <Image src="/more.png" alt="addIcon" width={23} height={23} />
        <span>{collapse ? "" : "Nouvelle Discussion"}</span>
      </button>
      {!collapse && (
        <div className={styles.sideContent}>
          <div className={styles.Overflow_Wrapper}>
            <span className={styles.label}>--------- Historique ---------</span>
            {user.conversations
              .filter((conv) => !conv.archived)
              .map((conv) => (
                <div key={conv.id} className={styles.flexbox}>
                  <div className={styles.Historique}>
                    <Link
                    href={`/main-page?${new URLSearchParams({
                      id: conv.id?.toString() || "",
                    }).toString()}`}
                    style={{whiteSpace:" nowrap",textOverflow: "ellipsis",overflow: "hidden"}}
                  >
                    <span className={styles.name}>{conv.name}</span>
                  </Link>
                    <button
                      className={styles.more}
                      onClick={() => handleMenuClick(conv.id || 0)}
                    >
                      <Image
                        src="/more (1).png"
                        alt="more"
                        width={30}
                        height={30}
                        ref={(el) => {
                          if (el) imgRefs.current[conv.id || 0] = el;
                        }}
                      />
                    </button>
                  </div>

                  {openMenus.find((menu) => menu.id === conv.id)?.isOpen && (
                    <ContextMenuConver
                      ref={(el) => {
                        if (el) menuRefs.current[conv.id || 0] = el;
                      }}
                      type={1}
                      user={user}
                      updateUser={updateUser}
                      id={conv.id}
                    />
                  )}
                </div>
              ))}
            <span className={styles.label}>---------- Archive -----------</span>
            {user.conversations
              .filter((conv) => conv.archived)
              .map((conv) => (
                <div key={conv.id} className={styles.flexbox}>
                  <div className={styles.Archive}>
                  <Link
                    href={`/main-page?${new URLSearchParams({
                      id: conv.id?.toString() || "",
                    }).toString()}`}
                    style={{whiteSpace:" nowrap",textOverflow: "ellipsis",overflow: "hidden"}}
                  >
                    <span className={styles.name}>{conv.name}</span>
                    </Link>
                    <button
                      className={styles.more}
                      onClick={() => handleMenuClick(conv.id || 0)}
                    >
                      <Image
                        src="/more (1).png"
                        alt="more"
                        width={30}
                        height={30}
                        ref={(el) => {
                          if (el) imgRefs.current[conv.id || 0] = el;
                        }}
                      />
                    </button>
                  </div>

                  {openMenus.find((menu) => menu.id === conv.id)?.isOpen && (
                    <ContextMenuConver
                      ref={(el) => {
                        if (el) menuRefs.current[conv.id || 0] = el;
                      }}
                      type={0}
                      user={user}
                      updateUser={updateUser}
                      id={conv.id}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
      <Link href="/about" className={styles.about}>
        <Image
          src="/interrogation-mark.png"
          alt="à propos"
          width={30}
          height={30}
        />
      </Link>
    </nav>
  );
};

export default Side;
