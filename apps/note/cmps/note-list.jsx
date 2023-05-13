const { Link } = ReactRouterDOM
const { useState } = React

import { NotePreview } from "./note-preview.jsx"
import {NoteEdit} from "../views/note-edit.jsx"
import {ColorInput} from "./color-input.jsx"


export function NoteList({ notes, onRemoveNote }) {
    const [noteIdToEdit, setNoteIdToEdit] = useState(null)
    const [noteColorToEdit, setNoteColorToEdit] = useState('')

    function onSetNoteStyle(newColor) {
        console.log('newColor:', newColor)
        setNoteColorToEdit((prevStyle) => ({ ...prevStyle, ...newColor }))
    }
//onMouseOver={() => { setIsHover(true) }} onMouseOut={() => { setIsHover(false) }}
    return (
        <section className="note-list" >
            {notes.map(note => 
                <article key={note.id} className="note-item" style={{backgroundColor:`${note.style.backgroundColor}`}} >
                    <NotePreview note={note}/>
                    <section className="btn-note-container" > 
                        <button className=" btn-note btn-delete-note"onClick={() => onRemoveNote(note.id)} ></button>
                        <button className=" btn-note btn-edit-note" onClick={()=> {setNoteIdToEdit(note.id)}}></button>  
                        <button className=" btn-note btn-set-color" onClick={()=> {setNoteColorToEdit(note.id)}}></button>
                        
                    </section>
                </article>
            )}
             {noteIdToEdit && <NoteEdit noteId={noteIdToEdit} closeModal={()=> (setNoteIdToEdit(null))}/> } 
             {noteColorToEdit && <ColorInput  noteId={noteColorToEdit} closeModal={()=> (setNoteColorToEdit(''))}/>}   
        </section>
    )
}
