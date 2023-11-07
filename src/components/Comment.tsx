import { RootState } from "@/redux/store";
import React, { useState } from "react";
import {
  IoCheckmarkOutline,
  IoPencilOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { useSelector } from "react-redux";

type CommentProps = {
  comment: { id: string; text: string };
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
};

const Comment: React.FC<CommentProps> = ({
  comment,
  onEditComment,
  onDeleteComment,
}) => {
  const userName = useSelector((state: RootState) => state.user.name);

  const [isEditing, setIsEditing] = useState(false);
  console.log(isEditing);
  const [newCommentText, setNewCommentText] = useState("");

  return (
    <li
      key={comment.id}
      className="w-full flex flex-row justify-between p-3 bg-grayscale-100 rounded-xl"
    >
      <div>
        <p className="text-sm">{userName}</p>
        {isEditing ? (
          <input
            value={newCommentText}
            type="text"
            onChange={(e) => setNewCommentText(e.target.value)}
            className="border w-full  focus:outline-none focus:border-primary-500 text-sm font-regular p-1 rounded-lg "
          />
        ) : (
          <p>{comment.text}</p>
        )}
      </div>
      <div className="flex flex-col justify-between">
        {isEditing ? (
          <button>
            <IoCheckmarkOutline
              className="text-primary-500"
              onClick={() => {
                onEditComment(comment.id, newCommentText);
                setIsEditing(false);
              }}
            />
          </button>
        ) : (
          <button
            onClick={() => {
              setNewCommentText(comment.text);
              setIsEditing(true);
            }}
          >
            <IoPencilOutline className="text-primary-500" />
          </button>
        )}
        <button onClick={() => onDeleteComment(comment.id)}>
          <IoTrashOutline className="text-error-500" />
        </button>
      </div>
    </li>
  );
};

export default Comment;
