import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import { useLenis } from "lenis/react";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Button from "../../components/button/Button";
import styles from "../../components/overviewPage/OverviewPage.module.css";

const TinkeringOverview = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=tinkering&fields=title,bannerImage",
  });
  const lenis = useLenis();

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <div className={styles["content-wrapper"]}>
            <div className={styles["heading-space"]}>
              <BackButton />
              <Typography variant="heading">Tinkering Projects</Typography>
            </div>
            <Grid>
              {data.map((project, index) => (
                <Card
                  key={index}
                  image={project.bannerImage}
                  to="/tinkeringProject"
                  bottomText={project.title || `Tinkering Project ${index + 1}`}
                  tagline=""
                />
              ))}
            </Grid>
            <Button onClick={() => lenis.scrollTo(0, 0)} variant="outlined">
              Back to top
            </Button>
          </div>
        )}
      </PageTemplate>
    </Transition>
  );
};

export default TinkeringOverview;
