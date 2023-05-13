const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
      
        <Link to="/">
            <div className="logo"><img src="../assets/img/logo.png" alt="" /></div>
        </Link>
     
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/email">Email</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
