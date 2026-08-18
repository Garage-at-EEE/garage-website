import { useParams } from "react-router-dom";
import {
  Transition,
  PageTemplate,
  PageGap,
  HeroImage,
  Typography,
  LinkPreview,
  Carousel,
} from "../../../components";
import useFetch from "../../../hooks/useFetch";
import { API_DOMAIN } from "../../../utils/constants";

import styles from "./EventDetail.module.css";

function EventDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=events&index=" + id,
  });
  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <PageGap>
            <HeroImage
              heading={data[0].name}
              src={data[0].coverPic}
              subheading={data[0].tagline}
            />
            {data[0].link && <LinkPreview link={data[0].link?.split(",")[0]} />}
            <Typography variant="body">{data[0].description}</Typography>
            <div className={styles["gallery-box"]}>
              <Typography variant="smallHeading">Gallery</Typography>
              {data[0].photos && <Carousel images={data[0].photos} />}
            </div>
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default EventDetail;
