import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import { ReactComponent as FileUpload } from "../../icons/file_upload.svg";

import styles from "./ContactUs.module.css";
import Button from "../../components/button/Button";

const ContactUs = () => {
    return (
        <Transition>
            <PageTemplate>
                <div className={styles["content-wrapper"]}>
                    <section className={styles["contact"]}>
                        <div className={styles["header-one"]}>
                            <Typography variant="heading">REEEACH OUT!</Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body">Have some curious questions, inquiries or feedback about Garage@EEE? Contact us here or through our email</Typography>
                        </div>
                        <form>
                            <div className={styles["form-title"]}>
                                <Typography variant="smallHeading">Contact Form</Typography>
                                <Typography variant="subtitle">Fill up the form below to send us a message</Typography>
                            </div>
                            <div className={styles["form-fields"]}>
                                <div className={styles["name-container"]}>
                                    <div className={styles["input-box"]}>
                                        <Typography variant="body">First Name</Typography>
                                        <input type="text" className={styles["field"]} placeholder="Enter your first name" required />
                                    </div>
                                    <div className={styles["input-box"]}>
                                        <Typography variant="body">Last Name</Typography>
                                        <input type="text" className={styles["field"]} placeholder="Enter your last name" required />
                                    </div>
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Email</Typography>
                                    <input type="text" className={styles["field"]} placeholder="Enter your email" required />
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Phone Number</Typography>
                                    <input type="text" className={styles["field"]} placeholder="+65 1234 5678" required />
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">What is your enquiry about?</Typography>
                                    <select className={styles["field"]} required>
                                        <option value="" disabled selected>Select a category</option>
                                        <option value="facilities">Facilities</option>
                                        <option value="tinkering-project">Tinkering Project</option>
                                        <option value="flagship-events">Flagship Events</option>
                                        <option value="industrial-partner">Industrial Partner</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Your Message</Typography>
                                    <textarea name="" id="" className={`${styles["field"]} ${styles["message"]}`} placeholder="Enter your message" required></textarea>
                                </div>
                                <div className={styles["upload-file-container"]}>
                                    <div className={styles["upload-title"]}>
                                        <Typography variant="body">Upload Files (if any)</Typography>
                                        <Typography variant="subtitle">Select and upload files of your choice</Typography>
                                    </div>
                                    <div className={styles["upload-box"]}>
                                        <FileUpload />
                                        <Typography variant="body">
                                            <p>Choose a file or drag & drop it here</p>
                                            <p className={styles["upload-text"]}>in JPG, PNG, PDF, DOCX, MP4 formats, up to 50MB</p>
                                        </Typography>
                                        <Button to={"/contact-us"} variant="outlined">Browse Files</Button>
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Send Message</button>
                            <div className={styles["privacy-text"]}>
                                <Typography variant="subtitle">By submitting the form, you consent to the terms stated in this Personal Data Privacy Statement</Typography>
                            </div>
                        </form>
                    </section>
                    <section className={styles["address"]}>
                        <div className={styles["header-one"]}>
                            <Typography variant="heading">ADDRESS & MAP</Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body">
                                <p><b>Garage@EEE Workshop:</b></p>
                                <p>50 Nanyang Ave, Nanyang Technological University</p>
                                <p>Singapore, S5639798</p>
                            </Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body"><b>Opening Hours: </b>Weekdays 9am - 5pm</Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body"><b>Email: </b>ntugarageeee@gmail.com</Typography>
                        </div>
                    </section>
                </div>
            </PageTemplate>
        </Transition>
    );
}

export default ContactUs;