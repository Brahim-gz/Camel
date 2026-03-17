<a href="https://github.com/Brahim-gz/Camel/blob/main/LICENSE"><img align="right" src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" /></a>

<br/>
<br/>

# 🐪 Camel

Camel is a chatbot platform built on the LLAMA 2 family, focused on reducing harmful biases particularly on topics related to the Palestinian cause. The project carefully curated dataset samples and applied fine-tuning techniques to adapt the base model and mitigate known model biases. The resulting fine-tuned model is integrated with a web application that provides user registration, conversation management for interacting with the model.

## Features ✨

 🔐 User registration, login and JWT-based authentication \
 📧 Email OTP verification using Nodemailer \
 💬 Create, rename and delete conversations \
 🧩 Layered, maintainable backend architecture (Controllers, Services,  Repositories, DTOs) \
 ⚛️ Reusable, component-driven frontend built with Next.js and TypeScript

## Tech Stack 🛠️

- Frontend: Next.js, TypeScript, CSS Modules
- Backend: Java, Spring Boot, Maven
- Database: MySQL
- Email: Nodemailer
- Model & Dataset: Hosted on Hugging Face

## Project Structure


```
Front-end/
├── src/app/             # pages: login, signup, main workspace, OTP verification
├── Components/         # UI components and fetch utilities

Back-end/
├── src/main/java/com/backend/
│   ├── Controller/      # REST endpoints (User, Conversation, Message)
│   ├── Service/         # Business logic
│   ├── Repository/      # JPA Repositories
│   ├── Entity/          # JPA Entities
│   └── Security/        # JWT, user details, security config

Dataset/                # Notebooks and scraping/formatting scripts
Model/                  # Fine-tuning notebooks
```

## Installation & Setup
Prerequisites:

- Node.js >= 18, npm >= 9
- Java 17+
- Maven
- MySQL database

1) Clone the repository

```bash
git clone https://github.com/Brahim-gz/Camel.git
cd Camel
```

2) Backend

- Configure the database and other properties in `Back-end/src/main/resources/application.properties`, values to set:

  - `spring.datasource.url`
  - `spring.datasource.username`
  - `spring.datasource.password`

- From the `Back-end` folder run:

```bash
# Unix / macOS
./mvnw spring-boot:run
# Windows
mvnw.cmd spring-boot:run
```

3) Frontend

```bash
cd Front-end
npm install
# create a .env file with email settings for OTP
npm run dev
```

## Model & Dataset 📚

- Trained model: [Camel-7b-chat-awq](https://huggingface.co/bragour/Camel-7b-chat-awq)
- Dataset:  [Palestinian_Truth_English](https://huggingface.co/datasets/bragour/Palestinian_Truth_English)


## Improvements 🚧

- The project is under active development.
- Improve frontend responsiveness.
- Improve dataset formatting and cleaning.
- Retrain the model with better preprocessing and cleaner datasets.

---

<br/>
<p align=center><b>📈 This project is still open to future improvements and ongoing development. 📈</b></p>

