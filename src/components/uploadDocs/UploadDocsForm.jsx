import React, { useState } from 'react'
import useDrivePicker from 'react-google-drive-picker';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import "../uploadDocs/UploadDocsForm.css";


function UploadDocsForm() {
    const [openPicker, authResponse] = useDrivePicker();
    const [fileNames, setFileNames] = useState({
        idProof: "",
        degree: "",
        photo: "",
        sign: ""
    });

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onChange",
    });
    const navigate = useNavigate();


    const handleOpenPicker = (fieldName) => {
    openPicker({
        clientId: "611979165868-5o2b1bl398tq31daj8retin2hg8o1hhs.apps.googleusercontent.com",
        developerKey: "AIzaSyBGbz0CJf5e0F919inNjxMUe35yixQ0NVQ",
        viewId: "DOCS",
        showUploadView: true,
        showUploadFolders: true,
        supportDrives: true,
        multiselect: false,

        callbackFunction: (data) => {
            if (data.action === "picked") {
                const file = data.docs[0];

                // Update only that specific field
                setFileNames(prev => ({
                    ...prev,
                    [fieldName]: file.name
                }));
            }
        }
    });
};


    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

    const onSubmit = async () => {
        const files = watch();

        const idProofFile = files.idProof?.[0];
        const degreeFile = files.degree?.[0];
        const photoFile = files.photo?.[0];
        const signFile = files.sign?.[0];

        const idProofB64 = idProofFile ? await toBase64(idProofFile) : null;
        const degreeB64 = degreeFile ? await toBase64(degreeFile) : null;
        const photoB64 = photoFile ? await toBase64(photoFile) : null;
        const signB64 = signFile ? await toBase64(signFile) : null;


        const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};


        userDetails.documents = {
            idProof: idProofB64,
            degree: degreeB64,
            photo: photoB64,
            sign: signB64,
        };


        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        alert("Documents saved for this user!");
        navigate("/preview-form");
    };




    return (
        <form>
            <div className="form-grp">
                <div className="label-wrap">
                    <label>ID Proof</label>
                    <sup>*</sup>
                </div>

                {/* Button to open Google Drive */}
                <button
                    type="button"
                    onClick={() => handleOpenPicker("idProof")}
                    className="picker-btn"
                >
                    Select File
                </button>

                {/* Display selected filename */}
                <span style={{ color: "black" }}>{fileNames.idProof || "No file selected"}</span>

                {/* Hidden actual file input for react-hook-form */}
                <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    {...register("idProof", {
                        required: "ID Proof is required",
                        validate: {
                            checkFileType: (value) => {
                                const file = value?.[0];
                                if (!file) return "ID Proof is required";

                                if (file.type !== "application/pdf") {
                                    return "Only PDF files are allowed";
                                }

                                const maxSize = 2 * 1024 * 1024;
                                if (file.size > maxSize) {
                                    return "File size must be less than 2MB";
                                }

                                return true;
                            }
                        }
                    })}
                />

                {errors.idProof && <p className="error">{errors.idProof.message}</p>}
            </div>


            <div className="form-grp">
                <div className="label-wrap">
                    <label>Degree Marksheet</label>
                    <sup>*</sup>
                </div>
                <button
                    type="button"
                    onClick={() => handleOpenPicker("degree")}
                    className="picker-btn"
                >
                    Select File
                </button>

                {/* Display selected filename */}
                <span style={{ color: "black" }}>{fileNames.degree || "No file selected"}</span>
                <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: "none" }}
                    {...register("degree", {
                        required: "Degree Marksheet required",
                        validate: {
                            checkFileType: (value) => {
                                const file = value[0];
                                if (!file) return "Degree Marksheet required";

                                if (file.type !== "application/pdf") {
                                    return "Only PDF files are allowed"
                                }

                                const maxSize = 2 * 1024 * 1024;
                                if (file.size > maxSize) {
                                    return "File size must be less than 2MB"
                                }
                                return true;
                            }
                        }
                    })}
                />
                {errors.degree && <p className="error">{errors.degree.message}</p>}
            </div>

            <div className="form-grp">
                <div className="label-wrap">
                    <label>Photo</label>
                    <sup>*</sup>
                </div>
                <button
                    type="button"
                    onClick={() => handleOpenPicker("photo")}
                    className="picker-btn"
                >
                    Select File
                </button>

                {/* Display selected filename */}
                <span style={{ color: "black" }}>{fileNames.photo || "No file selected"}</span>
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    style={{ display: "none" }}
                    {...register("photo", {
                        required: "Passport Photo required",
                        checkFileType: (value) => {
                            const file = value[0];
                            if (!file) return "Passport photo is required";

                            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!allowedTypes.includes(file.type)) {
                                return "Only JPG, JPEG, or PNG images are allowed";
                            }
                            const maxSize = 1 * 1024 * 1024;
                            if (file.size > maxSize) {
                                return "File size must be less than 1MB";
                            }

                            return true;
                        }
                    })}
                />
                {errors.photo && <p className="error">{errors.photo.message}</p>}
            </div>

            <div className="form-grp">
                <div className="label-wrap">
                    <label>Signature</label>
                    <sup>*</sup>
                </div>
                <button
                    type="button"
                    onClick={() => handleOpenPicker("sign")}
                    className="picker-btn"
                >
                    Select File
                </button>

                {/* Display selected filename */}
                <span style={{ color: "black" }}>{fileNames.sign || "No file selected"}</span>
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    style={{ display: "none" }}
                    {...register("sign", {
                        required: "Signature required",
                        checkFileType: (value) => {
                            const file = value[0];
                            if (!file) return "Passport photo is required";

                            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!allowedTypes.includes(file.type)) {
                                return "Only JPG, JPEG, or PNG images are allowed";
                            }
                            const maxSize = 500 * 1024;
                            if (file.size > maxSize) {
                                return "File size must be less than 500KB";
                            }

                            return true;
                        }
                    })}
                />
                {errors.sign && <p className="error">{errors.sign.message}</p>}
            </div>

            <button type="button" onClick={handleSubmit(onSubmit)}>
                Submit
            </button>
        </form>
    );
}

export default UploadDocsForm;
