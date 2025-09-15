

# PocketWise

*Smarter Budgeting. AI-Powered Clarity. Financial Peace.*

PocketWise is a next-generation personal finance management application designed to simplify the way individuals track, analyze, and optimize their financial habits. Whether you are saving for a goal, managing expenses, or seeking AI-powered financial insights — PocketWise makes the process effortless and intuitive.

Developed with modern web technologies and deployed across both web and Android platforms via Capacitor, PocketWise combines the convenience of mobile with the power of intelligent, data-driven decision-making.

---

## Core Features

- *Transaction Logging*  
  Add, edit, and categorize income and expenses with ease.

- *Interactive Financial Visualization*  
  Dynamic charts and graphs (Pie, Bar, Monthly Summary) provide instant clarity.

- *AI Assistant*  
  Ask financial questions in natural language and receive contextual, AI-powered insights.

- *Secure Firebase Authentication*  
  Email/Password and Google login options, securely backed by Firebase.

- *Cross-Platform with Capacitor*  
  Seamless deployment to web and Android with a single codebase.

- *Budget CRUD System*  
  Full control to Create, Read, Update, and Delete financial entries.

---

## Technology Stack

| Layer        | Technology Used                              |
|--------------|----------------------------------------------|
| Frontend     | React.js, Tailwind CSS                       |
| Backend      | Firebase (Firestore Database + Authentication) |
| AI Layer     | OpenRouter (Mistral-7B model integration)    |
| Data Viz     | Recharts                                     |
| Mobile Build | Capacitor.js (Android deployment)            |
| Animations   | Framer Motion                                |

---

## Application Screenshots

| Login | Dashboard | AI Assistant |
|-------|-----------|--------------|
| ![Login](./App%20Sample%20Shots/login.jpeg) | ![Dashboard](./App%20Sample%20Shots/dashboard.jpeg) | ![AI Assistant](./App%20Sample%20Shots/pocketwiseAI.jpeg) |

| Budget Page | Mobile Dashboard | Mobile AI |
|-------------|------------------|-----------|
| ![Budget Page](./App%20Sample%20Shots/budgetpage.jpeg) | ![Mobile Dashboard](./App%20Sample%20Shots/mobiledashboard.jpeg) | ![Mobile AI](./App%20Sample%20Shots/Mobileai.jpeg) |

---

## Getting Started

### 1. Clone the Project
```bash
git clone https://github.com/princedelatrojan/PocketWise.git
cd pocketwise

2. Install Dependencies

npm install

3. Firebase Setup

1. Create a Firebase project at console.firebase.google.com


2. Enable:

Firestore Database

Authentication (Email/Password and Google)



3. Copy your Firebase configuration into:

/src/firebase/firebaseConfig.js



4. Run Locally

npm run dev


---

Running as an Android App

1. Install Capacitor

npm install @capacitor/core @capacitor/cli
npx cap init


2. Add Android Platform

npx cap add android


3. Build & Sync

npm run build
npx cap copy android


4. Open in Android Studio

npx cap open android

Run the app via a connected device or emulator.




---

Project Structure

├── src/
│   ├── components/     # Reusable UI widgets
│   ├── pages/          # Main screens (Home, Login, Register, Dashboard, AI, BudgetPage)
│   ├── utils/          # Firebase methods and AI functions
│   ├── firebase/       # Firebase config
│   ├── App.jsx         # Routing and authentication guards
│   └── main.jsx        # React entry point


---

Roadmap (Planned Features)

M-PESA Integration (Android)
Automatic SMS parsing for transactions.

Advanced AI Financial Coaching
Personalized saving advice, spending habit detection, and predictive budgeting.

UI/UX Enhancements
Improved accessibility, animations, and tablet support.

Data Export
Export financial summaries as PDF or CSV.

Theming & Personalization
Layout, color, and font customization.



---

Author & Contact

Paul Karanja
Department of Computer & Information Science
Catholic University of Eastern Africa
📧 princetrojan@proton.me


---

Keywords

React, Firebase, Finance Tracker, AI Budget Assistant, Personal Finance,
Mistral, Capacitor, Tailwind CSS, Firestore, Cross-platform,
Expense Tracker, AI + Budgeting, Android, Web App, Financial Planning


---

License

This project is licensed under the MIT License.
You are free to use, modify, and distribute — attribution is appreciated.


---

Contributions

Contributions are welcome!
If you would like to fix bugs or add new features, please open a Pull Request.


