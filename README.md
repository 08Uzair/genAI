# 💬 Gen-AI Chat Application

A real-time chat application powered by **Gemini AI** and **WebSockets** that allows users to send and receive messages seamlessly with intelligent responses from an integrated AI bot.

🚀 **LIVE APPLICATION LINK :** [https://gen-ai-chi-smoky.vercel.app](https://gen-ai-chi-smoky.vercel.app)  

🛠 **SERVER API LINK :** [https://genai-891g.onrender.com](https://genai-891g.onrender.com)



## 🔐 Sign In Credentials

Use the following demo accounts to explore:

🧑🏻‍🦱 USER-1
 ```
email: user01@example.com

password: user01 
```

🧑🏻 USER-2
 ```
email: user02@example.com

password: user02 
```



---

## 🧰 Tech Stack

### 🔗 Frontend:
- **Next.js**
- **Tailwind CSS**
- **Redux Toolkit** (for state management)
- **WebSockets** (for real-time chat)
- **Gemini AI** (Google’s LLM for intelligent replies)

### 🌐 Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **WebSockets**

---

## 📦 Installation & Setup

> Follow the steps below to get both client and server running locally.

---

### 📁 Clone the repository:

```bash
git clone "https://github.com/08Uzair/genAI.git"
cd genAI
```
🖥️ Setup Server
1. Navigate to the server directory:
```cd server```
2. Install dependencies:
```
bash
Copy code
npm install
```

3. Create a .env file in the server root with the following:
```
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```
bash
Copy code
npm start
```

💻 Setup Client
1. Navigate to the client directory:
```
bash
Copy code
cd ../client
```
2. Install dependencies:
```
bash
Copy code
npm install
```
3. Create a .env.local file in the root with:
```
env
Copy code
NEXT_PUBLIC_API_URL=https://genai-891g.onrender.com
```
4.Run the development server:
```
bash
Copy code
npm run dev
```
📸 Screenshots

1. SIGN IN
![Uploading Screenshot 2025-05-26 070227.png…]()

2. REGISTER
![Screenshot 2025-05-26 070258](https://github.com/user-attachments/assets/597fddcf-e6ad-47c9-9398-28df0d872686)

3. HOME PAGE
![Screenshot 2025-05-26 070449](https://github.com/user-attachments/assets/fc1f00ef-4d31-4931-ae45-c0beb0594b7e)

4. INBOX
![Screenshot 2025-05-26 070411](https://github.com/user-attachments/assets/d7d3531a-d691-4e05-a581-41a4b64770b1)


📬 Features
🧠 AI-generated responses using Gemini

⚡ Real-time bi-directional messaging (WebSocket)

🔐 Secure authentication system (JWT)

🧾 Chat history storage with MongoDB

✨ Clean and responsive UI

🙌 Contributing
Fork this repository

Create your feature branch: git checkout -b feature/awesome-feature

Commit your changes: git commit -m 'Add awesome feature'

Push to the branch: git push origin feature/awesome-feature

Open a Pull Request

📄 License
This project is licensed under the MIT License.

Made with ❤ by Uzer Nizamuddin Qureshi


---




