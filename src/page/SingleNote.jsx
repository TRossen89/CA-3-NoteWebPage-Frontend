import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";


function SingleNote({notesForList}) {

  

    const [note, setNote] = useState({});

    const {singleNoteId} = useParams();
    const {theId} = useParams();


    useEffect(() => {
      if(singleNoteId){
        const singleNote = notesForList.filter((n)=> n.id == singleNoteId);
        setNote(singleNote[0]);
      }
      else if(theId){
        const singleNote = notesForList.filter((n)=> n.id == theId);
        setNote(singleNote[0]);

      }
        

      }, [singleNoteId, theId]);

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
