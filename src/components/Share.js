import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './starterstyles.css';
import { getSample, updateSampleSharedStatus, getLocations } from '../api/songtraxAPI';
import SampleDetails from './SampleDetails';
import Header from './Header';

function Share() {
    const [sample, setSample] = useState(null);
    const [locations, setLocations] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedSample = await getSample(id);
                setSample(fetchedSample);
    
                const fetchedLocations = await getLocations();
                console.log("Fetched Locations:", fetchedLocations); // Log the locations data
                setLocations(fetchedLocations);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        fetchData();
    }, [id]);
    

    const handleShareToggle = async () => {
        if (sample) {
            try {
                const updatedSample = await updateSampleSharedStatus(sample.id, !sample.shared);
                setSample(updatedSample);
            } catch (error) {
                console.error("Error updating shared status:", error);
            }
        }
    };

    if (!sample || locations.length === 0) return <div>Loading...</div>;

    return (
        <div>
            <Header onBack={() => navigate(-1)} />
            <main>
                <h2 className="title">Share This Sample</h2>
                <SampleDetails sample={sample} locations={locations} onShareToggle={handleShareToggle} />
            </main>
            <footer className="page-footer"></footer>
        </div>
    );
}

export default Share;
