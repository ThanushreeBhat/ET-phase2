# AI Money Mentor 💰🤖

AI Money Mentor is a modern, responsive React web application that combines deterministic financial calculations with the power of the Google Gemini LLM API. It provides Indian users with a categorized "Money Health Score", computes Financial Independence metrics, and generates highly personalized AI financial advice based on their specific profile and behavior.

![AI Money Mentor](https://img.shields.io/badge/Status-Completed-success.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-Built-646cff.svg?logo=vite)
![Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini-blue.svg)

---

## ✨ Features

- **Personalized Financial Health Score**: Calculates a comprehensive numeric score (0-100) based on six dimensions: Emergency Funds, Insurance Coverage, Investments, Debt-to-Income, Tax Planning, and active Retirement setups.
- **Financial Independence Engine**: Dynamically calculates your required FI Corpus and projects the definitive years required to achieve it based on monthly savings.
- **AI-Powered Advice**: Leverages the Google Gemini LLM via a secure `fetch()` layer to stream personalized, actionable, non-risky advice derived from the user's active inputs and computed metrics.
- **Persistent History Dashboard**: Employs browser LocalStorage to act as a mock-database, enabling authenticated users to construct, browse, and track their AI advice generation over time securely without costly backend hosting.
- **Premium Glassmorphic UI**: Architected atop a bespoke Vanilla CSS design system. It avoids heavy functional frameworks to maximize loading speed while retaining sleek micro-animations.

---

## 🛠️ Technology Stack

- **Frontend**: React (Functional Components) + Vite build tooling for ultra-fast HMR.
- **Logic Constraints**: Vanilla JavaScript (ES+).
- **Styling Specs**: Standard Vanilla CSS scoped globally in `index.css`.
- **Database/Persistence**: `window.localStorage` (No backend).
- **LLM Engine**: Google Generative AI REST Endpoints (`generativelanguage.googleapis.com`).

---

## 🚀 Setup & Installation

Follow these instructions to run the application locally on your machine.

### Prerequisites
- Node.js installed (v16.0 or higher recommended).
- A valid **Google Gemini API Key**.

### Getting Started

1. **Navigate to the Source**
   ```bash
   cd "d:/Hackathin/AI Money mentor"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure the AI Ecosystem**
   - Create a file named `.env` in the root of the project (next to `package.json` and `.env.example`).
   - Copy the formatting provided in `.env.example` and place your actual API Key:
   ```env
   VITE_GEMINI_API_KEY="YOUR_ACTUAL_GEMINI_API_KEY_HERE"
   ```

4. **Spin up Local Server**
   ```bash
   npm run dev
   ```
   > By default, Vite will start the frontend on `http://localhost:5173`. Open this URL in modern browsers (Chrome, Firefox, Safari) to begin.

---

## 🏗️ Folder Structure

```text
📦 AI Money Mentor
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Dashboard.jsx   # Renders historical data saved in localStorage
 ┃ ┃ ┣ 📜 Form.jsx        # Data ingestion and controlled hooks
 ┃ ┃ ┣ 📜 Login.jsx       # Mock Sign-up/Authentication gateway
 ┃ ┃ ┗ 📜 Result.jsx      # Resolves calculations and houses the AI output UI
 ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 ai.js           # API Bridge. Fetches strings directly from Gemini AI
 ┃ ┃ ┗ 📜 calc.js         # Core Deterministic Mathematic Engine
 ┃ ┣ 📜 App.jsx           # Master Orchestrator linking the components and states
 ┃ ┣ 📜 index.css         # Component styling definitions & color mapping
 ┃ ┗ 📜 main.jsx          # React DOM entry node
 ┣ 📜 .env.example        # Environment variable format layout
 ┗ 📜 package.json        # NPM dependencies mapping
```

---

## 🧠 Architectural Overview

### 1. The Javascript Engine (`calc.js`)
This deterministic script forms the robust basis of the app. LLMs are notoriously unreliable for strict exact float calculations. Thus, all Financial Independence arithmetic (e.g., `Required Corpus = 25 × annual expenses`) runs securely in pure Javascript, bounding the final results tightly.

### 2. The AI Injector (`ai.js`)
Once the React tree calculates the rigid numbers, it injects these results alongside the User's inputted profile into a carefully crafted prompt. The fetch payload specifically instructs the smart Gemini LLM to: *"Do NOT calculate numbers. Give exactly 4 personalized tips. Keep it simple and practical."* This hybrid approach maximizes both math safety and creative intelligence styling.

### 3. State Management (`App.jsx`)
State progresses sequentially across standard React component phases:
- **Phase 0 (Authorization)**: Validates Login credentials. Assigns the `currentUser` token dynamically. Guest bypass exists but restricts API privileges.
- **Phase 1 (Dashboard)**: The `useEffect` intercept grabs the specific JSON structure tagged `fin_advices_username`. Routes rendering.
- **Phase 2 (Form)**: Data collection mechanism rendering `src/components/Form.jsx`.
- **Phase 3 (Results)**: Visual layout mapping arrays, scores, and initiating the AI call while loading an asynchronous UI spinner.

---

## 💡 Usage Walkthrough

1. Check out the application endpoint.
2. Select your Authentication option. 
   - **Signup/Login**: Type a unique username and password. This builds your localized keying.
   - **Guest**: Forfeits AI insights but grants basic calculator privileges.
3. Observe the History Dashboard (if returning, see past records otherwise it will be blank).
4. Click **Start First Analysis** to open the Form constraints.
5. Populate your Financial details (e.g., "Working Professional", Age constraints, Income schemas).
6. Press the submit validation button to parse details into `App.jsx`.
7. Once on the `Result` view; witness the mapped Health Score metrics while the LLM resolves your final personalized insight block concurrently.
8. Click **Back to Dashboard** to ensure the array logic successfully propagated your newly saved insight payload natively into LocalStorage.
