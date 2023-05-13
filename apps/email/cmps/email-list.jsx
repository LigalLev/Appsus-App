import { EmailPreview } from "./email-preview.jsx"
const { Link } = ReactRouterDOM

export function EmailList({ emails, onRemoveEmail, onMarkIsRead, onMarkIsUnread, onSetFilterByRead, onSetFilterByUnread, onSetFilterByAll, onSetFilterByReading }) {
    return <div className="mail-list">
        <select name="" id="" onChange={(value)=>onSetFilterByReading(value)}>
            <option value="all">All</option>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
        </select>
        {emails.map(email =>
            <EmailPreview email={email} onRemoveEmail={onRemoveEmail} onMarkIsRead={onMarkIsRead} onMarkIsUnread={onMarkIsUnread} key={email.id} />
        )}
    </div>

}

