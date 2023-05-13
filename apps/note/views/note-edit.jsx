const { useEffect, useState, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from "../services/note.service.js"

export function NoteEdit() {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const inputRef = useRef()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        console.log(inputRef);
        if (params.noteId) loadNote()
    }, [])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Had issued in note edit:', err);
                navigate('/note')
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
                navigate('/note')
                // showSuccessMsg('Note saved')
            })
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Can not save note!')
            })
    }

    const { info: { txt }} = noteToEdit

    return (
        // <section className="note-edit">
        //     <h2>{noteToEdit.id ? 'Edit' : 'Add'} Note</h2>

        //     <form onSubmit={onSaveNote} className="note-edit-form">
        //         <label htmlFor="txt">Text:</label>
        //         <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />
        //     </form>

        //     <button>save</button>
        // </section>
    )
}