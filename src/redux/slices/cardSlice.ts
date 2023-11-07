import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CommentType = {
  id: string;
  text: string;
};

export type CardType = {
  id: string;
  title: string;
  description: string;
  comments: CommentType[];
};

const initialState: CardType[] = [];

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardType>) => {
      state.push(action.payload);
    },
    editCard: (
      state,
      action: PayloadAction<{ cardId: string; updatedCard: CardType }>
    ) => {
      const { cardId, updatedCard } = action.payload;
      const existingCard = state.find((card) => card.id === cardId);
      if (existingCard) {
        Object.assign(existingCard, updatedCard);
      }
    },
    editCardTitle: (
      state,
      action: PayloadAction<{ cardId: string; title: string }>
    ) => {
      const { cardId, title } = action.payload;
      const card = state.find((card) => card.id === cardId);
      console.log("card ---- ", card);
      console.log(cardId, card?.id);

      if (card) {
        console.log("set title ", title);
        card.title = title;
        console.log("edited title", title);
      }
    },
    editCardDescription: (
      state,
      action: PayloadAction<{ cardId: string; description: string }>
    ) => {
      const { cardId, description } = action.payload;
      const card = state.find((card) => card.id === cardId);
      if (card) {
        card.description = description;
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const cardIndex = state.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        state.splice(cardIndex, 1);
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ cardId: string; comment: CommentType }>
    ) => {
      const { cardId, comment } = action.payload;
      const card = state.find((card) => card.id === cardId);
      if (card) {
        card.comments.push(comment);
      }
    },
    editComment: (
      state,
      action: PayloadAction<{
        cardId: string;
        commentId: string;
        updatedComment: CommentType;
      }>
    ) => {
      const { cardId, commentId, updatedComment } = action.payload;
      const card = state.find((card) => card.id === cardId);
      if (card) {
        const comment = card.comments.find((c) => c.id === commentId);
        if (comment) {
          Object.assign(comment, updatedComment);
        }
      }
    },
    deleteComment: (
      state,
      action: PayloadAction<{ cardId: string; commentId: string }>
    ) => {
      const { cardId, commentId } = action.payload;
      const card = state.find((card) => card.id === cardId);
      if (card) {
        const commentIndex = card.comments.findIndex((c) => c.id === commentId);
        if (commentIndex !== -1) {
          card.comments.splice(commentIndex, 1);
        }
      }
    },
  },
});

export const {
  addCard,
  editCard,
  deleteCard,
  addComment,
  editComment,
  deleteComment,
  editCardTitle,
  editCardDescription,
} = cardSlice.actions;

export default cardSlice.reducer;
