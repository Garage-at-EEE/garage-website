import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Typography from "../typography/Typography";
import styles from "./FileUploader.module.css";
import Button from "../../components/button/Button";

// App Script URL
const UPLOAD_URL = "https://script.google.com/macros/s/AKfycbwBbRwkY483tciCd4RRxu2DJ48knBKrv5JqAQjJDLXOSntqi-K842zksbaseLCIg3Dr3g/exec";

const FileUploader = () => {

    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [message, setMessage] = useState("");

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.forEach((file) => {
            if (file instanceof Blob) {
                uploadFile(file);
            } else {
                console.error("Invalid file type:", file);
            }
        });
    }, []);

    // Upload file to Google Apps Script
    const uploadFile = async (file) => {
        setUploading(true);
        setProgress(0);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Data = reader.result.split(",")[1];

            const payload = {
                fileName: file.name,
                fileContent: base64Data,
            };

            try {
                const response = await axios.post(UPLOAD_URL, payload, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    onUploadProgress: (event) => {
                        if (event.total) {
                            const percent = Math.round((event.loaded / event.total) * 100);
                            setProgress(percent);
                        }
                    }
                });

                console.log("Server Response:", response.data);

                setUploading(false);
                if (response.data.success) {
                    setUploadedFile({ name: file.name, url: response.data.fileUrl });
                    setMessage("Upload complete!");
                } else {
                    console.error("Upload failed:", response.data.error);
                    setMessage("Upload failed!");
                }

            } catch (error) {
                console.error("Upload error:", error.response?.data || error.message);
                setUploading(false);
                setMessage("Upload error. Please try again.");
            }
        };
    };


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/mp4",
        maxSize: 50 * 1024 * 1024,
    });

    return (
        <div className={styles["file-wrapper"]}>
            <div className={styles["upload-box"]} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <Typography variant="body">
                            <p>Drop the files here ...</p>
                        </Typography> :
                        <Typography variant="body">
                            <p>Choose a file or drag & drop it here</p>
                            <p className={styles["upload-text"]}>in JPG, PNG, PDF, DOCX, MP4 formats, up to 50MB</p>
                        </Typography>
                }

                <Button to={"/contact-us"} variant="outlined">Browse Files</Button>
            </div>

            {/* Progress Bar */}
            {
                uploading && (
                    <div className={styles["progress-container"]}>
                        <progress value={progress} max="100">{progress}%</progress>
                        <p>{progress}%</p>
                    </div>
                )
            }

            {/* Uploaded file details */}
            {
                uploadedFile && (
                    <div className={styles["file-info"]}>
                        <Typography variant="body">
                            <p>{uploadedFile.name} Completed</p>
                        </Typography>
                    </div>
                )
            }

            {/* Upload message */}
            {
                message && (
                    <Typography variant="body">
                        <p className={styles["upload-message"]}>{message}</p>
                    </Typography>
                )
            }
        </div>
    );
};

export default FileUploader;
