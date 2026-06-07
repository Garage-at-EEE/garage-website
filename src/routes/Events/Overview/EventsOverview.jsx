import useFetch from "../../../hooks/useFetch";
import { API_DOMAIN } from "../../../utils/constants";
import { Transition, OverviewPage, PageTemplate } from "../../../components";

const Events = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,tagline,coverPic",
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && <OverviewPage heading={"Events"} data={data} />}
      </PageTemplate>
    </Transition>
  );
};

export default Events;
