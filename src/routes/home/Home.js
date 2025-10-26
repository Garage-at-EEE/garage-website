import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Image from "../../components/image/Image";
import Newsletter from "../../components/newsletter/Newsletter";

const Home = () => {
  const [authStatus, setAuthStatus] = useState(() => localStorage.getItem("authStatus") || "loggedOut");
  const [showWarning, setShowWarning] = useState(false);

  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });
  const { data: ambassadorData } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&fields=name,homeImage",
  });
  const { data: projectData } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&fields=name,coverPic",
  });
  const { data: eventData } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,coverPic",
  });
  const { data: newsletterData } = useFetch({
    url: API_DOMAIN + "?type=newsletter",
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

  return (
    <Transition isLoading={isLoading || !data}>
      <div id="start"></div>
      {data && (
        <PageTemplate>
          {showWarning && (
            <div className={styles['expired-warning-backdrop']}>
              <div className={styles['expired-warning-modal']}>
                <Typography variant='smallHeading'>Session Timeout</Typography>
                <Typography variant='body'>We have logged you out to protect you. Please log in again.</Typography>
                <button   onClick={() => {
                  handleExpiredLogout();
                }}><Typography variant='body'>Confirm</Typography>
                </button>
              </div>
            </div>
          )}
          <div className={styles["content-wrapper"]}>
            <div className={styles["banner"]}>
              <div className={styles["banner-space"]}>
                <Typography variant="banner">{data.title}</Typography>
                <div className={styles["scroll-more"]}>
                  <Typography
                    variant="body"
                    style={{ paddingBottom: "0.75rem" }}
                  >
                    Scroll to find out more
                  </Typography>
                </div>
              </div>
              <Image
                className={styles["banner-image"]}
                src={data.bannerImage}
                alt="Garage@EEE Cover"
              />
            </div>
            <section className={styles["section-wrapper"]}>
              {/* Intro section */}
              <Typography variant="heading">ABOUT</Typography>
              <Typography variant="body">{data.about}</Typography>
              <div className={styles["text-section"]}>
                <Typography variant="smallHeading">Our Objective</Typography>
                <Typography variant="body">{data.objective}</Typography>
              </div>
            </section>
            <section className={styles["section-wrapper"]}>
              {/* Intro section */}
              <Typography variant="heading">Facilities</Typography>
              <Typography variant="body">{data.facilities}</Typography>
              <div className={styles["grid-wrapper"]}>
                <div className={styles["facilities-images"]}>
                  <Image src={data.facilitiesImage[0]} />
                  <div className={styles["facilities-images-smaller"]}>
                    <Image src={data.facilitiesImage[1]} />
                    <Image src={data.facilitiesImage[2]} />
                  </div>
                </div>
                <Button to={"/facilities"} variant="outlined">
                  View More
                </Button>
              </div>
            </section>
            <section id="ambassadors" className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>MEMBER TRACKS</Typography>
              <div className={styles["text-section"]}>
                <Typography variant={"smallHeading"}>Ambassadors</Typography>
                <Typography variant={"body"}>{data.ambassadors}</Typography>
              </div>
              {ambassadorData ? (
                <Grid>
                  {ambassadorData.map((card, index) => (
                    <Card
                      key={card.name}
                      image={card.homeImage}
                      topText={card.name}
                      to={"ambassadors/" + index}
                    />
                  ))}
                </Grid>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>
            {data && (
              <section id="innovators" className={styles["innovators"]}>
                <Typography
                  variant={"smallHeading"}
                  className={styles["tablet"]}
                >
                  Innovators
                </Typography>
                <Image
                  className={styles["innovators-image"]}
                  objectFit="contain"
                  src={data.innovatorsImage}
                  alt="Innovators illustration"
                />
                <div className={styles["innovators-text"]}>
                  <div className={styles["text-section"]}>
                    <Typography
                      variant={"smallHeading"}
                      className={styles["tablet-hide"]}
                    >
                      Innovators
                    </Typography>
                    <Typography variant={"body"}>{data.innovators}</Typography>
                    <Typography variant={"smallHeading"}>
                      Innovator's Track Recruitment
                    </Typography>
                    <Typography variant={"body"}>{data.recruitment}</Typography>
                  </div>
                  <Button
                    to={data.registerLink ? data.registerLink : undefined}
                    disabled={!data.registerLink}
                  >
                    {data.registerLink ? "Register" : "Registration Closed"}
                  </Button>
                </div>
              </section>
            )}
            {data && (
              <section id="tinkering" className={styles["tinkering"]}>
                <div className={styles["tinkering-text"]}>
                  <div className={styles["text-section"]}>
                    <Typography
                      variant={"smallHeading"}
                    >
                      Tinkering
                    </Typography>
                    <Typography variant={"body"}>{data.tinkering}</Typography>
                    <Typography variant={"smallHeading"}>
                      Tinkering Project Recruitment
                    </Typography>
                    <Typography variant={"body"}>{data.tinkeringRecruitment}</Typography>
                  </div>
                  <Button to="/tinkeringProject">
                    Find out more
                  </Button>
                </div>
                <Image
                  className={styles["tinkering-image"]}
                  objectFit="contain"
                  src={data.tinkeringImage}
                  alt="Tinkering illustration"
                />
              </section>
            )}
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>PROJECT SHOWCASE</Typography>
              {projectData ? (
                <div className={styles["grid-wrapper"]}>
                  <Grid>
                    {projectData.map((card, index) => (
                      <Card
                        key={card.name}
                        image={card.coverPic}
                        to={"projects/" + index}
                        bottomText={card.name}
                      />
                    ))}
                  </Grid>
                  <Button to={"/projects"} variant="outlined">
                    View More
                  </Button>
                </div>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>OUR EVENTS</Typography>
              {eventData ? (
                <Grid>
                  {eventData.map((card, index) => (
                    <Card
                      key={card.name}
                      image={card.coverPic}
                      to={"events/" + index}
                      bottomText={card.name}
                    />
                  ))}
                </Grid>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>

            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>Behind The Rollerdoor</Typography>
              <Typography variant="body">{data.newsletter}</Typography>
              {newsletterData ? (
                <div className={styles["grid-wrapper"]}>
                  <div className={styles["issues"]}>
                    <Typography variant="smallHeading">
                      Recent Issues
                    </Typography>
                  </div>
                  {newsletterData.slice(0, 3).map((issue) => (
                    <Newsletter
                      key={issue.name}
                      src={issue.image}
                      link={issue.link}
                      title={issue.name}
                      date={issue.date}
                    />
                  ))}
                  <Button to={"/newsletter"} variant="outlined">
                    View All
                  </Button>
                </div>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Home;