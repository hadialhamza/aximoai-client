# 🌐 Aximo AI

### _AI Model Inventory • Marketplace • Management Platform_

**Aximo AI** is a premium, full-stack web application designed to manage, explore, and purchase AI models.
It features a robust **Admin & User Dashboard**, secure authentication, role-based access control, and a stunning, responsive UI powered by **React 19** and **Tailwind CSS v4**.

---

## 🚀 Live Links

| Link Type | URL |
| :--- | :--- |
| **🌍 Client Live** | [https://aximoai.netlify.app](https://aximoai.netlify.app) |
| **🛠️ Server Repo** | [https://github.com/hadialhamza/model-matrix-ai-server](https://github.com/hadialhamza/model-matrix-ai-server) |
| **💻 Client Repo** | [https://github.com/hadialhamza/b12-a10-new-client-repo](https://github.com/hadialhamza/b12-a10-new-client-repo) |

---

## ✨ Project Features

### 🎨 UI & UX
- **Modern & Premium Design**: Glassmorphism effects, smooth transitions, and a curated color palette.
- **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Dark/Light Mode**: Seamless theme switching using DaisyUI & Tailwind.
- **Animations**: Powered by Framer Motion for interactive feedback.

### 🔓 Public Features
- **Explore Models**: Browse a comprehensive inventory of AI models.
- **Advanced Search & Filter**: Filter by Framework, Dataset, Use-Case, or Keywords.
- **Detailed Model Views**: In-depth information for every model.

### 🔐 Authenticated Features (User & Admin)
- **Firebase Authentication**: Secure Login & Registration (Email/Password, Google).
- **Dashboard Access**:
    - **Admin Dashboard**: Manage users, oversee inventory, and view system stats.
    - **User Dashboard**: Track added models, view purchase history, and manage profile.
- **Model Management**:
    - **Add Model**: Submit new AI models to the marketplace.
    - **Update/Delete**: Manage your contributions securely.
- **Purchase System**: Integrated workflow for acquiring model licenses.
- **Secure Data Fetching**: JWT-based protection using Secure Axios Interceptors.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) (React Query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) + React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Native Driver)
- **Auth Verification**: Firebase Admin SDK

---

## 🔐 Authentication Flow

1.  **User Login**: Authenticates via Firebase (Client).
2.  **Token Generation**: Firebase returns a secure Access Token.
3.  **Secure Request**: Axios Interceptor attaches `Authorization: Bearer <token>` to headers.
4.  **Server Verification**: Backend verifies token validity using Firebase Admin SDK.
5.  **Access Granted**: User gains access to protected routes and data.

---

## 🏃‍♂️ Run Locally

### 1. Clone the Client Repository
```bash
git clone https://github.com/hadialhamza/b12-a10-new-client-repo.git
cd b12-a10-new-client-repo
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory and add your Firebase config:

```env
VITE_apiKey=your_api_key
VITE_authDomain=your_project_id.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project_id.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_API_URL=https://your-backend-url
```

### 4. Run the Development Server
```bash
npm run dev
```

---

## 📷 Screenshots

> _Add your project screenshots here to showcase the dashboard, home page, and features._

| Home Page | Dashboard |
| :---: | :---: |
| ![Home](https://placehold.co/600x400?text=Home+Page+Preview) | ![Dashboard](https://placehold.co/600x400?text=Dashboard+Preview) |

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
