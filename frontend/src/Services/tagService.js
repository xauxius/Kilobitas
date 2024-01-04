
export const searchTags = async (zymesPavadinimas) => {
    const response = await fetch(`http://localhost:7259/GetTagByName?zymesPavadinimas=${encodeURIComponent(zymesPavadinimas)}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};


export const createTag = async (tag) => {
    const response = await fetch(`http://localhost:7259/PostTag`, {
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
