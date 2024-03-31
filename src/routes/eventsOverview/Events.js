import Gutter from "../../components/gutter/Gutter";
import Header from "../../components/header/Header";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Footer from "../../components/footer/Footer";
import OverviewPage from "../../components/overviewPage/OverviewPage";

const Events = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=events&fields=name,tagline,coverPic",
  });

  return (
    <Transition isLoading={isLoading}>
      <Header />
      <Gutter>{data && <OverviewPage heading={"Events"} data={data} />}</Gutter>
      <Footer />
    </Transition>
  );
};

export default Events;
