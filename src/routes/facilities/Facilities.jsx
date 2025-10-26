import useFetch from "../../hooks/useFetch";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import HeroImage from "../../components/heroImage/heroImage";
import Image from "../../components/image/Image";
import Typography from "../../components/typography/Typography";
import {
  AccordionRoot,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "../../components/accordion/Accordion";
import { API_DOMAIN } from "../../utils/Constants";
import Button from "../../components/button/Button";

import styles from "./Facilities.module.css";

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

const Facilities = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=facilities",
  });
  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <PageGap>
            <HeroImage heading="Facilities" src={data.coverPic} />
            {data.facilities.map((facility, index) => (
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
          </PageGap>
        )}
      </PageTemplate>
    </Transition>
  );
};

export default Facilities;
