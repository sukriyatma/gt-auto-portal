### **Project Description: GT Auto Portal**

**GT Auto Portal Frontend** is a **Next.js**-based web application that provides an interactive interface for clients to monitor and manage their bot activity in real-time. The frontend connects to the **GT Auto Portal Service** backend to track bot performance, operational metrics, and activity. It integrates with **Firebase Cloud Messaging** to deliver real-time notifications and includes **Discord OAuth** for authentication, providing a seamless and secure login experience.

This project is intended as a **personal project** and is designed for clients to easily track bot activities through an intuitive dashboard with the help of real-time updates and data analytics.

### **Key Features:**

1. **Real-Time Bot Activity Monitoring**:
   - The frontend allows clients to monitor **bot activity** as it happens. It communicates with the backend service to fetch data regarding bot performance, operational metrics, and logs.
   - Users can access detailed dashboards, reports, and visualizations of their bot's performance.

2. **Push Notifications with Firebase Cloud Messaging**:
   - Integrated with **Firebase Cloud Messaging (FCM)**, the app sends **real-time push notifications** to users about critical events or updates related to their bots. These notifications ensure users are always informed and can take timely action if needed.
   - The frontend listens for incoming notifications and displays them promptly to the users.

3. **Discord OAuth Integration**:
   - Users can log in using **Discord OAuth** for a secure and convenient authentication process. This integration allows users to sign in using their **Discord** credentials, simplifying the authentication flow and making it easier for bot users to access their accounts.

4. **Next.js for a Seamless UI**:
   - Built using **Next.js**, the frontend provides a responsive and performant user interface that displays real-time data and analytics.
   - The app supports **SSR** (Server-Side Rendering) and **Static Site Generation** (SSG) for enhanced performance and SEO.

5. **Process Management with PM2**:
   - The app is managed using **PM2**, ensuring that the frontend stays online, can be clustered for high availability, and restarts automatically if needed.
   - This approach ensures minimal downtime and optimal performance for users accessing the dashboard.

### **Technologies Used:**

- **Next.js**: A React framework for building the frontend, providing SSR/SSG, API routes, and fast performance.
- **Firebase Cloud Messaging (FCM)**: For sending real-time push notifications to users both background and foreground.
- **Discord OAuth**: For enabling secure authentication through Discord.
- **PM2**: A process manager for Node.js applications, ensuring that the frontend remains online and performs efficiently.
- **React**: The underlying library for building the user interface, used in conjunction with Next.js for SSR/SSG.
- **Tailwind CSS** (optional): A utility-first CSS framework to build the responsive frontend quickly.
- **Axios**: For making API requests to the backend service.

### [Backend-service repository](https://github.com/sukriyatma/gt-auto-portal-service)
---


### **Running the GT Auto Portal Frontend Locally**

Follow these steps to run the **GT Auto Portal Frontend** locally:

#### Prerequisites:
- **Node.js** installed (v16 or above recommended)
- **PM2** installed globally (for process management)
- **Firebase Project** credentials (for real-time notifications)
- **Discord OAuth credentials** (for authentication)

#### Steps to Run Locally:

1. **Clone the Repository**:
   - Clone the frontend repository from GitHub.
   ```bash
   git clone https://github.com/sukriyatma/gt-auto-portal.git
   cd gt-auto-portal
   ```

2. **Create a `.env.development.local` File**:
   - Create and configure your `.env.development.local` file with the appropriate Firebase and Discord OAuth credentials.
   ```bash
   AUTH_SECRET=next-auth-secret 
   BACKEND_HOST=backend-service-url

   FIREBASE_API_KEY=your-firebase-api-key
   FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   FIREBASE_APP_ID=your-firebase-app-id
   FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id

   DISCORD_CLIENT_ID=your-discord-client-id
   DISCORD_CLIENT_SECRET=your-discord-client-secret
   ```

3. **Install Dependencies**:
   - Install the required dependencies for the frontend:
   ```bash
   npm install
   ```

4. **Start the Application Locally**:
   - Run the application in development mode:
   ```bash
   npm run dev
   ```

5. **Build the Application**:
   - To create an optimized production build of the frontend:
   ```bash
   npm run build
   ```

6. **Start the Application with PM2**:
   - To start the frontend application using PM2 for process management:
   ```bash
   pm2 start ecosystem.config.js --env development
   ```

7. **Access the Application**:
   - The app will be running at `http://localhost:3000` by default, where you can log in with Discord and view the dashboard and push notifications in real-time.

---

### **Conclusion**
The **GT Auto Portal Frontend** provides a user-friendly and efficient interface to track bot activity and performance in real-time. With **Firebase Cloud Messaging** for push notifications, **Discord OAuth** for secure authentication, and process management with **PM2**, this project demonstrates a scalable, interactive solution for bot management. This project was developed as a **personal project** and showcases how various modern technologies can be integrated to create a seamless experience for users.
