
# **RBAC Admin Dashboard**

## **Project Overview**

The **RBAC Admin Dashboard** is a simple yet functional Role-Based Access Control (RBAC) system designed to manage users, roles, and permissions efficiently. This web application allows administrators to:

- Manage users by adding, editing, and deleting their information.
- Assign roles to users.
- Define and manage roles with permissions (e.g., Read, Write, Delete).
- View and modify permissions associated with specific roles.

This dashboard is built using **React** (with JSX), styled with **Tailwind CSS**, and uses **JSON Server** for mock API simulation to handle CRUD operations on users, roles, and permissions.

---

## **Core Features**

1. **User Management:**
    - **View Users:** Display a list of users, showing their details such as name, email, and role.
    - **Create User:** Admins can add new users with specific roles.
    - **Edit User:** Admins can update the details of existing users (e.g., update roles or user status).
    - **Delete User:** Admins can remove users from the system.
    - **User Status Management:** Admins can toggle between active or inactive status for each user.

2. **Role Management:**
    - **View Roles:** Display a list of roles with associated permissions.
    - **Create Role:** Admins can create new roles with specific permissions.
    - **Edit Role:** Modify existing roles and assign or remove permissions as needed.
    - **Delete Role:** Remove roles that are no longer required.
  
3. **Permission Management:**
    - **View Permissions:** Admins can see the available permissions (e.g., Read, Write, Delete).
    - **Assign Permissions:** Permissions can be granted or revoked to specific roles.
    - **Edit Permissions:** Modify permission names or attributes as necessary.
  
4. **User Interface:**
    - Clean and responsive design, optimized for both desktop and mobile views.
    - Simple forms and input fields for managing users, roles, and permissions.
    - Error handling and validation for user inputs.

---

## **Technologies Used**

- **Frontend Framework:** React (JSX)
- **CSS Framework:** Tailwind CSS (for responsive and modular styling)
- **Mock API:** JSON Server (to simulate API for CRUD operations on users, roles, and permissions)
- **JavaScript Libraries:** React hooks (`useState`, `useEffect`) for managing state and user interactions.

---

## **Installation and Setup**

Follow the steps below to set up the project locally:

### **Prerequisites**
Ensure you have **Node.js** and **npm** installed. You can download Node.js from [here](https://nodejs.org).

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd RBAC-Admin-Dashboard
```

### **2. Install Dependencies**
Run the following command to install the required packages:
```bash
npm install
```

### **3. Set Up the Mock API (JSON Server)**
To run the mock API locally, follow these steps:
1. Install **JSON Server** globally:
   ```bash
   npm install -g json-server
   ```
2. Start the JSON Server with the provided `db.json` file:
   ```bash
   json-server --watch db.json --port 5000
   ```

### **4. Run the Application**
To start the React development server:
```bash
npm start
```

This will start the app on `http://localhost:3000`.

---

## **Folder Structure**

```
/RBAC-Admin-Dashboard
│
├── /public                # Public assets (index.html, images, etc.)
├── /src                   # Source code
│   ├── /components        # React components (Login, UserTable, RoleTable, etc.)
│   ├── /assets            # Static assets (e.g., images, icons)
│   ├── /styles            # Tailwind CSS and custom styles
│   ├── /services          # API service to interact with JSON Server
│   └── App.js             # Main React component
├── db.json                # Mock database for JSON Server (users, roles, permissions)
├── package.json           # Project metadata and dependencies
└── tailwind.config.js      # Tailwind CSS configuration
```

---

## **Project Functionality in Detail**

### **User Management**

- Admins can **view** all users in a table format with relevant information like email, roles, and status.
- Admins can **add** new users, **edit** existing users, and **delete** them.
- Users can be **assigned roles** from a predefined list, and their status can be toggled (Active/Inactive).

### **Role Management**

- Roles are displayed with their permissions, and the admin can create new roles, delete existing ones, and edit roles.
- Each role can have multiple **permissions** assigned to it (e.g., "read", "write", "delete").

### **Permissions Management**

- Permissions define the actions a user can perform, like **read**, **write**, or **delete**.
- Admins can assign or remove these permissions to/from roles. For example, an **admin role** may have full permissions (read, write, delete), while a **user role** may only have read permission.

---

## **Usage Example**

- **Admin Login:** The login page allows the admin to access the dashboard with a simple authentication mechanism (mocked for now).
- **Dashboard:** After login, the admin is directed to the main dashboard where they can manage users, roles, and permissions.
- **CRUD Operations:** Admins can perform CRUD operations on users and roles through user-friendly forms and tables.

---

## **Contributing**

Feel free to fork this project and submit pull requests. If you'd like to contribute, please:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a clear description of the changes.

---

## **License**

This project is open-source and available under the [MIT License](LICENSE).

---

### **Conclusion**

The **RBAC Admin Dashboard** is designed to showcase a simple yet effective Role-Based Access Control system. The application is highly customizable and can be expanded with additional features like actual authentication, API integration, or more complex permission management.
