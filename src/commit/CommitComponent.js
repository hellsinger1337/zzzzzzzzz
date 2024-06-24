import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CommitsComponent.css';

const CommitsComponent = () => {
  const [frontendCommits, setFrontendCommits] = useState([]);
  const [backendCommits, setBackendCommits] = useState([]);
  const [showFrontend, setShowFrontend] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const frontendResponse = await axios.get('https://hellsinger1337-yarsu-wiki-0893.twc1.net/commits/frontend');
        const backendResponse = await axios.get('https://hellsinger1337-yarsu-wiki-0893.twc1.net/commits/backend');
        setFrontendCommits(frontendResponse.data);
        setBackendCommits(backendResponse.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, []);

  return (
    <div className="commits-container">
      <div className="buttons-container">
        <button onClick={() => setShowFrontend(true)} className={showFrontend ? 'active' : ''}>Frontend Commits</button>
        <button onClick={() => setShowFrontend(false)} className={!showFrontend ? 'active' : ''}>Backend Commits</button>
      </div>
      <div className="commits-list">
        {showFrontend ? (
          <>
            <h1>Frontend Commits</h1>
            <ul>
              {frontendCommits.map(commit => (
                <li key={commit.date}>
                  <h2>{commit.title}</h2>
                  <p>{commit.description}</p>
                  <p>Author: {commit.author}</p>
                  <p>Date: {new Date(commit.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1>Backend Commits</h1>
            <ul>
              {backendCommits.map(commit => (
                <li key={commit.date}>
                  <h2>{commit.title}</h2>
                  <p>{commit.description}</p>
                  <p>Author: {commit.author}</p>
                  <p>Date: {new Date(commit.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default CommitsComponent;