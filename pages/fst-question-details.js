import { FstQuestionView } from "../components/pages"
import { Sidebar } from "../components/templates"

export default function FstQuestionDetailsPage(){
    return(
        <main>
           <FstQuestionView/>
        </main>
    )
}

FstQuestionDetailsPage.getLayout = (page) => <Sidebar>{page}</Sidebar>