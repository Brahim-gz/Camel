package com.backend.chatbot.Controller;

import com.backend.chatbot.DTO.ConversationDTO;
import com.backend.chatbot.Service.ConversationService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/api/conversation")
public class ConversationController {
    private final ConversationService conversationService;
    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("")
    public ConversationDTO createConversation(@RequestBody ConversationDTO conversationDTO) {
        return conversationService.saveConversation(conversationDTO);
    }

    @PutMapping("/{id}/{newName}")
    public ConversationDTO updateConversation(@PathVariable String id, @PathVariable String newName) {
        return conversationService.renameConversation(Long.parseLong(id),newName);
    }

    @DeleteMapping("/{id}")
    public void deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(Long.parseLong(id));
    }

}