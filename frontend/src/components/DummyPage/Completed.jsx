import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
//make this a parent component, kind of like a protected component.
function Completed({ username, credential }) {
  const navigate = useNavigate();
  // const credential = localStorage.getItem("Credential");
  console.log("Credential!!! ", credential);
  useEffect(() => {
    async function checkCredentials() {
      try {
        const response = await axios.post(
          "http://localhost:8000/credential/verify-credential",
          { credential: credential }
        );

        navigate("/awards");
      } catch (e) {
        console.log(e);
      }
    }
    checkCredentials();

    return () => {
      // localStorage.removeItem("Credential");
    };
  }, []);
  return (
    <>
      <div>BRODDDAAA</div>
    </>
  );
}

export default Completed;
