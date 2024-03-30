import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Carousel from "../../components/carousel/Carousel";
import Loading from "../../components/loading/Loading";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Gutter from "../../components/gutter/Gutter";
import Transition from "../../components/transition/Transition";

import { motion } from "framer-motion";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const apiDomain = "https://ntueeegarage.pythonanywhere.com/api/";

  useEffect(() => {
    // Check if data is available in local storage
    const storedData = localStorage.getItem("cachedData");
    if (storedData) {
      // If data is available in local storage, update the state and exit
      setData(JSON.parse(storedData));
      setIsLoading(false);
    } else {
      // If data is not available in local storage, make an API call
      fetch(apiDomain + "home/")
        .then((res) => res.json())
        .then((data) => {
          // Store the data in local storage for future use
          localStorage.setItem("cachedData", JSON.stringify(data));
          console.log(data);
          setData(data);
          setIsLoading(false);
        });

      AOS.init({
        duration: 1500,
      });
      AOS.refresh();
    }
  }, []);

  return (
    <Transition isLoading={isLoading}>
      <Header />
      {!isLoading && (
        <main className="home-page">
          <Gutter>
            <div className="content-wrapper">
              <div className="banner">
                <div className="banner-space">
                  <Typography variant="banner">
                    STUDENT LED <br />
                    MAKERSPACE
                  </Typography>
                  <div className="scroll-more">
                    <Typography variant="body" paddingBottom="0.75rem">
                      Scroll to find out more
                    </Typography>
                  </div>
                </div>
                <div className="banner-image"></div>
              </div>

              <section className="section-wrapper">
                {/* Intro section */}

                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "linear" }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      initial={{ color: "rgb(33,37,41)", y: -50 }}
                      whileInView={{ color: "rgb(73, 105, 137)" }}
                    >
                      <Typography variant="heading">ABOUT</Typography>
                    </motion.div>

                    <Typography variant="body">
                      Garage@EEE is a student-led maker space in the School of
                      Electrical and Electronic Engineering. We provide the
                      environment, materials, and funding for students to
                      develop their ideas, alongside their technical skills.
                      Furthermore, we run creative initiatives to provide
                      opportunities for our ambassadors to enhance other
                      holistic skills. Aided by our strong industry connections
                      and extensive alumni network, Garage@EEE creates not only
                      engineers of today, but thinkers, entrepreneurs, and world
                      leaders of tomorrow.
                    </Typography>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "linear" }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <Typography variant="smallHeading">Our Objective</Typography>
                  <Typography variant="body">
                    <br />
                    To encourage innovation and cultivate the spirit of
                    entrepreneurship amongst students in the School of EEE, NTU.
                    <br />
                    <br />
                    To instill a passion for engineering ideation across
                    students in the EEE community.
                  </Typography>
                </motion.div>
              </section>

              <section className="section-wrapper">
                {/* Ambassadors section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "linear" }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <motion.div
                    initial={{ color: "rgb(33,37,41)", y: -50 }}
                    whileInView={{ color: "rgb(73, 105, 137)" }}
                    transition={{ duration: 1, ease: "linear" }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <Typography variant={"heading"}>MEMBER TRACKS</Typography>
                  </motion.div>

                  <div>
                    <Typography variant={"smallHeading"}>
                      Ambassadors
                    </Typography>
                    <Typography variant={"body"}>
                      <br />
                      The Ambassador Track focuses on giving students a platform
                      to learn and grow. Students will get to propose and
                      facilitate unique initiatives for the NTU community. The
                      Ambassador Track consists of 6 portfolios, namely Branding
                      & Marketing, Business Development, Operations, Start-Up,
                      Training & Development and Welfare. Students also ensure
                      that Garage will be a efficient and impactful makerspace.
                    </Typography>
                  </div>
                </motion.div>
                <div className="grid-wrapper">
                  <Grid columns={3}>
                    {data.Ambassador.map((card, index) => (
                      <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true, amount: 0.6 }}
                      >
                        <Card
                          key={index}
                          image={card.displayImageUrl}
                          text={card.name}
                          to={"ambassadors/" + card.pk}
                        />
                      </motion.div>
                    ))}
                  </Grid>
                </div>
              </section>

              <section className="innovators">
                {/* Innovators section */}
                <Grid columns={2}>
                  <div>
                    <Card
                      image={
                        "https://drive.google.com/uc?id=15J4Z0FeEEuiiquRaUU0-PWFqPy-PNdDt"
                      }
                      text={""}
                    />
                  </div>
                  <div className="innovators-text">
                    <div>
                      <Typography variant={"smallHeading"}>
                        Innovators
                      </Typography>
                      <Typography variant={"body"}>
                        <br />
                        The Innovator Track focuses on exposing eager and
                        passionate students to the Start-Up maker community,
                        promoting an entrepreneurial mindset, and bringing
                        student self-initiated ideas to reality by providing
                        proper guidance and learning opportunities. Therefore,
                        we encourage you to come with a start up idea in mind
                        and bedazzle the minds of the panel so that you can
                        realise your ideas right here at the Garage!
                        Applications close on 24th September 2021
                        <br />
                        <br />
                      </Typography>
                      <Typography variant={"smallHeading"}>
                        Innovator's Track Recruitment
                      </Typography>
                      <Typography variant={"body"}>
                        <br />
                        Kick-start your own start-up HERE with your friends from
                        ANY schools. You will have the chance to get up to 2.5k
                        of funding, receive mentorships, gain connections, have
                        access to facilities, and many more benefits.
                        <br />
                        Applications close on 24th September 2021
                      </Typography>
                    </div>
                    <a
                      href={
                        data.InnovatorRegistration[0].regIsOpen
                          ? data.InnovatorRegistration[0].regLink
                          : undefined
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button
                        className={[
                          !data.InnovatorRegistration[0].regIsOpen
                            ? "disabled"
                            : "outline",
                          "site-button",
                        ].join(" ")}
                      >
                        <Typography variant={"body"}>
                          {data.InnovatorRegistration[0].regIsOpen
                            ? "Register"
                            : "Registration Closed"}
                        </Typography>
                      </button>
                    </a>
                  </div>
                </Grid>
              </section>
              <section className="section-wrapper">
                <Typography variant={"heading"}>PROJECT SHOWCASE</Typography>
                <div className="grid-wrapper">
                  <Grid columns={3}>
                    {data.Project.map((card, index) => (
                      <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true, amount: 0.5 }}
                      >
                        <div className="card-wrapper" key={index}>
                          <Card
                            image={card.displayImageUrl}
                            to={"projects/" + card.pk}
                          />
                          <Typography variant={"body"}>{card.name}</Typography>
                        </div>
                      </motion.div>
                    ))}
                  </Grid>
                  <Link to="/projects" className="link-view-more">
                    <button className="site-button outline">
                      <Typography variant={"body"}>View More</Typography>
                    </button>
                  </Link>
                </div>
              </section>
              <section className="flagship-events section-wrapper">
                <Typography variant={"heading"}>OUR EVENTS</Typography>
                <div className="grid-wrapper">
                  <Grid columns={3}>
                    {data.Event.map((card, index) => (
                      <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        viewport={{ once: true, amount: 0.5 }}
                      >
                        <div className="card-wrapper" key={index}>
                          <Card
                            image={card.displayImageUrl}
                            to={"events/" + card.pk}
                          />
                          <Typography variant={"body"}>{card.name}</Typography>
                        </div>
                      </motion.div>
                    ))}
                  </Grid>
                  <Link to="/events" className="link-view-more">
                    <button className="site-button outline">
                      <Typography variant="body">View More</Typography>
                    </button>
                  </Link>
                </div>
              </section>
            </div>
          </Gutter>
          <Footer />
        </main>
      )}
    </Transition>
  );
};

export default Home;
