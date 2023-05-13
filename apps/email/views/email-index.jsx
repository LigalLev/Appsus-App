
const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"
import { EmailList } from "../cmps/email-list.jsx"
import { EmailCompose } from '../cmps/email-compose.jsx'
import { EmailSidebar } from '../cmps/email-sidebar.jsx'
// import { EmailHeader } from '../cmps/email-header.jsx'

export function EmailIndex() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [emails, setEmails] = useState([])
    const [isCompose, setIsCompose] = useState(false)
    const [filterBy, setFilterBy] = useState(emailService.getDefaultFilter(searchParams))
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        console.log('filterBy:', filterBy)
        loadEmails()
        setSearchParams(filterBy)
        let pageName;
        if (filterBy.to) {
            pageName = 'Inbox'
        } else if (filterBy.from) {
            pageName = 'Sent'
        }

        showSuccessMsg(`Welcome back to your ${pageName}!`)
    }, [filterBy])

    const loggedInUser = emailService.getLoggedInUser()
    function loadEmails() {
        // emailService.query({notFrom: 'megan@example.com'}).then(setEmails)
        emailService.query(filterBy).then(setEmails)
    }

    function onSearch() {
        emailService.query({ text: searchTerm }).then(setEmails)
    }

    function onRemoveEmail(emailId) {
        const emailToUpdate = emails.find((email) => { return email.id === emailId })
        if (emailToUpdate.removedAt === null) {
            const newEmail = { ...emailToUpdate, removedAt: Date.now() }
            emailService.save(newEmail).then(() => {
                const updatedEmails = emails.filter(email => email.id !== emailId)
                setEmails(updatedEmails)
                showSuccessMsg(`Email moved to trash!`)
            })
        } else {
            emailService.remove(emailId).then(() => {
                const updatedEmails = emails.filter(email => email.id !== emailId)
                setEmails(updatedEmails)
                showSuccessMsg(`Email deleted!`)
            })
        }
    }
    function onMarkIsRead(emailToUpdate) {
        const newEmail = { ...emailToUpdate, isRead: false }
        console.log('after mark read:', newEmail)
        emailService.save(newEmail).then(() => {
            const idx = emails.findIndex(email => email.id === emailToUpdate.id)
            const updatedEmails = emails.slice()
            updatedEmails[idx].isRead = false
            setEmails(updatedEmails)
            showSuccessMsg(`Email marked as read!`)
        })
    }
    function onMarkIsUnread(emailToUpdate) {
        emailService.save({ ...emailToUpdate, isRead: true }).then(() => {
            const idx = emails.findIndex(email => email.id === emailToUpdate.id)
            const updatedEmails = emails.slice()
            updatedEmails[idx].isRead = true
            setEmails(updatedEmails)
            showSuccessMsg(`Email marked as unread!`)
        })
    }
    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    function onSearchTermChange(ev) {
        console.log(ev.target.value)
        setSearchTerm(ev.target.value)
        onSearch()
    }

    function onSetFilterBySent() {
        setFilterBy({ from: loggedInUser.email })

    }
    function onSetFilterByInbox() {
        setFilterBy({ to: loggedInUser.email })
    }

    function onSetFilterByRead() {
        setFilterBy({ to: loggedInUser.email, isRead: true })
    }

    function onSetFilterByUnread() {
        setFilterBy({ to: loggedInUser.email, isRead: false })
    }

    function onSetFilterByReading({ target }) {
        if (target.value === 'all') { onSetFilterByInbox() }
        if (target.value === 'read') { onSetFilterByRead() }
        if (target.value === 'unread') { onSetFilterByUnread() }
    }

    function onSetFilterByTrash() {
        setFilterBy({ removedAt: true })
    }

    function onCloseModal() {
        setIsCompose(false)
        loadEmails()
    }

    return <div className="email-index-container">
        <EmailSidebar
            emails={emails}
            setIsCompose={setIsCompose}
            setFilterBySent={onSetFilterBySent}
            setFilterByInbox={onSetFilterByInbox}
            setFilterByTrash={onSetFilterByTrash} />
        <div className='email-list-search'>
            <div className="email-search">
                <input type="search" name="search" id="search" placeholder='Search' onChange={onSearchTermChange} /></div>
            {/* <button onClick={onSearch}>search!</button> */}
            <EmailList
                emails={emails}
                onRemoveEmail={onRemoveEmail}
                onMarkIsRead={onMarkIsRead}
                onMarkIsUnread={onMarkIsUnread}
                onSetFilterByReading={onSetFilterByReading}
                
            />
        </div>
        {isCompose && <EmailCompose onCloseModal={onCloseModal} />}

    </div>
}

