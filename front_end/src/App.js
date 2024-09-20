import Messager from "./components/Messager";
import MyMenu from "./components/MyMenu";
import { useState, useEffect } from "react";

function App() {

  const [models, setModels] = useState([]);
  const [model, setModel] = useState('');
  useEffect(() => {
    fetch('http://localhost:11434/api/tags')
      .then(response => response.json())
      .then(data => {
        const filteredModels = data.models.filter((model) => ['llama3', 'qwen2'].some((keyword) => model.name.includes(keyword)));
        setModels(filteredModels); 
        setModel(filteredModels[0].name)}
      );
  }, []);

  return (
    <div>
      <MyMenu models={models} currentModel={model} setModel={setModel}/>
      <Messager model={model}/>
    </div>
  );
}

export default App;
