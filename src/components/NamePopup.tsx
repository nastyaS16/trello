import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../redux/slices/userSlice";

type NamePopupProps = {};

const NamePopup: React.FC<NamePopupProps> = () => {
  const [name, setUserName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name.trim() !== "") {
      dispatch(setName(name));
    }
  };

  return (
    <div className="w-fit h-fit bg-white p-8 rounded-xl m-auto my-9 flex flex-col gap-3">
      <h3 className="font-medium text-xl">Пожалуйста, введите ваше имя:</h3>
      <input
        type="text"
        value={name}
        onChange={(e) => setUserName(e.target.value)}
        className="border ourline-none border-grayscale-700 focus:outline-none focus:border-primary-500 text-xl font-medium p-1 rounded-lg"
      />
      <button
        onClick={handleSubmit}
        className="bg-primary-500 rounded-xl py-3 font-medium text-white"
      >
        Сохранить
      </button>
    </div>
  );
};

export default NamePopup;
