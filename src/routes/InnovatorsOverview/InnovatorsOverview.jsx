import Transition from "../../components/Transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/constants";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useLenis } from "lenis/react";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/Grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import styles from "../../components/OverviewPage/OverviewPage.module.css";

const InnovatorsOverview = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&fields=name,tagline,coverPic,event",
  });
  const lenis = useLenis();

  const innovatorsData = data ? data
    .map((project, originalIndex) => ({ ...project, originalIndex }))
    .filter(project => 
      project.event && project.event.toLowerCase().includes("innovator")
    ) : null;

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {innovatorsData && (
          <div className={styles["content-wrapper"]}>
            <div className={styles["heading-space"]}>
              <BackButton />
              <Typography variant="heading">Innovators' Track</Typography>
            </div>
            <Grid>
              {innovatorsData.map((project) => (
                <Card
                  key={project.name}
                  image={project.coverPic}
                  to={`/projects/${project.originalIndex}`}
                  bottomText={project.name}
                  tagline={project.tagline || ""}
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

export default InnovatorsOverview;
