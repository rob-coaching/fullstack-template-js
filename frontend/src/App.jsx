import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Nav } from "./components/Nav";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { ProfilePage } from "./pages/Profile";
import { Notification } from "./components/Notification";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Notification />
      <h2>Welcome to ya Page</h2>
      <p>Please cusomize meeeee</p>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer>Your footer heeeere</footer>
    </>
  );
}

export default App;
