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
    handleUpdateNote(note, noteContent, noteTitle, category)
    setIsEditing(!isEditing);
  }
  const saveTitleEdit = () => {
    handleUpdateNote(note, noteContent, noteTitle, category)
  }

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
    <NoteHead>
          <NoteCategory>{note.category}</NoteCategory>
          <NoteDeleteButton onClick={() => {handleDelete(note)}}>Delete</NoteDeleteButton>
        </NoteHead>
      <NoteBackgroundPaper $editBackground={isEditing ? 'editing' : 'notEditing'}>
      <NoteTitleWrapper>
          <NoteTitle id="title" value={noteTitle} onChange={handleInputChange} onBlur={saveTitleEdit}/>
          </NoteTitleWrapper>

        <TextAreaForEditing
          id="content"

          onClick={toggleEditing}
          onBlur={saveEdit}
          value={noteContent}
          onChange={handleInputChange}
        />

        <NoteFoot></NoteFoot>
      </NoteBackgroundPaper>
    </MainNoteDiv>

    /*<>



      <NoteWrapper>
        <i className="bx bx-x" onClick={() => handleDelete(note)}></i>
        {contentChanged ? (
          <i
            className="bx bx-check"
            onClick={() => {
              handleUpdateNote(note, noteContent, noteTitle, category);
              setContentChanged(false);
            }}
          ></i>
        ) : (
          <i className="bx bx-radio-circle"></i>
        )}
        <CategoryDiv $category={category} onClick={handleCategoryChange}>
          <p>{category}</p>
        </CategoryDiv>

        <StyledDate>{note.date}</StyledDate>

        <ContentWrapper>
          {isEditing ? (
            <StyledTitleEdit
              id="title"
              onBlur={toggleEditing}
              value={noteTitle}
              onChange={handleInputChange}
            />
          ) : (
            <StyledTitleDisplay onClick={toggleEditing}>
              {noteTitle}
            </StyledTitleDisplay>
          )}
          <hr></hr>
          <StyledTextArea
            id="content"
            value={noteContent}
            onChange={handleInputChange}
          />
        </ContentWrapper>
        <div>
          <ColabIcon>
            <i
              className="bx bxs-user-plus"
              onClick={() => setModalIsOpen(true)}
            ></i>
          </ColabIcon>
          </div>

          <Modal
            className="modal"
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.617)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <StyledPopup>
              <i className="bx bx-x" onClick={() => setModalIsOpen(false)}></i>
              <PopupTitle>Add Collaborator</PopupTitle>
              <form
                onSubmit={addColaboratroSubmit}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  style={{
                    padding: "5px",
                    width: "50%",
                    height: "30px",
                    borderRadius: "5px",
                    margin: "10px",
                    border: "none",
                  }}
                  type="text"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px",
                    width: "50%",
                    height: "40px",
                    borderRadius: "5px",
                    border: "none",
                  }}
                >
                  add collaborator
                </button>
              </form>
              {!isEditing ? (
                <>
                  <h3>Collaborators</h3>
                  <hr></hr>
                  <div
                    style={{
                      maxHeight: "84px", // Adjust as needed
                      overflowY: "auto",
                    }}
                  >
                    {note.colaborators.map((c) => (
                      <a key={c}>
                        {c}
                        <br></br>
                      </a>
                    ))}
                  </div>
                </>
              ) : null}
            </StyledPopup>
          </Modal>
        
      </NoteWrapper>
    </>*/
  );
};

export default NoteTobias;

const MainNoteDiv = styled.div`
  border: solid red;
  padding: .8vw;
  
  box-sizing: border-box;
`;

const NoteBackgroundPaper = styled.div`
  
  background-color: ${(props) => (props.$editBackground=== 'editing' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)')};
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
  grid-template-columns: 30% 20%;
  justify-content: space-between;
  height: 15%;
  width: 100%;
`;

const NoteCategory = styled.div`
  border: solid brown;
  margin: 0.1vw;
`;

const NoteTitleWrapper = styled.div`
display: flex;
align-items: center;
box-sizing: border-box;`;
const NoteTitle = styled.textarea`

flex: 1;
box-sizing: border-box;
  border: solid green;
  background-color: transparent;

  color: black;
  resize: none;
  outline: none;
  font-size: 1vw;
  margin: 0.1vw;
  padding-left: .5vw;
  text-align: center;
  
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
height: 10%`;
