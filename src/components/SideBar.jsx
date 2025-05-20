import Button from "./Button"

export default function SideBar({ projects, onAddProject, goToProject }) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl flex flex-col">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your projects</h2>

      <div className="pb-4">
        <Button onClick={onAddProject}>+ Add project</Button>
      </div>

      <div className="flex-grow overflow-y-auto max-h-[300px] my-scrollbar">
        {projects && projects.length > 0 && (
          <ul>
            {projects.map(project => (
              <li key={project.id}>
                <button
                  className="w-full text-center px-4 py-2 rounded-lg bg-stone-800 text-stone-100 hover:bg-stone-700 hover:shadow-md mt-2"
                  onClick={() => goToProject(project.id)}
                >
                  {project.title}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <br />
    </aside>
  );
}
