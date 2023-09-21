import {calenderIcon, highlightedCalenderIcon,highlightedSubmissionVector,submissionVector,assignmentIcon,highlightedAssignment} from "../public/svgs"
export const invalidLogoutPaths = [
    '/login',
    '/verify-otp'
]

export const deviceRequirementMessage = "Welcome! Please note that our website is not mobile-friendly. To explore our content fully, we recommend using a desktop or laptop computer. Thank you for visiting!"

export const errorMessages = {
    invalidMobile : 'Mobile number should be of 10 digits' ,
    serverError : 'please try again later.' ,
    invalidOtp : 'OTP number should be of 4 digits'
}

export const sidebarOptions = [
    {
        title: 'Unchecked Questions',
        path: '/unchecked-questions',
        highlighted : highlightedAssignment,
        unhighlighted : assignmentIcon,
        isVisible : false,
        highlightedPaths : ['/unchecked-questions','/question-details']
    },
    {
        title : 'Meeting Calendar',
        path: '/meeting-calender',
        highlighted : highlightedCalenderIcon,
        unhighlighted : calenderIcon,
        isVisible : false,
        highlightedPaths : ['/meeting-calender']
    },
    {
        title : 'Upcoming Sessions',
        path: '/upcoming-sessions',
        highlighted : highlightedSubmissionVector,
        unhighlighted : submissionVector,
        isVisible : false,
        highlightedPaths : ['/upcoming-sessions']
    },
    {
        title : 'FST Assignment',
        path: '/fst-assignment',
        highlighted : highlightedAssignment,
        unhighlighted : assignmentIcon,
        isVisible : false,
        highlightedPaths : ['/check-fst-assignment','/fst-assignment','/fst-question-details']
    }
]

export const checkedAssgTableTitle =  {
    'assignmentName' : 'Assignment Name',
    'studentName' : 'Submitted By' ,
    'cohort' : 'Cohort' ,
    'submittedQuestionsCount' : 'Question Submitted' ,
    'totalQuestionsCount' : 'Total Questions'
} 

export const fstCheckedAssgTableTitle = {
    'assignmentName' : 'Assignment Name',
    'studentName' : 'Submitted By' ,
    'cohort' : 'Cohort' ,
    'submittedQuestionsCount' : 'Question Submitted' ,
    'totalQuestionsCount' : 'Total Questions',
    'viewCheckedQuestions' : 'View Questions'
}
export const unCheckedAssgTableTitle =  {
    'assignmentName' : 'Assignment Name',
    'studentName' : 'Submitted By' ,
    'cohort' : 'Cohort' ,
    'uncheckedQuestionsCount' : 'Unchecked questions' ,
    'checkedQuestionsCount' : 'Checked Questions' ,
    'lastSubmittedDate' : 'Last Submitted',
    'viewCheckedQuestions' : 'view questions'
}
export const questionMetadataTypes = {
    file : 'file',
    link : 'link',
}
export const submissionTypes = {
    file : 'file',
    link : 'link',
    shortAnswer : 'short-answer'
}

export const MEETING_CALENDAR_TABLE_HEADINGS = {
    'date' : 'DATE',
    'availability' : 'AVAILABILITY' ,
    'slots' : 'SLOTS'
} 

export const TIME_ARRAY = [
    "12:00am", "12:15am", "12:30am", "12:45am",
    "01:00am", "01:15am", "01:30am", "01:45am",
    "02:00am", "02:15am", "02:30am", "02:45am",
    "03:00am", "03:15am", "03:30am", "03:45am",
    "04:00am", "04:15am", "04:30am", "04:45am",
    "05:00am", "05:15am", "05:30am", "05:45am",
    "06:00am", "06:15am", "06:30am", "06:45am",
    "07:00am", "07:15am", "07:30am", "07:45am",
    "08:00am", "08:15am", "08:30am", "08:45am",
    "09:00am", "09:15am", "09:30am", "09:45am",
    "10:00am", "10:15am", "10:30am", "10:45am",
    "11:00am", "11:15am", "11:30am", "11:45am",
    "12:00pm", "12:15pm", "12:30pm", "12:45pm",
    "01:00pm", "01:15pm", "01:30pm", "01:45pm",
    "02:00pm", "02:15pm", "02:30pm", "02:45pm",
    "03:00pm", "03:15pm", "03:30pm", "03:45pm",
    "04:00pm", "04:15pm", "04:30pm", "04:45pm",
    "05:00pm", "05:15pm", "05:30pm", "05:45pm",
    "06:00pm", "06:15pm", "06:30pm", "06:45pm",
    "07:00pm", "07:15pm", "07:30pm", "07:45pm",
    "08:00pm", "08:15pm", "08:30pm", "08:45pm",
    "09:00pm", "09:15pm", "09:30pm", "09:45pm",
    "10:00pm", "10:15pm", "10:30pm", "10:45pm",
    "11:00pm", "11:15pm", "11:30pm", "11:45pm",
    "12:00pm"
]

export const MONTHS_NAME = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  export const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];  
  export const ONE_HOUR_IN_MS = 60 * 60 * 1000
  export const ONE_MINUTE_IN_MS = 60 * 1000
  export const TA_AVAILABILITY_STATUS = {
    available: "Available",
    unavailable: "Unavailable"
  }
export const ASSIGNMENT_EVALUATION_STATUS = {
    pending : "Unchecked",
    checked : "Checked",
    rejected: 'To Be Re-Evaluate'
}

export const ASSIGNMENT_STATUS = {
    pending : "pending",
    checked : "checked",
    reEvaluated: 're-evaluated',
    rejected: 'rejected',
    approved: 'approved'
}
  export const MARKS_DISTRIBUTION_KEYS = {
        'screenShareAndCameraScore' : 'Screen share & camera on',
        'logicBuildingScore' : 'Logic building',
        'effortScore' : 'efforts',
  }
