import { Routes, Route, Navigate } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage.jsx";
import { Login } from "./pages/Login.jsx";
import { Register } from "./pages/Register.jsx";
import { PrivateRoute } from "./routes/privateRoute.jsx";
import { Cart } from "./pages/Cart.jsx";
import { ProductCreate } from "./pages/admin/ProductCreate.jsx";
import { ProductList } from "./pages/admin/ProductList.jsx";
import { OrderList } from "./pages/admin/OrderList.jsx";
import { AdminLayout } from "./components/layout/AdminLayout.jsx";
import { CategoryList } from "./pages/admin/CategoryList.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/carrinho" element={<Cart />} />

      <Route element={<PrivateRoute adminOnly />}>
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={<Navigate to="/admin/products" replace />}
          />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/create" element={<ProductCreate />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/categories" element={<CategoryList />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
