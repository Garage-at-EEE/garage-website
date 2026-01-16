import { useParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { API_DOMAIN } from "../../utils/Constants";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";

import styles from "./ProjectDetail.module.css";

function ProjectDetail() {
  const params = useParams();
  const id = params.id;
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=projectInfo&index=" + id,
  });

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <main className={styles["layout-container"]}>
            <div className={styles["layout-content"]}>
              {/* Breadcrumbs */}
              <nav className={styles["breadcrumbs"]}>
                <Link to="/" className={styles["breadcrumb-link"]}>Home</Link>
                <span className={styles["breadcrumb-separator"]}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
                <Link to="/projects" className={styles["breadcrumb-link"]}>Projects</Link>
                <span className={styles["breadcrumb-separator"]}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </span>
                <span className={styles["breadcrumb-current"]}>{data.name}</span>
              </nav>

              {/* Page Header */}
              <header className={styles["page-header"]}>
                <div className={styles["header-content"]}>
                  <h1 className={styles["page-title"]}>{data.name}</h1>
                  {data.tagline && (
                    <p className={styles["page-subtitle"]}>{data.tagline}</p>
                  )}
                </div>
                {data.event && (
                  <div className={styles["status-badge"]}>
                    <span className={styles["badge-text"]}>{data.event}</span>
                  </div>
                )}
              </header>

              {/* Split Layout */}
              <div className={styles["split-layout"]}>
                {/* Left Column - Content */}
                <div className={styles["main-column"]}>
                  {/* About Section */}
                  <section className={styles["content-section"]}>
                    <div className={styles["section-header"]}>
                      <div className={styles["section-icon"]}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 16v-4M12 8h.01" />
                        </svg>
                      </div>
                      <h2 className={styles["section-title"]}>About the Project</h2>
                    </div>
                    <div className={styles["prose"]}>
                      {data.description && data.description.split('\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  {/* Team Members Section */}
                  {data.teamMembers && data.teamMembers.length > 0 && (
                    <section className={styles["content-section"]}>
                      <div className={styles["section-header"]}>
                        <div className={styles["section-icon"]}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        </div>
                        <h2 className={styles["section-title"]}>Team Members</h2>
                      </div>
                      <ul className={styles["team-grid"]}>
                        {data.teamMembers.map((member, index) => (
                          <li key={index} className={styles["team-card"]}>
                            <div className={styles["team-avatar"]}>
                              {member.charAt(0).toUpperCase()}
                            </div>
                            <span className={styles["team-name"]}>{member}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>

                {/* Right Column - Visuals & Details */}
                <div className={styles["sidebar-column"]}>
                  {/* Hero Image */}
                  {data.coverPic && (
                    <div className={styles["hero-image-wrapper"]}>
                      <div className={styles["hero-overlay"]} />
                      <img
                        src={data.coverPic}
                        alt={data.name}
                        className={styles["hero-image"]}
                      />
                      {data.event && (
                        <div className={styles["hero-badge"]}>
                          {data.event}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Details Card */}
                  <div className={styles["details-card"]}>
                    <h3 className={styles["details-title"]}>Project Details</h3>
                    <div className={styles["details-list"]}>
                      {data.event && (
                        <div className={styles["detail-item"]}>
                          <div className={styles["detail-label"]}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Event</span>
                          </div>
                          <span className={styles["detail-value"]}>{data.event}</span>
                        </div>
                      )}
                      {data.teamMembers && (
                        <div className={styles["detail-item"]}>
                          <div className={styles["detail-label"]}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            <span>Team Size</span>
                          </div>
                          <span className={styles["detail-value"]}>{data.teamMembers.length} Members</span>
                        </div>
                      )}
                      {data.contactInfo && (
                        <div className={styles["detail-item"]}>
                          <div className={styles["detail-label"]}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                              <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span>Contact</span>
                          </div>
                          <span className={styles["detail-value"]}>{data.contactInfo}</span>
                        </div>
                      )}
                    </div>
                    <div className={styles["details-actions"]}>
                      <Link to="/projects" className={styles["btn-secondary"]}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="19" y1="12" x2="5" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        <span>Back to Projects</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Section */}
              {data.photos && data.photos.length > 0 && (
                <section className={styles["gallery-section"]}>
                  <div className={styles["gallery-header"]}>
                    <h2 className={styles["gallery-title"]}>
                      <span className={styles["title-accent"]} />
                      Project Gallery
                    </h2>
                  </div>
                  <div className={styles["gallery-grid"]}>
                    {data.photos.map((photo, index) => (
                      <div key={index} className={styles["gallery-item"]}>
                        <img src={photo} alt={`${data.name} - ${index + 1}`} />
                        <div className={styles["gallery-overlay"]}>
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        </div>
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

export default ProjectDetail;
