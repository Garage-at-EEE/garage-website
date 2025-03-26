import { useLenis } from "lenis/react";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Button from "../../components/button/Button";

import styles from "./AssignedProjects.module.css";

const AssignedProjects = () => {
  const { data, isLoading } = useFetch({ // TODO: change url get to assigned projects data
    url: API_DOMAIN + "?type=assignedProjectInfo&fields=name,coverPic,isRecruiting",
  });
  const lenis = useLenis();

  return (
    <Transition isLoading={isLoading}>
      <PageTemplate>
        {data && // Shows page if data exists
          <div className={styles["content-wrapper"]}>
            <div className={styles["heading-space"]}>
              <Typography variant="heading">Garage Assigned Projects</Typography>
              <BackButton />
            </div>
              <Grid>
                {data.map((card, index) => (
                  <div>
                    <Card
                      key={card.name}
                      image={card.coverPic}
                      to={`${index}/`}
                      bottomText={card.name}
                    />
                    {
                    (card.isRecruiting==="Y") ?
                      <Typography variant="body">Recruiting</Typography>
                     :
                      <Typography variant="body">Not Recruiting</Typography>
                    }
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
