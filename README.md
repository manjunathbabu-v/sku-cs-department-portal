#  SKU CS Department Portal

A full-stack web application developed for managing department activities such as student data, job notifications, results, and announcements.

Built using **React (Frontend)**, **Spring Boot (Backend)**, and **MySQL (Database)**.

##  Features
* Student & Staff Registration and Login
* Role-based dashboards (Student / Staff)
* Upload and view study materials
* Post and view results
* Job notifications and announcements
* Gallery section for department activities
* Responsive UI

##  Tech Stack

 Frontend
* React.js

### Backend
* Spring Boot
* Spring Web
* Spring Data JPA

## Database
* MySQL

## *Project Structure*
frontend/
  ├── src/
  │   ├── components/
  │   ├── contexts/
  │   └── App.jsx

backend/
  ├── src/main/java/com/yourapp/
  │   ├── controller/
  │   ├── service/
  │   ├── repository/
  │   └── model/
  └── application.properties

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/manjunathbabu-v/sku-cs-department-portal.git
cd sku-cs-department-portal

### 2. Backend Setup (Spring Boot)

cd backend
Update `application.properties`:
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

Run backend:
mvn spring-boot:run

### 3. Frontend Setup (React)

cd frontend
npm install
npm run dev

## API Endpoints:
POST /api/auth/register Register User
POST /api/auth/login Login User

##  Key Implementation Details

* React Context API used for authentication state management
* Role-based access control for Student and Staff
* REST APIs for communication between frontend and backend
* Layered architecture (Controller → Service → Repository)
* MySQL used for persistent data storage


## Screenshots

<img width="1911" height="868" alt="image" src="https://github.com/user-attachments/assets/ac9cbe4b-9eb3-4938-a764-d90c25e67441" />
                                                               Home page
<img width="1313" height="782" alt="Screenshot 2026-04-20 204604" src="https://github.com/user-attachments/assets/fc211b39-6463-4758-9f9c-f45ed0bdd10f" />
                                                                About page
<img width="938" height="736" alt="image" src="https://github.com/user-attachments/assets/a46c3411-4fb0-4e99-bf74-8c70b895f058" />
                                                              Faculty page
<img width="876" height="506" alt="image" src="https://github.com/user-attachments/assets/1d0dc7f1-67a9-4ecd-be9f-3480e6434ed1" />
                                                            Courses page
<img width="894" height="446" alt="image" src="https://github.com/user-attachments/assets/56744987-5d16-42f4-8b34-dc16da2caf54" />
                                                              Gallery page
<img width="1174" height="845" alt="localhost_5173_login (1)" src="https://github.com/user-attachments/assets/b442ca63-7283-42b1-8b99-429bb523b278" />
                                                                Login page
<img width="437" height="807" alt="image" src="https://github.com/user-attachments/assets/c3975435-3c20-47b2-8cbe-6f542604cd74" />
                                                                Register Page
<img width="871" height="363" alt="image" src="https://github.com/user-attachments/assets/7b3217dc-5b5e-4875-a3db-78384b8d75f0" />
                                                              Student Dashboard
<img width="848" height="393" alt="image" src="https://github.com/user-attachments/assets/ce0bce4b-5bb0-4c8b-a0c0-c23aa7d3323a" />
                                                              Staff Dashboard

## 📈 Future Improvements

* Implement JWT-based authentication
* Add Spring Security with password encryption
* Admin dashboard
* Enhanced UI/UX

## 🙋‍♂️ Author
**Manjunath Babu Vadlapalle**
GitHub: https://github.com/manjunathbabu-v

## 📄 License

This project is licensed under the MIT License.
