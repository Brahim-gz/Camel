<a href="https://github.com/Brahim-gz/Camel/blob/main/LICENSE"><img align="right" src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/></a>

# Chatbot Backend API

[![Java](https://img.shields.io/badge/Java-22-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://www.mysql.com/)

A robust Spring Boot backend application for the chatbot system with stateless authentication using JWT tokens. This application provides RESTful APIs for user management, conversation handling, and message processing.


## 🏗️ Architecture

The application follows a layered architecture pattern ensuring separation of concerns and maintainability:

<img width="254" height="339" alt="image" src="https://github.com/user-attachments/assets/f531a582-ec42-40a6-a712-363297c63940" />


## 📁 Project Structure

```
src/
├── java/com/backend/
│   ├── ChatbotApplication.java          # Main application class
│   ├── Controller/                      # REST API Controllers
│   │   ├── UserController.java         # User management endpoints
│   │   ├── ConversationController.java # Conversation management endpoints
│   │   └── MessageController.java      # Message handling endpoints
│   ├── DTO/                            # Data Transfer Objects
│   │   ├── UserDTO.java
│   │   ├── ConversationDTO.java
│   │   └── MessageDTO.java
│   ├── Entity/                         # Database Entities
│   │   ├── User.java
│   │   ├── Conversation.java
│   │   └── Message.java
│   ├── mapper/                         # Data Mapping
│   │   └── ChatbotMapperImp.java
│   ├── Repository/                     # Data Access Layer
│   │   ├── UserRepository.java
│   │   ├── ConversationRepository.java
│   │   └── MessageRepository.java
│   ├── Security/                       # Security Configuration
│   │   ├── SecurityConfig.java
│   │   ├── SecurityController.java
│   │   └── JpaUserDetailsService.java
│   └── Service/                        # Business Logic
│       ├── UserService.java
│       ├── ConversationService.java
│       └── MessageService.java
└── resources/
    └── application.properties          # Application configuration
```


## 🛠️ API Endpoints

### Authentication
- `POST /login` - User login (returns JWT token)
- `GET /auth` - Get current authentication information

### User Management
- `POST /api/user/signup` - Register new user
- `GET /api/user/{email}` - Get user by email
- `GET /api/user/getById/{id}` - Get user by ID
- `GET /api/user/exists/{email}` - Check if user exists

### Conversation Management
- `POST /api/conversation` - Create new conversation
- `PUT /api/conversation/{id}/{newName}` - Rename conversation
- `DELETE /api/conversation/{id}` - Delete conversation

### Message Management
- `POST /api/message` - Create new message


## 🗄️ Data Model

### User Entity
- **id**: Primary key (auto-generated)
- **firstName**: User's first name
- **lastName**: User's last name
- **email**: Unique email address
- **password**: Encrypted password
- **conversations**: List of user's conversations

### Conversation Entity
- **id**: Primary key (auto-generated)
- **name**: Conversation name
- **archived**: Archive status
- **user**: Associated user
- **messages**: List of conversation messages

### Message Entity
- **id**: Primary key (auto-generated)
- **content**: Message content (max 1000 characters)
- **resp**: Bot response (max 1000 characters)
- **timestamp**: Message timestamp
- **conversation**: Associated conversation


## 📝 Key Features

- **Stateless Authentication**: JWT-based authentication without server-side sessions
- **Automatic Data Cleanup**: Conversations older than 1 month are automatically cleaned up
- **Password Security**: BCrypt encryption for secure password storage
- **CORS Support**: Configured for frontend integration
- **Layered Architecture**: Clean separation of concerns
- **Data Mapping**: Efficient conversion between DTOs and Entities
