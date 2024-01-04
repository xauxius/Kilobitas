const API_URL = 'http://localhost:5000'; // Replace with your API URL

export const searchTags = async (searchTerm) => {
    const response = await fetch(`${API_URL}/Tags?searchTerm=${searchTerm}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createTag = async (tag) => {
    const response = await fetch(`${API_URL}/Tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tag),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};
