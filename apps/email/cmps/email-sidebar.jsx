const { useState, useEffect } = React
import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function EmailSidebar(props) {
    const [emails, setEmails] = useState([])
    const [blueBtn, setBlueBtn] = useState('inbox')
    const { setFilterBySent, setFilterByInbox, setFilterByTrash } = props
   
    useEffect(() => {
        if (props.emails) {
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

    function getBlue(btnName) {
        if (btnName === blueBtn) return 'btn-sidebar-blue'
    }

    function handleOnClick(callback, name){
        callback()
        setBlueBtn(name)
    }

    function onClickInbox(){
        setFilterByInbox()
        setBlueBtn('inbox')
    }

    function onClickSent(){
        setFilterBySent()
        setBlueBtn('sent')
    }
    function onClickDrafts(){
        // setFilterByDrafts()
        setBlueBtn('drafts')
    }
    function onClickStarred(){
        // setFilterByStarred()
        setBlueBtn('starred')
    }
    function onClickTrash(){
        setFilterByTrash()
        setBlueBtn('trash')
    }



    return <section className="side-bar-container">
        {/* <div className="search-email-bar"><label htmlFor="search">Search:</label>
            <input type="text" name="search" id="search" /></div> */}
        <div >
            <button className="btn-email btn-compose" onClick={() => { props.setIsCompose(true) }}>Compose</button>
            <ul className="sidebar-list clean-list">
                <li ><button className={`btn-email btn-sidebar btn-sidebar-inbox ${getBlue('inbox')}`} onClick={onClickInbox}>Inbox {emailsUnread()}</button></li>
                <li ><button className={`btn-email btn-sidebar btn-sidebar-send ${getBlue('sent')}`} onClick={onClickSent}>Sent</button></li>
                <li><button className={`btn-email btn-sidebar btn-sidebar-trash ${getBlue('trash')}`}onClick={onClickTrash}>Trash</button></li>
                <li ><button className={`btn-email btn-sidebar btn-sidebar-starred ${getBlue('starred')}`}onClick={onClickStarred}>Starred</button></li>
                <li ><button className={`btn-email btn-sidebar btn-sidebar-draft  ${getBlue('drafts')}`}onClick={onClickDrafts}>Drafts</button></li>
            </ul>
        </div>
    </section>
}