import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";

import styles from "./Home.module.css";
import Button from "../../components/button/Button";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

const Home = () => {
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

  return (
    <Transition isLoading={isLoading}>
      {!isLoading && (
        <PageTemplate>
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
              <section className={styles["innovators"]}>
                <img
                  className={styles["innovators-image"]}
                  src={data.innovatorsImage}
                  alt="Image for Innovators"
                  referrerPolicy="no-referrer"
                />
                <div className={styles["innovators-text"]}>
                  <div className={styles["text-section"]}>
                    <Typography variant={"smallHeading"}>Innovators</Typography>
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
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Home;
