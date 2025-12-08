import React from "react";
import "../preview/PreviewForm.css"
function PreviewForm({ users = {}}) {
    return (
        <div className="preview-form-wrap">
            <h3>On Boarding Form</h3>

            <div>
                <h4>Personal Details</h4>
                <p>Name: {users.name}</p>
                <p>Email: {users.email}</p>
                <p>DOB: {users.dob}</p>
                <p>Gender: {users.gender}</p>
                <p>Address: {users.address}</p>
                <p>Mobile: {users.mobile}</p>
            </div>

            <div>
                <h4>Nominee Details</h4>
                <p>Name: {users.nomName}</p>
                <p>Relation: {users.relation}</p>
                <p>Mobile: {users.NomMobile}</p>
            </div>

            <div>
                <h4>Bank Details</h4>
                <p>Account Number: {users.accNum}</p>
                <p>Branch: {users.branch}</p>
                <p>IFSC: {users.ifsc}</p>
            </div>

            <div>
                <h4>Uploaded Docs</h4>

                <p>ID Proof:</p>
                {users.documents?.idProof && (
                    <embed
                        src={users.documents.idProof}
                        width="300px"
                        height="200px"
                        type="application/pdf"
                    />
                )}

                <p>Degree:</p>
                {users.documents?.degree && (
                    <embed
                        src={users.documents.degree}
                        width="300px"
                        height="200px"
                        type="application/pdf"
                    />
                )}

                <p>Photo:</p>
                {users.documents?.photo && (
                    <img
                        src={users.documents.photo}
                        alt="User Photo"
                        width="120"
                        height="120"
                    />
                )}

                <p>Signature:</p>
                {users.documents?.sign && (
                    <img
                        src={users.documents.sign}
                        alt="Signature"
                        width="200"
                        height="80"
                    />
                )}
            </div>
        </div>
    );
}

export default PreviewForm;
