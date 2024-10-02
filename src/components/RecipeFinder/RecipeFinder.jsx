import React, { useState } from "react";
import "./RecipeFinder.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getGroqChatCompletion } from "../../../groqAI";

export const RecipeFinder = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const chatCompletion = await getGroqChatCompletion(query);
      setResponse(
        chatCompletion.choices[0]?.message?.content || "No response received"
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Failed to get a response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="What do you feel like eating?"
        value={query}
        className="search"
        onChange={(e) => setQuery(e.target.value)}
      />

      <i className="bi bi-search search-icon" onClick={handleSearch}></i>

      {isLoading && <p>Loading...</p>}

      {response && (
        <div style={{ marginTop: "20px" }}>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};
