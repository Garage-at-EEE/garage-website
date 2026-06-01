import useFetch from "../../../hooks/useFetch";
import { API_DOMAIN } from "../../../utils/constants";
import {
  Transition,
  OverviewPage,
  PageTemplate,
} from "../../../components";

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
