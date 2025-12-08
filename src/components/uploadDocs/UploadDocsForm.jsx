import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';


function UploadDocsForm() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        mode: "onChange",
    });

    // Convert file to Base64
    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    const navigate = useNavigate();   
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
            {/* <div className="form-grp">
                <div className="label-wrap">
                    <label>ID Proof</label>
                    <sup>*</sup>
                </div>
                <input
                    type="file"
                    {...register("idProof", {
                        required: "ID Proof is required",
                    })}
                />
                {errors.idProof && <p className="error">{errors.idProof.message}</p>}
            </div> */}
            <div className="form-grp">
                <div className="label-wrap">
                    <label>ID Proof</label>
                    <sup>*</sup>
                </div>

                <input
                    type="file"
                    accept="application/pdf"
                    {...register("idProof", {
                        required: "ID Proof is required",
                        validate: {
                            checkFileType: (value) => {
                                const file = value[0];
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

                {errors.idProof && (
                    <p className="error">{errors.idProof.message}</p>
                )}
            </div>

            <div className="form-grp">
                <div className="label-wrap">
                    <label>Degree Marksheet</label>
                    <sup>*</sup>
                </div>
                <input
                    type="file"
                    accept="application/pdf"
                    {...register("degree", {
                        required: "Degree Marksheet required",
                        validate: {
                            checkFileType: (value) => {
                                const file = value[0];
                                if (!file) return "Degree Marksheet required";

                                if (file.type !== "application/pdf") {
                                    return "Only PDF files are allowed"
                                }

                                const maxSize = 2 * 1024 * 1024; //2MB
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
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    {...register("photo", {
                        required: "Passport Photo required",
                        checkFileType: (value) => {
                            const file = value[0];
                            if (!file) return "Passport photo is required";

                            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!allowedTypes.includes(file.type)) {
                                return "Only JPG, JPEG, or PNG images are allowed";
                            }
                            const maxSize = 1 * 1024 * 1024; // 1MB
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
                <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    {...register("sign", {
                        required: "Signature required",
                        checkFileType: (value) => {
                            const file = value[0];
                            if (!file) return "Passport photo is required";

                            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                            if (!allowedTypes.includes(file.type)) {
                                return "Only JPG, JPEG, or PNG images are allowed";
                            }
                            const maxSize = 500 * 1024; // 500kb
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
