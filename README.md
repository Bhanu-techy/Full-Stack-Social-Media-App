# Title

***User-Post-management***

## Objective

   The goal is to build a Scalable Web App with Authentication & Dashboard using React.js for the frontend and a lightweight backend using Node.js/Express to facilitate API requests. The assignment must be completed within 3 days from the start date.


#### Core Features to Implement

***Frontend*** (Primary Focus)

- **Technology**: React.js (optionally Next.js)

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

    - **Database**:

        - Used **SQLite** for simplicity.
        - Design a normalized database schema for users and the sample entity.

## Completion Instructions

Dashboard Features

- **User Profile**:
    - Display user details fetched from the backend (e.g., name, email).

- **CRUD Operations**:
    - Allow users to add, view, update, and delete the sample entity (eg., post, caption).

- **Search and Filter UI**:
    - Implement a search bar and filters to query the entity (e.g., search tasks by title or filter by status).

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

## Submission Process

To ensure your submission is considered **valid**, you must submit the assignment **twice**:

1. **First Submission**: To the form shared by **NXTWave**.

    - Follow the instructions provided by NXTWave to submit your GitHub repository link and other required details.

2. **Second Submission**: To the company via email.

    - **Email Details**:

        - **Subject**: Frontend Developer Task

        - **Attachments**:
            - **resume**.
            - Link to your **GitHub repository** containing the frontend and backend code.
            - **API documentation** (e.g., Postman collection).
            - **Log files** (if applicable, e.g., server logs or error logs).
            - Optionally, include links to your portfolio, blog, or other relevant work.


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

---

## Tips for Success

- **Start Early**: Begin as soon as possible to avoid last-minute issues.
- **Test Thoroughly**: Test all features, including edge cases (e.g., invalid inputs, unauthorized access, or empty search results).
- **Document Clearly**: A well-written `README.md` and API documentation will make your project stand out.
- **Focus on Security**: Ensure secure JWT handling, password hashing, and input validation.
- **Keep the UI Simple**: Focus on functionality and responsiveness rather than complex designs. A clean, minimal UI is sufficient.

### Backend Source

For Backend created a seperate repository

- Github repo : https://github.com/Bhanu-techy/backendapi.git

- Backend Api : https://backendapi-yv7s.onrender.com

### backEnd endpoints 

1. POST ../login:

    For user login

    sample login details :

    {
        email : bhanu@gmail.com,
        password : bhanu@1234
    },
    {
        email : rahul@gmail.com,
        password : rahul@1234
    }


2. GET ../posts        : Retrive all posts with user id

3. GET ../user/:id      : Rerive user details
 
4. DELETE ../posts/:id  : Delete post permanantly

5. PUT ../posts/:id     : Edit post caption

6 POST ../posts         : Add post to user
