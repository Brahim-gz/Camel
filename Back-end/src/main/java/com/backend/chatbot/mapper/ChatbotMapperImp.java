package com.backend.chatbot.mapper;

import com.backend.chatbot.DTO.ConversationDTO;
import com.backend.chatbot.DTO.MessageDTO;
import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.Entity.Conversation;
import com.backend.chatbot.Entity.Message;
import com.backend.chatbot.Entity.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;

@Service
public class ChatbotMapperImp {

    public UserDTO toUserDTO(User user) {
        if (user == null) return null;
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);
        List<ConversationDTO> conversations = user.getConversations().stream().map(this::toConversationDTO).toList();
        userDTO.setConversations(conversations);
        return userDTO;
    }

    public User toUser(UserDTO userDTO) {
        if (userDTO == null) return null;
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        List<Conversation> conversations = userDTO.getConversations().stream().map(this::toConversation).toList();
        user.setConversations(conversations);
        return user;
    }

    public MessageDTO toMessageDTO(Message message) {
        if (message == null) return null;
        MessageDTO messageDTO = new MessageDTO();
        BeanUtils.copyProperties(message, messageDTO);
        if (message.getConversation() != null) {
            messageDTO.setConversationId(message.getConversation().getId());
        }
        return messageDTO;
    }

    public Message toMessage(MessageDTO messageDTO) {
        if (messageDTO == null) return null;
        Message message = new Message();
        BeanUtils.copyProperties(messageDTO, message);
        if (messageDTO.getConversationId() != null) {
            Conversation conversation = new Conversation();
            conversation.setId(messageDTO.getConversationId());
            message.setConversation(conversation);
        }
        return message;
    }

    public ConversationDTO toConversationDTO(Conversation conversation) {
        if (conversation == null) return null;
        ConversationDTO conversationDTO = new ConversationDTO();
        BeanUtils.copyProperties(conversation, conversationDTO);
        List<MessageDTO> messages = conversation.getMessages().stream().map(this::toMessageDTO).toList();
        conversationDTO.setMessages(messages);
        if (conversation.getUser() != null) {
            conversationDTO.setUserId(conversation.getUser().getId());
        }
        return conversationDTO;
    }

    public Conversation toConversation(ConversationDTO conversationDTO) {
        if (conversationDTO == null) return null;
        Conversation conversation = new Conversation();
        BeanUtils.copyProperties(conversationDTO, conversation);
        List<Message> messages = conversationDTO.getMessages().stream().map(this::toMessage).toList();
        conversation.setMessages(messages);
        if (conversationDTO.getUserId() != null) {
            User user = new User();
            user.setId(conversationDTO.getUserId());
            conversation.setUser(user);
        }
        return conversation;
    }
}
