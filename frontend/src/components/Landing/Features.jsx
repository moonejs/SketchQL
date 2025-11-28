import Heading from "./components/Heading"
import SubHeading from "./components/SubHeading"
import Illustration from "./components/Illustration"
import FeatureContent from "./components/FeatureContent"

export default function Features({classname}){
    return(
        <div className="mt-6">
            <div className="text-center">
                <Heading word={"More than just Diagrams"} className={"fs-1 fw-bold"}/>

                <SubHeading word={"Don't just draw tables—build applications. Eliminate repetitive boilerplate by exporting your visual designs directly into working code."} className={"subHeading-w2 mt-2 fs-4"}/>
            </div>
            <div className=" container mt-7">
                <div className="d-flex">
                    <FeatureContent heading={"Design with AI"} subHeading={"Don't start from a blank slate. Just describe your application's data needs in plain English, and our AI will instantly generate a complete database schema with tables and relationships for you"} className={"w-75"}/>
                    <Illustration className={" w-75 "}/>
                </div>
                <div className="d-flex bg-sucess mt-7">
                    <Illustration className={" w-75 "}/>
                    <FeatureContent heading={"Instant Code Export"} subHeading={"Transform your visual schema into production-ready backend code in seconds. Eliminate manual boilerplate and focus on building your application logic, not typing out model definitions."} className={"w-75"}/>
                </div>
                <div className="d-flex  mt-7">
                    <FeatureContent heading={"See the big picture"} subHeading={"Gain a bird's-eye view of your entire architecture. Our intuitive drag-and-drop editor lets you refine tables, define column types, and connect foreign keys visually, ensuring your data model makes sense before you write a single line of code."} className={"w-75"}/>
                    <Illustration className={" w-75 "}/>
                </div>
            </div>
        </div>
    )
}