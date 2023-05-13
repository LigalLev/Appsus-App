

export function NotePreview({ note }){
    const { id, createdAt, style: { backgroundColor}, info: {txt} } = note

    return (
        <article className="note-preview" >
            <div>
                <h2>{txt}</h2>
            </div>
        </article>
    )
}