import Typography from "../../components/typography/Typography";

import styles from "./ContactUs.module.css";

const ContactUs = () => {
    return (
        <div className={styles.contentWrapper}>
            <section className={styles.contact}>
                <div className={styles.headerReach}>
                    <Typography variant="heading">REEEACH OUT!</Typography>
                </div>
                <div className={styles.bodyText}>
                    <Typography variant="body">Have some curious questions, inquiries or feedback about Garage@EEE? Contact us here or through our email</Typography>
                </div>
                <form>
                    <div className={styles.formTitle}>
                        <Typography variant="smallHeading">Contact Form</Typography>
                        <Typography variant="subtitle">Fill up the form below to send us a message</Typography>
                    </div>
                    <div className={styles.inputBox}>
                        <label>Full Name</label>
                        <input type="text" className={styles.field} placeholder="Enter your name" required />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Email</label>
                        <input type="email" className={styles.field} placeholder="Enter your email" required />
                    </div>
                    <div className={styles.inputBox}>
                        <label>Your Message</label>
                        <textarea name="" id="" className={`${styles.field} ${styles.mess}`} placeholder="Enter your message" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </div>
    );
}

export default ContactUs;