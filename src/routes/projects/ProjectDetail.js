import { useParams } from "react-router-dom";
import Carousel from "../../components/carousel/Carousel";
import Typography from "../../components/typography/Typography";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";

import styles from "./ProjectDetail.module.css";

function ProjectDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&index=" + id,
  });
  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <PageGap>

            <HeroImage
              heading={data.name}
              src={data.coverPic}
              subheading={data.tagline}
            />

            <Typography variant="body">{data.description}</Typography>

            {data.resourcesUsed && data.resourcesUsed.trim() !== "" && (
            <div className={styles["content-box"]}>
              <Typography variant="smallHeading">Resources Used</Typography>
              <Typography variant="body">{data.resourcesUsed}</Typography>
            </div>
            )}
            
            
            <div className={styles["gallery-box"]}>
              <Typography variant="smallHeading">Gallery</Typography>
              {data.photos && <Carousel images={data.photos} />}
            </div>
            

            {data.reflection && data.reflection.trim() !== "" && (
            <div className={styles["content-box"]}>
              <Typography variant="smallHeading">Reflection</Typography>
              <Typography variant="body">{data.reflection}</Typography>
            </div>
            )}

            <div className={styles["content-box"]}>
              <Typography variant="smallHeading">Contact Us On Telegram</Typography>
              <Typography variant="body">{data.contactInfo}</Typography>
            </div>
  
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default ProjectDetail;
