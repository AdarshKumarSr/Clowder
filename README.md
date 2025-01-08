# Clowder  

Clowder is an innovative e-learning platform developed using the MERN stack, designed to transform education through personalized learning experiences powered by AI. It offers features like chapter-based adaptive testing, AI-driven support, real-time code analysis, and motivational tools to enhance student engagement.  

---

## Features  
- **Personalized Learning**: Adaptive tests tailored to skill levels, focusing on weak areas before progressing.  
- **AI Compiler**: Analyze code complexity, visualize execution, and receive real-time AI suggestions.  
- **Student Progress Tracking**: Keep track of completed tests, scores, and areas of improvement.  
- **Community Engagement**: Collaborative learning through discussion boards and peer reviews.  
- **Reward System**: Earn points, badges, and exclusive content for consistent performance.  

---

## Tech Stack  

### **Frontend**  
- React.js  
- HTML/CSS  
- JavaScript  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB  

### **AI Integration**  
- AI tools for suggestions and learning optimization (e.g., ChatGPT, Gamma AI).  


---

## Installation  

### Prerequisites  
- Node.js  
- MongoDB  
- Git  

### Steps  
1. **Clone the Repository:**  
   ```bash  
   git clone https://github.com/AdarshKumarSr/Clowder.git  
   ```  

2. **Navigate to the Project Directory:**  
   ```bash  
   cd Clowder  
   ```  

3. **Set Up the Backend:**  
   ```bash  
   cd backend  
   npm install  
   ```  

4. **Configure Environment Variables:**  
   - Create a `.env` file in the `backend/` directory and add:  
     ```env  
     MONGO_URI=your-mongodb-uri  
     JWT_SECRET=your-secret-key  
     ```  

5. **Start the Backend Server:**  
   ```bash  
   node server.js  
   ```  

6. **Set Up the Frontend:**  
   ```bash  
   cd ../frontend  
   npm install  
   ```  

7. **Start the Frontend Application:**  
   ```bash  
   npm run dev  
   ```  

---

## Usage  
1. Open your browser and navigate to `http://localhost:3000`.  
2. Register or log in to access the platform.  
3. Explore learning modules, take adaptive tests, and track your progress.  

---

## Contribution  

1. Fork the repository.  
2. Create a feature branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Your message"  
   ```  
4. Push to your branch:  
   ```bash  
   git push origin feature-name  
   ```  
5. Create a pull request to the main repository.  

---

## License  
This project is licensed under the MIT License.  

---

## Contact  
- **Developer**: Adarsh Kumar  
- **Email**: srivastavaadarsh084@gmail.com  

---  

```
AI-SANDBOX
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ controllers
│  │  ├─ auth.controller.js
│  │  ├─ compiler.complexity.js
│  │  ├─ compiler.controller.js
│  │  ├─ course.controller.js
│  │  └─ visualization.controller.js
│  ├─ models
│  │  ├─ course.admin.js
│  │  └─ User.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ auth.js
│  │  ├─ compiler.js
│  │  ├─ complexity.js
│  │  ├─ course.js
│  │  └─ visualization.js
│  └─ server.js
├─ frontend
│  ├─ .env
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  └─ vite.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ api
│  │  │  └─ api.js
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ css
│  │  │  │  ├─ buttons.css
│  │  │  │  ├─ compiler.css
│  │  │  │  ├─ forms.css
│  │  │  │  ├─ global.css
│  │  │  │  ├─ Home.css
│  │  │  │  ├─ Login.css
│  │  │  │  └─ Registration.css
│  │  │  └─ react.svg
│  │  ├─ components
│  │  │  ├─ Footer.jsx
│  │  │  └─ Nav.jsx
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ pages
│  │     ├─ Compiler.jsx
│  │     ├─ Course.jsx
│  │     ├─ Home.jsx
│  │     ├─ Login.jsx
│  │     └─ Register.jsx
│  └─ vite.config.js
├─ package-lock.json
└─ README.md

```