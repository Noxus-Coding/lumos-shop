import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { PrivateRoute } from "./routes/privateRoute.jsx";
import {Home} from "./pages/Home.jsx";

function App() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;