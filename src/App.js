import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/users/Users";
import UserDetail from "./pages/users/User";
import Products from "./pages/Products";
import AddUser from "./pages/users/AddUser";
import EditUser from "./pages/users/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Customers from "./pages/customers/Customers";
import CustomerDetail from "./pages/customers/Customer";
import AddCustomer from "./pages/customers/AddCustomer";
import EditCustomer from "./pages/customers/EditCustomer";
import MasterTransactions from "./pages/master_transaction/Master_transactions";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>          
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/:id" element={<UserDetail/>}/>
          <Route path="/users/add" element={<AddUser/>}/>
          <Route path="/users/edit/:id" element={<EditUser />}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/add" element={<AddProduct/>}/>
          <Route path="/products/edit/:id" element={<EditProduct/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/customers/:id" element={<CustomerDetail/>}/>
          <Route path="/customers/add" element={<AddCustomer/>}/>
          <Route path="/customers/edit/:id" element={<EditCustomer/>}/>
          <Route path="/master_transactions" element={<MasterTransactions/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
