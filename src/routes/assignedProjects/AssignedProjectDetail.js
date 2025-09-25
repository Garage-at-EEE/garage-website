import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";
import Button from "../../components/button/Button";


import styles from "./AssignedProjects.module.css";

function ProjectDetail() {
  const params = useParams();
  const id = params.id;
  const { data: projectData, isLoading } = useFetch({ 
    url: API_DOMAIN + "?type=assignedProjectInfo&index=" + id,
  });
  const { data: tinkeringData } = useFetch({
    url: API_DOMAIN + "?type=tinkering",
  });
  return (
    <Transition isLoading={isLoading || !projectData || !tinkeringData}>
      <PageTemplate>
        {projectData && tinkeringData && (
          <PageGap>
            <HeroImage
              heading={projectData.name}
              src={projectData.coverPic}
              subheading={""}
            />
            <div>
              <Typography variant="smallHeading">DESCRIPTION</Typography>
              <Typography variant="body">{projectData.description}</Typography>
            </div>
            {(projectData.isRecruiting === "Y") ?
            <>
              <div>
                <Typography variant="smallHeading">RECRUITMENT INFO</Typography>
                <Typography variant="body"><b>Team Openings</b></Typography>
                <Typography variant="body">{projectData.recruitment.team_opening}</Typography>
                <Typography variant="body"><b>What we're looking for</b></Typography>
                <Typography variant="body">{projectData.recruitment.looking_for.toString().replace(/-/g, "•")}</Typography>
                <Typography variant="body"><b>What you'll do</b></Typography>
                <Typography variant="body">{projectData.recruitment.what_you_do.toString().replace(/-/g, "•")}</Typography>
              </div>
              <div>
                <Typography variant="smallHeading" className={styles["link"]}>
                  <Button
                    disabled={!tinkeringData[0].registrationLink}
                    onClick={() => {
                      if (tinkeringData[0].registrationLink) {
                        window.open(tinkeringData[0].registrationLink, "_blank");
                      }
                    }}
                    className={styles["register-button"]}
                  >
                    {tinkeringData[0].registrationLink ? "Register Here" : "Registration Closed"}
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
