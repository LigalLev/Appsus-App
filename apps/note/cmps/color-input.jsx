const { useEffect, useState, useRef } = React

import { noteService } from "../services/note.service.js"

export function ColorInput(props) { 
    const colors = ['#B4FF9F', '#FFEE93', '#FFD59E','#fec8d8' ,'#FFA1A1', '#dab894', '#c6e2e9','#a7bed3' ,'#957DAD']
    const [noteToEditColor, setNoteToEditColor] = useState(noteService.get(props.noteId))
    const inputRef = useRef()

    useEffect(() => {
        if (props.noteId) loadNote()
    }, [onChooseColor])

    function loadNote() {
        noteService.get(props.noteId)
            .then(setNoteToEditColor)
            .catch(err => {
                console.log('Had issued in note edit:', err);
                // showErrorMsg('Book not found!')
            })
    }

    function onChooseColor(color) {
        noteService.changeNoteColor(color,props.noteId)
        // loadNote()
        props.closeModal()
    }

    return (
        <section className="color-picker">
            <div className="items-container">
                {
                    colors.map(color => <div
                        className="color-value"
                        key={color}
                        style={{backgroundColor: color}}
                        onClick={() => onChooseColor(color)}
                        ></div>)
                    }
            </div>
        </section>
    )
}