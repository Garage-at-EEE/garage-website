import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import OverviewPage from "../../components/overviewPage/OverviewPage";
import PageTemplate from "../../components/pageTemplate/PageTemplate";

const AmbassadorsOverview = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&fields=name,homeImage",
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <OverviewPage 
            heading={"Ambassador Track"} 
            data={data.map((ambassador) => ({
              name: ambassador.name,
              coverPic: ambassador.homeImage,
              tagline: "",
            }))} 
          />
        )}
      </PageTemplate>
    </Transition>
  );
};

export default AmbassadorsOverview;
