import { useLenis } from "lenis/react";
import { BackButton, Grid, Card, Typography, Button } from "../../components";

import styles from "./OverviewPage.module.css";

const OverviewPage = ({ heading, data }) => {
  const lenis = useLenis();
  return (
    <div className={styles["content-wrapper"]}>
      <div className={styles["heading-space"]}>
        <Typography variant="heading">{heading}</Typography>
        <BackButton />
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
