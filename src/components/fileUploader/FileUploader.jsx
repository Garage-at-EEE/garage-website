import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Typography from "../typography/Typography";
import styles from "./FileUploader.module.css";
import Button from "../../components/button/Button";
import { ReactComponent as FileUpload } from "../../icons/file_upload.svg";
import { ReactComponent as WordFile } from "../../icons/word_file_icon.svg";
import { ReactComponent as VideoFile } from "../../icons/video_file_icon.svg";
import { ReactComponent as ImageFile } from "../../icons/image_file_icon.svg";

const FileUploader = ({ onFilesReady }) => {
    const [files, setFiles] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadHeader, setUploadHeader] = useState("");

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            name: file.name,
            progress: 0,
            status: "pending"
        }));

        setUploadHeader("Uploaded Files");
        setUploadStatus("");
        setFiles(prev => [...prev, ...newFiles]);

        const rawFiles = newFiles.map(f => f.file);
        if (onFilesReady) onFilesReady(rawFiles);
    }, [onFilesReady]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
    } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "application/pdf": [],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
            "video/mp4": [],
        },
        maxSize: 50 * 1024 * 1024,
        onDropRejected: (rejectedFiles) => {
            let rejectMessage = "Some files were rejected:\n";
            rejectedFiles.forEach(({ file, errors }) => {
                rejectMessage += `${file.name}`;
                errors.forEach(err => {
                    if (err.code === "file-too-large") {
                        rejectMessage += "\n- File is too large (max (50MB)";
                    } else if (err.code === "file-invalid-type") {
                        rejectMessage += "\n- Unsupported file type";
                    }
                });
            });
            setUploadStatus(rejectMessage);
        }
    });

    const getFileIcon = (fileType) => {
        if (fileType.startsWith("image/")) return <ImageFile className={styles["file-icon"]} />;
        if (fileType === "application/pdf" || fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return <WordFile className={styles["file-icon"]} />;
        }
        if (fileType.startsWith("video/")) return <VideoFile className={styles["file-icon"]} />;
        return null;
    };

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
                <div className={styles["upload-text-group"]}>
                    <Typography variant="body">{uploadHeader}</Typography>
                    <div className={styles["upload-status-text"]}>
                        <Typography variant="subtitle">{uploadStatus}</Typography>
                    </div>
                </div>
                {files.map((fileObj, index) => (
                    <div key={index} className={styles["file-item"]}>
                        {getFileIcon(fileObj.file.type)}
                        <Typography variant="body">{fileObj.name}</Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUploader;
