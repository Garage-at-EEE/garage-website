import { useParams } from "react-router-dom";
import Typography from "../../components/Typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/constants";
import Transition from "../../components/Transition/Transition";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import PageGap from "../../components/PageGap/PageGap";
import HeroImage from "../../components/HeroImage/HeroImage";
import Button from "../../components/Button/Button";


import styles from "./ProjectOpenings.module.css";

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
                <Typography variant="body"><b>Programme</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.programme}</Typography>
                <Typography variant="body"><b>Be Part of the Project</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.join_project.toString().replace(/-/g, "•")}</Typography>
                <Typography variant="body"><b>People Behind the Project</b></Typography>
                <Typography variant="body">{projectOpeningsData.recruitment.people.toString().replace(/-/g, "•")}</Typography>
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
