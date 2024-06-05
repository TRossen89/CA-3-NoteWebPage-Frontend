import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  readAllNotes,
  deleteNote,
  updateNote,
  getUserEmails,
} from "../services/noteService";
import { useNavigate } from "react-router-dom";

import Note from "./Note";


function MyNotesAsList({notesForList, setNotesForlist}) {
  const navigate = useNavigate();



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
          </tr>
        ))}
        </tbody>
      </NotesAsList>
    </PageContainerForNotes>
  );
}


export default MyNotesAsList;


const PageContainerForNotes = styled.div`

`

const NotesAsList = styled.table`


`