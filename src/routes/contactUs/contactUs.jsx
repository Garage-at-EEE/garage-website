import styles from "./ContactUs.module.css";

const ContactUs = () => {
    return (
        <section className={styles.contact}>
            <form>
                <h2>Contact Form</h2>
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
    );
}

export default ContactUs;