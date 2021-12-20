import { Route } from "react-router-dom";
import Header from "../route/Header";
import Footer from "../route/Footer";
import "bootstrap/dist/css/bootstrap.css";

import Board from "../component/board/Board";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import Product from "../component/product/Product";
import Cart from "../component/cart/Cart";
import History from "../component/history/History";
import SearchProduct from "./search/SearchProduct";
import { useState } from "react";
function App() {
  const [userId, setUserId] = useState("yu00mi97@gmail.com");

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/naverApi" component={SearchProduct} />
      <Route exact path="/board" component={Board} />
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />
      <Footer />
    </div>
  );
}

export default App;
