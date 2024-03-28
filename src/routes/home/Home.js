import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styles from "./Home.module.css";

import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Gutter from "../../components/gutter/Gutter";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });
  const { data: ambassadorData, isLoading: ambassadorIsLoading } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&fields=name,homeImage",
  });
  const { data: projectData, isLoading: projectIsLoading } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&fields=name,coverPic",
  });
  const { data: eventData, isLoading: eventIsLoading } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,coverPic",
  });
  const navigate = useNavigate();

  return (
    <Transition isLoading={isLoading}>
      <Header />
      {!isLoading && (
        <main className={styles["home-page"]}>
          <Gutter>
            <div className={styles["content-wrapper"]}>
              <div className={styles["banner"]}>
                <div className={styles["banner-space"]}>
                  <Typography variant="banner">{data.title}</Typography>
                  <div className={styles["scroll-more"]}>
                    <Typography variant="body" paddingBottom="0.75rem">
                      Scroll to find out more
                    </Typography>
                  </div>
                </div>
                <img
                  className={styles["banner-image"]}
                  src={data.bannerImage}
                  alt="Garage@EEE Banner Image"
                  referrerPolicy="no-referrer"
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
                <Typography variant={"heading"}>MEMBER TRACKS</Typography>
                <div className={styles["text-section"]}>
                  <Typography variant={"smallHeading"}>Ambassadors</Typography>
                  <Typography variant={"body"}>{data.ambassadors}</Typography>
                </div>
                {!ambassadorIsLoading && (
                  <div className={styles["grid-wrapper"]}>
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
                  </div>
                )}
              </section>
              {!isLoading && (
                <section className={styles["innovators"]}>
                  <img
                    className={styles["innovators-image"]}
                    src={data.innovatorsImage}
                    alt="Image for Innovators"
                    referrerPolicy="no-referrer"
                  />
                  <div className={styles["innovators-text"]}>
                    <div className={styles["text-section"]}>
                      <Typography variant={"smallHeading"}>
                        Innovators
                      </Typography>
                      <Typography variant={"body"}>
                        {data.innovators}
                      </Typography>
                      <Typography variant={"smallHeading"}>
                        Innovator's Track Recruitment
                      </Typography>
                      <Typography variant={"body"}>
                        {data.recruitment}
                      </Typography>
                    </div>
                    <button
                      onClick={() =>
                        navigate(
                          data.registerLink ? data.registerLink : undefined
                        )
                      }
                      className={[
                        !data.registerLink
                          ? styles["disabled"]
                          : styles["outline"],
                        styles["site-button"],
                      ].join(" ")}
                    >
                      <Typography variant={"body"}>
                        {data.registerLink ? "Register" : "Registration Closed"}
                      </Typography>
                    </button>
                  </div>
                </section>
              )}
              <section className={styles["section-wrapper"]}>
                <Typography variant={"heading"}>PROJECT SHOWCASE</Typography>
                {projectData && (
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
                    <button
                      className={[
                        styles["site-button"],
                        styles["outline"],
                      ].join(" ")}
                      onClick={() => navigate("/projects")}
                    >
                      <Typography variant={"body"}>View More</Typography>
                    </button>
                  </div>
                )}
              </section>
              <section className={styles["section-wrapper"]}>
                <Typography variant={"heading"}>OUR EVENTS</Typography>
                {eventData && (
                  <div className={styles["grid-wrapper"]}>
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
                    <button
                      className={[
                        styles["site-button"],
                        styles["outline"],
                      ].join(" ")}
                      onClick={() => navigate("/events")}
                    >
                      <Typography variant="body">View More</Typography>
                    </button>
                  </div>
                )}
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
