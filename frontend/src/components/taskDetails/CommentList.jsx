import { MessageCircle, CalendarDays, Plus } from "lucide-react";
import formatDate from "../../utils/formatDate";
import { useState } from "react";
import TaskModal from "./TaskModal";

const CommentList = ({ reloadTask, comments = [] }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-600/20">
          <MessageCircle className="text-purple-600 dark:text-purple-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Comments
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            {comments.length} Comment{comments.length !== 1 && "s"}
          </p>
        </div>

        <div className="ml-auto">
          {modalActive && (
            <TaskModal
              modalActive={modalActive}
              reloadTask={reloadTask}
              action="comment"
              onClose={() => setModalActive(false)}
            />
          )}

          <button
            onClick={() => setModalActive(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
          >
            <Plus className="size-4 stroke-[2.5]" />
            <span className="hidden md:inline-block">Add Comment</span>
          </button>
        </div>
      </div>

      {comments.length === 0 ? (
        <div className="py-10 text-center">
          <MessageCircle
            size={48}
            className="mx-auto mb-3 text-slate-300 dark:text-slate-600"
          />

          <p className="text-slate-500">No comments yet.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">
                    {comment.user?.fullname?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">
                      {comment.user?.fullname}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {comment.user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={15} />
                  {formatDate(comment.createdAt)}
                </div>
              </div>

              <div className="mt-4">
                <p className="whitespace-pre-wrap leading-7 text-slate-700 dark:text-slate-300">
                  {comment.content}
                </p>
              </div>

              {comment.updatedAt !== comment.createdAt && (
                <div className="mt-3 text-xs italic text-slate-500">
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
