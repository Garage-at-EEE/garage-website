import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";

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
              subheading={data.tagline}
            />
            <div>
              <Typography variant="smallHeading">DESCRIPTION</Typography>
              <Typography variant="body">{data.description}</Typography>
            </div>
            {(data.isRecruiting === "Y") ?
            <>
              <div>
                <Typography variant="smallHeading">RECRUITMENT</Typography>
                <Typography variant="body">{data.recruitment}</Typography>
              </div>
              <div>
                <Typography variant="smallHeading">REGISTRATION LINK</Typography>
                <Typography variant="smallHeading">
                <a href={data.registerLink} target="_blank" rel="noopener noreferrer">{data.registerLink}</a>
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
