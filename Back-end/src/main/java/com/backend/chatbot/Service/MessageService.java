package com.backend.chatbot.Service;

import com.backend.chatbot.DTO.MessageDTO;
import com.backend.chatbot.Entity.Message;
import com.backend.chatbot.Repository.MessageRepository;
import com.backend.chatbot.mapper.ChatbotMapperImp;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final ChatbotMapperImp mapper;
    private final MessageRepository messageRepository;

    public MessageService(ChatbotMapperImp mapper, MessageRepository messageRepository) {
        this.mapper = mapper;
        this.messageRepository = messageRepository;
    }

    public MessageDTO saveMessage(MessageDTO messageDTO) {
        Message message = mapper.toMessage(messageDTO);
        messageRepository.save(message);
        return  mapper.toMessageDTO(message);
    }
}
