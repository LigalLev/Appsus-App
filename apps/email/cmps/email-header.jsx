export function EmailHeader(props) {
    const { emails } = props

    return <header className="email-header">
      <img src="../../../assets/img/email-logo.jpeg" alt="" />
      {/* <Link to="/">
          <h3><img src="" alt="" /></h3>
      </Link> */}
        <div className="search-email-bar"><label htmlFor="search">Search:</label>
            <input type="text" name="search" id="search" /></div>
    </header>
} 