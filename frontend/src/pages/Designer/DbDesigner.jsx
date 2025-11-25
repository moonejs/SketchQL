import Table from "../../components/DbDesign/Table"
import NavBar from "../../components/Navbar/NavBar"
import Sidebar from "../../components/Sidebar/Sidebar"
export default function App(){
  return(
    <div className="d-flex flex-column vh-100">
      <NavBar></NavBar>
      <div className=" container-fluid flex-grow-1 p-0 overflow-hidden">
        <div className="row h-100 g-0">
          <div className="col-3 ">
            <Sidebar></Sidebar>
          </div>
          <div className="col-9">
            <Table></Table>
          </div>
        </div>
      </div>
    </div>
  )
}   