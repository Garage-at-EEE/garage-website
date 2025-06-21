import { useLenis } from "lenis/react";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN, ASSIGNED_PROJECTS_SIGNUP_LINK } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/grid/Grid";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
import Image from "../../components/image/Image";

import styles from "./AssignedProjects.module.css";
import cardStyles from "../../components/PhotoCard/PhotoCard.module.css";

const APCard = ({ image, topText, bottomText, to, isRecruiting }) => {
  const Comp = to ? Link : "div";
  return (
    <Comp
      to={to}
      className={[cardStyles["card-wrapper"], to && cardStyles["link"]]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles["card-container"]}>
        <div className={cardStyles.card}>
          <div className={cardStyles["card-image"]}>
            <Image src={image} alt={topText ?? bottomText} />
          </div>
          <div className={cardStyles["text-overlay"]}>
            <Typography variant={"smallHeading"}>{topText}</Typography>
          </div>
        </div>
        <div className={[
          cardStyles.card, 
          styles["overlay-card"],
          (isRecruiting==="Y") ? styles["recruiting"] : styles["not-recruiting"],
          ].join(" ")}>
        <Typography variant="smallHeading">
        {(isRecruiting==="Y") ? "RECRUITING" : "CLOSED"}
        </Typography>
        </div>
      </div>
      {bottomText && (
        <Typography variant={"smallHeading"} className={cardStyles["bottom-text"]}>
          {bottomText}
        </Typography>
      )}
    </Comp>
  );
};

const AssignedProjects = () => {
  const { data, isLoading } = useFetch({ 
    url: API_DOMAIN + "?type=assignedProjectInfo&fields=name,coverPic,isRecruiting",
  });
  const lenis = useLenis();

  const today = new Date();
  const year = today.getFullYear()-2000;
  let acadYear;
  if (today.getMonth()+1 < 8) {
    acadYear = "AY" + (year-1) + "/" + year;
  } else {
    acadYear = "AY" + year + "/" + (year+1);
  }

  return (
    <Transition isLoading={isLoading}>
      <PageTemplate>
        {data && 
          <div className={styles["content-wrapper"]}>
            <div className={styles["heading-space"]}>
              <Typography variant="heading">Garage Assigned Projects {acadYear}</Typography>
              <BackButton />
            </div>

            <Grid>
              {data.map((card, index) => (
                <div className={styles["project-item"]}>
                  <APCard
                    key={card.name}
                    image={card.coverPic}
                    to={`${index}/`}
                    bottomText={card.name}
                    isRecruiting={card.isRecruiting}
                  />
                </div>
              ))}
            </Grid>
            <Button onClick={() => window.open(ASSIGNED_PROJECTS_SIGNUP_LINK, "_blank")} className={styles["register-button"]}>
              Register Here
            </Button>
            <Button onClick={() => lenis.scrollTo(0, 0)} variant="outlined">
              Back to top
            </Button>
          </div>
        }
      </PageTemplate>
    </Transition>
  );
};

export default AssignedProjects;
