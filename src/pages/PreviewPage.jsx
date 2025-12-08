import React from 'react'
import PreviewForm from '../components/preview/PreviewForm'

function PreviewPage() {
    const storedData = localStorage.getItem("userDetails");
    const userDetails = storedData ? JSON.parse(storedData) : {};
    console.log("UserDetail :", userDetails)
    return <PreviewForm users={userDetails} />;
}

export default PreviewPage