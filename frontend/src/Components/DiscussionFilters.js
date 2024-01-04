import React, { useState } from 'react';

const DiscussionFilters = () => {
    const [sortOrder, setSortOrder] = useState('naujausi');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [keywords, setKeywords] = useState('');
    const [serious, setSerious] = useState(false);
    const [funny, setFunny] = useState(false);
    const [tags, setTags] = useState({
        art: false,
        technology: false,
        // ... other tags
    });

    const handleTagChange = (event) => {
        setTags({ ...tags, [event.target.value]: event.target.checked });
    };

    const applyFilters = () => {
        // Logic to apply filters
        console.log({ sortOrder, startDate, endDate, keywords, serious, funny, tags });
    };

    return (
        <div className="container">
            <div className="subforum">
                <div className="subforum-title2">
                    <h1>Diskusijų filtrai:</h1>
                </div>

                <div className="table-head">
                    <div className="status">Rikiuoti pagal:
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="naujausi">Naujausi</option>
                            <option value="seniausi">Seniausi</option>
                            <option value="populiarus">Populiarūs</option>
                            <option value="nepopuliarus">Nepopuliarūs</option>
                        </select>
                    </div>
                </div>

                <div className="table-head">
                    <div className="status">Data:
                        nuo <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        iki <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                </div>

                <div className="table-head">
                    <div className="status">Raktiniai žodžiai: <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} /></div>
                </div>

                <div className="table-head">
                    <div className="status">Rimtos: <input type="checkbox" checked={serious} onChange={(e) => setSerious(e.target.checked)} /></div>
                </div>

                <div className="table-head">
                    <div className="status">Juokingos: <input type="checkbox" checked={funny} onChange={(e) => setFunny(e.target.checked)} /></div>
                </div>

                <div className="table-head">
                    <div className="status">Žymės:</div>
                    <div className="checkbox-options">
                        <label><input type="checkbox" value="art" checked={tags.art} onChange={handleTagChange} /> Menas</label>
                        <label><input type="checkbox" value="technology" checked={tags.technology} onChange={handleTagChange} /> Technologijos</label>
                        {/* ... other tags */}
                    </div>
                </div>

                <button onClick={applyFilters}>Filtruoti</button>
            </div>
        </div>
    );
};

export default DiscussionFilters;
