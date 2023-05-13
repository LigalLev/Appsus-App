const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
import { emailService } from '../services/email.service.js'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

export function EmailCompose(props) {

    const navigate = useNavigate()
    const [newEmail, setNewEmail] = useState({
        subject: '',
        to: '',
        body: ''
    })

    function createNewEmail() {
        return emailService.getEmptyEmail()
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setNewEmail(prevEmail => ({ ...prevEmail, [field]: value }))
    }

    function handleOnSend() {
        const createdEmail = createNewEmail()
        createdEmail.isRead = true
        createdEmail.subject = newEmail.subject
        createdEmail.body = newEmail.body
        createdEmail.to = { email: newEmail.to, name: newEmail.to }
        emailService.save(createdEmail)
            .then(() => {
                props.onCloseModal()
                showSuccessMsg('Email sent')
            })
    }

    return <section className="email-compose-container">
        <div className="email-compose-header"><div className="compose-title">New message</div>
            <button onClick={props.onCloseModal} className="compose-btn-x">x</button></div>
        <div className=" flex column">
            <input type="email" name="to" id="to" placeholder="To" className="compose-to" value={newEmail.to} onChange={handleChange} />
            <input type="text" name="subject" id="subject" placeholder="Subject" className="compose-subject" value={newEmail.subject} onChange={handleChange} />
            <textarea rows="21" cols="50" className="compose-body" name="body" value={newEmail.body} onChange={handleChange} />
            <button onClick={handleOnSend} className="compose-btn-send">Send</button >
        </div>
    </section>
}