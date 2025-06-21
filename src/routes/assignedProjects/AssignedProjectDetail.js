import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN, ASSIGNED_PROJECTS_SIGNUP_LINK } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";
import Button from "../../components/button/Button";


import styles from "./AssignedProjects.module.css";

function ProjectDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({ 
    url: API_DOMAIN + "?type=assignedProjectInfo&index=" + id,
  });
  return (
    <Transition isLoading={isLoading}>
      <PageTemplate>
        {data && (
          <PageGap>
            <HeroImage
              heading={data.name}
              src={data.coverPic}
              subheading={""}
            />
            <div>
              <Typography variant="smallHeading">DESCRIPTION</Typography>
              <Typography variant="body">{data.description}</Typography>
            </div>
            {(data.isRecruiting === "Y") ?
            <>
              <div>
                <Typography variant="smallHeading">RECRUITMENT INFO</Typography>
                <Typography variant="body"><b>Team Openings</b></Typography>
                <Typography variant="body">{data.recruitment.team_opening}</Typography>
                <Typography variant="body"><b>What we're looking for</b></Typography>
                <Typography variant="body">{data.recruitment.looking_for.toString().replace(/-/g, "•")}</Typography>
                <Typography variant="body"><b>What you'll do</b></Typography>
                <Typography variant="body">{data.recruitment.what_you_do.toString().replace(/-/g, "•")}</Typography>
              </div>
              <div>
                <Typography variant="smallHeading" className={styles["link"]}>
                  <Button onClick={() => window.open(ASSIGNED_PROJECTS_SIGNUP_LINK, "_blank")}>
                  REGISTER HERE
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
