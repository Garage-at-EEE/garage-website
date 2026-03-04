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
import CountUp from "../../components/CountUp/CountUp";
import { motion } from "framer-motion";

const CircuitArrowForward = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="8" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="16" x2="16" y2="12" stroke="currentColor" strokeWidth="2" />
    <line x1="16" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
  </svg>
);

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
        <>
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

          <section className={styles["hero-banner"]}>
            <div 
              className={styles["hero-background"]}
              style={{
                backgroundImage: data?.bannerImage ? `url(${data.bannerImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className={styles["hero-overlay"]}></div>
            </div>
            <div className={styles["hero-content"]}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                <Typography
                  variant="smallHeading"
                  className={styles["hero-title"]}
                >
                  {data?.title || "Garage@EEE"}
                </Typography>
              </motion.div>
              {upcomingWorkshop?.date && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className={styles["hero-date"]}
                >
                  <Typography variant="body" className={styles["hero-date-text"]}>
                    {upcomingWorkshop.date}
                  </Typography>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                className={styles["hero-cta"]}
              >
                <Button to="/ambassadors/0">Join Us</Button>
              </motion.div>
            </div>
          </section>

          <PageTemplate>
          <div className={styles["content-wrapper"]}>

            {data?.about && (
              <motion.section
                className={styles["about-section"]}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className={styles["about-content"]}>
                  <div className={styles["about-text-wrapper"]}>
                    <Typography variant="smallHeading" className={styles["about-title"]}>
                      What is Garage@EEE?
                    </Typography>
                    <Typography variant="body" className={styles["about-text"]}>
                      {data.about}
                    </Typography>
                  </div>
                </div>
              </motion.section>
            )}

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

            {eventData && eventData.length > 0 && (
              <motion.section
                className={styles["event-details-section"]}
                variants={revealUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {eventData.slice(0, 3).map((event, index) => (
                  <motion.div
                    key={event.name || index}
                    className={`${styles["event-detail-item"]} ${
                      index % 2 === 0 ? styles["event-detail-left"] : styles["event-detail-right"]
                    }`}
                    variants={revealUpSoft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {index % 2 === 0 ? (
                      <>
                        <div className={styles["event-detail-image"]}>
                          {event.coverPic ? (
                            <img src={event.coverPic} alt={event.name} loading="lazy" />
                          ) : (
                            <div className={styles["event-detail-placeholder"]}></div>
                          )}
                        </div>
                        <div className={styles["event-detail-text"]}>
                          <span className={styles["event-detail-badge"]}>
                            {index === 0 ? "Upcoming Event" : "Event"}
                          </span>
                          <Typography variant="smallHeading" className={styles["event-detail-title"]}>
                            {event.name}
                          </Typography>
                          {event.date && (
                            <Typography variant="body" className={styles["event-detail-date"]}>
                              {event.date}
                            </Typography>
                          )}
                          {event.location && (
                            <Typography variant="body" className={styles["event-detail-location"]}>
                              <span className={styles["location-icon"]}>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <circle cx="12" cy="12" r="2" />
                                  <line x1="12" y1="2" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
                                  <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                  <line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" />
                                </svg>
                              </span>
                              {event.location}
                            </Typography>
                          )}
                          <div className={styles["event-detail-cta"]}>
                            <Button to={`/events/${index}`}>Learn More</Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles["event-detail-text"]}>
                          <span className={styles["event-detail-badge"]}>Event</span>
                          <Typography variant="smallHeading" className={styles["event-detail-title"]}>
                            {event.name}
                          </Typography>
                          {event.date && (
                            <Typography variant="body" className={styles["event-detail-date"]}>
                              {event.date}
                            </Typography>
                          )}
                          {event.location && (
                            <Typography variant="body" className={styles["event-detail-location"]}>
                              <span className={styles["location-icon"]}>
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <circle cx="12" cy="12" r="2" />
                                  <line x1="12" y1="2" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
                                  <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                  <line x1="6" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" />
                                </svg>
                              </span>
                              {event.location}
                            </Typography>
                          )}
                          <div className={styles["event-detail-cta"]}>
                            <Button to={`/events/${index}`}>Learn More</Button>
                          </div>
                        </div>
                        <div className={styles["event-detail-image"]}>
                          {event.coverPic ? (
                            <img src={event.coverPic} alt={event.name} loading="lazy" />
                          ) : (
                            <div className={styles["event-detail-placeholder"]}></div>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </motion.section>
            )}

            <motion.section
              className={styles["gallery-section"]}
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Link to="/events" className={styles["gallery-link-wrapper"]}>
                <div className={styles["gallery-header"]}>
                  <Typography variant="smallHeading" className={styles["gallery-title"]}>
                    Explore Our Community
                  </Typography>
                  <div className={styles["gallery-link"]}>
                    <Typography variant="subtitle">View All Events</Typography>
                    <CircuitArrowForward />
                  </div>
                </div>
                <motion.div
                  className={styles["gallery-grid"]}
                  variants={staggerWrap}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  {eventData && eventData.length > 0 ? (
                    eventData.slice(0, 6).map((event, index) => (
                      <motion.div
                        key={event.name || index}
                        className={styles["gallery-item"]}
                        variants={revealUpSoft}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        <Link to={`/events/${index}`} className={styles["gallery-card"]}>
                          {event.coverPic ? (
                            <img
                              src={event.coverPic}
                              alt={event.name}
                              className={styles["gallery-image"]}
                              loading="lazy"
                            />
                          ) : (
                            <div className={styles["gallery-placeholder"]}></div>
                          )}
                          <div className={styles["gallery-overlay"]}>
                            <Typography variant="body" className={styles["gallery-item-title"]}>
                              {event.name}
                            </Typography>
                            {event.date && (
                              <Typography variant="subtitle" className={styles["gallery-item-date"]}>
                                {event.date}
                              </Typography>
                            )}
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
              </Link>
            </motion.section>

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
        </>
      )}
    </Transition>
  );
};

export default Home;
