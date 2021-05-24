import { useState, useCallback, useEffect } from "react";
let logoutTimer;
export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [appTokenExpirationDate, setAppTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    //check if expirationDate is a valid date
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // +1h
    setAppTokenExpirationDate(new Date(tokenExpirationDate));
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token, expiration: tokenExpirationDate.toISOString() })
    );
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setToken(false);
    setAppTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  // check local storage for login info
  // sadly shit will still load since useEffect loads after content first time.
  // Could manage the isLoading stage and display a loading screen
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);
  // auto logout, not sure if thats a good practice really but ok
  useEffect(() => {
    if (token && appTokenExpirationDate) {
      const tokenRemainingTime = appTokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, tokenRemainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, appTokenExpirationDate]);

  return { token, userId, login, logout };
};
