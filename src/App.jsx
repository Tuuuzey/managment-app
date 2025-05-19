import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";

import { useState } from 'react';

function App() {
  const [ projectSelected, setProjectSelected ] = useState({
    selectedProjectID: undefined,
    projects: []
  });

  function handleClickAddProject() {
    setProjectSelected(prevProjects => {return {
        ...prevProjects, 
        selectedProjectID: 'AddProject'
      }
    })
  }

  function handleSaveNewProject(projectData) {
    const id = crypto.randomUUID();
    setProjectSelected(prevProjects => { return {
        ...prevProjects, 
        projects: [...prevProjects.projects, { ...projectData, id: id }],
        selectedProjectID: id
      }
    })
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar projects={projectSelected.projects} onAddProject={handleClickAddProject}/>
      {projectSelected.selectedProjectID !== undefined ? <NewProject saveProject={handleSaveNewProject}/> : <NoProjectSelected btnClickHandle={handleClickAddProject}/>}  
    </main>
  );
}

export default App;
