const { Link, NavLink } = ReactRouterDOM
// import { ReactFragment, useState } from "react"
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return <header className="app-header">

        <Link to="/">
            <div className="logo"><img src="./assets/img/logo.png" alt="" /></div>
        </Link>

        {/* <Link to="/email">
            <div ></div>
        </Link> */}

        {/* <Link to="/note">
            <div className="header-logos note-logo"><img src="../assets/img/keep-logo.png" alt="" /></div>
        </Link> */}

        <nav>
            <NavLink to="/"></NavLink>
            <img
                className="google-apps-icon-logo"
                src="./assets/img/google-apps-icon.svg"
                onClick={()=>setIsMenuOpen(prev=>!prev)}
                >
            </img>

            {isMenuOpen &&
                (<div className='manu-modal' style={{position: 'absolute', right:'20px',top:'50px'}}>
                    <NavLink to="/about" className="header-logos about-us-logo">
                        <img src="./assets/img/about-us.jpg" alt="" />
                    </NavLink>
                    <NavLink to="/email" className="header-logos email-logo">
                        <img src="./assets/img/Gmail-icon.png" alt="" />
                    </NavLink>
                    <NavLink to="/note" className="header-logos note-logo">
                        <img src="./assets/img/keep-logo.png" alt="" />
                    </NavLink>
                </div>)
            }


        </nav>
    </header>
}
