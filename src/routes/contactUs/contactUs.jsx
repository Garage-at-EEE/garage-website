import Typography from "../../components/typography/Typography";

import styles from "./ContactUs.module.css";

const ContactUs = () => {
    return (
        <div className={styles.contentWrapper}>
            <section className={styles.contact}>
                <div className={styles.headerOne}>
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
            <section className={styles.address}>
                <div className={styles.headerOne}>
                    <Typography variant="heading">ADDRESS & MAP</Typography>
                </div>
                <div className={styles.bodyText}>
                    <Typography variant="body">
                        <p><b>Garage@EEE Workshop:</b></p>
                        <p>50 Nanyang Ave, Nanyang Technological University</p>
                        <p>Singapore, S5639798</p>
                    </Typography>
                </div>
                <div className={styles.bodyText}>
                    <Typography variant="body"><b>Opening Hours: </b>Weekdays 9am - 5pm</Typography>
                </div>
                <div className={styles.bodyText}>
                    <Typography variant="body"><b>Email: </b>ntugarageeee@gmail.com</Typography>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;