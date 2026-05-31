import Transition from "../../../components/Transition/Transition";
import useFetch from "../../../hooks/useFetch";
import { API_DOMAIN } from "../../../utils/constants";
import OverviewPage from "../../../components/OverviewPage/OverviewPage";
import PageTemplate from "../../../components/PageTemplate/PageTemplate";

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
