import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";
import Button from "../../components/button/Button";


import styles from "./projectOpenings.module.css";

function ProjectDetail() {
  const params = useParams();
  const id = params.id;
  const { data: projectOpeningsData, isLoading } = useFetch({ 
    url: API_DOMAIN + "?type=projectOpenings&index=" + id,
  });
  return (
    <Transition isLoading={isLoading || !projectOpeningsData }>
      <PageTemplate>
        {projectOpeningsData && (
          <PageGap>
            <HeroImage
              heading={projectOpeningsData.name}
              src={projectOpeningsData.coverPic}
              subheading={""}
            />
            <div>
              <Typography variant="smallHeading">DESCRIPTION</Typography>
              <Typography variant="body">{projectOpeningsData.description}</Typography>
            </div>
            {(projectOpeningsData.isRecruiting === "Y") ?
            <>
              <div>
                <Typography variant="smallHeading">RECRUITMENT INFO</Typography>
                <Typography variant="body"><b>Team Openings</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.team_opening}</Typography>
                <Typography variant="body"><b>What we're looking for</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.looking_for.toString().replace(/-/g, "•")}</Typography>
                <Typography variant="body"><b>What you'll do</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.what_you_do.toString().replace(/-/g, "•")}</Typography>
              </div>
              <div>
                <Typography variant="smallHeading" className={styles["link"]}>
                  <Button
                    disabled={!projectOpeningsData.projectLink}
                    onClick={() => {
                      if (projectOpeningsData.projectLink) {
                        window.open(projectOpeningsData.projectLink, "_blank");
                      }
                    }}
                    className={styles["register-button"]}
                  >
                    {projectOpeningsData.projectLink ? "Register Here" : "Registration Closed"}
                  </Button>                
                </Typography>
              </div>
            </>
            :
            <Typography variant="smallHeading">
            Sorry, this project is not currently recruiting.
            </Typography>
            }
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default ProjectDetail;
