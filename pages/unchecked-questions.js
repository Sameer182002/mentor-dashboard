import { UncheckedQuestions } from "../components/pages"
import { Sidebar } from "../components/templates";

export default function UncheckedQuestionsPage () {
    return (
        <UncheckedQuestions/>
    )
}
UncheckedQuestionsPage.getLayout = (page) => <Sidebar>{page}</Sidebar>;
