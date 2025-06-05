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

# Clowder Course API and Frontend Setup
### June 5, 2025
### I have Created the RestFull ApI for the Clowder Course Which is Currrently Hardcoded. Because I am checking the API with the Frontend.It is just and Initial Setup and the data flow is correct. According to our Requirements 
### new files names are : course.model.js , course.controller.js, course.routes.js.
## And the new API is http://localhost:5173/course/intro-to-js/page/1 this is Dynamic API which will update acc to page numbers. 

# In frontend 
### I have created Course folder in pages/Course inside this I have created Course.jsx file which will render the all courses . user can click on the course Name then move to the Course page where he can see the all chapters of the course and can click on the chapter to start the chapter.

### New API http://localhost:5173/course/intro-to-js/page/1 this is in the fronendend CoursePages.jsx file which is under Pages .  Raw file http://localhost:5000/api/course/${courseId}/page/${pageNumber}..

### I have also updated the Readme , and the login , Register and Navbar files.
### Added the Preloader too.. 

### I request to my team members to please verify it and start working on your respective tasks.
# Thank you   
```