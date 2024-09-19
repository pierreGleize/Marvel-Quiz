import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../../styles/App.css";
import ErrorPage from "../ErrorPage/Index";
import Footer from "../footer";
import Header from "../Header";
import Landing from "../Landing";
import Login from "../Login/Index";
import SignUp from "../SignUp/Index";
import Welcome from "../Welcome/Index";
import ForgetPassword from "../ForgetPassword";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
