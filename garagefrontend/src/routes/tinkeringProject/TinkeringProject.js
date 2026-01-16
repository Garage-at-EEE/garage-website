import Grid from "../../components/grid/Grid";
import Card from "../../components/PhotoCard/PhotoCard";
import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import PageGap from "../../components/pageGap/PageGap";
import {
    AccordionRoot,
    AccordionContent,
    AccordionTrigger,
    AccordionItem,
  } from "../../components/accordion/Accordion";

import styles from "./TinkeringProject.module.css";
import Button from "../../components/button/Button";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import Image from "../../components/image/Image";

const TinkeringProjects = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=tinkering",
  });

  return (
    <Transition isLoading={isLoading || !data}>
      {data && (
        <PageTemplate>
          <div className={styles["content-wrapper"]}>
            <div className={styles["banner"]}>
              <div className={styles["banner-space"]}>
                <Typography variant="banner">TINKERING PROJECTS</Typography>
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
              <Typography variant="heading">Introduction</Typography>
              <Typography variant="body"> {data[0].introduction}
              </Typography>
            
              <Typography variant="heading">How Can I Join?</Typography> 
              <div className={styles["join-text"]}> 
                  <div className={styles["text-section"]}> 
                    <Typography variant="smallHeading"> {data[0].howToJoin[0]}</Typography>
                    <Typography variant="body">{data[0].howToJoin[1]}</Typography>
                    <div> 
                    <Button
                      to={data[0].registrationLink ? data[0].registrationLink : undefined}
                      disabled={!data[0].registrationLink}
                      >
                      {data[0].registrationLink ? "Register Now" : "Registration Closed"}
                    </Button>
                    </div> 
                  </div> 
              </div> 
               
              <Typography variant="heading">Alternatively,</Typography> 
              <div className={styles["garage-assigned-text"]}> 
                  <div className={styles["text-section"]}> 
                      <Typography variant="smallHeading">{data[0].garageAssigned[0]}</Typography> 
                      <Typography variant="body">{data[0].garageAssigned[1]}</Typography>
                      <Typography variant="body">{data[0].garageAssigned[2]}</Typography> 
                  </div> 
              </div> 
              <div>
              {data ? (
                  <Grid desktop={3} tablet={2} mobile={1}>
                  {data.map((card, index) => (
                    <div key={index} className="card-group">
                      {(card.garageAssignedImages || []).map((img, imgIndex) => (
                        <Card
                          key={imgIndex}
                          image={img}
                          bottomText={card.garageAssignedNames || ""}
                          bottomTextClassName={styles["project-cards-bottom-text"]}
                        />
                      ))}
                    </div>
                  ))}
                </Grid>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
              </div>
              <div>
                <Button to="/assigned_projects"  
                  style={{ width: '100%', textAlign: 'center', padding: '1rem' }}
                  >
                  View All
                </Button>
              </div>
            </section>

            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>SUPPPORT</Typography>
              {data ? (
                <Grid desktop={3} tablet={2} mobile={1}>
                  {data.map((card, index) => (
                    <div key={index} className="card-group">
                      {(card.supportImages || []).map((img, imgIndex) => (
                        <div key={imgIndex} className="card-with-description">
                          <Card
                            key={imgIndex}
                            image={img}
                            bottomText={card.supportImageTitles || ""}
                            bottomTextClassName={styles["support-cards-bottom-text"]}
                          />
                          <Typography
                            variant="body"
                            textAlign="center"
                            style={{ marginTop: "0.5rem" }}
                          >
                            {card.supportImageDescriptions || ""}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  ))}
                </Grid>
              ) : (
                <div className={styles["loading-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </section>

            <section className={styles["section-wrapper"]}>
                <Typography variant={"heading"}>PROGRAMMES</Typography>
                <div className={styles["programme-section"]}> 
                  <div className={styles["text-section"]}> 
                    <Typography variant={"smallHeading"}>Tinkerer's Night</Typography>
                    {data && (
                    <section className={styles["tinkererNight"]}>
                        <Image
                        className={styles["tinkererNight-image"]}
                        objectFit="contain"
                        src={data[0].tinkererNightImage}
                        alt="tinkererNight illustration"
                        />
                        <div className={styles["tinkererNight-text"]}>
                            <div className={styles["text-section"]}>
                                <Typography variant={"body"}>
                                {data[0].tinkererNightDescription[0]}
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>{data[0].tinkererNightDescription[1]}</strong> {data[0].tinkererNightDescription[2]}
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>{data[0].tinkererNightDescription[3]}</strong> {data[0].tinkererNightDescription[4]}
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>{data[0].tinkererNightDescription[5]}</strong> {data[0].tinkererNightDescription[6]}
                                </Typography>
                            </div>
                        </div>
                    </section>
                    )}
                    <Typography variant={"smallHeading"}>Tinkering Projects Sharing Session</Typography>
                    <Typography variant={"body"}>
                      {data[0].tinkererProjectDescription}
                    </Typography>
                      <div className={styles["custom-photo-layout"]}>
                        {[0, 1, 2, 3, 4].map((i) => {
                          const img = data[i]?.tinkererProjectImages?.[0];
                          const descRaw = data[i]?.tinkererProjectDescriptions || "";
                          const desc = Array.isArray(descRaw) ? descRaw[0] : descRaw.split(/\r?\n/)[0];

                          return (
                            img && (
                              <Card
                                key={i}
                                image={img}
                                bottomText={desc}
                                bottomTextClassName={styles["sharing-cards-bottom-text"]}
                              />
                            )
                          );
                        })}
                      </div>
                  </div> 
              </div> 
            </section>

            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>FREQUENTLY ASKED QUESTIONS</Typography>
              <PageGap>
              <AccordionRoot type="single" collapsible>
                {data.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>
                      <Typography variant="smallHeading">{item.faq}</Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className={styles["faq-container"]}>
                        {item.answers.map((ans, i) => (
                          <Typography key={i} variant="body">
                            {index === 0 && i === 1 ? (
                              <a
                                href="/assigned_projects"
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

export default TinkeringProjects;