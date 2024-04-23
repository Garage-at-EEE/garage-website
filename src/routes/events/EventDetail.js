import { useParams } from "react-router-dom";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import useFetch from "../../hooks/useFetch";
import HeroImage from "../../components/heroImage/heroImage";
import Typography from "../../components/typography/Typography";
import LinkPreview from "../../components/LinkPreview/LinkPreview";
import { API_DOMAIN } from "../../utils/Constants";
import ImageGallery from "../../components/ImageGallery/ImageGallery";

import styles from "./EventDetail.module.css";

function EventDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=events&index=" + id,
  });
  return (
    <Transition isLoading={isLoading}>
      <PageTemplate>
        {data && (
          <div className={styles["main-wrapper"]}>
            <HeroImage
              heading={data.name}
              src={data.coverPic}
              subheading={data.tagline}
            />
            {data.link && <LinkPreview link={data.link.split(",")[0]} />}
            <Typography variant="body">{data.description}</Typography>
            <div className={styles["gallery-box"]}>
              <Typography variant="smallHeading">Gallery</Typography>
              {data.photos && <ImageGallery images={data.photos} />}
            </div>
          </div>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default EventDetail;
