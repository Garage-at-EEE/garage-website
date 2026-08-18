import useFetch from "../../../hooks/useFetch";
import { API_DOMAIN } from "../../../utils/constants";
import {
  Card,
  Typography,
  Transition,
  PageTemplate,
  PageGap,
  AccordionRoot,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
  Button,
  Image,
} from "../../../components";

import styles from "./Innotrack.module.css";

const Innotrack = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=innotrack",
  });

  return (
    <Transition isLoading={isLoading || !data}>
      {data && (
        <PageTemplate>
          <div className={styles["content-wrapper"]}>
            <div className={styles["banner"]}>
              <div className={styles["banner-space"]}>
                <Typography variant="banner">INNOTRACK</Typography>
                <div className={styles["scroll-more"]}>
                  <Typography
                    variant="body"
                    style={{ paddingBottom: "0.75rem" }}
                  >
                    Scroll to find out more
                  </Typography>
                </div>
              </div>
              <Typography variant="heading">{data[0].title}</Typography>
              <Image
                className={styles["banner-image"]}
                src={data[0].bannerImage}
                alt="Tinkering Cover"
              />
            </div>
            <section className={styles["section-wrapper"]}>
              {/* Intro section */}
              <Typography variant="heading">Introduction</Typography>
              <Typography variant="body"> {data[0].introduction}</Typography>

              {/* Join section */}
              <Typography variant="heading">How Can I Join?</Typography>
              <div className={styles["join-text"]}>
                <div className={styles["text-section"]}>
                  <Typography variant="smallHeading">
                    {" "}
                    {data[0].howToJoin[0]}
                  </Typography>
                  <Typography variant="body">{data[0].howToJoin[1]}</Typography>
                  <div>
                    <Button
                      to={
                        data[0].registrationLink
                          ? data[0].registrationLink
                          : undefined
                      }
                      disabled={!data[0].registrationLink}
                    >
                      {data[0].registrationLink
                        ? "Register Now"
                        : "Registration Closed"}
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Programmes section */}
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>PROGRAMMES</Typography>
              <div className={styles["programme-section"]}>
                <div className={styles["text-section"]}>
                  <Typography variant={"smallHeading"}>
                    Innotrack Sharing Session
                  </Typography>
                  <Typography variant={"body"}>
                    {data[0].innotrackProjectDescription}
                  </Typography>
                  <div className={styles["custom-photo-layout"]}>
                    {[0, 1, 2, 3, 4].map((i) => {
                      const img = data[i]?.innotrackProjectImages?.[0];
                      const descRaw =
                        data[i]?.innotrackProjectDescriptions || "";
                      const desc = Array.isArray(descRaw)
                        ? descRaw[0]
                        : descRaw.split(/\r?\n/)[0];

                      return (
                        img && (
                          <Card
                            key={i}
                            image={img}
                            bottomText={desc}
                            bottomTextClassName={
                              styles["sharing-cards-bottom-text"]
                            }
                          />
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* FAQ section */}
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>
                FREQUENTLY ASKED QUESTIONS
              </Typography>
              <PageGap>
                <AccordionRoot type="single" collapsible>
                  {data.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>
                        <Typography variant="smallHeading">
                          {item.faq}
                        </Typography>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className={styles["faq-container"]}>
                          {item.answers.map((ans, i) => (
                            <Typography key={i} variant="body">
                              {index === 0 && i === 1 ? (
                                <a
                                  href="/project-openings"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={styles["faq-link"]}
                                >
                                  {ans}
                                </a>
                              ) : (
                                ans
                              )}
                            </Typography>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </AccordionRoot>
              </PageGap>
            </section>
          </div>
        </PageTemplate>
      )}
    </Transition>
  );
};

export default Innotrack;
