const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
import { EmailSidebar } from "../cmps/email-sidebar.jsx"
import { emailService } from "../services/email.service.js"

export function EmailDetails() {
    const [email, setEmail] = useState(null)
    const { emailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (email) markEmailAsRead()
        else loadEmail()
    }, [email, emailId])

    function loadEmail() {

        emailService.get(emailId)
            .then(setEmail)
            .catch(err => {
                console.log('Had issued in email details:', err);
                navigate('/email')
            })
    }

    function markEmailAsRead() {
        let updatedEmail = { ...email, isRead: true }
        // console.log(updatedEmail,'lkn' )
        emailService.save(updatedEmail)
            .then()
            .catch(err => {
                console.log('error has accured:', err);
                navigate('/email')
            })
    }

    function onBack() {
        navigate('/email')
    }


    if (!email) return <div>Loading...</div>
    return (
        <section className="email-details-container">
            <div className="details-subject">{email.subject}</div>
            <div className="details-from"> <div className="details-from-name"> {email.from.name}</div>
                <div className="details-from-email">{email.from.email}</div>
                <div className="details-sentat">{email.sentAt}</div></div>
            <div>to: {email.to.name}</div>
            <p className="details-body">{email.body}</p>
            <button onClick={onBack} className=" btn-details-back">Back</button>
        </section >
    )
}