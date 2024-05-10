import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Typography from "../typography/Typography";
import useBreakpoint from "../../hooks/useBreakpoint";
import { ReactComponent as Logo } from "../../icons/header.svg";
import { ReactComponent as Menu } from "../../icons/menu.svg";
import { ReactComponent as Close } from "../../icons/close.svg";
import Gutter from "../pageTemplate/gutter/Gutter";
import Modal from "../modal/Modal";

import styles from "./Header.module.css";

const MenuButton = ({ open, setOpen }) => {
  const handleClick = (e) => {
    setOpen((prev) => !prev);
  };

  const anim = {
    initial: {
      rotate: "-30deg",
    },
    animate: {
      rotate: "0deg",
      transition: {
        ease: [0, 0.8, 0.25, 1.4],
        duration: 0.3,
      },
    },
  };

  return (
    <button
      className={styles["button"]}
      aria-label="Menu button"
      aria-pressed={open}
      onClick={handleClick}
    >
      {open ? (
        <motion.div key="close" {...anim}>
          <Close />
        </motion.div>
      ) : (
        <motion.div key="menu" {...anim}>
          <Menu />
        </motion.div>
      )}
    </button>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);

  const breakpoint = useBreakpoint();

  const { scrollY } = useScroll();
  const [shadow, setShadow] = useState(false);

  const topPaddings = {
    desktop: 60,
    tablet: 60,
    mobile: 40,
  };

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y >= topPaddings[breakpoint] && !shadow) setShadow(true);
    else if (y < topPaddings[breakpoint] && shadow) setShadow(false);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const navlinks = [
    {
      label: "Projects",
      to: "/projects",
    },
    {
      label: "Events",
      to: "/events",
    },
    {
      label: "Facilities",
      to: "/facilities",
    },
    {
      label: "Newsletter",
      to: "/newsletter",
    },
  ];

  useEffect(() => {
    if (breakpoint !== "mobile") handleClose();
  }, [breakpoint]);

  return (
    <>
      <header
        className={[styles.header, (shadow || open) && styles["shadow"]]
          .filter(Boolean)
          .join(" ")}
      >
        <Gutter>
          <div className={styles["header-inner"]}>
            <Link to="/" onClick={handleClose}>
              <Logo />
            </Link>
            {breakpoint !== "mobile" ? (
              <nav className={styles["nav"]}>
                {navlinks.map((navlink) => (
                  <Link
                    key={navlink.label}
                    to={navlink.to}
                    className={styles["navlink"]}
                  >
                    <Typography variant="body">{navlink.label}</Typography>
                  </Link>
                ))}
              </nav>
            ) : (
              <MenuButton open={open} setOpen={setOpen} />
            )}
          </div>
          {breakpoint === "mobile" && (
            <motion.nav
              className={styles["drawer"]}
              initial={false}
              animate={open ? { height: "auto" } : { height: 0 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            >
              <AnimatePresence>
                {open && (
                  <motion.div
                    className={styles["drawer-inner"]}
                    initial={false}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.7, 0, 0.3, 1],
                    }}
                  >
                    <div className={styles["separator"]} />
                    {navlinks.map((navlink, index) => (
                      <div
                        key={navlink.label}
                        style={{ animationDelay: `${0.1 * index}s` }}
                        className={styles["mobile-link"]}
                      >
                        <Link
                          to={navlink.to}
                          className={styles["navlink"]}
                          onClick={handleClose}
                        >
                          <Typography variant="body">
                            {navlink.label}
                          </Typography>
                        </Link>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          )}
        </Gutter>
      </header>
      <Modal open={open} onClose={handleClose} below />
    </>
  );
};

export default Header;
