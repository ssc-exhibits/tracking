import React, { useState, useEffect } from "react";

const ExhibitChecklist = () => {
    const [exhibits, setExhibits] = useState([]);
    const [newExhibit, setNewExhibit] = useState({ name: "", floor: "", gallery: "" });

    useEffect(() => {
        const storedExhibits = JSON.parse(localStorage.getItem("exhibits")) || [];
        setExhibits(storedExhibits);
    }, []);

    useEffect(() => {
        localStorage.setItem("exhibits", JSON.stringify(exhibits));
    }, [exhibits]);

    const toggleStatus = (index) => {
        setExhibits((prev) => {
            const updated = [...prev];
            updated[index].status = updated[index].status === "Working" ? "Broken" : "Working";
            updated[index].lastUpdated = new Date().toISOString();
            return updated;
        });
    };

    const addExhibit = () => {
        if (newExhibit.name.trim() === "" || newExhibit.floor.trim() === "" || newExhibit.gallery.trim() === "") return;
        setExhibits([...exhibits, { 
            name: newExhibit.name, 
            floor: newExhibit.floor, 
            gallery: newExhibit.gallery, 
            status: "Working", 
            lastUpdated: new Date().toISOString() 
        }]);
        setNewExhibit({ name: "", floor: "", gallery: "" });
    };

    const removeExhibit = (index) => {
        setExhibits(exhibits.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>Exhibit Checklist</h2>
            <input 
                type="text" 
                value={newExhibit.name} 
                onChange={(e) => setNewExhibit({ ...newExhibit, name: e.target.value })}
                placeholder="Exhibit Name" 
            />
            <input 
                type="text" 
                value={newExhibit.floor} 
                onChange={(e) => setNewExhibit({ ...newExhibit, floor: e.target.value })}
                placeholder="Floor" 
            />
            <input 
                type="text" 
                value={newExhibit.gallery} 
                onChange={(e) => setNewExhibit({ ...newExhibit, gallery: e.target.value })}
                placeholder="Gallery" 
            />
            <button onClick={addExhibit}>Add Exhibit</button>
            <ul>
                {exhibits.map((exhibit, index) => (
                    <li key={index}>
                        <span>{exhibit.name} - {exhibit.floor} - {exhibit.gallery} - {exhibit.status} (Last Updated: {new Date(exhibit.lastUpdated).toLocaleString()})</span>
                        <button onClick={() => toggleStatus(index)}>Toggle Status</button>
                        <button onClick={() => removeExhibit(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExhibitChecklist;
