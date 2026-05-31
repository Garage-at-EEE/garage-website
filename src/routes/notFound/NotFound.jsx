import styles from "./NotFound.module.css";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import Button from "../../components/button/Button";

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
