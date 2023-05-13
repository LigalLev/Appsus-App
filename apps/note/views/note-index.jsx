const { useEffect, useState } = React
const { Link } = ReactRouterDOM
const { useParams, useNavigate } = ReactRouterDOM


import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {

    const [notes, setnotes] = useState([])
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const navigate = useNavigate()

    useEffect(() => {
        loadNotes()
    }, [onSaveNote]) //[filterBy]

    function loadNotes() {
        noteService.query().then(setnotes) //inside query (filterBy)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            const updatedNotes = notes.filter(note => note.id !== noteId)
            setnotes(updatedNotes)
            // showSuccessMsg(`Note (${noteId}) was removed!`)
        })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(() => {
                navigate('/note')
                // showSuccessMsg('Note saved')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Can not save note!')
            })
    }

    function handleChange({ target }) {
        // console.log(target)
        const field = target.name
        console.log('field :', field )
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setNoteToAdd(prevNote => ({ ...prevNote, info:{[field]: value }}))
    }

    const { info: { txt }} = noteToAdd

    return (
        <section className="note-index">
            <form className="note-add">
                <label htmlFor="txt"></label>
                <input type="text" onChange={handleChange} value ={txt} placeholder="Add note" name="txt" id="txt"/>
                <button onClick={onSaveNote}>Save</button>
            </form>
            
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />

        </section>
    )
}
