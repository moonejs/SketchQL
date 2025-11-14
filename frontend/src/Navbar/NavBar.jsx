export default function NavBar(){
    return(
        <nav className="container-fluid navbar navbar-expand-lg bg-info-subtle">
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