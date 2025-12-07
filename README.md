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


UI Desktop Screens  :-

**
Login Screen :-
**
<img width="582" height="496" alt="image" src="https://github.com/user-attachments/assets/9ede3c3e-46d0-47b7-965e-5b651703cf87" />

**
Validation :-
**
<img width="422" height="514" alt="image" src="https://github.com/user-attachments/assets/7cc5ffe0-8cb6-44a9-a570-6355b7d3941f" />
Validation :-

<img width="519" height="482" alt="image" src="https://github.com/user-attachments/assets/b9aa35ce-e0d4-4000-9e0d-3a6facf1990b" />


Home Screen Landing Page : -

		Desktop View :-
		
		<img width="1459" height="618" alt="image" src="https://github.com/user-attachments/assets/f0e7dffb-a6b3-4c51-b7f4-fefe3a4beb1f" />
		
		Light Theme:-
		
		<img width="1470" height="555" alt="image" src="https://github.com/user-attachments/assets/ed10ab74-16c9-45f7-91f7-6fd421776ace" />
		
		
		Mobile View :-
		<img width="747" height="714" alt="image" src="https://github.com/user-attachments/assets/60ea7c5a-6073-4870-9b28-399cb0033916" />

		tab View :-
    <img width="707" height="574" alt="image" src="https://github.com/user-attachments/assets/6c3a5a1d-238f-4ab1-b4e6-dff17132b0a4" />

Task Allocation :-

	Desktop View

		<img width="1464" height="707" alt="image" src="https://github.com/user-attachments/assets/6fce5738-a6bd-41ae-b7db-8ea95328b910" />

Validatio :-

  <img width="1460" height="779" alt="image" src="https://github.com/user-attachments/assets/a0298810-b74d-4a7e-874a-333b7231c563" />

Mobile View

Queue

Desktop View :-

<img width="1468" height="512" alt="image" src="https://github.com/user-attachments/assets/af14ecbd-6f39-4828-bc30-11e5c1798cdc" />

Mobile View : -

<img width="248" height="427" alt="image" src="https://github.com/user-attachments/assets/6d5ed660-8162-4bd7-af6d-cb97dbc175f6" />

map

<img width="1454" height="672" alt="image" src="https://github.com/user-attachments/assets/a3aef428-5f5a-4e5b-b80d-e3f8a3e81adf" />

<img width="438" height="641" alt="image" src="https://github.com/user-attachments/assets/72f71750-8533-42df-be01-8735c5177976" />

<img width="653" height="689" alt="image" src="https://github.com/user-attachments/assets/096c6080-7876-400d-a0f8-292d0e788c56" />

<img width="513" height="675" alt="image" src="https://github.com/user-attachments/assets/4ff66d76-c284-4a60-89cf-6eef39649196" />

<img width="626" height="724" alt="image" src="https://github.com/user-attachments/assets/bb3bc895-e6aa-41f7-85ee-390175bf702c" />

<img width="717" height="724" alt="image" src="https://github.com/user-attachments/assets/d49cf2bd-78b7-4b0b-8c7b-95319c2df207" />






BOT STATUS

		Mobile View : -
		<img width="535" height="641" alt="image" src="https://github.com/user-attachments/assets/5008a73e-b3df-4708-bab4-bf94539f7153" />

		<img width="842" height="760" alt="image" src="https://github.com/user-attachments/assets/ae5d6ec4-cdc3-4f43-96cc-566133dab287" />

		Desktop View
<img width="1452" height="700" alt="image" src="https://github.com/user-attachments/assets/e66281bc-794a-451d-adcb-0447a9d20b14" />
	Dark Theme : -

<img width="1443" height="714" alt="image" src="https://github.com/user-attachments/assets/85a7ccd3-775d-4001-a457-aaa15e45c217" />




















