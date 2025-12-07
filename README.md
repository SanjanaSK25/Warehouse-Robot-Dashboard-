Warehouse Robot Management Dashboard

A fully responsive **Warehouse Robot Management Dashboard** built using **React.js, Redux Toolkit, Recharts, and SVG rendering**.  
This project simulates real-time warehouse automation, including robot monitoring, task allocation, analytics, and live map tracking.

---

## 🚀 How to Run the Project Locally

### 1. Clone the Repository
```bash
git clone https://github.com/SanjanaSK25/Warehouse-Robot-Dashboard-.git
cd warehouse-ui

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev

4. Open in Browser
http://localhost:5173

**
1. System Architecture
**
The system follows a component-based frontend architecture built using React.js and Redux
Toolkit.
Architecture Layers:
- UI Layer: React Components and Pages
- State Layer: Redux Store & Slices
- Data Visualization: Recharts
- Routing: React Router
User Interface → React Components → Redux Store → State Slices

**
🛠 Tech Stack
**
| Layer              | Technology       |
| ------------------ | ---------------- |
| Frontend           | React.js         |
| State Management   | Redux Toolkit    |
| Routing            | React Router DOM |
| Charts & Analytics | Recharts         |
| Styling            | CSS              |
| Build Tool         | Vite             |
| Version Control    | Git & GitHub     |

**
🧩 Component Architecture
**
Project Folder :- 
src/
├── app/
│   ├── store.js
│   └── rootReducer.js
│
├── components/
│   ├── Layout.jsx
│   └── Navbar.jsx
│
├── features/
│   ├── analytics/
│   │   └── components/AnalyticsCharts.jsx
│   ├── auth/
│   │   ├── authSlice.js
│   │   └── components/LoginForm.jsx
│   ├── bots/
│   │   ├── botsSlice.js
│   │   └── components/
│   │       ├── BotCard.jsx
│   │       └── BotList.jsx
│   ├── tasks/
│   │   └── tasksSlice.js
│
├── pages/
│   ├── HomeDashboard.jsx
│   ├── BotStatusPage.jsx
│   ├── TaskAllocationPage.jsx
│   ├── TaskQueuePage.jsx
│   ├── MapPage.jsx
│   └── LoginPage.jsx
│
├── routes/
│   └── AppRouter.jsx
│
├── styles/
│   └── global.css
│
└── main.jsx

Image :-  <img width="1365" height="710" alt="image" src="https://github.com/user-attachments/assets/1a97650e-7bbb-48fe-be7c-e64ce0c54738" />

**
Data Flow Explanation :-
**
		User performs an action (allocate task, view bot, etc.)
		Action is dispatched to Redux Store
		Corresponding Slice Reducer updates the state
		Updated state is reflected across connected components
		UI updates automatically using React re-rendering

Figma Design Link :--

**
UI / UX Decisions
**
		Card-based layout for clear robot visualization
		Color-coded statuses:
		   Green → Active
		   Yellow → Charging
		   Red → Error / Busy
		Auto-refresh UI every 10 seconds for real-time simulation
		Minimal clutter design for fast operator decision making
		Live charts for analytics clarity
		Clear navigation bar for easy page switching
**
State Management Design
**
Redux Toolkit is used for centralized state management.
Slices used:
- botsSlice
- tasksSlice
- authSlice
Benefits:
- Predictable updates
- Easy debugging
- Scalable design

**
👩‍💻 Author
**SanjanaSK25
GitHub: https://github.com/SanjanaSK25

Login Screen :- ![Uploading image.png…]()

