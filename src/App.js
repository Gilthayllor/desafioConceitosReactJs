import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository ${Date.now()}`,
      url: 'https://github.com/gilthayllor',
      techs: [
        'ReactJS',
        'NodeJS'
      ]
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(x => x.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(x => (
            <li key={x.id}>
              {x.title}
              <button onClick={() => handleRemoveRepository(x.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
