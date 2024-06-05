import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";


function MySingleNote({notesForList}) {

    const navigate = useNavigate();

    const [note, setNote] = useState({});
    const {noteId} = useParams();


    const goBack = ()=>{
        navigate("/notesAsList")
    }


    useEffect(() => {
        const singleNote = notesForList.filter((n)=> n.id == noteId);
        setNote(singleNote[0]);

      }, []);

  return (
    <>
    <button onClick={goBack}>Go Back</button>
    <div>
    <p>{note.title}</p>
    <p>{note.date}</p>      
    </div>
    </>
  )
}

export default MySingleNote
