package com.backend.chatbot.Service;

import com.backend.chatbot.DTO.ConversationDTO;
import com.backend.chatbot.Entity.Conversation;
import com.backend.chatbot.Repository.ConversationRepository;
import com.backend.chatbot.mapper.ChatbotMapperImp;
import org.springframework.stereotype.Service;

@Service
public class ConversationService {
    private final ChatbotMapperImp chatbotMapperImp;
    private final ConversationRepository conversationRepository;

    public ConversationService(ChatbotMapperImp chatbotMapperImp, ConversationRepository conversationRepository) {
        this.chatbotMapperImp = chatbotMapperImp;
        this.conversationRepository = conversationRepository;
    }

    public ConversationDTO saveConversation(ConversationDTO conversationDTO) {
        Conversation conversation = chatbotMapperImp.toConversation(conversationDTO);
        conversationRepository.save(conversation);
        return chatbotMapperImp.toConversationDTO(conversation);
    }

    public ConversationDTO renameConversation(Long conversationId, String newName) {
        Conversation conversation = conversationRepository.findById(conversationId).orElse(null);
        if (conversation == null) return null;
        conversation.setName(newName);
        conversationRepository.save(conversation);
        return chatbotMapperImp.toConversationDTO(conversation);
    }
    public void deleteConversation(Long id) {
        conversationRepository.deleteById(id);
    }
}
