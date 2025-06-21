import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import BackButton from "../../components/BackButton/BackButton";
import { useAuth } from "../../contexts/AuthProvider";

import styles from "./Database.module.css";


function Database() {
  const { matric, name, token } = useAuth();
  const user = {name:name, matric:matric};
  const { data, isLoading, error } = useFetch({
    url: API_DOMAIN + "?type=database&token=" + token, //Token REQUIRED to access
  });
  
  console.log(error); //Debug line

  const text = `Welcome ${user.name} (${user.matric}) to the Garage@EEE Database!`

  return (
    <Transition>
      <PageTemplate>
        <div className={styles.content}>

          <div className={styles["heading-space"]}>
            <div>
              <Typography variant="heading">{"Member Database"}</Typography>
            </div>
            <BackButton />
          </div>

          <Typography variant="body">{text}</Typography>
        </div>
      </PageTemplate>
    </Transition>
  );
}

export default Database;
