package com.backend.chatbot.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Conversation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Boolean archived;
    @ManyToOne
    private User user;
    @OneToMany(mappedBy = "conversation", fetch = FetchType.EAGER)
    private List<Message> messages = new ArrayList<>();

    public Conversation(Object o, String nouvelleConv, boolean b) {
        this.name = nouvelleConv;
        this.archived = b;
    }
}
