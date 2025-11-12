function NavBar(){
    return(
        <nav className="navbar navbar-dark bg-primary shadow-sm">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">My DB Visualizer</span>
                <div className="d-flex gap-2">
                    <button className="btn btn-outline-light btn-sm">File</button>
                    <button className="btn btn-outline-light btn-sm">Share</button>
                    <button className="btn btn-outline-light btn-sm">Save</button>
                </div>
            </div>
        </nav>
    )
}