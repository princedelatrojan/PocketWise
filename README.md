
---

````markdown
# PocketWise

**Smarter Budgeting. AI-Powered Clarity. Financial Peace.**

PocketWise is a next-gen personal finance management app designed to simplify the way individuals track, analyze, and optimize their financial habits. Whether you're saving for a goal, managing expenses, or seeking AI-powered financial insights — PocketWise makes it effortless and intuitive.

Developed using modern web technologies and deployed across both web and Android platforms via Capacitor, PocketWise merges the convenience of mobile with the power of smart data-driven decisions.

---

##  Core Features

- ** Transaction Logging**  
  Add, edit, and categorize income and expenses with ease.

- ** Interactive Financial Visualization**  
  Dynamic charts and graphs (Pie, Bar, Monthly Summary) give users instant clarity.

- ** AI Assistant**  
  Ask natural-language financial questions. Get smart, contextual responses using OpenRouter’s LLMs.

- ** Secure Firebase Authentication**  
  Sign up/sign in via Email/Password or Google — securely backed by Firebase.

- ** Native Android App with Capacitor**  
  Your budgeting, on the go — no extra codebase.

- **📝Budget CRUD System**  
  Full control to Create, Read, Update, and Delete financial entries.

---

## 🛠️ Technology Stack

| Layer        | Tech Used                                     |
|--------------|-----------------------------------------------|
| Frontend     | React.js + Tailwind CSS                       |
| Backend      | Firebase (Firestore DB + Auth)                |
| AI Layer     | OpenRouter (Mistral-7B model integration)     |
| Data Viz     | Recharts                                      |
| Mobile Build | Capacitor.js (for native Android deployment)  |
| Animations   | Framer Motion                                 |

---

##  How to Get Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/pocketwise.git
cd pocketwise
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project on [console.firebase.google.com](https://console.firebase.google.com)
2. Enable:

    * Firestore Database
    * Authentication (Email/Password & Google)
3. Copy your Firebase config into `/src/firebase/firebaseConfig.js`

### 4. Run Locally

```bash
npm run dev
```

---

## 📱 Running as Android App

### 1. Install Capacitor

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
```

### 2. Add Android Platform

```bash
npx cap add android
```

### 3. Build & Sync

```bash
npm run build
npx cap copy android
```

### 4. Open in Android Studio

```bash
npx cap open android
```

Run the app via a connected device or emulator.

---

## 🧭 Project Structure

```bash
├── src/
│   ├── components/     # Reusable UI widgets
│   ├── pages/          # Main screens (Home, Login, Register, Dashboard, AI, BudgetPage)
│   ├── utils/          # Firebase methods and AI functions
│   ├── firebase/       # Firebase config
│   ├── App.jsx         # Routing and auth guards
│   └── main.jsx        # React entry point
```

---

##  Roadmap (Upcoming Features)

* ** M-PESA Integration (Android)**
  Auto-read and parse SMS messages for transaction automation.

* ** Advanced AI Financial Coaching**
  Personalized money-saving advice, bad habit detection, and predictive budgeting.

* ** UI/UX Redesign**
  Better accessibility, animations, and refined responsiveness for tablets and large screens.

* ** Data Exporting**
  Export financial summaries as PDF or CSV.

* ** Theming & Personalization**
  Users will be able to customize their layout, colors, and fonts.

---

## 👤 Author & Contact

**Paul Karanja**
Department of Computer & Information Science
Catholic University of Eastern Africa
📧 [princetrojan@proton.me](mailto:princetrojan@proton.me)

---

## 🏷️ Keywords

`React`, `Firebase`, `Finance Tracker`, `AI Budget Assistant`, `Personal Finance`,
`Mistral`, `Capacitor`, `Tailwind CSS`, `Firestore`, `Cross-platform`,
`Expense Tracker`, `AI + Budgeting`, `Android`, `Web App`, `Financial Planning`

---

## 📄 License

This project is licensed under the MIT License.
Free to use, modify, and improve — attribution is welcome.

---

## 🤝 Contributions

Want to improve PocketWise? Fix bugs? Add a feature?
PRs are welcome! Let’s build the smartest budgeting assistant together.
