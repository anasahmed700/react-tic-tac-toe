import { useState } from "react";

const Player = ({ initialName, symbol, isActive }) => {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick() {
        setIsEditing((isEditing) => !isEditing);
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editedName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editedName = <input className="player-name" value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {editedName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}

export default Player