import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./routes/LandingRoute";
import SignupModal from "./components/SignupModal";
<<<<<<< Updated upstream
=======
import ProjectProfile from "./routes/ProjectProfile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
>>>>>>> Stashed changes

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (

    <>
      <NavBar openModal={openModal} />
<<<<<<< Updated upstream
      <Landing openModal={openModal} />
=======
      <Routes>
        <Route exact path="/" element={<LandingRoute openModal={openModal} />}/>
        <Route exact path="/myprofile" element={<MyProfile />} />
        <Route exact path="/users/:id" element={<UserProfile />} />
        <Route exact path="/project/:id" element={<ProjectProfile />} />

      </Routes>
>>>>>>> Stashed changes
      <Footer />
      {isModalOpen && <SignupModal isOpen={isModalOpen} onClose={closeModal} />}
    </>
  );
}

export default App;
