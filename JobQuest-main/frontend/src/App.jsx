import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import UploadCard from "./components/UploadCard";
import ListOfJobs from "./components/ListOfJobs";
import SignIn from "./pages/SignIn";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);


  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<SignIn setUser={setUser} switchToSignup={() => navigate("/signup")} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} switchToSignup={() => navigate("/signup")} />} />
        <Route path="/signup" element={<Signup onSubmit={() => navigate("/signin")} switchToLogin={() => navigate("/signin")} />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/upload" element={<UploadCard />} />
          <Route path="/jobs" element={<ListOfJobs />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
