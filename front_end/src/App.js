import Messager from "./components/Messager";
import MyMenu from "./components/MyMenu";
import { useState, useEffect } from "react";

function App() {

  const [models, setModels] = useState([]);
  const [model, setModel] = useState('');
  useEffect(() => {
    fetch('http://localhost:11434/api/tags')
      .then(response => response.json())
      .then(data => {setModels(data.models); setModel(data.models[0].name)});
  }, []);

  return (
    <div>
      <MyMenu models={models} setModel={setModel}/>
      <Messager model={model}/>
    </div>
  );
}

export default App;
