import React, { memo } from "react";
import useFetch from "../../hooks/useFetch";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import Typography from "../../components/typography/Typography";
import { API_DOMAIN } from "../../utils/Constants";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import styles from "./Facilities.module.css";

const getIcon = (iconName) => {
  const icons = {
    clock: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    box: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    location: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    tool: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
  };
  return icons[iconName] || icons.location;
};

const InfoCard = memo(({ icon, title, subtitle, color }) => {
  return (
    <div className={styles.infoCard}>
      <div className={`${styles.infoIcon} ${styles[`icon${color}`]}`}>
        {getIcon(icon)}
      </div>
      <div className={styles.infoText}>
        <Typography variant="body" className={styles.infoTitle}>
          {title}
        </Typography>
        <Typography variant="subtitle" className={styles.infoSubtitle}>
          {subtitle}
        </Typography>
      </div>
    </div>
  );
});

const BookableCard = memo(({ facility, index }) => {
  return (
    <motion.div
      className={styles.facilityCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={styles.facilityImageWrapper}>
        {facility.coverPic && (
          <img
            src={facility.coverPic}
            alt={facility.name}
            className={styles.facilityImage}
            loading="lazy"
          />
        )}
        <span className={`${styles.statusBadge} ${styles.statusBookable}`}>
          Bookable
        </span>
      </div>
      <div className={styles.facilityContent}>
        <div className={styles.facilityHeader}>
          <span className={styles.facilityIcon}>{getIcon("location")}</span>
          <Typography variant="smallHeading" className={styles.facilityTitle}>
            {facility.name}
          </Typography>
        </div>
        <Typography variant="body" className={styles.facilityDescription}>
          {facility.description}
        </Typography>
        {facility.tags && facility.tags.length > 0 && (
          <div className={styles.tagsList}>
            {facility.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.facilityAction}>
          {facility.link ? (
            <a href={facility.link} target="_blank" rel="noreferrer" className={styles.btnOutlined}>
              <span>{facility.label || "Book Now"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </a>
          ) : (
            <button className={styles.btnOutlined}>
              <span>{facility.label || "Book Now"}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const EquipmentCard = memo(({ facility, index }) => {
  return (
    <motion.div
      className={styles.facilityCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={styles.facilityImageWrapper}>
        {facility.coverPic && (
          <img
            src={facility.coverPic}
            alt={facility.name}
            className={styles.facilityImage}
            loading="lazy"
          />
        )}
        <span className={`${styles.statusBadge} ${styles.statusFacility}`}>
          Facility
        </span>
      </div>
      <div className={styles.facilityContent}>
        <div className={styles.facilityHeader}>
          <span className={styles.facilityIcon}>{getIcon("tool")}</span>
          <Typography variant="smallHeading" className={styles.facilityTitle}>
            {facility.name}
          </Typography>
        </div>
        <Typography variant="body" className={styles.facilityDescription}>
          {facility.description}
        </Typography>
        {facility.tags && facility.tags.length > 0 && (
          <div className={styles.tagsList}>
            {facility.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});

const Facilities = () => {
  const { data, isLoading } = useFetch({
    url: API_DOMAIN + "?type=facilities",
  });

  const infoCards = data?.infoCards || [
    { icon: "clock", title: "Open 24/7", subtitle: "For authorized members", color: "Green" },
    { icon: "shield", title: "Safety First", subtitle: "Induction required", color: "Orange" },
    { icon: "box", title: "Free Equipment", subtitle: "Use on site", color: "Purple" },
  ];

  const bookableSpaces = data?.facilities?.filter(f => f.isBookable || f.link) || data?.bookableSpaces || [];
  const equipment = data?.facilities?.filter(f => !f.isBookable && !f.link) || data?.equipment || [];

  return (
    <Transition isLoading={isLoading || !data}>
      <PageTemplate>
        {data && (
          <div className={styles.container}>
            <section className={styles.heroSection}>
              <Typography variant="heading" className={styles.heroTitle}>
                Our <span className={styles.highlight}>Facilities</span>
              </Typography>
              <Typography variant="body" className={styles.heroSubtitle}>
                {data.subtitle || "Explore our makerspace. Whether you need to solder a circuit, print a 3D model, or just brainstorm, we have the space for you."}
              </Typography>
            </section>

            <section className={styles.infoSection}>
              {infoCards.map((card, index) => (
                <InfoCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  color={card.color}
                />
              ))}
            </section>

            {bookableSpaces.length > 0 && (
              <section className={styles.facilitiesSection}>
                <Typography variant="smallHeading" className={styles.sectionHeading}>
                  Bookable Spaces
                </Typography>
                <div className={styles.facilitiesGrid}>
                  {bookableSpaces.map((facility, index) => (
                    <BookableCard
                      key={facility.name || index}
                      facility={facility}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            {equipment.length > 0 && (
              <section className={styles.facilitiesSection}>
                <Typography variant="smallHeading" className={styles.sectionHeading}>
                  Facilities & Equipment
                </Typography>
                <div className={styles.facilitiesGrid}>
                  {equipment.map((facility, index) => (
                    <EquipmentCard
                      key={facility.name || index}
                      facility={facility}
                      index={index}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className={styles.beforeBookSection}>
              <div className={styles.beforeBookIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div className={styles.beforeBookContent}>
                <Typography variant="smallHeading" className={styles.beforeBookTitle}>
                  Before you book
                </Typography>
                <Typography variant="body" className={styles.beforeBookText}>
                  All members must complete a mandatory safety induction before using the 3D printers or Laser Cutters. Please visit the{" "}
                  <Link to="/safety-training" className={styles.beforeBookLink}>
                    Safety Training
                  </Link>{" "}
                  page to get certified.
                </Typography>
              </div>
              <div className={styles.beforeBookAction}>
                <button className={styles.guidelinesBtn}>
                  View Guidelines
                </button>
              </div>
            </section>
          </div>
        )}
      </PageTemplate>
    </Transition>
  );
};

export default Facilities;
