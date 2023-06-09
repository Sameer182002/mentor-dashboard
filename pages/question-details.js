import { QuestionDetails } from "../components/pages"
import { Sidebar } from "../components/templates";


export default function QuestionDetailPage () {
    return <QuestionDetails/>
}
QuestionDetailPage.getLayout = (page) => <Sidebar>{page}</Sidebar>;
