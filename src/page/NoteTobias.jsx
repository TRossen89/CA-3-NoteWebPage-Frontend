import React, { useState } from "react";
import styled from "styled-components";
import { getUserEmails } from "../services/noteService";

//import Modal from "react-modal";

//Modal.setAppElement("#root");

const NoteTobias = ({ note, handleDelete, handleUpdateNote }) => {
  
  const [noteContent, setNoteContent] = useState(note.content);
  const [noteTitle, setNoteTitle] = useState(note.title);
  const [collaboratorToAdd, setCollaboratorToAdd] = useState("");
  const [category, setCategory] = useState(note.category);
  const [isEditing, setIsEditing] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const saveEdit = () => {
    handleUpdateNote(note, noteContent, noteTitle, category);
    setIsEditing(!isEditing);
  };
  const saveTitleEdit = () => {
    handleUpdateNote(note, noteContent, noteTitle, category);
  };

  const handleInputChange = (event) => {
    setContentChanged(true);
    if (event.target.id === "title") {
      setNoteTitle(event.target.value);
    } else {
      setNoteContent(event.target.value);
    }
  };

  const handleChange = (e) => {
    setCollaboratorToAdd(e.target.value);
  };

  const addColaboratroSubmit = async (e) => {
    e.preventDefault();
    const userEmails = await getUserEmails();
    const newColaborator = userEmails.find(
      (ue) => ue.email === collaboratorToAdd
    );
    if (newColaborator) {
      note.colaborators = [...note.colaborators, newColaborator.email];
      handleUpdateNote(
        note,
        noteContent,
        noteTitle,
        category,
        note.colaborators
      );
      setCollaboratorToAdd("");
    } else {
      // TODO unhappy path
    }
  };

  return (
    <MainNoteDiv>
      <NoteBackgroundPaper
        $editBackground={isEditing ? "editing" : "notEditing"}
      >
        <NoteHead>
          <CategoryWrapper className="noteHeadWrapper">
            <NoteCategory>{note.category}</NoteCategory>
          </CategoryWrapper>

          <NoteTitleWrapper className="noteHeadWrapper">
            <NoteTitle
              id="title"
              value={noteTitle}
              onChange={handleInputChange}
              onBlur={saveTitleEdit}
            />
          </NoteTitleWrapper>

          <DateWrapper className="noteHeadWrapper">
            <StyledDate>{note.date}</StyledDate>
          </DateWrapper>
        </NoteHead>

        <TextAreaForEditing
          id="content"
          onClick={toggleEditing}
          onBlur={saveEdit}
          value={noteContent}
          onChange={handleInputChange}
        />
      </NoteBackgroundPaper>

      <NoteFoot>
        <NoteDeleteButton
          onClick={() => {
            handleDelete(note);
          }}
        >
          Delete
        </NoteDeleteButton>
      </NoteFoot>
    </MainNoteDiv>
  );
};

export default NoteTobias;

const CategoryWrapper = styled.div`
display: flex;
align-items: center;
border: solid black`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: solid blue;
  
`;

const StyledDate = styled.div`
  display: flex;
  align-items: center;
  border: solid pink;

  font-size: 0.8vw;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px 10px 10px 0;

  color: black;
  text-align: center;

  width: auto;
`;

const MainNoteDiv = styled.div`
  border: solid red;
  padding: 0.8vw;

  box-sizing: border-box;
`;

const NoteBackgroundPaper = styled.div`
  background-color: ${(props) =>
    props.$editBackground === "editing"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(255, 255, 255, 0.8)"};
  border: solid black;
  border-radius: 10px;
  height: 85%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
 
`;
const NoteHead = styled.div`
  box-sizing: border-box;
  border: solid orange;

  display: grid;
  grid-template-rows: 3vw;
  grid-template-columns: 18% 64% 18%;
  justify-content: space-between;
  height: 15%;
  width: 100%;
  .noteHeadWrapper{
    height: 95%; }
`;

const NoteCategory = styled.div`
  border: solid brown;
  margin: 0.1vw;
`;

const NoteTitleWrapper = styled.div`
border: solid yellow;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%
  
  box-sizing: border-box;
`;

const NoteTitle = styled.textarea`
  

  box-sizing: border-box;
  border: solid green;
  background-color: transparent;

  color: black;
  resize: none;
  outline: none;
  font-size: 2vw;
  height: 95%;
  width: 95%;

  text-align: center;
  justify-content: center;
  padding-top: ;
`;

const NoteEditButton = styled.button``;

const NoteDeleteButton = styled.button`
  margin: 0.1vw;
`;

const NoteBody = styled.div`
  box-sizing: border-box;
  border: solid purple;
  height: 10%;
`;

const TextAreaForEditing = styled.textarea`
  box-sizing: border-box;
  border: solid yellow;
  background-color: transparent;

  color: black;
  resize: none;
  outline: none;
  font-size: 1vw;
  min-height: 75%;
  width: 90%;
`;

const NoteFoot = styled.div`
  box-sizing: border-box;
  border: solid orange;

  display: grid;
  grid-template-rows: 3vw;
  grid-template-columns: 35% 20% 35%;
  justify-content: space-between;
  height: 15%;
  width: 100%;
`;
