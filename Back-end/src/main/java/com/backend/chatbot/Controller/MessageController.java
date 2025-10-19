package com.backend.chatbot.Controller;

import com.backend.chatbot.DTO.MessageDTO;
import com.backend.chatbot.Service.MessageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/message")
public class MessageController {
    private final MessageService messageService;
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("")
    public MessageDTO CreateMessage(@RequestBody MessageDTO messageDTO) {
        return messageService.saveMessage(messageDTO);
    }
}
