<h1 align="center"> SKU CS Department Portal</h1>

<p align="center">
A full-stack web application developed for managing department activities such as student data, job notifications, results, and announcements.
</p>


Built using **React (Frontend)**, **Spring Boot (Backend)**, and **MySQL (Database)**.

**Features**
* Student & Staff Registration and Login
* Role-based dashboards (Student / Staff)
* Upload and view study materials
* Post and view results
* Job notifications and announcements
* Gallery section for department activities
* Responsive UI

**Tech Stack**
**Frontend**
* React.js

**Backend**
* Spring Boot
* Spring Web
* Spring Data JPA

**Database**
* MySQL

```
Project Structure
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
```     

**Setup Instructions**

**1. Clone the Repository**

git clone https://github.com/manjunathbabu-v/sku-cs-department-portal.git
cd sku-cs-department-portal

**2. Backend Setup (Spring Boot)**

cd backend
Update `application.properties`:
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080

**Run backend:**
mvn spring-boot:run

**3. Frontend Setup (React)**
cd frontend
npm install
npm run dev

**API Endpoints:**
POST /api/auth/register Register User
POST /api/auth/login Login User

**Key Implementation Details**

* React Context API used for authentication state management
* Role-based access control for Student and Staff
* REST APIs for communication between frontend and backend
* Layered architecture (Controller → Service → Repository)
* MySQL used for persistent data storage


## Screenshots

<img width="1911" height="868" alt="Screenshot 2026-04-20 203747" src="https://github.com/user-attachments/assets/d21ba66e-797a-4189-a9aa-c9058f4735f3" />
<p align="center"> Home page</p>
                                                               
<img width="1313" height="782" alt="Screenshot 2026-04-20 204604" src="https://github.com/user-attachments/assets/9be3be02-fea1-44a0-9fe7-dd1b286084d2" />
<p align="center">About page</p>
                                                                
<img width="938" height="736" alt="Screenshot 2026-04-20 204711" src="https://github.com/user-attachments/assets/20de4280-7054-4bee-b480-a5913e334223" />                                              
<p align="center">Faculty page</p>
                                                              
<img width="876" height="506" alt="Screenshot 2026-04-20 204743" src="https://github.com/user-attachments/assets/24d1dcdc-28ab-4d19-b58d-3da451e70808" />
<p align="center">Courses page</p>
                                                            
<img width="894" height="446" alt="Screenshot 2026-04-20 204816" src="https://github.com/user-attachments/assets/bb2d2a96-7688-4e72-bd65-9a7e76a436d4" />
<p align="center">Gallery page</p>
                                                              
<img width="1767" height="878" alt="Screenshot 2026-04-20 205701" src="https://github.com/user-attachments/assets/1eb5d4dc-a77f-4ff1-8b93-1b4b5b13093d" />
<p align="center">Login page</p>
<div align="center"><img width="437" height="807" alt="image" src="https://github.com/user-attachments/assets/c3975435-3c20-47b2-8cbe-6f542604cd74" /></div>
<p align="center">Register Page</p>
<img width="871" height="363" alt="image" src="https://github.com/user-attachments/assets/7b3217dc-5b5e-4875-a3db-78384b8d75f0" />
<p align="center">Student Dashboard</p>
<img width="848" height="393" alt="image" src="https://github.com/user-attachments/assets/ce0bce4b-5bb0-4c8b-a0c0-c23aa7d3323a" />
<p align="center">Staff Dashboard</p>

## Future Improvements

* Implement JWT-based authentication
* Add Spring Security with password encryption
* Admin dashboard
* Enhanced UI/UX

##  Author
**Manjunath Babu Vadlapalle**
GitHub: https://github.com/manjunathbabu-v

Gmail:manjunathbabuvit@gmail.com

Linked In: linkedin.com/in/manjunath-babu-vadlapalle-a67970402

##  License

This project is licensed under the MIT License.
