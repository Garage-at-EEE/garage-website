import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";

import Home from "./routes/home/Home";
import AmbassadorDetail from "./routes/ambassadors/AmbassadorDetail";
import EventsOverview from "./routes/eventsOverview/EventsOverview";
import EventDetail from "./routes/events/EventDetail";
import ProjectsOverview from "./routes/projectsOverview/ProjectsOverview";
import ProjectDetail from "./routes/projects/ProjectDetail";
import NotFound from "./routes/notFound/NotFound";
import Facilities from "./routes/facilities/Facilities";
import NewsletterPage from "./routes/newsletter/NewsletterPage";
import ContactUsPage from "./routes/contactUs/ContactUs";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/shop/Checkout";
import Acknowledgement from "./routes/shop/Acknowledgement";  
import Database from "./routes/database/Database";
import Login from "./routes/login/Login";
import AssignedProjects from "./routes/assignedProjects/AssignedProjects";
import AssignedProjectsDetail from "./routes/assignedProjects/AssignedProjectDetail";
import TinkeringProject from "./routes/tinkeringProject/TinkeringProject";

import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import CartProvider from "./contexts/CartProvider";

function App() {
  const location = useLocation();
  return (
    <ReactLenis root options={{ duration: 0.8 }}>
      <CartProvider>
        <AuthProvider>
          <Header />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route exact path="/" element={<Home />} />
              <Route path="/ambassadors/:id" element={<AmbassadorDetail />} />
              <Route path="/events" element={<EventsOverview />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/projects" element={<ProjectsOverview />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/facilities" element={<Facilities />} />
              <Route path="/newsletter" element={<NewsletterPage />} />
              <Route path="/assigned_projects" element={<AssignedProjects />} />
              <Route path="/assigned_projects/:id" element={<AssignedProjectsDetail />} />
              <Route path="/tinkeringProject" element={<TinkeringProject />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/database" element={
                  <PrivateRoute loginPageTitle="Member Database" loginRedirect="/database">
                    <Database />
                  </PrivateRoute>
              }/>
              <Route path="/shop" element={
                  <PrivateRoute loginPageTitle="Garage Shop" loginRedirect="/shop">
                    <Shop />
                  </PrivateRoute>
              }/>
              <Route path="/checkout" element={
                  <PrivateRoute loginPageTitle="Shop Checkout" loginRedirect="/checkout">
                    <Checkout />
                  </PrivateRoute>
              }/>
              <Route path="/acknowledgement" element={
                  <PrivateRoute loginPageTitle="Shop Acknowledgement" loginRedirect="/acknowledgement">
                    <Acknowledgement />
                  </PrivateRoute>
              }/>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </AuthProvider>
      </CartProvider>
    </ReactLenis>
  );
}

export default App;
