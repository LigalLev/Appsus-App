const { useEffect, useState, useRef } = React

import { noteService } from "../services/note.service.js"

export function NoteEdit(props) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    

    useEffect(() => {
        // console.log(inputRef);
        if (props.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(props.noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Book not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setNoteToEdit(prevNote => ({ ...prevNote, info:{[field]: value }}))
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                console.log('Note edited')
                props.closeModal()
                // showSuccessMsg('Note saved')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Can not save note!')
            })
    }

    const { info: { txt }} = noteToEdit

    return (
        <section className="note-edit">
            <h2 className="note-edit-title">Edit your note</h2>

            <form className="note-edit-form">
                <label htmlFor="txt"></label>
                <textarea onChange={handleChange} 
                className="note-edit-input" 
                rows="5" 
                size="100" 
                value={txt} 
                type="text" 
                name="txt" 
                id="txt" />
                <button className="btn-note-edit" onClick={onSaveNote}>Save</button>
            </form>

            
        </section>
    )
}