import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";

import Home from "./routes/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CartProvider from "./contexts/CartProvider";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Launchpad from "./routes/Launchpad/Launchpad";

// Routes
const Workshops = lazy(() => import("./routes/Workshops/Workshops"))
const EventsOverview = lazy(() => import("./routes/Events/Overview/EventsOverview"));
const EventDetail = lazy(() => import("./routes/Events/Detail/EventDetail"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));
const Facilities = lazy(() => import("./routes/Facilities/Facilities"));
const ContactUsPage = lazy(() => import("./routes/ContactUs/ContactUs"));
const AboutUs = lazy(() => import("./routes/AboutUs/AboutUs"));
// const NewsletterPage = lazy(() => import("./routes/Newsletter/NewsletterPage"));

// Projects
const ProjectShowcase = lazy(() => import("./routes/Projects/Showcase/Showcase"));
const ProjectShowcaseDetail = lazy(() => import("./routes/Projects/Showcase/ShowcaseDetail"));

const ProjectOpenings = lazy(() => import("./routes/Projects/Openings/Openings"));
const ProjectOpeningsDetail = lazy(() => import("./routes/Projects/Openings/OpeningsDetail"));

// Recruitment
const AmbassadorsOverview = lazy(() => import("./routes/Recruitment/AmbassadorsOverview/AmbassadorsOverview"));
const AmbassadorDetail = lazy(() => import("./routes/Recruitment/Ambassadors/AmbassadorDetail"));

const TinkeringProject = lazy(() => import("./routes/Recruitment/TinkeringProject/TinkeringProject"));
// TODO: Project -> Tinkering Overview

const InnovatorsOverview = lazy(() => import("./routes/Recruitment/InnovatorsOverview/InnovatorsOverview"));

// Protected
const Login = lazy(() => import("./routes/Login/Login"));

const Shop = lazy(() => import("./routes/Shop/Shop"));
const Checkout = lazy(() => import("./routes/Shop/Checkout"));
const Acknowledgement = lazy(() => import("./routes/Shop/Acknowledgement"));
const Database = lazy(() => import("./routes/Database/Database"));
// const TinkeringOverview = lazy(() => import("./routes/TinkeringOverview/TinkeringOverview"));

const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh' 
  }}>
    <LoadingSpinner />
  </div>
);

function App() {
  const location = useLocation();
  return (
    <ReactLenis root options={{ duration: 0.8 }}>
      <CartProvider>
        <AuthProvider>
          <Header />
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Home />} />
                <Route path="/ambassadors" element={<AmbassadorsOverview />} />
                <Route path="/ambassadors/:id" element={<AmbassadorDetail />} />
                <Route path="/events" element={<EventsOverview />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/projects" element={<ProjectShowcase />} />
                <Route path="/projects/:id" element={<ProjectShowcaseDetail />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/innovators" element={<InnovatorsOverview />} />
                <Route path="/launchpad" element={<Launchpad />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/tinkering-project" element={<TinkeringProject />} />
                <Route path="/project-openings" element={<ProjectOpenings />} />
                <Route path="/project-openings/:id" element={<ProjectOpeningsDetail />} />
                <Route path="/about-us" element={<AboutUs />} />
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
          </Suspense>
          <Footer />
        </AuthProvider>
      </CartProvider>
    </ReactLenis>
  );
}

export default App;
