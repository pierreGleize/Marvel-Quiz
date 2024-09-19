import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "../Logout/Index";
import Quiz from "../Quiz/Index";
import { onAuthStateChanged } from "firebase/auth";
import { auth, user } from "../Firebase/FireBaseConfig";
import { getDoc } from "firebase/firestore";
import Loader from "../Loader/Index";

const Welcome = (props) => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user ? setUserSession(user) : navigate("/");
    });
    if (!!userSession) {
      const colRef = user(userSession.uid);
      getDoc(colRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const myData = snapshot.data();
            setUserData(myData);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return () => listener();
  }, [userSession]);

  return userSession === null ? (
    <Loader
      loadingMsg={"Authentificaton ..."}
      styling={{ textAlign: "center", color: "#FFFFFF" }}
    />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  );
};

export default Welcome;
