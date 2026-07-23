import useProjects from "../../hooks/useProjects";
import { useNavigate } from "react-router";

const OptionsModal = ({ showMenu, onClose, id }) => {
  const { deleteProject } = useProjects();
  const navigate = useNavigate();
  if (!showMenu) return null;

  const handleDelete = () => {
    const confirmed = confirm("Do you want to delete this project?");

    if (!confirmed) return;
    deleteProject(id);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      <div className="absolute right-10 z-50 w-56 p-2 flex flex-col space-y-1 bg-slate-800 border border-slate-700 rounded-xl shadow-xl text-white">
        <button
          onClick={() => {
            console.log("View Details");
            onClose();
          }}
          className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition"
        >
          View project details
        </button>

        <button
          onClick={() => navigate(`${id}/add-member`)}
          className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition"
        >
          Add new member
        </button>

        <button
          onClick={handleDelete}
          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition"
        >
          Delete Project
        </button>
      </div>
    </>
  );
};
export default OptionsModal;
