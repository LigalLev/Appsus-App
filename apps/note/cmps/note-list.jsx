const { Link } = ReactRouterDOM

import { NotePreview } from "./note-preview.jsx";


export function NoteList({ notes, onRemoveNote }) {

    return (
        <section className="note-list">
            {notes.map(note =>
                <article key={note.id} className="note-item">
                    <NotePreview note={note} />
                    <section > 
                        <button onClick={() => onRemoveNote(note.id)} >Delete</button>
                        {/* <button><Link to={`/note/${note.id}`} >Details</Link ></button> */}
                        {/* <button><Link to={`/note/edit/${note.id}`} >Edit</Link></button> */}
                        {/* onClick={() => onEditNote(note.id)} */}
                    </section>
                </article>
            )}
        </section>
    )
}
