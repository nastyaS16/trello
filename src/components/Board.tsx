import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import { RootState } from "../redux/store";
import NamePopup from "./NamePopup";

const Board: React.FC = () => {
  const columns = useSelector((state: RootState) => state.board.columns);

  const userName = useSelector((state: RootState) => state.user.name);
  console.log(userName);
  return (
    <>
      {!userName ? (
        <NamePopup />
      ) : (
        <div className="board mx-10">
          <h1 className="text-2xl font-medium py-3">Привет, {userName}!</h1>

          <div className="flex md:flex-row w-full gap-4 flex-col">
            {columns.map((column) => (
              <Column key={column.id} columnData={column} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
