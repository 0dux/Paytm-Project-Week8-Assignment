import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="send" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
