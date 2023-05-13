const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { EmailIndex } from "./apps/email/views/email-index.jsx"
import { NoteIndex } from "./apps/note/views/note-index.jsx"
import { EmailDetails } from "./apps/email/views/email-details.jsx"
import { UserMsg } from "./cmps/user-msg.jsx"



export function App() {
    return <Router>
        <section className="app">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/email" element={<EmailIndex />} />
                <Route path="/email/:emailId" element={<EmailDetails />} />
                <Route path="/note" element={<NoteIndex />} />
                
            </Routes>
            <UserMsg/>
        </section>
    </Router>
}
