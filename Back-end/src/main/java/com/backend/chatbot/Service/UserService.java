package com.backend.chatbot.Service;

import com.backend.chatbot.DTO.ConversationDTO;
import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.Entity.Conversation;
import com.backend.chatbot.Entity.Message;
import com.backend.chatbot.Entity.User;
import com.backend.chatbot.Repository.ConversationRepository;
import com.backend.chatbot.Repository.MessageRepository;
import com.backend.chatbot.Repository.UserRepository;
import com.backend.chatbot.mapper.ChatbotMapperImp;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    private final ChatbotMapperImp mapper;
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository,ConversationRepository conversationRepository,MessageRepository messageRepository){
        this.mapper = new ChatbotMapperImp();
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public UserDTO saveUser(UserDTO userDTO) {
        User user = mapper.toUser(userDTO);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return mapper.toUserDTO(savedUser);
    }

    public UserDTO getUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email).orElse(null);
        if (user == null) return null;

        Comparator<Message> comparatorM = Comparator.comparing(Message::getTimestamp);
        Comparator<Conversation> comparatorC = (c1, c2) -> {
            if (c1.getMessages().isEmpty()) return -1;
            if (c2.getMessages().isEmpty()) return 1;
            return c2.getMessages().getLast().getTimestamp().compareTo(c1.getMessages().getLast().getTimestamp());
        };

        user.getConversations().forEach(conversation -> {
            List<Message> sortedMessages = conversation.getMessages().stream()
                    .sorted(comparatorM)
                    .collect(Collectors.toList());
            conversation.setMessages(sortedMessages);
        });

        user.getConversations().stream()
                .filter(c -> {
                    if (c.getMessages().isEmpty()) return false;
                    Date lastMessage = c.getMessages().getLast().getTimestamp();
                    Calendar oneMonthAgo = Calendar.getInstance();
                    oneMonthAgo.add(Calendar.MONTH, -1);
                    return lastMessage.before(oneMonthAgo.getTime());
                })
                .forEach(conversation -> {
                    conversation.getMessages().forEach(m -> messageRepository.deleteById(m.getId()));
                    conversationRepository.deleteById(conversation.getId());
                });

        List<Conversation> sortedConversations = user.getConversations().stream()
                .filter(c -> {
                    if (c.getMessages().isEmpty()) return true;
                    Date lastMessage = c.getMessages().getLast().getTimestamp();
                    Calendar oneMonthAgo = Calendar.getInstance();
                    oneMonthAgo.add(Calendar.MONTH, -1);
                    return lastMessage.after(oneMonthAgo.getTime());
                })
                .sorted(comparatorC)
                .collect(Collectors.toList());

        user.setConversations(sortedConversations);

        return mapper.toUserDTO(user);
    }


    public UserDTO getUser(Long id) {
        User user = userRepository.findById(id).orElse(null);
        return mapper.toUserDTO(user);
    }
}
