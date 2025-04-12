import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Typography from "../typography/Typography";
import styles from "./FileUploader.module.css";
import Button from "../../components/button/Button";
import { ReactComponent as FileUpload } from "../../icons/file_upload.svg";

const FileUploader = ({ onFilesReady }) => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            name: file.name,
            progress: 0,
            status: "pending"
        }));

        setFiles(prev => [...prev, ...newFiles]);

        const rawFiles = newFiles.map(f => f.file);
        if (onFilesReady) onFilesReady(rawFiles);
    }, [onFilesReady]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/mp4",
        maxSize: 50 * 1024 * 1024,
    });

    return (
        <div className={styles["file-wrapper"]}>
            <div className={styles["upload-box"]} {...getRootProps()}>
                <input {...getInputProps()} />
                <FileUpload />
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

            {/* File List */}
            <div className={styles["file-list"]}>
                {files.map((file, index) => (
                    <div key={index} className={styles["file-item"]}>
                        <Typography variant="body">{file.name}</Typography>
                        <div className={styles["progress-container"]}>
                            <progress value={file.progress} max="100">{file.progress}%</progress>
                            <span>{file.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
