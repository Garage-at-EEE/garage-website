import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import OverviewPage from "../../components/overviewPage/OverviewPage";
import PageTemplate from "../../components/pageTemplate/PageTemplate";

const AssignedProjects = () => {
  const { data, isLoading } = useFetch({ // TODO: change url get to assigned projects data
    url: API_DOMAIN + "?type=projectInfo&fields=name,tagline,coverPic",
  });

  return (
    <Transition isLoading={isLoading}>
      <PageTemplate>
        {data && // Shows page if data exists
          <OverviewPage heading={"Garage Assigned Projects"} data={data} 
          
        />}
      </PageTemplate>
    </Transition>
  );
};

export default AssignedProjects;
