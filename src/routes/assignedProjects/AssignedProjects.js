import { useLenis } from "lenis/react";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN, ASSIGNED_PROJECTS_SIGNUP_LINK } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Button from "../../components/button/Button";

import styles from "./AssignedProjects.module.css";

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
            <Button onClick={() => window.open(ASSIGNED_PROJECTS_SIGNUP_LINK, "_blank")} className={styles["register-button"]}>
              Register Here
            </Button>

            <Grid>
              {data.map((card, index) => (
                <div className={styles["project-item"]}>
                  {(card.isRecruiting==="Y") ?
                    <Typography variant="body" className={styles["recruiting"]}>OPEN</Typography>
                    :
                    <Typography variant="body" className={styles["not-recruiting"]}>CLOSED</Typography>
                  }
                  <Card
                    key={card.name}
                    image={card.coverPic}
                    to={`${index}/`}
                    bottomText={card.name}
                  />
                </div>
              ))}
            </Grid>

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
