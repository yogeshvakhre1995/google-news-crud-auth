import { Suspense } from "react";
//import { useDispatch } from "react-redux";
//import { bindActionCreators } from "redux";
import "./App.css";
//import { actionCreators } from "./store/action-creators";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loader/Loader.js";
import {
  BrowserRouter as Router,
  Route,  
  Routes,
} from "react-router-dom";
import SingIn from "./pages/SignIn/SingIn";
import Home from "./pages/Home/Home";
import PoductCreate from "./pages/Products/PoductCreate";
import SignUp from "./pages/SignUp/SignUp";
import ProductList from "./pages/Products/ProductListClass";
import ProductEdit from "./pages/Products/ProductEdit";
function App(props) {
  // eslint-disable-next-line
  //const [title, setTitle] = useState('banana');
  // eslint-disable-next-line
  //const [description ,setDescription] = useState("test discption");

  //const dispatch = useDispatch();
  //const { createProduct } = bindActionCreators(actionCreators, dispatch);

  return (
    <>
      <Router>
        <Suspense fallback={<Loader />}>
          <Layout>
            {/* <button
          className="btn btn-primary mx-2"
          onClick={() => {
            createProduct(title,description)
              .then((data) => {               
                console.log(data);
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          + ADD
        </button> */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/products" element={<ProductList />} />
              <Route exact path="/products/create" element={<PoductCreate/>} />
              <Route exact path="/products/:productId" element={<ProductEdit />} />
              <Route exact path="/sign-up" element={<SignUp />} />
              <Route exact path="/sign-in" element={<SingIn />} />
              <Route exact path="/forgot-password" element={<SignUp />} />
              <Route exact path="/reset-password" element={<SignUp />} />
              <Route exact path="/sign-out" element={<SingIn />} />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
