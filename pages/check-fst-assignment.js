import { CheckFstAssignmentQuestions } from "../components/pages"
import { Sidebar } from "../components/templates"

export default function CheckFstAssignment(){
    return(
        <main>
            <CheckFstAssignmentQuestions/>
        </main>
    )
}

CheckFstAssignment.getLayout = (page) => <Sidebar>{page}</Sidebar>