import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import OverviewPage from "../../components/overviewPage/OverviewPage";
import PageTemplate from "../../components/pageTemplate/PageTemplate";

const Projects = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&fields=name,tagline,coverPic",
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && <OverviewPage heading={"Project Showcase"} data={data} />}
      </PageTemplate>
    </Transition>
  );
};

export default Projects;
