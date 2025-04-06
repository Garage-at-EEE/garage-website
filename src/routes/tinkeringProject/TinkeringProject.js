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
//const params = useParams();
//const id = params.id;
// const { data, isLoading } = useFetch({
//     url: API_DOMAIN + "?type=tinkering&index=" + id,
//   });
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=home",
  });
  const { data: tinkeringData } = useFetch({
    url: API_DOMAIN + "?type=tinkering&fields=name,tinkeringImage",
  });
  const { data: ambassadorData } = useFetch({
    url: API_DOMAIN + "?type=ambassadors&fields=name,homeImage",
  });

  return (
    <Transition isLoading={isLoading}>
      {!isLoading && (
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
              <Typography variant="heading">Garage@EEE Start-up development</Typography>
              <Image
                className={styles["banner-image"]}
                src={data.bannerImage}
                alt="Tinkering Cover"
              />
            </div>
            <section className={styles["section-wrapper"]}>
              {/* Intro section */}
              <Typography variant="heading">Introduction</Typography>
              <Typography variant="body">
              Tinkering Projects support students in exploring technologies they are interested in or in spearheading their mini-projects with funding, equipment, and facilities provided. 
              It is a one-semester endeavor that requires Tinkerers to attend bi-weekly update sessions. 
              At the end of the semester, Tinkerers will present their final products to fellow tinkerers and mentors in a sharing session.
              </Typography>
            
              {/* Join section */} 
              <Typography variant="heading">How Can I Join?</Typography> 
              <div className={styles["join-text"]}> 
                  <div className={styles["text-section"]}> 
                    <Typography variant="smallHeading">Send in your proposal for an idea or a project that you have in mind in the sign-up form!</Typography> 
                    <Typography variant="body">Both individual applicants and groups must include at least one NTU EEE student.</Typography> 
                    <div> 
                    <Button  
                      style={{ width: '100%', textAlign: 'center', padding: '1rem' }} 
                      onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSejqiZy4ggazdTJYQBebvnmH4Tqh0IizxJZ4ydAapymEOluYQ/viewform?usp=sf_link', '_blank')} variant="filled">
                      Register now by 21 Jan! 
                    </Button> 
                    </div> 
                  </div> 
              </div> 
               
              {/* Garage Assigned section */} 
              <Typography variant="heading">Alternatively,</Typography> 
              <div className={styles["garage-assigned-text"]}> 
                  <div className={styles["text-section"]}> 
                      <Typography variant="smallHeading">Join Garage Assigned Project and work with other peers</Typography> 
                      <Typography variant="body">Garage Assigned Projects are a list of projects from other Tinkering Projects teams that are looking for peers to collaborate with.  
                        By joining these projects, you will have the opportunity to work alongside experienced makers, gain hands-on experience, and build friendships through teamwork.<br /><br /> 
                        Refer to the provided spreadsheet to explore available projects and their expectations!</Typography> 

                  </div> 
              </div> 
              <div>
                  <Grid desktop={3} tablet={2} mobile={1}>
                    {ambassadorData.map((card, index) => (
                        <Card
                        key={card.name}
                        image={card.homeImage}
                        bottomText={
                            <>
                            <Typography variant="body" style={{ textAlign: "center" }}>
                                Presentation and Mentors Feedback Session
                            </Typography>
                            </>
                        }
                        to={"tinker/" + index}
                        />
                    ))}
                  </Grid>
              </div>
              <div>
                <Button  
                  style={{ width: '100%', textAlign: 'center', padding: '1rem' }} 
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSejqiZy4ggazdTJYQBebvnmH4Tqh0IizxJZ4ydAapymEOluYQ/viewform?usp=sf_link')} variant="filled"> 
                  View All 
                </Button> 
              </div>
            </section>
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>SUPPPORT</Typography>
              {ambassadorData ? (
                <Grid>
                  {ambassadorData.map((card, index) => (
                    <Card
                      key={card.name}
                      image={card.homeImage}
                      bottomText={
                        <>
                        <div style={{ textAlign: 'center' }}>
                            <Typography variant="smallHeading">FUNDING</Typography>
                            <Typography variant="body">Up to $5000</Typography>
                        </div>
                        </>
                      }
                      to={"tinker/" + index}
                    />
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
                <div className={styles["join-text"]}> 
                  <div className={styles["text-section"]}> 
                    <Typography variant={"smallHeading"}>Tinkerer's Night</Typography>
                    {data && (
                    <section className={styles["innovators"]}>
                        <Image
                        className={styles["innovators-image"]}
                        objectFit="contain"
                        src={data.innovatorsImage}
                        alt="Innovators illustration"
                        />
                        <div className={styles["innovators-text"]}>
                            <div className={styles["text-section"]}>
                                <Typography variant={"body"}>
                                Tinkerer's Night is a biweekly event where tinkerers gather to work on personal or collaborative projects. 
                                It serves as a platform for sharing ideas, exchanging skills, and exploring creative solutions in a casual, hands-on environment.
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>Date:</strong> Every even school week Wednesday
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>Time:</strong> 7:00 pm - 9:00 pm
                                </Typography>
                                <Typography variant={"body"}>
                                <strong>Venue:</strong> Garage@EEE
                                </Typography>
                            </div>
                        </div>
                    </section>
                    )}
                <Typography variant={"smallHeading"}>Tinkering Projects Sharing Session</Typography>
                <Typography variant={"body"}>
                    During this casual session, students who have been working on their mini-projects within the Tinkering Projects platform share their semester-long journey and showcase their prototypes. 
                    It’s an opportunity for participants to exchange ideas with fellow tinkerers, and receive feedback from mentors, including professors and experienced makers.
                </Typography>
                <Grid desktop={3} tablet={2} mobile={1}>
                    {ambassadorData.map((card, index) => (
                        <Card
                        key={card.name}
                        image={card.homeImage}
                        bottomText={
                            <>
                            <Typography variant="body" style={{ textAlign: "center" }}>
                                Presentation and Mentors Feedback Session
                            </Typography>
                            </>
                        }
                        to={"tinker/" + index}
                        />
                    ))}
                </Grid>
                  </div> 
              </div> 
            </section>
            <section className={styles["section-wrapper"]}>
              <Typography variant={"heading"}>FREQUENTLY ASKED QUESTIONS</Typography>
                <PageGap>
                    <AccordionRoot type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <Typography variant="smallHeading">Can I join Tinkering Project if I have no idea in mind?</Typography>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className={styles["faq-container"]}>
                                    <Typography variant="body">Yes. You may join Garage Assigned Projects and work with other peers. We will provide the same support as other tinkerers!</Typography>
                                    <Typography variant="body">
                                        <a
                                            href="https://sites.google.com/d/1375GO9eR4xEgVgK-hdt964GvOFG7iJHi/p/1vrnWRM6KpcNQkk7pSXPpv31h6rmF1FXw/edit"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={styles["faq-link"]}
                                        >
                                            Learn more about Garage Assigned Projects
                                        </a>
                                    </Typography>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <Typography variant="smallHeading">What kind of ideas or projects can be shortlisted in the Tinkering Projects track?</Typography>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className={styles["faq-container"]}>
                                    <Typography variant="body">We welcome projects that explore new technologies, innovate existing solutions, or bring creative concepts to life. </Typography>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <Typography variant="smallHeading">What role do Garage committee members play in supporting Tinkering Projects?</Typography>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className={styles["faq-container"]}>
                                    <Typography variant="body">Our committee member will help you review the proposal, manage the resources and monitor your project progress.</Typography>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <Typography variant="smallHeading">Can I work in teams on Tinkering Projects, or is it more individual-focused? </Typography>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className={styles["faq-container"]}>
                                    <Typography variant="body">We welcome you to sign up as a team or individually. 
                                    Whether you are working alone or in a group, you will have the opportunity to explore, create, and innovate within the Tinkering Projects track.
                                    </Typography>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>
                                <Typography variant="smallHeading">What is the application process for the Tinkering Project? </Typography>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className={styles["faq-container"]}>
                                    <Typography variant="body">You will start by submitting a detailed project proposal outlining your idea and objectives. After submission, we will invite you to attend an interview to know more about your ideas. 
                                    After submission, we will invite you to attend an interview to know more about your ideas. Once approved, you are eligible for the funding and gain garage access.
                                    </Typography>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        
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
