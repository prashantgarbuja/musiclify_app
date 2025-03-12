# **Musiclify**

**Musiclify** is a beautiful Spotify wrapper designed to showcase your musical interests and listening habits through elegant visualizations. The app allows users to explore their **MBTI (Myers-Briggs Type Indicator)** based on their music preferences, revealing their unique musical personality and listening patterns.

---

## **Features**

- **Spotify Integration**:  
  Seamlessly integrates with Spotify to fetch your listening history, playlists, and favorite tracks.

- **MBTI Analysis**:  
  Analyzes your music preferences to generate an **MBTI profile** that reflects your unique musical personality.

- **Visualizations**:  
  Beautiful charts and graphs to display your listening trends, top genres, artists, and more.

- **User Profile**:  
  Create and manage a personal profile to track your listening stats and MBTI analysis.

---

## **Technologies Used**

- **Frontend**:  
  - **React**
  - **Tailwind CSS**
  - **Chart.js** for visualizations
  - **shadcn-ui** for UI components

- **Backend**:  
  - **Spring Boot (Java)**
  - **Spotify API integration**
  - **JWT Authentication**
  - **Spring Security**

---

## **How to Run the Project Locally**

### **Prerequisites**

- **Java 11** or higher
- **Node.js** & **npm**

---

### **Backend (Spring Boot)**

1. Clone the repository:  
   ```sh
   git clone <YOUR_GIT_URL>
   cd Musiclify-backend

2. Build and run the backend:
    ```sh
    ./mvnw spring-boot:run

3. The backend will be running at http://localhost:8080.

### **Frontend (React)**

1. Navigate to the frontend directory:
    ```sh
    cd Musiclify-frontend
    
2. Install the dependencies:
    ```sh
    npm install

3. Run the development server:
    ```sh
    npm run dev

4. The frontend will be running at http://localhost:3000.

## **Deployment**
To deploy the application, follow these steps:
1. Build the backend and frontend as production-ready apps.
2. Deploy the backend on your preferred hosting (e.g., Heroku, AWS, or Azure).
3. Host the frontend on a platform like Netlify or Vercel.

## **Contributing**
Feel free to fork the repository and submit pull requests. To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch

3. Commit your changes:
    ```sh
    git commit -m "Add new feature"
4. Push to your branch:
    ```sh
    git push origin feature-branch
5. Open a pull request.

## **License**
This project is licensed under the MIT License - see the LICENSE file for details.