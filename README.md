# Title

***Full Stack Social Media Application***

## Objective

A full stack social media web application where users can register, login, create posts, upload images, and manage their profile. The application provides a home feed displaying posts and allows users to edit or delete their own posts.

# Features

- User authentication (login)

- Home page displaying posts from users

- User profile showing user details and posts

- Create, edit, and delete posts

- Upload images from local system

- Store uploaded images in cloud storage

- Responsive user interface

- Persistent login using client storage

## Technologies Used

#### Core Features to Implement

***Frontend*** (Primary Focus)

- **Technology**: React.js 

- **Features**:

    - **Responsive Design**:
        - Used **CSS3** and responsive UI.
        - Ensured the app is usable on both desktop and mobile devices.

    - **Forms with Validation**:
        - Implemented client-side and server-side validation for forms (e.g., signup, login, entity creation).

        - Display clear error messages for invalid inputs. (invalid user , invalid password)


    - **Protected Routes**:
        - Restricted access to the dashboard, requiring users to log in (using JWT authentication).

        - Redirected unauthenticated users to the login page.
    
***Basic Backend*** (Supportive)

- **Technology**: Node.js/Express

- **Features**:

    - **APIs**:
        - **User Login**: Implement JWT-based authentication with password hashing (e.g., bcrypt).

        - **Profile Fetching/Updating**: Allow users to view and update their profile details.

        - **CRUD Operations**: Support Create, Read, Update, Delete operations for a sample entity (e.g., post, caption).

        - **Multer** : upload images

    - **Database**:

        - Used **SQLite** for simplicity.
        - Design a normalized database schema for users and the sample entity.

## Completion Instructions

Dashboard Features

- **User Profile**:
    - Display user details fetched from the backend (e.g., name, email).

- **CRUD Operations**:
    - Allow users to add, view, update, and delete the sample entity (eg., post, caption).

- **Logout Flow**:
    - Provided a logout button that clears the JWT and redirects to the login page.

#### Deliverables

1. **Frontend and Backend Project**:

    - Hosted on **GitHub** in a single repository (or separate repositories with clear instructions).
    - Include a `README.md` explaining:
        - Project setup instructions for both frontend and backend.
        - How to run the application locally.
        - API endpoints and their usage.

2. **Functional Authentication**:
    - Working signup, login, and logout flows with JWT authentication.

3. **Dashboard**:
    - A functional dashboard with profile display, CRUD operations, and search/filter functionality.
    
4. **API Documentation**:
    - Provide a **Postman collection** or other API documentation for all endpoints.


## Evaluation Criteria

Assignment has been evaluated based on the following:

1. **UI/UX Quality & Responsiveness**:
    - Clean, intuitive, and responsive design using TailwindCSS, Material UI, or Bootstrap.
    - User-friendly forms and error/success feedback.

2. **Integration Between Frontend & Backend**:
    - Seamless communication between the React frontend and Node.js backend.
    - Proper handling of API responses in the UI.

3. **Security Practices**:
    - Secure password hashing and JWT token validation.
    - Input sanitization to prevent security vulnerabilities.

4. **Code Quality & Documentation**:
    - Well-organized, modular code with clear comments.
    - Comprehensive `README.md` and API documentation.

5. **Scalability Potential**:
    - Modular project structure for easy feature additions.
    - Scalability strategies outlined (e.g., caching, microservices, or load balancing).

6.  **Image Upload**:
    Images uploaded from the user's local system are processed using Multer in the backend and then uploaded to Cloudinary. Cloudinary returns a secure image URL which is stored in the database and used to display the image in the application.
---


### Backend Source

- Backend Api : https://userpost-management.onrender.com/

### backEnd endpoints 

1. POST ../login:

    For user login

    User Credentials:

    ```

    {
        email : bhanu@gmail.com,
        password : bhanu@1234
    },
    {
        email : rahul@gmail.com,
        password : rahul@1234
    },
    {
        email : saikumar@gmail.com,
        password : saikumar@1234
    }

    ```


2. GET ../posts        : Retrive all posts with user id

3. GET ../user/:id      : Rerive user details
 
4. DELETE ../posts/:id  : Delete post permanantly

5. PUT ../posts/:id     : Edit post caption

6. POST ../posts         : Add post to user
