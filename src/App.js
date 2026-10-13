import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";
function App() {
  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-entered");
        observer.unobserve(entry.target);
      }
    }), {
      threshold: 0.08
    });
    document.querySelectorAll("main > section:not(.hero)").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<>
              <a className="skip-link" href="#main-content">본문 바로가기</a>
              <Header />
              <main id="main-content" tabIndex="-1">
                <Hero />
                <Projects />
                <Skills />
                <Experience />
                <Education />
                <Contact />
              </main>
              <Footer />
            </>} />
        </Routes>
      </div>
    </Router>;
}
export default App;
