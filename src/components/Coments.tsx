import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

type Comment = {
  id: string;
  text: string;
};

type CommentSectionProps = {
  comments: Comment[];
  onAddComment: (comment: string) => void;
  onEditComment: (commentId: string, newText: string) => void;
  onDeleteComment: (commentId: string) => void;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  onAddComment,
  onEditComment,
  onDeleteComment,
}) => {
  const [newComment, setNewComment] = useState("");
  console.log("!!!! - ", comments);
  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="w-full flex gap-3 flex-col">
      <h3 className="text-lg font-medium">Comments: {comments.length}</h3>
      <ul className="flex flex-col gap-3 ">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            onDeleteComment={onDeleteComment}
            onEditComment={onEditComment}
          />
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border w-full  focus:outline-none focus:border-primary-500 text-sm font-regular p-1 rounded-lg"
        />
        <button
          onClick={handleAddComment}
          className="bg-primary-500 font-medium px-3 text-white rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
