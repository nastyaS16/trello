import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  columns: [
    { id: "todo", title: "TODO", cards: [] },
    { id: "inProgress", title: "In Progress", cards: [] },
    { id: "testing", title: "Testing", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ],
  nextCardId: 1,
  nextCommentId: 1,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    changeColumnName: (state, action) => {
      const { columnId, newTitle } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.title = newTitle;
      }
    },
    addCardToColumn: (state, action) => {
      const { columnId, card } = action.payload;
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        card.id = state.nextCardId;
        column.cards.push(card);
        state.nextCardId++;
      }
    },
    editCardTitleColumn: (state, action) => {
      const { cardId, title } = action.payload;
      const column = state.columns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );

      if (column) {
        const card = column.cards.find((card) => card.id === cardId);
        if (card) {
          card.title = title;
        }
      }
    },
    editCardDescColumn: (state, action) => {
      const { cardId, description } = action.payload;
      const column = state.columns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );

      if (column) {
        const card = column.cards.find((card) => card.id === cardId);
        if (card) {
          card.description = description;
        }
      }
    },
    deleteCardFromColumn: (state, action) => {
      const { cardId } = action.payload;
      for (const column of state.columns) {
        const index = column.cards.findIndex((card) => card.id === cardId);
        if (index !== -1) {
          column.cards.splice(index, 1);
          return;
        }
      }
    },
    addCommentToCard: (state, action) => {
      const { cardId, comment } = action.payload;
      const column = state.columns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );
      if (column) {
        const card = column.cards.find((card) => card.id === cardId);
        if (card) {
          comment.id = state.nextCommentId;
          card.comments.push(comment);
          state.nextCommentId++;
        }
      }
    },

    editCommentInCard: (state, action) => {
      const { cardId, commentId, updatedComment } = action.payload;
      const column = state.columns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );
      if (column) {
        const card = column.cards.find((card) => card.id === cardId);
        if (card) {
          const comment = card.comments.find((c) => c.id === commentId);
          if (comment) {
            Object.assign(comment, updatedComment);
          }
        }
      }
    },

    deleteCommentFromCard: (state, action) => {
      const { cardId, commentId } = action.payload;
      const column = state.columns.find((col) =>
        col.cards.some((card) => card.id === cardId)
      );
      console.log("comment", commentId);
      console.log(column);
      if (column) {
        const card = column.cards.find((card) => card.id === cardId);
        if (card) {
          const commentIndex = card.comments.findIndex(
            (c) => c.id === commentId
          );
          if (commentIndex !== -1) {
            card.comments.splice(commentIndex, 1);
          }
        }
      }
    },
  },
});

export const {
  changeColumnName,
  addCardToColumn,
  editCardTitleColumn,
  editCardDescColumn,
  deleteCardFromColumn,
  addCommentToCard,
  editCommentInCard,
  deleteCommentFromCard,
} = boardSlice.actions;

export default boardSlice.reducer;
