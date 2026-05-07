import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Home } from "./pages/Home.jsx";
import { PrivateRoute } from "./routes/privateRoute.jsx";
import { Register } from "./pages/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}