import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Awards from "../Awards";
import toast from "react-hot-toast";
//make this a parent component, kind of like a protected component.
function Completed({ username, credential }) {
  const User = localStorage.getItem("User");
  const navigate = useNavigate();
  // const credential = localStorage.getItem("Credential");
  const [verified, setVerified] = useState(false);
  console.log("Credential!!! ", credential);
  useEffect(() => {
    async function checkCredentials() {
      try {
        const response = await axios.post(
          "http://localhost:8000/credential/verify-credential",
          { credential: credential }
        );

        // navigate("/awards");
        setVerified(true);
      } catch (e) {
        console.log(e);
      }
    }
    checkCredentials();

    return () => {
      // localStorage.removeItem("Credential");
    };
  }, []);
  return <>{verified && <Awards userI={User} />}</>;
}

export default Completed;
