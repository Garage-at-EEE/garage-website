import { useLenis } from "lenis/react";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/Grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/Typography/Typography";
import Button from "../Button/Button";

import styles from "./OverviewPage.module.css";

const OverviewPage = ({ heading, data }) => {
  const lenis = useLenis();
  return (
    <div className={styles["content-wrapper"]}>
      <div className={styles["heading-space"]}>
        <BackButton />
        <Typography variant="heading">{heading}</Typography>
      </div>
      {data && (
        <>
          <Grid>
            {data.map((card, index) => (
              <Card
                key={card.name}
                image={card.coverPic}
                to={`${index}/`}
                bottomText={card.name}
                tagline={card.tagline}
              />
            ))}
          </Grid>
          <Button onClick={() => lenis.scrollTo(0, 0)} variant="outlined">
            Back to top
          </Button>
        </>
      )}
    </div>
  );
};

export default OverviewPage;
