# Lumibyte Chat 

Lumibyte Chat is session base chat application that allows users to ask questions and get instant answers. Built as a modern web app using React, Vite, and Node.js, it provides a clean, responsive interface with support for dark mode. Users can start new chat sessions, continue previous conversations, and interact with mock responses.

## Features

- **Session-based chats** – Each conversation is stored with a unique session ID.
- **Interactive feedback** – Users can like or dislike AI responses.
- **Dynamic content** – Responses include text and tables.
- **Dark mode** – Toggle between light and dark themes.
- **Responsive design** – Works on desktop, tablet, and mobile.

## Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** In-memory (can be replaced with MongoDB)
- **API calls:** Axios
- **Icons:** React Icons 
  
### Getting Started

Follow these steps to set up and run Lumibyte Chat locally on your machine.

### Prerequisites

- Node.js (v18 or later recommended)
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/raj-008/lumibyte-chat-app.git
```

## Backend Setup

1. Navigate to the backend folder:
```bash
cd lumibyte-chat-app/backend
```
2. Install dependencies
```bash
npm install
```
3. Configure environment variables:
- Create a .env file in the backend folder.
- Copy the contents from .env.example and update the values as needed:
```bash
cp .env.example .env
```

4. Start the backend server:
```bash
npm run dev
```

## Frontend Setup
1. Navigate to the frontend folder:
```bash
cd lumibyte-chat-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Create a .env file in the frontend folder.
- Copy the contents from .env.example and update the values as needed:
```bash
cp .env.example .env
```
- Example .env variable:
```bash
VITE_API_URL=http://localhost:8000/api
```

4. Start the development server
```bash
npm run dev
```
- Open your browser and go to the URL displayed in the terminal (usually http://localhost:5173)

5. Build for production (optional)
```bash
npm run build
```
## Try the Following Questions for Mock Responses

Ask any of the following queries to see how the AI responds with mock data:

1. What are the top-selling products this month?  
2. Which region generated the highest revenue?  
3. Show monthly sales summary for 2025.  
4. Which sales rep achieved the highest target?  
5. Compare Q1 vs Q2 revenue growth.  
6. Show product-wise profit margins.  
7. List top 10 customers by purchase value.  
8. What is the average order value this year?  
9. Show daily sales trend for the past week.  
10. Which category had the lowest sales last quarter?  
11. Show refund or return statistics.  
12. Display sales by payment method.  
13. Which country contributed most to total revenue?  
14. Provide sales conversion rate by channel.  
15. What are the top-performing marketing campaigns?  
16. How many new customers were acquired each month?  
17. Show inventory vs sales comparison.  
18. Which salesperson has the highest customer satisfaction?  
19. Show yearly revenue forecast.  
20. Which products are frequently bought together?  

