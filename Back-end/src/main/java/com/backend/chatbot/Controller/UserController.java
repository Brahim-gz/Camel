package com.backend.chatbot.Controller;

import com.backend.chatbot.DTO.ConversationDTO;
import com.backend.chatbot.DTO.UserDTO;
import com.backend.chatbot.Entity.User;
import com.backend.chatbot.Service.UserService;
import jakarta.websocket.server.PathParam;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/user")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public UserDTO signup(@RequestBody UserDTO userDTO) {
         return userService.saveUser(userDTO);
    }

    @GetMapping("/{email}")
    public UserDTO getUser(@PathVariable String email) {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/getById/{id}")
    public UserDTO getUserById(@PathVariable String id) {
        return userService.getUser(Long.parseLong(id));
    }

    @GetMapping("/exists/{email}")
    public Boolean exists(@PathVariable String email) {
        return userService.getUserByEmail(email) != null;
    }

}
