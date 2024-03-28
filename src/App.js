import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./routes/home/Home";
import AmbassadorDetail from "./routes/ambassadors/AmbassadorDetail";
import Events from "./routes/eventsOverview/Events";
import EventDetail from "./routes/events/EventDetail";
import Project from "./routes/projectsOverview/Project";
import ProjectDetail from "./routes/projects/ProjectDetail";
import NotFound from "./routes/notFound/NotFound";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route path="/ambassadors/:id" element={<AmbassadorDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
