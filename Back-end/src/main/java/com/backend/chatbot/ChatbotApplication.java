package com.backend.chatbot;

import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.Entity.Conversation;
import com.backend.chatbot.Entity.Message;
import com.backend.chatbot.Entity.User;
import com.backend.chatbot.Repository.ConversationRepository;
import com.backend.chatbot.Repository.UserRepository;
import com.backend.chatbot.Service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;
import java.util.List;

@SpringBootApplication
public class ChatbotApplication{

	//private final UserService userService;
	public ChatbotApplication(UserService userService) {}

	public static void main(String[] args) {
		SpringApplication.run(ChatbotApplication.class, args);
	}
}
