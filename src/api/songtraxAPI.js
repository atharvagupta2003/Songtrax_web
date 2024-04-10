// Configuration Constants
const APIKEY = 'zjJNYUbFOh';
const baseURL = 'https://comp2140.uqcloud.net/api/';

// Fetch utility for making API calls
async function fetchAPI(url, options = {}) {
    console.log("inside fetch");
    const response = await fetch(url, options);

    if (!response.ok) {
        console.error(`API call failed with status ${response.status}: ${response.statusText}`);
        const errorData = await response.json(); // If the server returns error details in JSON
        console.error("Error details:", errorData);
        throw new Error(`API call failed with status ${response.status}`);
    }

    console.log("fetch finished");
    return await response.json();
}


// Fetch all samples
export async function getSamples() {
    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    return await fetchAPI(url);
}

// Fetch a specific sample by ID
export async function getSample(id) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    return await fetchAPI(url);
}

// Create a new sample
export async function createNewSample(sampleData) {
    console.log("Inside createNewSample function, sending request...");

    const url = `${baseURL}sample/?api_key=${APIKEY}`;
    const { name, instrument, noteSequences } = sampleData;
    const data = {
        'type': instrument,
        'name': name,
        'recording_data': JSON.stringify(noteSequences)
    };

    console.log("Request sent successfully.");

    return await fetchAPI(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

// Update a sample by its ID
export async function updateSample(sampleId, updatedSampleData) {
    const url = `${baseURL}sample/${sampleId}/?api_key=${APIKEY}`;
    return await fetchAPI(url, {
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSampleData)
    });
}

// Update the shared status of a sample
export async function updateSampleSharedStatus(id, status) {
    const url = `${baseURL}sample/${id}/?api_key=${APIKEY}`;
    const data = { shared: status, api_key: APIKEY };
    return await fetchAPI(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
}

// Fetch locations from the API
export async function getLocations() {
    const url = `${baseURL}location/?api_key=${APIKEY}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
}
