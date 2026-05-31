import styles from "./NotFound.module.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import Typography from "../../components/Typography/Typography";
import Transition from "../../components/Transition/Transition";
import Button from "../../components/Button/Button";

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
