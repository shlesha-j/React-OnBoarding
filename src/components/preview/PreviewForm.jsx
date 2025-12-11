import React from "react";
import "../preview/PreviewForm.css"
function PreviewForm({ users = {} }) {
    return (
        
        <div className="preview-form-wrap">
            <h3 className="form-title">On Boarding Form</h3>

            
            <div className="section">
                <h4>Personal Details</h4>
                <div className="personal-detail-wrap">
                    <div className="left-side">
                        <div className="row">
                            <p><strong>Name:</strong> {users.name}</p>
                            <p><strong>Email:</strong> {users.email}</p>
                        </div>
                        <div className="row">
                            <p><strong>DOB:</strong> {users.dob}</p>
                            <p><strong>Gender:</strong> {users.gender}</p>
                        </div>
                        <p><strong>Address:</strong> {users.address}</p>
                        <p><strong>Mobile:</strong> {users.mobile}</p>
                    </div>
                    <div className="right side">
                        <div className="doc-block">
                            <p><strong>Photo:</strong></p>
                            {users.documents?.photo && (
                                <img
                                    src={users.documents.photo}
                                    alt="User"
                                    className="user-photo"
                                />
                            )}
                        </div>

                        <div className="doc-block">
                            <p><strong>Signature:</strong></p>
                            {users.documents?.sign && (
                                <img
                                    src={users.documents.sign}
                                    alt="Signature"
                                    className="user-sign"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="section">
                <h4>Nominee Details</h4>
                <div className="row">
                    <p><strong>Name:</strong> {users.nomName}</p>
                    <p><strong>Relation:</strong> {users.relation}</p>
                </div>
                <p><strong>Mobile:</strong> {users.NomMobile}</p>
            </div>

            
            <div className="section">
                <h4>Bank Details</h4>
                <div className="row">
                    <p><strong>Account Number:</strong> {users.accNum}</p>
                    <p><strong>Branch:</strong> {users.branch}</p>
                </div>
                <p><strong>IFSC:</strong> {users.ifsc}</p>
            </div>

            
            <div className="section">
                <h4>Uploaded Documents</h4>

                <div className="doc-block">
                    <p><strong>ID Proof:</strong></p>
                    {users.documents?.idProof && (
                        <embed
                            src={users.documents.idProof}
                            type="application/pdf"
                            width="300"
                            height="300"
                        />
                    )}
                </div>

                <div className="doc-block">
                    <p><strong>Degree:</strong></p>
                    {users.documents?.degree && (  
                        <embed
                            src={users.documents.degree}
                            type="application/pdf"
                            width="300"
                            height="300"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PreviewForm;
