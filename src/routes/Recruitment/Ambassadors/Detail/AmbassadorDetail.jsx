import { useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import { API_DOMAIN } from "../../../../utils/constants";
import {
  Typography,
  HeroImage,
  Transition,
  PageTemplate,
  PageGap,
} from "../../../../components";

function AmbassadorDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&index=" + id,
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <PageGap>
            <HeroImage
              heading={data[0].name}
              src={data[0].coverPic}
              objectFit="contain"
            />
            <Typography variant="body">{data[0].description}</Typography>
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default AmbassadorDetail;
