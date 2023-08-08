import { MEETING_CALENDAR_TABLE_HEADINGS } from "../../../utils/constants";
import { MeetingCalendarTable } from "../../organisms/meeting-calender-table/meeting-calender-table";
import styles from "./meeting-calender.module.css";
export function MeetingCalender() {


  return (
    <main className={styles.wrapper}>
      <h2 className={styles.pageTitle}>Meeting Calendar</h2>
      <p className={styles.desc}>
        You can make your availability here so students can book a doubt session
        with you.
      </p>
      <div className={styles.sessionDurationInfo}>
        <p className={styles.label}>Duration:</p>
        <p className={styles.duration}>15 mins + 5 mins Buffer</p>
      </div>
      <MeetingCalendarTable
        tableHeadings={MEETING_CALENDAR_TABLE_HEADINGS}
      />
    </main>
  );
}
