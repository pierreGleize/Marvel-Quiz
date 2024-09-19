import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [btn, setBtn] = useState(false);
  const refWolvenrine = useRef(null);

  useEffect(() => {
    refWolvenrine.current.classList.add("startingImg");
    setTimeout(() => {
      refWolvenrine.current.classList.remove("startingImg");
      setBtn(true);
    }, 1000);
  }, []); //Dépendance vide pour que la fonction s'éxecute 1 fois au montage.

  const setLeftImg = () => {
    refWolvenrine.current.classList.add("leftImg");
  };
  const resetLeftImg = () => {
    refWolvenrine.current.classList.remove("leftImg");
  };

  const setRightImg = () => {
    refWolvenrine.current.classList.add("rightImg");
  };

  const resetRightImg = () => {
    refWolvenrine.current.classList.remove("rightImg");
  };

  const displayBtn = btn && (
    <>
      <div
        onMouseOver={setLeftImg}
        onMouseLeave={resetLeftImg}
        className="leftBox"
      >
        <Link to="/signup" className="btn-welcome">
          Inscription
        </Link>
      </div>
      <div
        onMouseOver={setRightImg}
        onMouseLeave={resetRightImg}
        className="rightBox"
      >
        <Link to="/login" className="btn-welcome">
          Connexion
        </Link>
      </div>
    </>
  );

  return (
    <main ref={refWolvenrine} className="welcomePage">
      {displayBtn}
    </main>
  );
};

export default Landing;
