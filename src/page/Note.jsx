
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  deleteNote,
  updateNote,
  getUserEmails,
} from "../services/noteService";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AddNote from "../page/AddNote";

//Modal.setAppElement("#root");


const Note = ({ note, handleDelete, handleUpdateNote }) => {
    const [noteContent, setNoteContent] = useState(note.content);
    const [noteTitle, setNoteTitle] = useState(note.title);
    const [collaboratorToAdd, setCollaboratorToAdd] = useState("");
    const [category, setCategory] = useState(note.category);
    const [isEditing, setIsEditing] = useState(false);
    const [contentChanged, setContentChanged] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
  
    const handleCategoryChange = () => {
      setContentChanged(true);
      setCategory((prevCategory) =>
        prevCategory === "NOTE" ? "REMINDER" : "NOTE"
      );
    };
  
    const toggleEditing = () => {
       alert(window.innerHeight);
      setIsEditing(!isEditing);
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
      <>
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
          </div>
        </NoteWrapper>
      </>
    );
  };


  
//NOTE

//category
const CategoryDiv = styled.div`
position: absolute;
border: none;
background-color: ${(props) =>
  props.$category === "REMINDER"
    ? "rgba(193, 21, 21, 0.5)"
    : "rgba(255, 217, 0, 0.5)"};
color: black;
text-align: center;
font-size: 1em;
border-radius: 10px;
padding: 5px 10px 5px 10px;
margin: 10px;
width: 100px;
user-select: none;
&:hover {
  cursor: pointer;
}
`;

const StyledDate = styled.div`
position: absolute;
font-size: 11px;
background-color: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(20px);
border-radius: 10px 10px 10px 0;
padding: 5px 10px 5px 10px;
color: black;
margin: 10px;
left: 72.2%;
width: auto;
user-select: none;
transform: translateY(-192%);
`;

const StyledTitleDisplay = styled.div`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
/* other styles */
height: 50px;
width: 55%;
margin-left: 110px;
resize: none;
background: none;
color: black;
font-size: 2em;
font-family: "Letter Gothic Std", monospace;
vertical-align: top;
outline: none;
@media (max-width: 1412px) {
  width: 50%;
}
@media (max-width: 1242px) {
  width: 46%;
}
`;

//title
const StyledTitleEdit = styled.textarea`
height: 50px;
width: 55%;
margin-left: 110px;
border: none;
resize: none;
overflow-x: auto; /* Allow horizontal scrolling */
white-space: nowrap;
resize: none;
overflow: hidden;
background: none;
color: black;
font-size: 2em;
font-family: "Letter Gothic Std", monospace;
vertical-align: top;
outline: none;
@media (max-width: 1412px) {
  width: 50%;
}
@media (max-width: 1242px) {
  width: 46%;
}
`;

//note
const NoteWrapper = styled.div`
.bx.bx-x {
  color: #840e0e7d;
  font-size: 2.5em;
  position: absolute;
  left: 90%;
  transform: translateY(-10%);
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    color: #840e0e;
  }
}
.bx.bx-check {
  color: #0080008e;
  font-size: 2.5em;
  position: absolute;
  left: 90%;
  transform: translateY(-15%);
  translate: -85%;
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    color: #008000;
  }
}
.bx.bx-radio-circle {
  color: #0080008e;
  font-size: 2.5em;
  position: absolute;
  left: 90%;
  transform: translateY(-15%);
  translate: -85%;
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    color: #008000;
  }
}
`;

const ContentWrapper = styled.div`
margin: 10px;
height: 90%;
width: 95%;
overflow: hidden;
border: none;
hr {
  filter: opacity(10%);
  border: 1px solid black;
  border-radius: 10px;
}
`;

const StyledTextArea = styled.textarea`
margin-top: 0px;
border: none;
resize: none;
height: 394.5px;

width: 100%;
overflow-x: auto;
padding: 10px;
border: none;
background: none;
color: black;
font-size: 1em;
font-family: "Letter Gothic Std", monospace;
vertical-align: top;
outline: none;
`;

const ColabIcon = styled.div`
position: absolute;
right: 2%;
bottom: 0%;
i {
  font-size: 2em;
  color: #000000;
  transition: all 0.5s ease;
  &:hover {
    cursor: pointer;
    color: #12611e;
  }
}
`;

const StyledPopup = styled.div`
background-color: #ffffffcd;
border-radius: 10px;
padding: 20px;
width: 300px;
height: 200px;
i {
  font-size: 1.8em;
  position: absolute;
  left: 74.5%;
  top: 35%;
  cursor: pointer;
}
`;

const PopupTitle = styled.h2`
background-color: rgb(73, 73, 73);
padding: 5px;
border-radius: 20px;
margin: 5px;
font-size: 1.5em;
color: #ffffff;
text-align: center;
font-weight: 500;
`;


export default Note;
