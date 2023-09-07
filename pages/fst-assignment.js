import { FstHome } from "../components/pages";
import { Sidebar } from "../components/templates";

export default function FstAssignmentPage(){
    return(
    <main>
       <FstHome/> 
    </main>)
}

FstAssignmentPage.getLayout = (page) => <Sidebar>{page}</Sidebar>;