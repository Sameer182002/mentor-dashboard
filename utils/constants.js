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
        path: '/unchecked-questions'
    }
]

export const checkedAssgTableTitle =  {
    'assignmentName' : 'Assignment Name',
    'studentName' : 'Submmited By' ,
    'cohort' : 'Cohort' ,
    'submittedQuestionsCount' : 'Question Submitted' ,
    'totalQuestionsCount' : 'Total Questions'
} 
export const unCheckedAssgTableTitle =  {
    'assignmentName' : 'Assignment Name',
    'studentName' : 'Submmited By' ,
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