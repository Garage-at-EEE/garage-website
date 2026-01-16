import { useState } from "react";
import { Link } from "react-router-dom";
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
        setMessageStatus("");
        setIsLoading(true);

        const { firstName, lastName, email, phone, category, message } = formData;

        if (!firstName || !lastName || !email || !phone || !category || !message) {
            setMessageStatus("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        try {
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
            setIsLoading(false);
        }
    };


    return (
        <Transition>
            <PageTemplate>
                <main className={styles["layout-container"]}>
                    <div className={styles["layout-content"]}>
                        <div className={styles["breadcrumbs"]}>
                            <Link to="/" className={styles["breadcrumb-link"]}>Home</Link>
                            <span className={`material-icons ${styles["breadcrumb-separator"]}`}>chevron_right</span>
                            <span className={styles["breadcrumb-current"]}>Contact Us</span>
                        </div>

                        <div className={styles["split-layout"]}>
                            <section className={styles["main-column"]}>
                                <div className={styles["title-block"]}>
                                    <h1 className={styles["page-title"]}>Get in Touch</h1>
                                    <p className={styles["page-subtitle"]}>
                                        Have some curious questions, inquiries or feedback about Garage@EEE? Contact us here or through our email.
                                    </p>
                                </div>

                                <form className={styles["form"]} onSubmit={handleSubmit}>
                                    <div className={styles["form-fields"]}>
                                        <div className={styles["name-container"]}>
                                            <div className={styles["input-box"]}>
                                                <label className={styles["field-label"]}>First Name</label>
                                                <input
                                                    type="text"
                                                    className={styles["field"]}
                                                    placeholder="Enter your first name"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required />
                                            </div>
                                            <div className={styles["input-box"]}>
                                                <label className={styles["field-label"]}>Last Name</label>
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
                                            <label className={styles["field-label"]}>Email</label>
                                            <input
                                                type="email"
                                                className={styles["field"]}
                                                placeholder="your@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required />
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <label className={styles["field-label"]}>Phone Number</label>
                                            <input
                                                type="tel"
                                                className={styles["field"]}
                                                placeholder="+65 1234 5678"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required />
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <label className={styles["field-label"]}>What is your enquiry about?</label>
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
                                            <label className={styles["field-label"]}>Your Message</label>
                                            <textarea
                                                className={`${styles["field"]} ${styles["message"]}`}
                                                placeholder="Tell us more about your inquiry..."
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                required>
                                            </textarea>
                                        </div>
                                        <div className={styles["upload-file-container"]}>
                                            <div className={styles["upload-title"]}>
                                                <label className={styles["field-label"]}>Upload Files (if any)</label>
                                                <span className={styles["upload-subtitle"]}>Select and upload files of your choice</span>
                                            </div>
                                            <FileUploader key={resetKey} onFilesReady={handleFilesReady} />
                                        </div>
                                    </div>
                                    <div className={styles["submit-group"]}>
                                        {messageStatus && (
                                            <div className={styles["submit-text"]}>
                                                <Typography variant="subtitle">{messageStatus}</Typography>
                                            </div>
                                        )}
                                        <button type="submit" className={styles["submit-button"]} disabled={isLoading}>
                                            <span>{isLoading ? "Sending..." : "Send Message"}</span>
                                            {isLoading ? (
                                                <div className={styles["spinner"]}></div>
                                            ) : (
                                                <span className="material-icons">send</span>
                                            )}
                                        </button>
                                    </div>
                                    <p className={styles["privacy-text"]}>
                                        By submitting the form, you consent to the terms stated in this Personal Data Privacy Statement
                                    </p>
                                </form>
                            </section>

                            <aside className={styles["sidebar-column"]}>
                                <div className={styles["info-card"]}>
                                    <div className={styles["card-header"]}>
                                        <span className={styles["card-accent"]}></span>
                                        <h3 className={styles["card-title"]}>Contact Info</h3>
                                    </div>
                                    <div className={styles["info-items"]}>
                                        <div className={styles["info-item"]}>
                                            <div className={`${styles["info-icon"]} ${styles["icon-blue"]}`}>
                                                <span className="material-icons">location_on</span>
                                            </div>
                                            <div className={styles["info-content"]}>
                                                <h4 className={styles["info-title"]}>Visit Us</h4>
                                                <p className={styles["info-text"]}>
                                                    Garage@EEE Office<br />
                                                    S2.2-B4-05, 50 Nanyang Ave<br />
                                                    Nanyang Technological University<br />
                                                    Singapore 639798
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles["info-item"]}>
                                            <div className={`${styles["info-icon"]} ${styles["icon-pink"]}`}>
                                                <span className="material-icons">mail</span>
                                            </div>
                                            <div className={styles["info-content"]}>
                                                <h4 className={styles["info-title"]}>Email Us</h4>
                                                <a href="mailto:ntugarageeee@gmail.com" className={styles["info-link"]}>
                                                    ntugarageeee@gmail.com
                                                </a>
                                            </div>
                                        </div>
                                        <div className={styles["info-item"]}>
                                            <div className={`${styles["info-icon"]} ${styles["icon-green"]}`}>
                                                <span className="material-icons">schedule</span>
                                            </div>
                                            <div className={styles["info-content"]}>
                                                <h4 className={styles["info-title"]}>Opening Hours</h4>
                                                <p className={styles["info-text"]}>
                                                    Weekdays 9am - 5pm
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles["social-section"]}>
                                            <h4 className={styles["social-title"]}>Follow Us</h4>
                                            <div className={styles["social-links"]}>
                                                <a href="https://www.instagram.com/garage_at_eee/" target="_blank" rel="noreferrer" className={styles["social-link"]} title="Instagram">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                    </svg>
                                                </a>
                                                <a href="https://www.linkedin.com/company/garage-eee/" target="_blank" rel="noreferrer" className={styles["social-link"]} title="LinkedIn">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                    </svg>
                                                </a>
                                                <a href="https://github.com/Garage-at-EEE" target="_blank" rel="noreferrer" className={styles["social-link"]} title="GitHub">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles["map-wrapper"]}>
                                    <GoogleMapComponent />
                                </div>
                            </aside>
                        </div>
                    </div>
                </main>
            </PageTemplate>
        </Transition>
    );
};

export default ContactUs;