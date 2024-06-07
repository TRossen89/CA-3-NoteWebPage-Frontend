import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";


function SingleNote({notesForList}) {

    const navigate = useNavigate();

    const [note, setNote] = useState({});
    const {singleNoteId} = useParams();


    useEffect(() => {
        const singleNote = notesForList.filter((n)=> n.id == singleNoteId);
        setNote(singleNote[0]);

      }, [singleNoteId]);

  return (
    <>
    
    <div>
    <p>{note.title}</p>
    <p>{note.date}</p>      
    </div>
    </>
  )
}

export default SingleNote
