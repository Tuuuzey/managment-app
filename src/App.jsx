import SideBar from "./components/SideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import Project from "./components/Project";

import { useState } from 'react';

function App() {
  const [projectSelected, setProjectSelected] = useState({
    selectedProjectID: undefined,
    projects: []
  });

  function handleClickAddProject() {
    setProjectSelected(prev => ({
      ...prev,
      selectedProjectID: 'AddProject'
    }));
  }

  function handleSaveNewProject(projectData) {
    const id = crypto.randomUUID();
    setProjectSelected(prev => ({
      ...prev,
      projects: [...prev.projects, { ...projectData, id }],
      selectedProjectID: id,
    }));
  }

  function handleCancelNewProject() {
    setProjectSelected(prev => ({
      ...prev,
      selectedProjectID: undefined
    }));
  }

  function handleGoToProject(id) {
    setProjectSelected(prev => ({
      ...prev,
      selectedProjectID: id
    }));
  }

  function getProjectWithProjectID() {
    return projectSelected.projects.find(
      (project) => project.id === projectSelected.selectedProjectID
    );
  }

  function handleDeleteProject(id) {
    setProjectSelected(prevState => ({
      ...prevState,
      projects: prevState.projects.filter(project => project.id !== id),
      selectedProjectID: prevState.selectedProjectID === id ? undefined : prevState.selectedProjectID
    }));
  }


  const projectID = projectSelected.selectedProjectID;

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        projects={projectSelected.projects}
        onAddProject={handleClickAddProject}
        goToProject={handleGoToProject}
      />

      {projectID === undefined && (
        <NoProjectSelected btnClickHandle={handleClickAddProject} />
      )}

      {projectID === 'AddProject' && (
        <NewProject
          saveProject={handleSaveNewProject}
          cancelProject={handleCancelNewProject}
        />
      )}

      {projectID && projectID !== 'AddProject' && (
        <Project 
          project={getProjectWithProjectID()} 
          deleteProject={handleDeleteProject}
        />
      )}
    </main>
  );
}

export default App;
