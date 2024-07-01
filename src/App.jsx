import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { AuthContext } from './context/auth-context';
import { Suspense } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

import { useAuth } from "./hooks/useAuth";

function App() {
  const { token, userId, logout, login } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/analytics' element={<Analytics />} />
        <Route exact path="/settings" element={<Settings />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App
