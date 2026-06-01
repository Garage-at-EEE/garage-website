import {
  Typography,
  PageTemplate,
  Transition,
  Button,
  BackButton,
} from "../../components";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/constants";
import { NewsletterComponent } from "./NewsletterComponent/Newsletter";

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
              <NewsletterComponent
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
