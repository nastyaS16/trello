import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColumnName, addCardToColumn } from "../redux/slices/boardSlice";
import { IoPencilOutline } from "react-icons/io5";
import Card from "./Card";
import { CardType } from "@/redux/slices/cardSlice";
import { RootState } from "@/redux/store";

type ColumnProps = {
  columnData: {
    id: string;
    title: string;
    cards: CardType[];
  };
};

const Column: React.FC<ColumnProps> = ({ columnData }) => {
  console.log(columnData);
  const [newColumnName, setNewColumnName] = useState(columnData.title);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  const nextId = useSelector((state: RootState) => state.board.nextCardId);

  const dispatch = useDispatch();

  const handleAddCard = () => {
    if (isAddingCard) {
      if (newCardTitle.trim() !== "") {
        dispatch(
          addCardToColumn({
            columnId: columnData.id,
            card: {
              id: nextId,
              title: newCardTitle,
              description: "",
              comments: [],
            },
          })
        );
        setNewCardTitle("");
      }
    }
    setIsAddingCard(!isAddingCard);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log(columnData.id, newColumnName);
    dispatch(
      changeColumnName({ columnId: columnData.id, newTitle: newColumnName })
    );
  };

  return (
    <div className="w-full p-3 rounded-xl bg-white">
      <div className="flex justify-between p-2 items-center h-[62px]">
        {isEditing ? (
          <input
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            className="border outline-none border-grayscale-700 focus:border-primary-500 text-xl font-medium p-1 rounded-lg "
          />
        ) : (
          <h2
            onClick={() => setIsEditing(true)}
            className="text-xl font-medium"
          >
            {newColumnName}
          </h2>
        )}
        {isEditing ? (
          <button
            onClick={handleSaveClick}
            className="text-primary-500 font-medium"
          >
            Save
          </button>
        ) : (
          <button onClick={() => setIsEditing(true)}>
            <IoPencilOutline className="text-primary-500 h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex gap-3 flex-col">
        {columnData.cards.map((card) => (
          <Card key={card.id} cardData={card} />
        ))}
      </div>
      {isAddingCard ? (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Введите название"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="border text-lg p-1 w-full my-3 outline-none border-grayscale-700 focus:border-primary-500 font-medium rounded-lg "
          />
          <button
            onClick={handleAddCard}
            className="bg-primary-500 rounded-xl text-xl font-medium text-white w-full py-3"
          >
            Сохранить
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddCard}
          className="bg-primary-500 rounded-xl text-xl font-medium text-white w-full py-3 my-2"
        >
          Добавить карточку
        </button>
      )}
    </div>
  );
};

export default Column;
