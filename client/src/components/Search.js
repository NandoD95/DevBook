import { useState } from "react";
import './Style/search.css'

function Search({ otherUser }) {
    // current input value of the search field
    const [inputValue, setInputValue] = useState("");
    // array of suggested usernames based on the input
    const [suggestions, setSuggestions] = useState([]);
    // boolean indicating whether to show the suggested list
    const [showSuggestions, setShowSuggestions] = useState(false);
    // array of usernames from the otherusers prop
    const usernames = otherUser.map((user) => user.username);

    // handles change to the input field value
    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const otherUsers = usernames.filter((suggestion) =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(otherUsers);
        setShowSuggestions(otherUsers.length > 0 && value.trim().length > 0);
    };

    // handles click on a suggestion
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