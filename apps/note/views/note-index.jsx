const { useEffect, useState } = React
const { useParams} = ReactRouterDOM
const { Link, useSearchParams } = ReactRouterDOM

import { noteService } from "../services/note.service.js"
import { NoteList } from "../cmps/note-list.jsx"

export function NoteIndex() {

    const [notes, setnotes] = useState([])
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

    const [searchTerm, setSearchTerm] = useState('')
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter(searchParams))

    function onSearchTermChange(ev) {
        console.log(ev.target.value)
        setSearchTerm(ev.target.value)
        onSearch()
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSearch() {
        console.log(':',searchTerm )
        noteService.query({ txt: searchTerm }).then(setnotes)
    }

    useEffect(() => {
        // console.log('hi')
        loadNotes()
    }, [onSaveNote]) //filterBy

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

    // function onEditNoteContent(noteId){
    //     noteService.editNoteContent(noteId)
    //         .then(() => {
    //         const editedNote = notes.filter(note => note.id === noteId)
    //         setnotes(editedNote)
    //     })
    // }

    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToAdd)
            .then(() => {
                loadNotes()
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
        console.log('field :', field)
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setNoteToAdd(prevNote => ({ ...prevNote, info: { [field]: value } }))
    }

    const { info: { txt } } = noteToAdd

    return (
        <section className="note-index">
            <div className="search-container">
                <input
                    className="search-input-field"
                    placeholder="Search note"
                    type="text"
                    name="search"
                    id="search"
                    onChange={onSearchTermChange}
                />
            </div>

            <form className="note-add">
                <label htmlFor="txt"></label>
                <input type="text" onChange={handleChange} value={txt} placeholder="Add note" name="txt" id="txt" />
                <button className="btn-save-newNote" onClick={onSaveNote}></button>
            </form>

            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}
