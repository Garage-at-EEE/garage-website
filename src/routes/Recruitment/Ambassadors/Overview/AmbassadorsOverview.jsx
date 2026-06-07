import useFetch from "../../../../hooks/useFetch";
import { API_DOMAIN } from "../../../../utils/constants";
import { OverviewPage, PageTemplate, Transition } from "../../../../components";

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
