import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowForward } from "../../icons/arrow_forward_ios.svg";
import CountUp from "../../components/CountUp/CountUp";
import { motion } from "framer-motion";

/** ===== Motion presets ===== **/
const viewportOnce = { once: true, amount: 0.25 };

const revealUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const revealUpSoft = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const staggerWrap = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.03 },
  },
};

const Home = () => {
  const [authStatus, setAuthStatus] = useState(
    () => localStorage.getItem("authStatus") || "loggedOut"
  );
  const [showWarning, setShowWarning] = useState(false);

  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });

  const { data: eventData } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,coverPic,date,location",
  });

  const { data: ambassadorData } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&fields=name,homeImage",
  });

  useEffect(() => {
    if (authStatus === "expired") {
      setShowWarning(true);
    }
  }, [authStatus]);

  const handleExpiredLogout = () => {
    setShowWarning(false);
    setAuthStatus("loggedOut");
    localStorage.setItem("authStatus", "loggedOut");
  };

  const upcomingWorkshop = eventData?.[0] || {
    name: "Workshop",
    location: "TBA",
  };

  const placeholderSponsors = [
    { name: "Sponsor 1", image: "" },
    { name: "Sponsor 2", image: "" },
    { name: "Sponsor 3", image: "" },
    { name: "Sponsor 4", image: "" },
  ];

  return (
    <Transition isLoading={isLoading || !data}>
      <div id="start"></div>

      {data && (
        <PageTemplate>
          {showWarning && (
            <div className={styles["expired-warning-backdrop"]}>
              <div className={styles["expired-warning-modal"]}>
                <Typography variant="smallHeading">Session Timeout</Typography>
                <Typography variant="body">
                  We have logged you out to protect you. Please log in again.
                </Typography>
                <Button onClick={handleExpiredLogout}>Confirm</Button>
              </div>
            </div>
          )}

          <div className={styles["content-wrapper"]}>
            {/* ===== Hero ===== */}
            <section className={styles["hero-card"]}>
              <div className={styles["hero-card-accent"]}></div>

              <div className={styles["hero-card-content"]}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Typography
                    variant="smallHeading"
                    className={styles["hero-card-title"]}
                  >
                    Garage@EEE
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.25 }}
                >
                  <Typography
                    variant="body"
                    className={styles["hero-card-text"]}
                  >
                    Whether you are looking around to start tinkering or have
                    been breaking down every electrical device that comes your
                    way, there's a place for you here.
                  </Typography>
                </motion.div>

                <div className={styles["hero-divider"]}></div>

                <motion.div
                  className={styles["hero-card-footer"]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                >
                  <Typography variant="body" className={styles["hero-card-ready"]}>
                    Are you ready?
                  </Typography>
                  <Button to="/ambassadors/0">Join Us</Button>
                </motion.div>
              </div>

              <motion.div
                className={styles["hero-decor-1"]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.15 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
              <motion.div
                className={styles["hero-decor-2"]}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </section>

            {/* ===== Upcoming Workshop (reveal on scroll) ===== */}
            <motion.section
              className={styles["workshop-card"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["workshop-header"]}>
                <div>
                  <span className={styles["workshop-badge"]}>
                    Upcoming Workshop
                  </span>

                  <Typography
                    variant="smallHeading"
                    className={styles["workshop-title"]}
                  >
                    {upcomingWorkshop.name}
                  </Typography>

                  <Typography variant="body" className={styles["workshop-location"]}>
                    <span className={styles["location-icon"]}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                    </span>
                    {upcomingWorkshop.location || "TBA"}
                  </Typography>
                </div>

                <Button to="/events">RSVP</Button>
              </div>
            </motion.section>

            {/* ===== Flagship Events (reveal on scroll) ===== */}
            <motion.div
              className={styles["flagship-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["flagship-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Flagship Events
                  </Typography>
                  <Link to="/events" className={styles["section-arrow"]}>
                    <ArrowForward />
                  </Link>
                </div>

                <Link to="/events" className={styles["flagship-content"]}>
                  <div className={styles["flagship-images"]}>
                    {eventData && eventData.length >= 3 ? (
                      <>
                        <div
                          className={`${styles["flagship-img"]} ${styles["flagship-img-left"]}`}
                        >
                          <img
                            src={eventData[1]?.coverPic}
                            alt="Event"
                            loading="lazy"
                          />
                        </div>

                        <div
                          className={`${styles["flagship-img"]} ${styles["flagship-img-center"]}`}
                        >
                          <img
                            src={eventData[0]?.coverPic}
                            alt="Main Event"
                            loading="lazy"
                          />
                        </div>

                        <div
                          className={`${styles["flagship-img"]} ${styles["flagship-img-right"]}`}
                        >
                          <img
                            src={eventData[2]?.coverPic}
                            alt="Event"
                            loading="lazy"
                          />
                        </div>
                      </>
                    ) : (
                      <div className={styles["loading-wrapper"]}>
                        <LoadingSpinner />
                      </div>
                    )}
                  </div>

                  <Typography variant="body" className={styles["flagship-title"]}>
                    Discover Innovation Festival
                  </Typography>

                  <Typography
                    variant="subtitle"
                    className={styles["flagship-subtitle"]}
                  >
                    Tap to explore our highlights
                  </Typography>
                </Link>
              </div>
            </motion.div>

            {/* ===== Upcoming Events (stagger list items) ===== */}
            <motion.div
              className={styles["events-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["events-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Upcoming Events
                  </Typography>
                  <Link to="/events" className={styles["section-link"]}>
                    <Typography variant="subtitle">View All</Typography>
                  </Link>
                </div>

                <motion.div
                  className={styles["event-list"]}
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {eventData ? (
                    eventData.slice(0, 3).map((event, index) => (
                      <motion.div
                        key={event.name}
                        variants={revealUpSoft}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <Link
                          to={`/events/${index}`}
                          className={styles["event-item"]}
                        >
                          <div className={styles["event-image"]}>
                            <img
                              src={event.coverPic}
                              alt={event.name}
                              loading="lazy"
                            />
                          </div>

                          <div className={styles["event-info"]}>
                            <Typography variant="body" className={styles["event-name"]}>
                              {event.name}
                            </Typography>
                            <Typography
                              variant="subtitle"
                              className={styles["event-date"]}
                            >
                              {event.date || "Date TBA"}
                            </Typography>
                          </div>

                          <div className={styles["event-arrow"]}>
                            <ArrowForward />
                          </div>
                        </Link>
                      </motion.div>
                    ))
                  ) : (
                    <div className={styles["loading-wrapper"]}>
                      <LoadingSpinner />
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>

            {/* ===== Sponsors (stagger grid) ===== */}
            <motion.div
              className={styles["sponsors-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["sponsors-card"]}>
                <div className={styles["section-header"]}>
                  <Typography variant="body" className={styles["section-title"]}>
                    Our Sponsors
                  </Typography>
                </div>

                <motion.div
                  className={styles["sponsors-grid"]}
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {placeholderSponsors.map((sponsor, index) => (
                    <motion.div
                      key={index}
                      className={styles["sponsor-item"]}
                      variants={revealUpSoft}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                    >
                      {sponsor.image ? (
                        <img src={sponsor.image} alt={sponsor.name} />
                      ) : (
                        <Typography variant="subtitle" style={{ color: "#94a3b8" }}>
                          SPONSOR
                        </Typography>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* ===== Stats (stagger items) ===== */}
            <motion.div
              className={styles["stats-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["section-header"]}>
                <Typography variant="body" className={styles["section-title"]}>
                  By the Numbers
                </Typography>
              </div>

              <div className={styles["stats-card"]}>
                <motion.div
                  className={styles["stats-grid"]}
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <motion.div
                    className={styles["stat-item"]}
                    variants={revealUpSoft}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <CountUp
                      end={15}
                      suffix="+"
                      duration={1400}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Years of Innovation
                    </Typography>
                  </motion.div>

                  <motion.div
                    className={styles["stat-item"]}
                    variants={revealUpSoft}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <CountUp
                      end={500}
                      suffix="+"
                      duration={1600}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Builders & Ambassadors
                    </Typography>
                  </motion.div>

                  <motion.div
                    className={styles["stat-item"]}
                    variants={revealUpSoft}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    <CountUp
                      end={50}
                      prefix="$"
                      suffix="K+"
                      duration={1800}
                      className={styles["stat-number"]}
                    />
                    <Typography variant="body" className={styles["stat-label"]}>
                      Total Prizes Won
                    </Typography>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* ===== Ambassador Track (stagger grid) ===== */}
            <motion.div
              className={styles["ambassador-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className={styles["ambassador-card"]}>
                <div className={styles["ambassador-content"]}>
                  <div className={styles["ambassador-text"]}>
                    <span className={styles["ambassador-badge"]}>Join Us</span>
                    <Typography variant="body" className={styles["ambassador-heading"]}>
                      The Ambassador Track
                    </Typography>
                    <Typography variant="body" className={styles["ambassador-description"]}>
                      The Ambassador Track consists of 6 portfolios, namely{" "}
                      <strong>Branding & Marketing</strong>,{" "}
                      <strong>Business Development</strong>,{" "}
                      <strong>Operations</strong>, <strong>Start-Up</strong>,{" "}
                      <strong>Training & Development</strong> and{" "}
                      <strong>Welfare</strong>.
                    </Typography>
                    <Typography variant="body" className={styles["ambassador-description"]}>
                      Students also ensure that Garage will be an efficient and impactful
                      makerspace.
                    </Typography>
                  </div>

                  <motion.div
                    className={styles["ambassador-grid"]}
                    variants={staggerWrap}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                  >
                    {ambassadorData ? (
                      ambassadorData.map((portfolio, index) => (
                        <motion.div
                          key={index}
                          variants={revealUpSoft}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                          <Link
                            to={`/ambassadors/${index}`}
                            className={styles["portfolio-card"]}
                          >
                            <img
                              src={portfolio.homeImage}
                              alt={portfolio.name}
                              className={styles["portfolio-image"]}
                              loading="lazy"
                            />
                            <div className={styles["portfolio-overlay"]}>
                              <span className={styles["portfolio-name"]}>
                                {portfolio.name}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))
                    ) : (
                      <div className={styles["loading-wrapper"]}>
                        <LoadingSpinner />
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Home;
