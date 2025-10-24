import { useState } from "react";
import Typography from "../../components/typography/Typography";
import Transition from "../../components/transition/Transition";
import PageTemplate from "../../components/pageTemplate/PageTemplate";
import axios from "axios";

import styles from "./ContactUs.module.css";
import FileUploader from "../../components/fileUploader/FileUploader";
import GoogleMapComponent from "../../components/GoogleMap/GoogleMapComponent";
import { CONTACT_US_UPLOAD_DOMAIN } from "../../utils/Constants";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        category: "",
        message: "",
    });

    const [filesToUpload, setFilesToUpload] = useState([]);
    const [resetKey, setResetKey] = useState(0);
    const [messageStatus, setMessageStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFilesReady = (newFiles) => {
        setFilesToUpload(newFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessageStatus(""); // Clear previous messages
        setIsLoading(true); // Show loading spinner

        const { firstName, lastName, email, phone, category, message } = formData;

        if (!firstName || !lastName || !email || !phone || !category || !message) {
            setMessageStatus("Please fill in all required fields.");
            setIsLoading(false); // Hide loading spinner
            return;
        }

        try {
            // Prepare files payload
            const filesPayload = await Promise.all(filesToUpload.map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64Data = reader.result.split(",")[1];
                    resolve({ fileName: file.name, fileContent: base64Data });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            })));

            const payload = {
                ...formData,
                files: filesPayload.length > 0 ? filesPayload : [],
                type: "contactUs"
            };

            const response = await axios.post(CONTACT_US_UPLOAD_DOMAIN, JSON.stringify(payload), {
                headers: { 
                    "Content-Type": "text/plain;charset=utf-8",
                },
            });
            console.log("Response from server:", response);

            if (!response.data.success) throw new Error(response.data.error);

            setMessageStatus("Form submitted successfully. We will get back to you soon!");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                category: "",
                message: "",
            });
            setFilesToUpload([]);
            setResetKey(prevKey => prevKey + 1);
        } catch (error) {
            console.error("Error during submission:", error);
            setMessageStatus("Submission failed. Please try again.");
        } finally {
            setIsLoading(false); // Hide loading spinner after form is submitted successfully
        }
    };


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
                        <form className={styles["form"]}>
                            <div className={styles["form-title"]}>
                                <Typography variant="smallHeading">Contact Form</Typography>
                                <Typography variant="subtitle">Fill up the form below to send us a message</Typography>
                            </div>
                            <div className={styles["form-fields"]}>
                                <div className={styles["name-container"]}>
                                    <div className={styles["input-box"]}>
                                        <Typography variant="body">First Name</Typography>
                                        <input
                                            type="text"
                                            className={styles["field"]}
                                            placeholder="Enter your first name"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required />
                                    </div>
                                    <div className={styles["input-box"]}>
                                        <Typography variant="body">Last Name</Typography>
                                        <input
                                            type="text"
                                            className={styles["field"]}
                                            placeholder="Enter your last name"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required />
                                    </div>
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Email</Typography>
                                    <input
                                        type="text"
                                        className={styles["field"]}
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required />
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Phone Number</Typography>
                                    <input
                                        type="text"
                                        className={styles["field"]}
                                        placeholder="+65 1234 5678"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required />
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">What is your enquiry about?</Typography>
                                    <select className={styles["field"]}
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required>
                                        <option value="" disabled>Select a category</option>
                                        <option value="Facilities">Facilities</option>
                                        <option value="Tinkering-project">Tinkering Project</option>
                                        <option value="Flagship-events">Flagship Events</option>
                                        <option value="Industrial-partner">Industrial Partner</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <div className={styles["input-box"]}>
                                    <Typography variant="body">Your Message</Typography>
                                    <textarea
                                        className={`${styles["field"]} ${styles["message"]}`}
                                        placeholder="Enter your message"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required>
                                    </textarea>
                                </div>
                                <div className={styles["upload-file-container"]}>
                                    <div className={styles["upload-title"]}>
                                        <Typography variant="body">Upload Files (if any)</Typography>
                                        <Typography variant="subtitle">Select and upload files of your choice</Typography>
                                    </div>
                                    <FileUploader key={resetKey} onFilesReady={handleFilesReady} />
                                </div>
                            </div>
                            <div className={styles["submit-group"]}>
                                <div className={styles["submit-text"]}>
                                    <Typography variant="subtitle" className={styles["submit-text"]}>{messageStatus}</Typography>
                                </div>
                                <button type="submit" onClick={handleSubmit} disabled={isLoading}>
                                    {isLoading ? "Sending..." : "Send Message"}
                                    {isLoading && <div className={styles["spinner"]}></div>}
                                </button>
                            </div>
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
                            <Typography variant="body"><b>Garage@EEE Office:</b></Typography>
                            <Typography variant="body">S2.2-B4-05</Typography>
                            <Typography variant="body">50 Nanyang Ave</Typography>
                            <Typography variant="body">Nanyang Technological University</Typography>
                            <Typography variant="body">639798 Singapore</Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body"><b>Opening Hours: </b>Weekdays 9am - 5pm</Typography>
                        </div>
                        <div className={styles["body-text"]}>
                            <Typography variant="body"><b>Email: </b>ntugarageeee@gmail.com</Typography>
                        </div>

                        <GoogleMapComponent />
                    </section>
                </div>
            </PageTemplate>
        </Transition>
    );
};

export default ContactUs;