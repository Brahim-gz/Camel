package com.backend.chatbot.Repository;

import com.backend.chatbot.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
