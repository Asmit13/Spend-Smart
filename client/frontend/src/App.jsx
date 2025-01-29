import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/home"
import Signup from './components/auth/signup';
import Login from './components/auth/login';
import PrivateRoute from './components/auth/privateroute';
import {Dashboard} from "./components/dashboard"
import AddTransaction from "./components/addtransaction"
import HeaderComponent from "./components/header"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />

        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="text-white bg-[#282c34] min-h-screen flex items-center justify-center">
                <h1 className="text-4xl">Welcome to the Protected Page!</h1>
              </div>
            </PrivateRoute>
          }
        />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
