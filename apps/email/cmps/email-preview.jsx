const { useState } = React
const { Link } = ReactRouterDOM

// import { EmailDetails } from "../views/email-details.jsx"
// import { LongTxt } from "../../../cmps/long-txt.jsx"

export function EmailPreview({ email, onRemoveEmail, onMarkIsRead, onMarkIsUnread }) {
    const [isHover, setIsHover] = useState(false)


    function getEmailFontWeight() {
        if (email.isRead) return { fontWeight: '400' }
        else if (!email.isRead) return { fontWeight: '700' }
        else return 'regular'
    }

    function getBackgroundColor() {
        if (!email.isRead) return { backgroundColor: 'white' }
        else if (email.isRead) return { backgroundColor: '#f2f6fc' }
        else return ''
    }
    const fontStyle = getEmailFontWeight()
    const backgroundColor = getBackgroundColor()

    const sentAt = email.sentAt.split(',')[0]
    return (
        <Link to={`/email/${email.id}`}>
            <div className="email-preview" style={backgroundColor} onMouseOver={() => { setIsHover(true) }} onMouseOut={() => { setIsHover(false) }}>
                <div className="email-from-name" style={fontStyle}>{email.from.name}</div>
                <div className="email-subject" style={fontStyle}>{email.subject}</div>
                <div className="email-body" style={fontStyle}> {email.body}</div>
                <div className="hover-btns">
                    {isHover && <div>
                        <button onClick={(ev) => { ev.preventDefault(); onRemoveEmail(email.id) }} className="btn-email btn-trash">
                            <img src="assets/img/trash.png" alt="" className="trash-img" />
                        </button>
                        {email.isRead && <button className="btn-email btn-unread" onClick={(ev) => { ev.preventDefault(); onMarkIsRead(email) }}>
                            <img src="assets/img/unreadEmail.png" alt="" className=" readEmail-img" />
                        </button>}
                        {!email.isRead && <button className="btn-email btn-read"onClick={(ev) => { ev.preventDefault(); onMarkIsUnread(email) }}>  
                            <img src="assets/img/readEmail.png" alt="" className=" unreadEmail-img" />
                        </button>}
                    </div>}
                </div>
                <div className="email-date" style={fontStyle}>{sentAt}</div>
            </div>
        </Link>
    )
}