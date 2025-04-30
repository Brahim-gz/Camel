package com.backend.chatbot.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.xml.crypto.dsig.spec.XSLTTransformParameterSpec;
import java.util.Date;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Message {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 1000)
    private String content;
    @Column(length = 1000)
    private String resp;
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    @ManyToOne
    private Conversation conversation;

}
