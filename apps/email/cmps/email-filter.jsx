const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const {  } = filterByToEdit
    return (
        <section className="email-filter full main-layout">
            <h2>Filter Our Emails</h2>

            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Read:</label>
                <input value={txt} onChange={handleChange} name="txt" id="txt" type="text" placeholder="By Subject" />

                <label htmlFor="unread">Unread:</label>
                <input value={unread} onChange={handleChange} type="checkbox" name="unread" id="unread" placeholder="By unread" />

                <button>Filter Emails</button>
            </form>

        </section>
    )
}