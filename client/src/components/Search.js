import { useState } from "react";
import './Style/search.css'

function Search({ otherUser }) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const usernames = otherUser.map((user) => user.username);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const otherUsers = usernames.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(otherUsers);
        setShowSuggestions(otherUsers.length > 0 && value.trim().length > 0);
    };

    const handleSelectSuggestion = (value) => {
        setInputValue(value);
        setShowSuggestions(false);
    };

    return (
        <div className="search-container">
            <input
                className="search-input"
                id="search"
                autoComplete="off"
                placeholder="Search 🔎"
                value={inputValue}
                onChange={handleChange}
            />
            {showSuggestions && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="suggestions-item"
                            onClick={() => handleSelectSuggestion(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Search;