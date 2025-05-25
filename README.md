# 💬 Gen-AI Chat Application

A real-time chat application powered by **Gemini AI** and **WebSockets** that allows users to send and receive messages seamlessly with intelligent responses from an integrated AI bot.

🚀 **Live App:** [https://gen-ai-chi-smoky.vercel.app](https://gen-ai-chi-smoky.vercel.app)  
🛠 **Server API:** [https://genai-891g.onrender.com](https://genai-891g.onrender.com)

---

## 📽️ Demo Video

Watch the app in action on YouTube:  
[![Gen-AI Chat Demo](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

---

## 🔐 Sign In Credentials

Use the following demo accounts to explore:
 USER-1
 ```
email: user01@example.com

password: user01 
```

 USER-2
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
git clone https://github.com/your-username/gen-ai-chat-app.git
cd gen-ai-chat-app
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

Real-time messaging with Gemini AI replies

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

Made with ❤️ by [Uzer Nizamuddin Qureshi]

yaml
Copy code

---

### Notes:
- Replace `VIDEO_ID_HERE` in the YouTube thumbnail and link with your actual YouTube video ID.
- If your repo structure has `client/` and `server/` folders, the instructions above are ready to go. If not, adjust the paths.
- Replace `your-username` in the clone URL with your GitHub username.
- Optionally, you can add badges (Vercel deploy, license, etc.) at the top for more GitHub flair.



