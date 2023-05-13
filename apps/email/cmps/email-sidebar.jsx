const { useState, useEffect } = React
import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function EmailSidebar(props) {
    const [emails, setEmails] = useState([])
    const {setFilterBySent,setFilterByInbox} = props
    useEffect(() => {
        if(props.emails){
            setEmails(props.emails)
        } else {
            loadEmails()
            // setSearchParams(filterBy)
            showSuccessMsg('Welcome to Email index!')
        }
    }, [props.emails])

    function loadEmails() {
        emailService.query().then(setEmails)
    }

    function emailsUnread() {
        const count = emails.filter((email) => {
            return email.isRead === false
        }).length
       return count === 0 ? '' : count
    }

    return <section className="side-bar-container">
        {/* <div className="search-email-bar"><label htmlFor="search">Search:</label>
            <input type="text" name="search" id="search" /></div> */}
        <div >
            <button className="btn btn-compose" onClick={() => { props.setIsCompose(true) }}>Compose</button>
            <ul className="sidebar-list clean-list">
                <li ><button className="btn-sidebar btn-sidebar-inbox"onClick={setFilterByInbox}>Inbox {emailsUnread()}</button></li>
                <li ><button className="btn btn-sidebar btn-sidebar-send" onClick={setFilterBySent}>Sent</button></li>
                <li ><button className="btn btn-sidebar btn-sidebar-draft">Drafts</button></li>
                <li ><button className="btn btn-sidebar btn-sidebar-stared">Stared</button></li>
                <li><button className="btn btn-sidebar btn-sidebar-trash">Trash</button></li>
            </ul>
        </div>
    </section>
}