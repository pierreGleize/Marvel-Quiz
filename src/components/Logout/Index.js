import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/FireBaseConfig";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Logout = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      console.log("deconexion");
      signOut(auth)
        .then(() => {
          console.log("vous ete deconnecté");

          navigate("/");
        })
        .catch((error) => {
          console.log("oups nous avons une erreur");
        });
    }
  }, [checked, navigate]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span
          className="slider round"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Déconnexion"
        ></span>
      </label>
      <Tooltip id="my-tooltip" place="left" effect="solid" />
    </div>
  );
};

export default Logout;
