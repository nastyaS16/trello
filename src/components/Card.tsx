import { CardType } from "@/redux/slices/cardSlice";
import React, { useState } from "react";
import CardDetailsPopup from "./CardDetails";

type CardProps = {
  cardData: CardType;
};

const Card: React.FC<CardProps> = ({ cardData }) => {
  console.log(cardData);
  const [isCardDetailsOpen, setCardDetailsOpen] = useState(false);

  const handleClose = () => {
    setCardDetailsOpen(false);
    console.log("card closed", isCardDetailsOpen);
  };

  const handleOpen = () => {
    setCardDetailsOpen(true);
    console.log("card opened");
  };
  return (
    <>
      {isCardDetailsOpen && (
        <CardDetailsPopup cardData={cardData} onClose={handleClose} />
      )}
      <div
        className="p-2 rounded-xl bg-grayscale-200 cursor-pointer"
        onClick={handleOpen}
      >
        <h3 className="text-lg font-medium">{cardData.title}</h3>
      </div>
    </>
  );
};

export default Card;
