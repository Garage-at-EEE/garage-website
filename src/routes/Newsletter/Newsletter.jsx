import Typography from "../../components/Typography/Typography";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Transition from "../../components/Transition/Transition";
import Button from "../../components/Button/Button";
import BackButton from "../../components/BackButton/BackButton";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/constants";

import styles from "./Newsletter.module.css";
import { useLenis } from "lenis/react";

const Newsletter = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=newsletter",
  });

  const lenis = useLenis();

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        <div className={styles["content-wrapper"]}>
          <div className={styles["heading-space"]}>
            <BackButton />
            <Typography variant="heading">Behind The Rollerdoor</Typography>
          </div>
          {data &&
            data.map((issue) => (
              <Newsletter
                key={issue.name}
                src={issue.image}
                link={issue.link}
                title={issue.name}
                date={issue.date}
              />
            ))}
          <Button onClick={() => lenis.scrollTo(0, 0)} variant="outlined">
            Back to top
          </Button>
        </div>
      </PageTemplate>
    </Transition>
  );
};

export default Newsletter;
