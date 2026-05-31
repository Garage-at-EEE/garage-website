import useFetch from "../../hooks/useFetch";
import Transition from "../../components/Transition/Transition";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import PageGap from "../../components/PageGap/PageGap";
import HeroImage from "../../components/HeroImage/HeroImage";
import Image from "../../components/Image/Image";
import Typography from "../../components/Typography/Typography";
import {
  AccordionRoot,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "../../components/Accordion/Accordion";
import { API_DOMAIN } from "../../utils/constants";
import Button from "../../components/Button/Button";

import styles from "./Workshops.module.css";

const FacilityCard = ({ even, description, title, src, label, link }) => {
  return (
    <div className={styles["facility-card"]}>
      <Typography variant="smallHeading" className={styles["mobile"]}>
        {title}
      </Typography>
      {src && (
        <Image
          src={src}
          alt={title}
          wrapperClassName={styles["facility-image"]}
          className={styles["square"]}
        />
      )}
      <div
        className={[styles["facility-description"], !even && styles["odd"]]
          .filter(Boolean)
          .join(" ")}
      >
        <Typography variant="smallHeading" className={styles["mobile-hide"]}>
          {title}
        </Typography>
        <Typography variant="body">{description}</Typography>
        {link && (
          <div className={styles["button-container"]}>
            <Button to={link} variant="outlined">
              {label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Workshops = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=workshops",
  });
  console.log("jus fetch", data);
  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <PageGap>
            <HeroImage heading="Workshops" src={data?.coverPic} />
            {data?.workshops?.map((facility, index) => (
              <FacilityCard
                key={facility.name}
                even={index % 2 === 0}
                description={facility.description}
                title={facility.name}
                src={facility.coverPic}
                label={facility.label}
                link={facility.link}
              />
            ))}
            {data.others && (
              <AccordionRoot type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <Typography variant="body">Other Useful Links</Typography>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={styles["links"]}>
                      {data.others.map((link) => (
                        <a
                          key={link.label}
                          className={styles["link"]}
                          href={link.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Typography variant="body">{link.label}</Typography>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            )}
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
};

export default Workshops;
