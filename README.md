# FinanceTracker

A full-stack personal finance dashboard built with C# (.NET) and React. Track your income, expenses, and stock portfolio in one clean interface.

<img width="1810" height="759" alt="image" src="https://github.com/user-attachments/assets/036e7b82-1db8-4e42-8940-4ba3fba571aa" />


## Features

- **Dashboard overview** — see your balance, total income, and total expenses at a glance
- **Transaction management** — add, edit, and delete income and expense transactions
- **Stock lookup** — fetch live-style stock data by symbol (AAPL, NVDA, PLTR)
- **Clean dark UI** — modern, responsive design built with React
- **RESTful API** — fully featured backend with CRUD operations

## Tech Stack

**Backend**
- C# / .NET 10
- ASP.NET Core Minimal API
- CORS enabled for frontend communication

**Frontend**
- React
- JavaScript
- CSS

**Other**
- Docker support
- JSON-based stock data storage

## Project Structure
FinanceTracker/
├── FinanceTracker.Api/      # C# backend (ASP.NET minimal API)
│   ├── Models/              # Transaction and Stock models
│   ├── Program.cs           # API endpoints and configuration
│   └── stocks/              # JSON stock data files
├── frontend/                # React frontend
│   ├── src/                 # React components
│   └── public/              # Static assets
└── Dockerfile               # Container setup

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/transactions` | Get all transactions |
| POST | `/transactions` | Create a new transaction |
| PUT | `/transactions/{id}` | Update an existing transaction |
| DELETE | `/transactions/{id}` | Delete a transaction |
| GET | `/stocks/{symbol}` | Get stock data by symbol |

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js and npm
- Git

### Running the backend
```bash
cd FinanceTracker.Api
dotnet run
```

The API will start on `http://localhost:5XXX` (check your launch settings).

### Running the frontend
```bash
cd frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`.

## What I Learned

This project was built as a learning exercise to combine backend and frontend development. Key takeaways:

- Building RESTful APIs with ASP.NET minimal API
- Configuring CORS for cross-origin communication
- Connecting a React frontend to a C# backend
- Managing state and data fetching in React
- Structuring a full-stack project

## Future Improvements

- Add a database (SQLite or SQL Server) instead of in-memory storage
- Implement user authentication
- Add charts for spending breakdown by category
- Build a budget goals feature
- Connect to a real stock API for live data
