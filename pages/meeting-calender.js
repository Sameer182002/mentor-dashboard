import { MeetingCalender } from "../components/pages";
import { Sidebar } from "../components/templates";


export default function MeetingCalenderPage () {
    return <MeetingCalender/>
}
MeetingCalenderPage.getLayout = (page) => <Sidebar>{page}</Sidebar>;
