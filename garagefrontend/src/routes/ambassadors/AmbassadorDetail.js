import { useParams } from "react-router-dom";
import Typography from "../../components/typography/Typography";
import HeroImage from "../../components/heroImage/heroImage";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageGap from "../../components/pageGap/PageGap";

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
              heading={data.name}
              src={data.coverPic}
              objectFit="contain"
            />
            <Typography variant="body">{data.description}</Typography>
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default AmbassadorDetail;
