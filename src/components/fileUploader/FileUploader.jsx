import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Typography from "../typography/Typography";
import styles from "./FileUploader.module.css";
import Button from "../../components/button/Button";

const UPLOAD_URL = "https://script.google.com/macros/s/AKfycbyGNEBA9xAnYoOCS2GUgMBIF8_pVse1jJQ3KYV0JtsCPduR7nLAsyJezc6CoEtsuRtq/exec";

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

    const uploadFile = async (file) => {
        setUploading(true);
        setProgress(0);

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = async () => {
            const fileName = file.name; // Get file name
            const fileContent = reader.result.split(",")[1]; // Extract Base64 content

            try {
                const response = await axios.post(UPLOAD_URL, { fileName, fileContent }, {
                    headers: { "Content-Type": "application/json" },
                    onUploadProgress: (event) => {
                        if (event.total) {
                            const percentComplete = Math.round((event.loaded / event.total) * 100);
                            setProgress(percentComplete);
                        }
                    },
                });

                console.log("Server Response:", response);  // Log response

                setUploading(false);
                setProgress(100);

                if (response.data.success) {
                    setMessage("Upload complete!");
                    setUploadedFile({ name: fileName, url: response.data.fileUrl });
                } else {
                    setMessage("Upload failed!");
                }
            } catch (error) {
                setUploading(false);
                setMessage("Upload error. Please try again.");
                console.error("Upload error:", error);
                console.log("Error response:", error.response);
            }
        };

        reader.onabort = () => {
            setUploading(false);
            setMessage("File reading was aborted");
        }
        reader.onerror = () => {
            setUploading(false);
            setMessage("File reading error.");
        }
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
