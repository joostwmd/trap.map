import { useEffect, useState } from "react";
import axios from "axios"


export const useAuth  = (code)  => {
    const [accessToken, setAccessToken] = useState();
    console.log("client code", code)
    axios.post("http://localhost:5005/api/login", {code})

      .then((response) => {

        // If success then cut the code string from the URL and execute the other thing
        window.history.pushState({}, null, "/");

        console.log(response.data);
        setAccessToken(response.data.accessToken);

      })
      .catch(() => {
        //   If fail redirect to home page - Login page
        window.location = "/";
      });
  

  return accessToken
}


