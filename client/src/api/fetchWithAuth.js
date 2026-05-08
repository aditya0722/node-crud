import { accessToken, setAccessToken } from "./auth";

const fetchWithAuth = async (url, options = {}) => {
  //request made from frontend

  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...options.body && { "Content-Type": "application/json" },
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
  //if access token expires
  if (res.status == 403) {
    console.log("checking");
    
    //generating the access token with the help of refresh token
    const refreshRes = await fetch("api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Refresh Failed Login Again" );
    }

    const data = await refreshRes.json();
    //setting the new access token
    setAccessToken(data.accessToken);
    // retrying the access token
    let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...options.body && { "Content-Type": "application/json" },
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
    return res;
  }
  return res;
};

export default fetchWithAuth;
