import { PageTemplate, Typography, Transition, Button } from "../../components";

import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <Transition isLoading={false}>
      <PageTemplate>
        <div className={styles["center"]}>
          <Typography variant="banner">404</Typography>
          <Typography variant="heading" textAlign="center">
            Page not found
          </Typography>
          <Button to="/" className={styles["margin"]}>
            Go Home
          </Button>
        </div>
      </PageTemplate>
    </Transition>
  );
}

export default NotFound;
