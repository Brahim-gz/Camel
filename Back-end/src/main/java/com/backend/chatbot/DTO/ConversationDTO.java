package com.backend.chatbot.DTO;

import com.backend.chatbot.Entity.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationDTO {
    private Long id;
    private String name;
    private Boolean archived;
    private List<MessageDTO> messages = new ArrayList<>();
    private Long userId;
}
