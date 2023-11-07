// CardDetailsPopup.tsx
import React, { useRef, useState } from "react";
import { CardType, editCardDescription } from "../redux/slices/cardSlice";
import { editCardTitle } from "../redux/slices/cardSlice";
import { useDispatch } from "react-redux";
import { IoCloseOutline, IoPencilOutline } from "react-icons/io5";
import {
  addCommentToCard,
  deleteCardFromColumn,
  deleteCommentFromCard,
  editCardDescColumn,
  editCardTitleColumn,
  editCommentInCard,
} from "@/redux/slices/boardSlice";
import CommentSection from "./Coments";

type CardDetailsPopupProps = {
  cardData: CardType;
  onClose: () => void;
};

const CardDetailsPopup: React.FC<CardDetailsPopupProps> = ({
  cardData,
  onClose,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const [newCatdTitle, setNewCardTitle] = useState(cardData.title);
  const [newCatdDescription, setNewCardDescription] = useState(
    cardData.description
  );

  const dispatch = useDispatch();

  const handleSaveTitleClick = () => {
    setIsEditingTitle(false);
    console.log(newCatdTitle);
    console.log("editing title of ", cardData.id);
    dispatch(editCardTitleColumn({ cardId: cardData.id, title: newCatdTitle }));
    console.log("saved title");
  };

  const handleSaveDescriptionClick = () => {
    setNewCardDescription(newCatdDescription);
    dispatch(
      editCardDescColumn({
        cardId: cardData?.id,
        description: newCatdDescription,
      })
    );
  };

  const handleAddComment = (comment: string) => {
    dispatch(
      addCommentToCard({
        cardId: cardData.id,
        comment: {
          id: 1,
          text: comment,
        },
      })
    );
  };

  const handleEditComment = (commentId: string, newText: string) => {
    dispatch(
      editCommentInCard({
        cardId: cardData.id,
        commentId: commentId,
        updatedComment: { text: newText },
      })
    );
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(
      deleteCommentFromCard({
        cardId: cardData.id,
        commentId: commentId,
      })
    );
  };
  return (
    <div className="bg-black/50 z-10 fixed w-full h-full right-0 top-0">
      <div className="bg-white w-[380px] h-fit p-8 rounded-xl opacity-100 m-auto my-8 z-20 flex flex-col items-end gap-3">
        <button onClick={onClose}>
          <IoCloseOutline />
        </button>
        {isEditingTitle ? (
          <div className="flex flex-row justify-between h-[40px] w-full">
            <input
              type="text"
              value={newCatdTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              className="border  focus:outline-none focus:border-primary-500 text-xl font-medium p-1 rounded-lg "
            />
            <button
              onClick={handleSaveTitleClick}
              className="text-primary-500 font-medium"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-between h-[40px] items-center w-full">
            <h2
              onClick={() => setIsEditingTitle(true)}
              className="text-xl font-medium"
            >
              {newCatdTitle}
            </h2>
            <button onClick={() => setIsEditingTitle(true)}>
              <IoPencilOutline className="text-primary-500 h-6 w-6" />
            </button>
          </div>
        )}
        <textarea
          placeholder="Введите описание задачи"
          value={newCatdDescription}
          onChange={(e) => {
            setNewCardDescription(e.target.value);
            setDescriptionChanged(e.target.value !== cardData.description);
          }}
          className="border w-full  focus:outline-none focus:border-primary-500 text-sm font-regular p-1 rounded-lg "
        />
        {descriptionChanged && (
          <button
            onClick={handleSaveDescriptionClick}
            className="font-medium text-lg bg-primary-200 w-full p-3 rounded-xl"
          >
            Save description
          </button>
        )}
        <button
          onClick={() =>
            dispatch(deleteCardFromColumn({ cardId: cardData.id }))
          }
          className="font-medium text-lg bg-error-100 w-full p-3 rounded-xl text-error-500"
        >
          Delete Card
        </button>
        <CommentSection
          comments={cardData.comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />
      </div>
    </div>
  );
};

export default CardDetailsPopup;
