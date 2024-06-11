import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  deleteNote,
  updateNote,
  getUserEmails,
} from "../services/noteService";
import Modal from "react-modal";
import AddNote from "../page/AddNote";
import NoteTobias from "./NoteTobias";
import ErrorBoundaryMyNotes from "../errorBoundaries/ErrorBoundaryMyNotes.jsx";

Modal.setAppElement("#root");

function MyNotesTobias() {

  const [errorNote, setErrorNote] = useState("");

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
      const filteredNotes = [...allNotes].filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      );
      setNotes(filteredNotes);
    }
  };
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };


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


  const sortNotesByCategory = () => {
    const allNotesSorted = [...notes].sort((n1, n2) =>
      n1.category.localeCompare(n2.category)
    );
    setNotes(allNotesSorted);
  };


  const sortNotesByTitle = () => {
    const allNotesSorted = [...notes].sort((n1, n2) =>
      n1.title.localeCompare(n2.title, "en", {
        numeric: true,
        sensitivity: "base",
      })
    );
    //const allNotesSorted = [...notes].sort((n1, n2) => n1.title.toLowerCase().localeCompare(n2.title));
    setNotes(allNotesSorted);
  };

  const sortNotesByDate =  () => {
    const allNotesSorted = [...notes].sort((n1, n2) =>
      n1.date.localeCompare(n2.date)
    );
    setNotes(allNotesSorted);
  };

  
  

  useEffect(() => {
    
    const fetchAllNotes = async () => {
      try{
      const allNotes = await readAllNotes();
      console.log(allNotes);
      setAllNotes(allNotes);
      setNotes(allNotes);
  
      }catch (error){
  
        setErrorNote("An error occurred. The error: " + error);
      }
    };
    
      fetchAllNotes();
  
  }, []);


  useEffect(() => {

    filterNotes(query);
    
  }, [query]);


  if(errorNote){
    return (<div> {errorNote} </div>)
  }
  return (


      <PageContainerTobias>
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
            <AddNote
              setAddNoteModalIsOpen={setAddNoteModalIsOpen}
              setNotes={setNotes}
              setAllNotes={setAllNotes}
            />
          </AddNotePopUp>
        </Modal>

        <SearchSortAndAddNoteDivTobias>
          <SortDropdownDivTobias>
            <SortDropdownTobias
              defaultValue="default"
              onChange={handleSortChange}
            >
              <option value="default">Sort by...</option>
              <option>Category</option>
              <option>Title</option>
              <option>Date</option>
            </SortDropdownTobias>
          </SortDropdownDivTobias>

          <SearchFieldDivTobias>
            <SearchFieldTobias
              placeholder="Search by title..."
              value={query}
              onChange={handleQueryChange}
            />
            <i className="bx bx-search"></i>
          </SearchFieldDivTobias>

          <AddNoteDivTobias>
            <i
              className="bx bxs-file-plus"
              onClick={() => setAddNoteModalIsOpen(true)}
            ></i>
          </AddNoteDivTobias>
        </SearchSortAndAddNoteDivTobias>

          
        <NotesGridContainerTobias>
      
          {notes.map((note) => (
            <NoteTobias
              note={note}
              handleDelete={handleDelete}
              handleUpdateNote={handleUpdateNote}
              key={note.id}
            />
          ))}
  
        </NotesGridContainerTobias>
        
      </PageContainerTobias>
    
  );
}

export default MyNotesTobias;

const PageContainerTobias = styled.div`
  border: solid black;
  padding: 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchSortAndAddNoteDivTobias = styled.div`
  border: solid red;
  margin-bottom: 1vw;
  padding: 0.5vw 2vw 0.5vw 2vw;

  width: 90vw;

  display: flex;
  justify-content: space-between;
`;

const SearchFieldDivTobias = styled.div`
  border: solid green;
  padding: 0.5vw;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  .bx-search {
    position: absolute;
    top: 50%;
    left: 86%;
    transform: translateY(-50%);
    font-size: 1.8vw;
  }
`;

const SearchFieldTobias = styled.input`
  width: 20vw;
  height: 2.4vw;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  padding: 0vw 1vw 0vw 1vw;
  font-size: 16px;
`;

const SortDropdownDivTobias = styled.div`
  border: solid brown;
  padding: 0.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SortDropdownTobias = styled.select``;

const AddNoteDivTobias = styled.div`
  border: solid orange;
  padding: 0.5vw;

  .bxs-file-plus {
    font-size: 3.25em;
    color: #000000;
    transition: all 0.5s ease;
    &:hover {
      cursor: pointer;
      color: #12611e;
    }
  }
`;





const NotesGridContainerTobias = styled.div`
  border: solid blue;
  padding: 1vw;

  display: grid;
  grid-template-columns: repeat(2, 36vw);
  grid-auto-rows: 38vw;

  grid-gap: 3vw;

  box-sizing: border-box;
`;

const NoteContainerTobias = styled.div`
  border: solid green;
  padding: 0.8vw;
`;

const ModalDiv = styled.div`
display: flex;
justify-content: center;

.modal{
    position: fixed; /* Position the modal relative to the viewport */
  top: 50%; /* Align the top edge of the modal to the vertical center of the viewport */
  left: 50%; /* Align the left edge of the modal to the horizontal center of the viewport */
  transform: translate(-50%, -50%); /

} 
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
