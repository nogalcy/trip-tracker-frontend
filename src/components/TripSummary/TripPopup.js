import React from "react";
import './tripPopup.css';

const TripPopup = ({ selectedEntry, onDelete, onUpdate}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="trip-text">
            <h2 className="title">{selectedEntry.title}</h2>
            <div className="details">
                <p className="visitDate"><strong>Visited:</strong> {formatDate(selectedEntry.visitDate)}</p>
                <p className="updateDate"><strong>Last Updated:</strong> {formatDate(selectedEntry.updatedAt)}</p>
                <p className="rating"><strong>Rating:</strong> {selectedEntry.rating} / 10</p>
            </div>
            {
                selectedEntry.image && (
                    <div className="imagecontainer">
                        <img src={selectedEntry.image} alt="image"/>
                    </div>
                )
            }
            {
                selectedEntry.description && (
                    <>
                        <h3 className="descriptionTitle">Description:</h3>
                        <p className="description">{selectedEntry.description}</p>
                    </>
                )
            }
            {
                selectedEntry.comments && (
                    <>
                        <h3 className="commentTitle">Comments:</h3>
                        <p className="comments">{selectedEntry.comments}</p>
                    </>
                )
            }
            <div className="buttons">
                <button className="updateButton" onClick={() => onUpdate(selectedEntry)}>Update Trip</button>
                <button className="deleteButton" onClick={() => onDelete(selectedEntry._id)}>Delete Trip</button>
            </div>
        </div>
    );
};

export default TripPopup;
