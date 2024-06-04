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
import Note from "./Note";

Modal.setAppElement("#root");


function MyNotes() {
  const navigate = useNavigate();
  const [addNote, setAddNote] = useState(false);

  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");
  const [addNoteModalIsOpen, setAddNoteModalIsOpen] = useState(false);

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case "Category":
        sortNotesByCategory();
        break;
      case "Title":
        sortNotesByTitle();
        break;
      case "Date":
        sortNotesByDate();
        break;
      default:
        break;
    }
  };


  const filterNotes = (query) => {
    
    if (query === " " || query === "") {
      setNotes([...allNotes]);
    } else {
      const filteredNotes = [...allNotes].filter(note => note.title.toLowerCase().includes(query.toLowerCase()));
      setNotes(filteredNotes); 
    }
  }
  const handleQueryChange = (e) => {
    setQuery(e.target.value)
    
  };
  
  // const search = async () => {
  //   const allNotesFromSearch = await searchByTitle(query);
  //   setNotes(allNotesFromSearch);

  // }

  const handleDelete = async (note) => {
    await deleteNote(note);
    setNotes(notes.filter((n) => n.id !== note.id));
    setAllNotes(allNotes.filter((n) => n.id !== note.id));
  };

  const handleUpdateNote = async (thisNote, content, title, category) => {
    const note = { ...thisNote, content, title, category };
    console.log(note);
    updateNote(note);
  };
/*
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setNotes([...notes].filter((note) => note.title.includes(e.target.value)));
  };
  */



  const sortNotesByCategory = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) => n1.category.localeCompare(n2.category));
    setNotes(allNotesSorted);
  };

  const sortNotesByTitle = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) =>n1.title.localeCompare(n2.title, 'en', { numeric: true, sensitivity: 'base' }));
    //const allNotesSorted = [...notes].sort((n1, n2) => n1.title.toLowerCase().localeCompare(n2.title));
    setNotes(allNotesSorted);
  };

  const sortNotesByDate = async () => {
    const allNotesSorted = [...notes].sort((n1, n2) => n1.date.localeCompare(n2.date));
    setNotes(allNotesSorted);
  };

  const fetchAllNotes = async () => {
    const allNotes = await readAllNotes();
    console.log(allNotes);
    setAllNotes(allNotes);
    setNotes(allNotes);
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  useEffect(() => {
    filterNotes(query);
  }, [query]);

  return (
    <PageContainer>
      <Modal
        className="modal"
        isOpen={addNoteModalIsOpen}
        onRequestClose={() => {
          setAddNoteModalIsOpen(false);
          setAddNote(false);
        }}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.617)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          },
        }}
      >
        <AddNotePopUp>
          <i
            className="bx bx-x"
            onClick={() => setAddNoteModalIsOpen(false)}
          ></i>
          <AddNote setAddNoteModalIsOpen={setAddNoteModalIsOpen} setNotes={setNotes} setAllNotes={setAllNotes}/>
        </AddNotePopUp>
      </Modal>
      <DivForSearchBarAndSortButtons>
        <SearchWrapper>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
          ></SearchBar>
          <i className="bx bx-search"></i>
          <AddNoteIcon>
            <i
              className="bx bxs-file-plus"
              onClick={() => setAddNoteModalIsOpen(true)}
            ></i>
          </AddNoteIcon>
        </SearchWrapper>
        <SortSelectWrapper>
          <SortSelect onChange={handleSortChange}>
            <option selected="selected" disabled>
              Sort by...
            </option>
            <option>Category</option>
            <option>Title</option>
            <option>Date</option>
          </SortSelect>
        </SortSelectWrapper>
      </DivForSearchBarAndSortButtons>
      <MyNotesBody $oneNote={notes.length === 1}>
        {notes.map((note) => (
          <NoteContainer key={note.id}>
            <Note
              note={note}
              handleDelete={handleDelete}
              handleUpdateNote={handleUpdateNote}
            />
          </NoteContainer>
        ))}
      </MyNotesBody>
    </PageContainer>
  );
}

export default MyNotes;

//-------------------- STYLES --------------------//
// PAGE CONTENT
const PageContainer = styled.div`
  * {
    margin: 0;
    box-sizing: border-box;
  }
  width: 100%;
`;

const DivForSearchBarAndSortButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vw;
  margin-bottom: 4vw;
  width: 100%;
`;

const SortSelectWrapper = styled.div`
  border: none;
  display: flex;
  justify-content: flex-end;
`;

const SortSelect = styled.select`
  margin: 0 38px 0 0;
  border: none;
  border-radius: 10px 10px 5px 5px;
  background-color: #fff;
  padding: 10px;
  max-width: 180px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  padding: 0.5vw;
  flex-grow: 0.1;
  align-items: flex-start;
  //height: 20px;
  @media (max-width: 586px) {
    max-width: 90px;
    margin: 0 25px 0 0;
  }
  @media (max-width: 480px) {
    max-width: 90px;
    margin: 0 5px 0 0;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 0 50px 0 20px;
  font-size: 16px;
`;

const AddNoteIcon = styled.div`
  position: absolute;
  right: 113%;
  top: -20%;
  z-index: 1;
  .bxs-file-plus {
    font-size: 2.25em;
    color: #000000;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      color: #12611e;
    }
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 45px;

  @media (max-width: 566px) {
    width: 250px;
  }
  @media (max-width: 464px) {
    left: 0;
    transform: translateX(0);
    margin: 25px;
  }

  i {
    position: absolute;
    font-size: 25px;
    left: 85%;
    transform: translateY(40%);
    &:hover {
      cursor: pointer;
    }
  }
`;

// MY NOTES GRID
const MyNotesBody = styled.div`
  margin: 12px 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 50px;
  justify-content: space-between;
  width: 90%;
  margin: 40px auto auto auto;

  justify-items: ${(props) => (props.$oneNote ? "center;" : "")};
  max-width: ${(props) => (props.$oneNote ? "30%;" : "")};
  @media (max-width: 970px) {
    max-width: ${(props) => (props.$oneNote ? "70%;" : "")};
  }
  @media (max-width: 570px) {
    max-width: ${(props) => (props.$oneNote ? "100vh" : "")};
  }
`;

// NOTE CONTAINERCARD
const NoteContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px);
  border-radius: 10px;
  height: 500px;
  transition: ease-in-out 0.1s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }
  width: 100%;
`;


const AddNotePopUp = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

height: 500px;
width: 600px;
background-color: rgba(255, 255, 255, 0.2);
border: 2px solid rgba(255, 255, 255, 0.2);
backdrop-filter: blur(20px);
border-radius: 10px;
i {
  font-size: 3em;
  position: absolute;
  right: 0%;
  top: 0%;
  cursor: pointer;
}

@media (max-width: 600px) {
  width: 90vw;
  height: 60vh;
}
`;

