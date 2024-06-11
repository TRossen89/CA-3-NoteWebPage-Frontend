import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  deleteNote,
  updateNote,
  getUserEmails,
} from "../services/noteService";
import { Outlet, useNavigate, Router, Route, Routes } from "react-router-dom";

import Note from "./Note";
import SingleNote from "./SingleNote";


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

  const seeEventBubbling = (id) =>{

    console.log("Button event handler: " + id);
  }

  const seeNoteDirectlyNested = (id)=>
    {
      navigate(`nestedDirectlyInComponent/${id}`);

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

    <FlexBoxShow>

    <ChildOfFlexBox>
    <ShowId>{idShowing}</ShowId>
    <ErrorTrigger id='errortrigger' onClick={triggerAnError} >Trigger Error</ErrorTrigger>
    </ChildOfFlexBox>
    
      

    <DivForNotesListAndSingleNote>
      
      
      <EventBubblingDiv onClick={eventBubblingHandling}>


      <button id='button' onClick={handleEventBubblingButtonClick} >EVENT BUBBLING</button>


      <NotesAsList >
    <thead>
        <tr>
        <th>Title</th>
        <th>Date</th>
        <th>Action1</th>
       
        </tr>
        </thead>

        <tbody>

       {Array.isArray(notesForList) && notesForList.map((note) => (
          <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.date}</td>
            <td>
              <button id= {note.id} onClick={() => seeEventBubbling(note.id)}>See event bubbling</button>
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
        <th>Action1</th>
        <th>Action2</th>
        <th>Action3</th>
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
            <td>
              <button onClick={() => seeNoteDirectlyNested(note.id)}>See note directly nested</button>
            </td>
          </tr>
        ))}
        </tbody>
      </NotesAsList>


      <ShowSingleNoteDiv>

      <Routes>
        <Route path="nestedDirectlyInComponent/:theId" element={<SingleNote notesForList={notesForList}/>}/>
      </Routes>
      
        <Outlet/>
      </ShowSingleNoteDiv>

      
      </DivForNotesListAndSingleNote>

      </FlexBoxShow>
      
    </PageContainerForNotes>
  );
}


export default MyNotesAsList;


const FlexBoxShow = styled.div`

  border: solid thick purple;
  padding: 1vw;
  gap: 2vw;
  display: flex;
  flex-wrap: wrap;
`

const ChildOfFlexBox = styled.div`

  border: solid thick blue;
  padding: 1vw;
  flex: 1;

`

const ErrorTrigger = styled.button`
  width: 400px;
  font-size: 25px;
`
const ShowSingleNoteDiv = styled.div`

  border: solid gold;
  padding: 2vw;
  margin: 1vw;
`

const DivForNotesListAndSingleNote = styled.div`
  
  display: flex;
  padding: 2vw;
  border: solid thick black;
  flex-direction: column;
  
  flex: 1

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