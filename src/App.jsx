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

// Routes
const Workshops = lazy(() => import("./routes/Workshops/Workshops"));
const EventsOverview = lazy(
  () => import("./routes/Events/Overview/EventsOverview"),
);
const EventDetail = lazy(() => import("./routes/Events/Detail/EventDetail"));
const NotFound = lazy(() => import("./routes/NotFound/NotFound"));
const Facilities = lazy(() => import("./routes/Facilities/Facilities"));
const ContactUs = lazy(() => import("./routes/ContactUs/ContactUs"));
// const AboutUs = lazy(() => import("./routes/AboutUs/AboutUs"));
// const Newsletter = lazy(() => import("./routes/Newsletter/Newsletter"));

// Projects
const ProjectShowcase = lazy(
  () => import("./routes/Projects/Showcase/Showcase"),
);
const ProjectShowcaseDetail = lazy(
  () => import("./routes/Projects/Showcase/ShowcaseDetail"),
);

const ProjectOpenings = lazy(
  () => import("./routes/Projects/Openings/Openings"),
);
const ProjectOpeningsDetail = lazy(
  () => import("./routes/Projects/Openings/OpeningsDetail"),
);

// Recruitment
const AmbassadorsOverview = lazy(
  () => import("./routes/Recruitment/Ambassadors/Overview/AmbassadorsOverview"),
);
const AmbassadorDetail = lazy(
  () => import("./routes/Recruitment/Ambassadors/Detail/AmbassadorDetail"),
);

const Tinkering = lazy(
  () => import("./routes/Recruitment/Tinkering/TinkeringOverview"),
);
const Innotrack = lazy(
  () => import("./routes/Recruitment/Innotrack/Innotrack"),
);
const Launchpad = lazy(
  () => import("./routes/Recruitment/Launchpad/Launchpad"),
);

// Protected
const Login = lazy(() => import("./routes/Login/Login"));

const Shop = lazy(() => import("./routes/Shop/Shop"));
const Checkout = lazy(() => import("./routes/Shop/Checkout"));
const Acknowledgement = lazy(() => import("./routes/Shop/Acknowledgement"));
const Database = lazy(() => import("./routes/Database/Database"));

const PageLoader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
    }}
  >
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

                {/* Base */}
                <Route path="/events" element={<EventsOverview />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/contact-us" element={<ContactUs />} />

                {/* DEPRECIATED */}
                {/* <Route path="/about-us" element={<AboutUs />} /> */}
                {/* <Route path="/newsletter" element={<Newsletter />} /> */}

                {/* Projects */}
                <Route path="/project-showcase" element={<ProjectShowcase />} />
                <Route
                  path="/project-showcase/:id"
                  element={<ProjectShowcaseDetail />}
                />
                <Route path="/project-openings" element={<ProjectOpenings />} />
                <Route
                  path="/project-openings/:id"
                  element={<ProjectOpeningsDetail />}
                />

                {/* Recruitment */}
                <Route path="/ambassadors" element={<AmbassadorsOverview />} />
                <Route path="/ambassadors/:id" element={<AmbassadorDetail />} />
                <Route path="/innotrack" element={<Innotrack />} />
                <Route path="/launchpad" element={<Launchpad />} />
                <Route path="/tinkering" element={<Tinkering />} />

                {/* Protected */}
                <Route path="/login" element={<Login />} />
                <Route
                  path="/database"
                  element={
                    <PrivateRoute
                      loginPageTitle="Member Database"
                      loginRedirect="/database"
                    >
                      <Database />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <PrivateRoute
                      loginPageTitle="Garage Shop"
                      loginRedirect="/shop"
                    >
                      <Shop />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute
                      loginPageTitle="Shop Checkout"
                      loginRedirect="/shop"
                    >
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/acknowledgement"
                  element={
                    <PrivateRoute
                      loginPageTitle="Shop Acknowledgement"
                      loginRedirect="/shop"
                    >
                      <Acknowledgement />
                    </PrivateRoute>
                  }
                />

                {/* Wildcard */}
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
