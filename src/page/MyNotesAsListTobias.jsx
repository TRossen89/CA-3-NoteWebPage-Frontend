import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  deleteNote,
  updateNote,
  getUserEmails,
} from "../services/noteService";
import { Outlet, useNavigate } from "react-router-dom";

import Note from "./Note";


function MyNotesAsList({notesForList, setNotesForlist}) {


  const [triggerError, setTriggerError] = useState(false);

  useEffect(()=>{  
    if (triggerError) {
    throw new Error("An error occurred during rendering");

  }}, [triggerError])

  
  const navigate = useNavigate();
  
  const [idShowing, setIdShowing] = useState(null);

  const handleEventBubblingButtonClick = (event) => {

      console.log("Id from button: " + event.target.id)

  }

  const eventBubblingHandling = (event) =>{

    const idToShow = event.target.id;
    console.log(idToShow)

    setIdShowing(idToShow);

  }

  const triggerAnError = () => {
    setTriggerError(true);

  }

  const seeNoteHere = (id) =>{
    navigate(`${id}`);
  }

  
  const goToNote = (id) => {
    console.log("Id of note pressed: " + id);
    navigate(`/singleNote/${id}`);
  }

  const fetchAllNotes = async () => {
    const allNotesForList = await readAllNotes();
    console.log(allNotesForList);
    setNotesForlist(allNotesForList);
  };

  useEffect(() => {

    fetchAllNotes();
  }, []);

  return (
    <PageContainerForNotes>

    <div>
    <ShowId>{idShowing}</ShowId>
    <button id='errortrigger' onClick={triggerAnError} >Trigger Error</button>
    </div>
      

    <DivForNotesListAndSingleNote>
      
      
      <EventBubblingDiv onClick={eventBubblingHandling}>


      <button id='button' onClick={handleEventBubblingButtonClick} >EVENT BUBBLING</button>


      <NotesAsList >
    <thead>
        <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Action1</th>
        <th>Action2</th>
        </tr>
        </thead>

        <tbody>

       {Array.isArray(notesForList) && notesForList.map((note) => (
          <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <td>
              <button id= {note.id} /*onClick={() => seeEventBubbling(note.id)}*/>See event bubbling</button>
              
            </td>
            
          </tr>
        ))}
        </tbody>
      </NotesAsList>
      </EventBubblingDiv>


      <NotesAsList >
    <thead>
        <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Action</th>
        </tr>
        </thead>

        <tbody>

       {Array.isArray(notesForList) && notesForList.map((note) => (
          <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <td>
              <button onClick={() => goToNote(note.id)}>Go To Note</button>
            </td>
            <td>
              <button onClick={() => seeNoteHere(note.id)}>See Note On This Page</button>
            </td>
          </tr>
        ))}
        </tbody>
      </NotesAsList>


      <ShowSingleNoteDiv>
        <Outlet/>
      </ShowSingleNoteDiv>
      </DivForNotesListAndSingleNote>
      
    </PageContainerForNotes>
  );
}


export default MyNotesAsList;

const ShowSingleNoteDiv = styled.div`

  border: solid gold;
  padding: 2vw;
  margin: 1vw;
`

const DivForNotesListAndSingleNote = styled.div`
  display: flex;
  padding: 2vw;


`
const ShowId = styled.p`
border: solid red;
padding: 2vw;

`

const EventBubblingDiv = styled.div`
border: solid green;
padding: 3vw;


`

const PageContainerForNotes = styled.div`
border: solid brown;
padding: 1vw;
margin: 2vw;

`

const NotesAsList = styled.table`
border: solid gray;
padding: 1vw;


`