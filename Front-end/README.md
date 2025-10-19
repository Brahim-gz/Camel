<a href="https://github.com/Brahim-gz/Camel/blob/main/LICENSE"><img align="right" src="https://img.shields.io/badge/License-MIT-green.svg" alt="License: MIT" /></a>

<br/>
<br/>

# 🐪 Camel Front-end

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![CSS](https://img.shields.io/badge/CSS-3-purple?logo=css3)](https://developer.mozilla.org/docs/Web/CSS)

Camel Front-end is a modern web application built with Next.js that provides a comprehensive user interface for the Chatbot project. This application features a complete authentication system, an intuitive main workspace, and a collection of reusable components designed for scalability and maintainability.

### Key Features

- **Complete Authentication System**: Secure login and signup flow with JWT token handling
- **Email Verification**: One-time password (OTP) verification system using Nodemailer
- **Interactive Workspace**: Real-time messaging interface with context menus and user management

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: CSS Modules
- **Email Service**: Nodemailer for email verification

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9
- **Email Account** with app password support (Gmail, Outlook, etc.)

### Installation

#### 1) Clone and Install Dependencies
```bash
git clone <repository-url>
cd Front-end
npm install
```

#### 2) Environment Configuration
Create a `.env` file in the project root:

```bash
# Email Configuration for Nodemailer
EMAIL=your-email@gmail.com
PASS=your-app-password
```
`EMAIL`, `PASS` are used by Nodemailer to send verification emails.

#### 3) Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

---

## Project Structure

```
Front-end/
├── public/                     # Static assets
│   ├── camel_logo.png         # Brand assets
│   ├── camel_gif.gif          # Animations
│   └── *.png                  # UI icons and images
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── about/             # About page
│   │   ├── login/             # Authentication pages
│   │   ├── signup/            # Registration flow
│   │   │   └── email-verification/  # OTP verification
│   │   ├── main-page/         # Main application workspace
│   │   │   ├── Content.tsx    # Chat content area
│   │   │   ├── Side.tsx       # Sidebar navigation
│   │   │   ├── Input.tsx      # Message input
│   │   │   ├── header.tsx     # Application header
│   │   │   └── ContextMenu*.tsx  # Context menus
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   └── Components/            # Reusable components
│       ├── Loader.tsx         # Loading spinner
│       ├── popup.tsx          # Modal components
│       ├── Types.tsx          # TypeScript definitions
│       └── fetchs.tsx         # API utilities
├── next.config.mjs            # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```
