import { MessageCircle, CalendarDays, Plus } from "lucide-react";
import formatDate from "../../utils/formatDate";
import { useState } from "react";
import Modal from "../common/Modal";

const CommentList = ({ reloadTask, comments = [] }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl bg-purple-600/20 flex items-center justify-center">
          <MessageCircle className="text-purple-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white">Comments</h2>

          <p className="text-slate-400 text-sm">
            {comments.length} Comment{comments.length !== 1 && "s"}
          </p>
        </div>

        <div className="ml-auto">
          {modalActive && (
            <Modal
              modalActive={modalActive}
              reloadTask={reloadTask}
              action="comment"
              onClose={() => setModalActive(false)}
            />
          )}
          <button
            onClick={() => setModalActive(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span className="hidden md:inline-block">Add Comment</span>
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="text-center py-10">
          <MessageCircle size={48} className="mx-auto text-slate-600 mb-3" />

          <p className="text-slate-500">No comments yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-slate-800 rounded-2xl border border-slate-700 p-5"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="h-11 w-11 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {comment.user?.fullname?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="text-white font-medium">
                      {comment.user?.fullname}
                    </h3>

                    <p className="text-sm text-slate-400">
                      {comment.user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <CalendarDays size={15} />

                  {formatDate(comment.createdAt)}
                </div>
              </div>

              {/* Comment */}
              <div className="mt-4">
                <p className="text-slate-300 leading-7 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>

              {/* Edited */}
              {comment.updatedAt !== comment.createdAt && (
                <div className="mt-3 text-xs text-slate-500 italic">
                  Edited • {formatDate(comment.updatedAt)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
