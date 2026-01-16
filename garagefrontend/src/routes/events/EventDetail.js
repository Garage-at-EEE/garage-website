import { useParams, Link } from "react-router-dom";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";

import styles from "./EventDetail.module.css";

function EventDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=events&index=" + id,
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <main className={styles["layout-container"]}>
            <div className={styles["layout-content"]}>
              <div className={styles["split-layout"]}>
                <div className={styles["main-column"]}>
                  <nav className={styles["breadcrumbs"]}>
                    <Link to="/" className={styles["breadcrumb-link"]}>Home</Link>
                    <span className={styles["breadcrumb-separator"]}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                    <Link to="/events" className={styles["breadcrumb-link"]}>Events</Link>
                    <span className={styles["breadcrumb-separator"]}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                    <span className={styles["breadcrumb-current"]}>{data.name}</span>
                  </nav>

                  <div className={styles["title-block"]}>
                    <h1 className={styles["page-title"]}>{data.name}</h1>
                    {data.tagline && (
                      <p className={styles["page-subtitle"]}>{data.tagline}</p>
                    )}
                  </div>

                  <div className={styles["divider"]} />

                  <div className={styles["content-sections"]}>
                    {data.description && (
                      <section className={styles["content-section"]}>
                        <div className={styles["section-header"]}>
                          <div className={styles["section-icon"]}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M12 16v-4M12 8h.01" />
                            </svg>
                          </div>
                          <h2 className={styles["section-title"]}>About this Event</h2>
                        </div>
                        <div className={styles["prose"]}>
                          {data.description.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    )}
                  </div>
                </div>

                <div className={styles["sidebar-column"]}>
                  {data.coverPic && (
                    <div className={styles["hero-image-wrapper"]}>
                      <div className={styles["hero-overlay"]} />
                      <img
                        src={data.coverPic}
                        alt={data.name}
                        className={styles["hero-image"]}
                      />
                    </div>
                  )}

                  <div className={styles["info-card"]}>
                    <h3 className={styles["card-title"]}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                      Event Info
                    </h3>
                    <div className={styles["card-content"]}>
                      <div className={styles["info-item"]}>
                        <div className={styles["info-icon"]}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <div className={styles["info-text"]}>
                          <span className={styles["info-label"]}>Event Type</span>
                          <span className={styles["info-value"]}>Garage Event</span>
                        </div>
                      </div>
                      {data.links && (
                        <div className={styles["info-item"]}>
                          <div className={styles["info-icon"]}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                          </div>
                          <div className={styles["info-text"]}>
                            <span className={styles["info-label"]}>Links</span>
                            <a 
                              href={data.links.split(",")[0]} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={styles["info-link"]}
                            >
                              View on Instagram
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link to="/events" className={styles["card-btn"]}>
                      <span>View All Events</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {data.photos && data.photos.length > 0 && (
                <section className={styles["gallery-section"]}>
                  <div className={styles["gallery-header"]}>
                    <div>
                      <h3 className={styles["gallery-title"]}>Event Gallery</h3>
                      <p className={styles["gallery-subtitle"]}>Highlights from this event</p>
                    </div>
                  </div>
                  <div className={styles["masonry-grid"]}>
                    {data.photos.map((photo, index) => (
                      <div key={index} className={styles["masonry-item"]}>
                        <img src={photo} alt={`${data.name} - ${index + 1}`} />
                        <div className={styles["masonry-overlay"]} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </main>
        )}
      </PageTemplate>
    </Transition>
  );
}

export default EventDetail;
