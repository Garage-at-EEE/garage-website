import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import { AnimatePresence } from "framer-motion";

import Home from "./routes/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import CartProvider from "./contexts/CartProvider";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";

const AmbassadorDetail = lazy(() => import("./routes/ambassadors/AmbassadorDetail"));
const AmbassadorsOverview = lazy(() => import("./routes/ambassadorsOverview/AmbassadorsOverview"));
const EventsOverview = lazy(() => import("./routes/eventsOverview/EventsOverview"));
const EventDetail = lazy(() => import("./routes/events/EventDetail"));
const ProjectsOverview = lazy(() => import("./routes/projectsOverview/ProjectsOverview"));
const ProjectDetail = lazy(() => import("./routes/projects/ProjectDetail"));
const InnovatorsOverview = lazy(() => import("./routes/innovatorsOverview/InnovatorsOverview"));
const TinkeringOverview = lazy(() => import("./routes/tinkeringOverview/TinkeringOverview"));
const NotFound = lazy(() => import("./routes/notFound/NotFound"));
const Facilities = lazy(() => import("./routes/facilities/Facilities"));
const NewsletterPage = lazy(() => import("./routes/newsletter/NewsletterPage"));
const ContactUsPage = lazy(() => import("./routes/contactUs/ContactUs"));
const Shop = lazy(() => import("./routes/shop/Shop"));
const Checkout = lazy(() => import("./routes/shop/Checkout"));
const Acknowledgement = lazy(() => import("./routes/shop/Acknowledgement"));
const Database = lazy(() => import("./routes/database/Database"));
const Login = lazy(() => import("./routes/login/Login"));
const AssignedProjects = lazy(() => import("./routes/assignedProjects/AssignedProjects"));
const AssignedProjectsDetail = lazy(() => import("./routes/assignedProjects/AssignedProjectDetail"));
const TinkeringProject = lazy(() => import("./routes/tinkeringProject/TinkeringProject"));
const AboutUs = lazy(() => import("./routes/aboutUs/AboutUs"));

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
                <Route path="/projects" element={<ProjectsOverview />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/innovators" element={<InnovatorsOverview />} />
                <Route path="/tinkering" element={<TinkeringOverview />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/newsletter" element={<NewsletterPage />} />
                <Route path="/assigned_projects" element={<AssignedProjects />} />
                <Route path="/assigned_projects/:id" element={<AssignedProjectsDetail />} />
                <Route path="/tinkeringProject" element={<TinkeringProject />} />
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
