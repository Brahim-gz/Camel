import { Conversation, Message, User } from "./Types";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";

export async function getUser(email: string) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/user/exists/${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during get user:", error);
    throw error;
  }
}

export async function createUser(user: User) {
  try {
    const response = await fetch(`http://localhost:8081/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return response.status === 200;
  } catch (error) {
    console.error("Error during user creation:", error);
    throw error;
  }
}

export async function auth(email: string, password: string) {
  const params = new URLSearchParams();
  params.append("email", email);
  params.append("password", password);

  try {
    const response = await fetch("http://localhost:8081/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (response.status !== 200) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
}

export async function getUserDetails(jwt: string) {
  let email = decodeJwt(jwt).sub;
  try {
    const response = await fetch(`http://localhost:8081/api/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error during get user:", error);
    throw error;
  }
}

export async function createMessage(message: Message, id: number) {
  const jwt = Cookies.get("jwt") || "";
  try {
    const response = await fetch(`http://localhost:8081/api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        content: message.content,
        resp: message.resp,
        timestamp: message.timestamp,
        conversationId: id,
      }),
    });
    if (!response.ok) {
      return null;
    }
    return response.status === 200;
  } catch (error) {
    console.error("Error during message creation:", error);
    throw error;
  }
}

export async function createConversation(conv: Conversation, id: number) {
  const jwt = Cookies.get("jwt") || "";
  try {
    const response = await fetch(`http://localhost:8081/api/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
      body: JSON.stringify({
        name: conv.name,
        archived: conv.archived,
        userId: id
      }),
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error during conversation creation:", error);
    throw error;
  }
}

export async function renameConv(newName : String, id: number) {
  const jwt = Cookies.get("jwt") || "";
  try {
    const response = await fetch(`http://localhost:8081/api/conversation/${id}/${newName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt,
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.status === 200;
  } catch (error) {
    console.error("Error during conversation update:", error);
    throw error;
  }
}

export async function deleteConv(id : number) {
  try {
    const response = await fetch(`http://localhost:8081/api/conversation/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(`Failed to delete conversation: ${response.statusText}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error during conversation deletion:", error);
    return null;
  }
}