import React, { useState } from 'react'
import useDrivePicker from 'react-google-drive-picker';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import "../uploadDocs/UploadDocsForm.css";


function UploadDocsForm() {
    const [openPicker, authResponse] = useDrivePicker();
    const [files, setFiles] = useState({
        idProof: null,
        degree: null,
        photo: null,
        sign: null,
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const fetchDriveImageAsBase64 = async (file) => {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`,
            {
                headers: {
                    Authorization: `Bearer ${authResponse.access_token}`,
                },
            }
        );

        const blob = await response.blob();

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };


    const handleOpenPicker = (field) => {
        openPicker({
            clientId: "611979165868-5o2b1bl398tq31daj8retin2hg8o1hhs.apps.googleusercontent.com",
            developerKey: "AIzaSyBGbz0CJf5e0F919inNjxMUe35yixQ0NVQ",
            viewId: "DOCS",
            showUploadView: true,
            multiselect: false,

            callbackFunction: (data) => {
                if (data.action === "picked") {
                    const file = data.docs[0];

                    const configMap = {
                        idProof: {
                            types: ["application/pdf"],
                            maxSize: 2 * 1024 * 1024,
                            sizeLabel: "2MB",
                            label: "PDF files",
                        },
                        degree: {
                            types: ["application/pdf"],
                            maxSize: 2 * 1024 * 1024,
                            sizeLabel: "2MB",
                            label: "PDF files",
                        },
                        photo: {
                            types: ["image/jpeg", "image/png"],
                            maxSize: 1 * 1024 * 1024,
                            sizeLabel: "1MB",
                            label: "JPG/PNG images",
                        },
                        sign: {
                            types: ["image/jpeg", "image/png"],
                            maxSize: 500 * 1024,
                            sizeLabel: "500KB",
                            label: "JPG/PNG images",
                        },
                    };

                    const error = validateFile(file, configMap[field]);

                    if (error) {
                        setErrors(prev => ({ ...prev, [field]: error }));
                        return;
                    }

                    setErrors(prev => ({ ...prev, [field]: null }));
                    // IMAGE → convert to base64
                    if (file.mimeType.startsWith("image/")) {
                        fetchDriveImageAsBase64(file).then((base64) => {
                            setFiles((prev) => ({
                                ...prev,
                                [field]: {
                                    ...file,
                                    base64, // 👈 STORE IMAGE DATA
                                },
                            }));
                        });
                    }
                    // PDF → store metadata only
                    else {
                        setFiles((prev) => ({
                            ...prev,
                            [field]: file,
                        }));
                    }

                }
            },
        });
    };



    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

    // const onSubmit = async () => {
    //     const files = watch();

    //     const idProofFile = files.idProof?.[0];
    //     const degreeFile = files.degree?.[0];
    //     const photoFile = files.photo?.[0];
    //     const signFile = files.sign?.[0];

    //     const idProofB64 = idProofFile ? await toBase64(idProofFile) : null;
    //     const degreeB64 = degreeFile ? await toBase64(degreeFile) : null;
    //     const photoB64 = photoFile ? await toBase64(photoFile) : null;
    //     const signB64 = signFile ? await toBase64(signFile) : null;


    //     const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};


    //     userDetails.documents = {
    //         idProof: idProofB64,
    //         degree: degreeB64,
    //         photo: photoB64,
    //         sign: signB64,
    //     };


    //     localStorage.setItem("userDetails", JSON.stringify(userDetails));

    //     alert("Documents saved for this user!");
    //     navigate("/preview-form");
    // };


    // const onSubmit = () => {
    //     const requiredFields = ["idProof", "degree", "photo", "sign"];
    //     let hasError = false;

    //     requiredFields.forEach(field => {
    //         if (!files[field]) {
    //             setErrors(prev => ({ ...prev, [field]: "File is required" }));
    //             hasError = true;
    //         }
    //     });

    //     if (hasError) return;

    //     const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};

    //     userDetails.documents = files;

    //     localStorage.setItem("userDetails", JSON.stringify(userDetails));
    //     navigate("/preview-form");
    // };

    const requiredFields = ["idProof", "degree", "photo", "sign"];

    const onSubmit = () => {
        let newErrors = {};
        let hasError = false;

        // 1️⃣ Validate required documents
        requiredFields.forEach((field) => {
            if (!files[field]) {
                newErrors[field] = "File is required";
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        // 2️⃣ Get existing user details
        const userDetails =
            JSON.parse(localStorage.getItem("userDetails")) || {};

        // 3️⃣ STORE documents dynamically 👇 (THIS is where reduce goes)
        userDetails.documents = requiredFields.reduce((acc, field) => {
            acc[field] = files[field];
            return acc;
        }, {});

        // 4️⃣ Save + navigate
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        navigate("/preview-form");
    };



    const validateFile = (file, config) => {
        if (!file) return "File is required";

        if (!config.types.includes(file.mimeType)) {
            return `Only ${config.label} allowed`;
        }

        if (file.sizeBytes > config.maxSize) {
            return `File size must be less than ${config.sizeLabel}`;
        }

        return null;
    };


    return (
        <form>

            {/* <div className="form-grp">
                <label>ID Proof *</label>

                <button type='button' className="picker-btn" onClick={() => handleOpenPicker("idProof")}>
                    Select File
                </button>

                <span style={{ color: "black" }}>{files.idProof?.name || "No file selected"}</span>

                {errors.idProof && <p className="error">{errors.idProof}</p>}
            </div> */}
            <div className="form-grp">
                <div className="label-wrap">
                    <label>ID Proof</label>
                    <sup>*</sup>
                </div>

                <div
                    className="upload-box"
                    onClick={() => handleOpenPicker("idProof")}
                >
                    <div className="upload-icon">📤</div>
                    <p className="upload-title">Upload ID Proof</p>
                    <p className="upload-sub">Upload from Google Drive</p>
                    <p className="upload-hint">PDF only • Max 2MB</p>
                </div>

                {files.idProof && (
                    <p className="file-name">Selected: {files.idProof.name}</p>
                )}

                {errors.idProof && <p className="error">{errors.idProof}</p>}
            </div>


            <div className="form-grp">
                <div className="label-wrap">
                    <label>Degree Certificate</label>
                    <sup>*</sup>
                </div>
                <div
                    className="upload-box"
                    onClick={() => handleOpenPicker("degree")}
                >
                    <div className="upload-icon">📤</div>
                    <p className="upload-title">Upload Degree Certificate</p>
                    <p className="upload-sub">Upload from Google Drive</p>
                    <p className="upload-hint">PDF only • Max 2MB</p>
                </div>

                {files.degree && (
                    <p className="file-name">Selected: {files.degree.name}</p>
                )}

                {errors.degree && <p className="error">{errors.degree}</p>}
            </div>

            <div className="form-grp">
                <div className='label-wrap'>
                <label>Photo</label>
                <sup>*</sup>
                </div>
                <div
                    className="upload-box"
                    onClick={() => handleOpenPicker("photo")}
                >
                    <div className="upload-icon">📷</div>
                    <p className="upload-title">Upload Photo</p>
                    <p className="upload-sub">Upload from Google Drive</p>
                    <p className="upload-hint">JPG / PNG • Max 1MB</p>
                </div>

                {files.photo && (
                    <p className="file-name">Selected: {files.photo.name}</p>
                )}

                {errors.photo && <p className="error">{errors.photo}</p>}
            </div>


            <div className="form-grp">
                <div className="label-wrap">
                <label>Signature</label>
                 <sup>*</sup>
                </div>

                <div
                    className="upload-box"
                    onClick={() => handleOpenPicker("sign")}
                >
                    <div className="upload-icon">✍️</div>
                    <p className="upload-title">Upload Signature</p>
                    <p className="upload-sub">Upload from Google Drive</p>
                    <p className="upload-hint">JPG / PNG • Max 500KB</p>
                </div>

                {files.sign && (
                    <p className="file-name">Selected: {files.sign.name}</p>
                )}

                {errors.sign && <p className="error">{errors.sign}</p>}
            </div>


            <button type="button" onClick={onSubmit}>
                Submit
            </button>
        </form>
    );
}

export default UploadDocsForm;
