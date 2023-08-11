import { UpcomingSession } from "../components/pages";
import { Sidebar } from "../components/templates";

export default function UpcomingSessionsPage(){
    return (
        <UpcomingSession/>
    )
}
UpcomingSessionsPage.getLayout = (page) => <Sidebar>{page}</Sidebar>;