
import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import { storageService } from '../../../services/storage.service.js'



const EMAIL_KEY = 'emailDB'

export const emailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyEmail,
  getLoggedInUser
}

_createEmails()

function getDefaultFilter() {
  return { to: getLoggedInUser().email }
}

function getDefultSort(){
  
}

function getLoggedInUser() {
  return {
    email: 'jane@example.com',
    name: 'Jane'
  }
}
function query(filterBy = {}, sortBy = {}) {
  return asyncStorageService.query(EMAIL_KEY)
    .then(emails => {
      if (filterBy.text) {
        const regExp = new RegExp(filterBy.text, 'i')
        emails = emails.filter(email => regExp.test(email.subject) || regExp.test(email.body) || regExp.test(email.from.name))
      }
      if (filterBy.isRead === true || filterBy.isRead === false) {
        emails = emails.filter(email => email.isRead === filterBy.isRead)
      }
      if (filterBy.to) {
        emails = emails.filter(email => email.to.email === filterBy.to)
      }
      if (filterBy.from) {
        emails = emails.filter(email => email.from.email === filterBy.from)
      }
      if (sortBy) {

      }
      return emails
    })
}


function get(emailId) {
  return asyncStorageService.get(EMAIL_KEY, emailId)
}

function remove(emailId) {
  return asyncStorageService.remove(EMAIL_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return asyncStorageService.put(EMAIL_KEY, email)
  } else {
    return asyncStorageService.post(EMAIL_KEY, email)
  }
}
function getEmptyEmail() {
  return {
    id: '',
    subject: '',
    body: '',
    isRead: true,
    sentAt: getCurrentDateTimeString(),
    removedAt: null,
    from: { email: 'jane@example.com', name: 'Jane' },
    to: { email: '', name: '' }
  }
}

function _createEmails() {
  let emails = storageService.loadFromStorage(EMAIL_KEY)
  if (!emails || !emails.length) {
    emails = [
      {
        id: 'e207',
        subject: 'Project Status Update',
        body: 'Dear Jane,\n\nI wanted to provide you with a quick update on the project. We have made some significant progress over the past week, and I wanted to make sure you were in the loop.\n\nI have attached a report outlining the progress made so far, and I would appreciate it if you could take a look and let me know your thoughts.\n\nBest regards,\nSamantha',
        isRead: false,
        sentAt: 'October 5, 2021 9:30:00 AM',
        removedAt: null,
        from: { email: 'samantha@example.com', name: 'Samantha' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e208',
        subject: 'Invitation to Webinar',
        body: 'Dear Jane,\n\nI hope this email finds you well. I wanted to invite you to a webinar that I think would be of interest to you. The webinar is on the topic of "Effective Time Management," and it is scheduled for next Thursday at 2 PM.\n\nPlease let me know if you are interested in attending, and I will send you the registration link.\n\nBest regards,\nAdam',
        isRead: true,
        sentAt: 'October 8, 2021 11:00:00 AM',
        removedAt: null,
        from: { email: 'adam@example.com', name: 'Adam' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e209',
        subject: 'Follow-up Meeting',
        body: 'Dear Jane,\n\nI wanted to touch base with you following our meeting last week. It was great to hear your thoughts on the project, and I wanted to follow up on some of the action items that we discussed.\n\nI have attached a document with some additional information that I think will be helpful, and I would appreciate it if you could take a look and let me know your thoughts.\n\nBest regards,\nMichael',
        isRead: false,
        sentAt: 'October 12, 2021 2:15:00 PM',
        removedAt: null,
        from: { email: 'michael@example.com', name: 'Michael' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e210',
        subject: 'Reminder: Team Meeting',
        body: 'Dear Jane,\n\nI hope this email finds you well. I wanted to remind you about our team meeting scheduled for tomorrow at 10 AM. The meeting will be held in the conference room on the 5th floor, and I look forward to seeing you there.\n\nPlease let me know if you have any questions or concerns.\n\nBest regards,\nEmily',
        isRead: false,
        sentAt: 'October 15, 2021 4:30:00 PM',
        removedAt: null,
        from: { email: 'emily@example.com', name: 'Emily' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e212',
        subject: 'Update on Task Progress',
        body: 'Hi,\n\nI just wanted to let you know that I have made significant progress on the task we discussed. I have attached a report outlining the progress made so far, and I would appreciate it if you could take a look and let me know your thoughts.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'October 20, 2021 9:30:00 AM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'adam@example.com', name: 'Adam' }
      },
      {
        id: 'e213',
        subject: 'Invitation to Lunch',
        body: 'Hi,\n\nI would like to invite you to have lunch with me tomorrow at noon. We can discuss some of the projects we have been working on and catch up on some of the latest developments. If you are available, let me know, and I will make a reservation at the restaurant.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'October 22, 2021 10:00:00 AM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'samantha@example.com', name: 'Samantha' }
      },
      {
        id: 'e214',
        subject: 'Request for Meeting',
        body: 'Hi,\n\nI would like to schedule a meeting with you to discuss some of the ideas I have for the project. Can you let me know when you are available? I am free all next week, so any time that works for you would be great.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'October 25, 2021 2:15:00 PM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'michael@example.com', name: 'Michael' }
      },
      {
        id: 'e215',
        subject: 'Follow-up on Action Items',
        body: 'Hi,\n\nI just wanted to follow up on some of the action items we discussed during our last meeting. I have attached a document with some additional information that I think will be helpful, and I would appreciate it if you could take a look and let me know your thoughts.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'October 28, 2021 4:30:00 PM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'emily@example.com', name: 'Emily' }
      },
      {
        id: 'e216',
        subject: 'Thank You for Your Help',
        body: 'Hi,\n\nI just wanted to thank you for your help with the project. Your insights and expertise have been invaluable, and I am grateful for your contributions.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'November 2, 2021 11:00:00 AM',
        removedAt: null,
        from: { email: 'samantha@example.com', name: 'Samantha' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e217',
        subject: 'Reminder: Meeting Tomorrow',
        body: 'Hi,\n\nJust a quick reminder that we have a meeting scheduled for tomorrow at 2 PM to discuss the project. I look forward to speaking with you.\n\nBest regards,\nJane',
        isRead: false,
        sentAt: 'November 4, 2021 9:30:00 AM',
        removedAt: null,
        from: { email: 'michael@example.com', name: 'Michael' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e218',
        subject: 'Request for Feedback',
        body: 'Hi,\n\nI have been working on a new proposal for the project, and I would appreciate it if you could take a look and let me know your thoughts. Your feedback is important to me, and I would be grateful for any comments or suggestions you may have.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'November 6, 2021 3:45:00 PM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'adam@example.com', name: 'Adam' }
      },
      {
        id: 'e219',
        subject: 'Urgent: Need Your Input',
        body: 'Hi,\n\nI am working on a critical part of the project, and I need your input on a few issues. Can you please review the attached document and provide me with your feedback as soon as possible? Your help is greatly appreciated.\n\nBest regards,\nJane',
        isRead: true,
        sentAt: 'November 8, 2021 10:00:00 AM',
        removedAt: null,
        from: { email: 'jane@example.com', name: 'Jane' },
        to: { email: 'emily@example.com', name: 'Emily' }
      },
      {
        id: 'e220',
        subject: 'Invitation to Company Event',
        body: 'Hi Jane,\n\nYou are invited to attend our company event next week. Please let me know if you are able to attend, and if so, if you will be bringing any guests with you.\n\nBest regards,\nJohn',
        isRead: false,
        sentAt: 'November 10, 2021 2:00:00 PM',
        removedAt: null,
        from: { email: 'john@example.com', name: 'John' },
        to: { email: 'jane@example.com', name: 'Jane' }
      }, {
        id: 'e221',
        subject: 'Invitation to Company Party',
        body: 'Hi Jane,\n\nI hope this email finds you well. I wanted to invite you to our company party next week. It will be a great opportunity for everyone to relax and socialize outside of work. Please let me know if you can make it, and I will send you the details.\n\nBest regards,\nAdam',
        isRead: false,
        sentAt: 'November 10, 2021 2:30:00 PM',
        removedAt: null,
        from: { email: 'adam@example.com', name: 'Adam' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e222',
        subject: 'Project Update',
        body: 'Hi Jane,\n\nI just wanted to give you a quick update on the project. We have made some significant progress, and I have attached a report with all the details. Please let me know if you have any questions or concerns.\n\nBest regards,\nSamantha',
        isRead: false,
        sentAt: 'November 12, 2021 9:15:00 AM',
        removedAt: null,
        from: { email: 'samantha@example.com', name: 'Samantha' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e223',
        subject: 'Reminder of Deadline',
        body: 'Hi Jane,\n\nI just wanted to remind you that the deadline for submitting your report is next week. Please let me know if you need any assistance or if you have any questions. I am here to help.\n\nBest regards,\nMichael',
        isRead: false,
        sentAt: 'November 15, 2021 3:30:00 PM',
        removedAt: null,
        from: { email: 'michael@example.com', name: 'Michael' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e224',
        subject: 'Request for Feedback',
        body: 'Hi Jane,\n\nI would appreciate it if you could provide some feedback on the latest version of the project plan. I have attached the document for your review. Please let me know your thoughts and suggestions.\n\nBest regards,\nEmily',
        isRead: true,
        sentAt: 'November 18, 2021 10:00:00 AM',
        removedAt: null,
        from: { email: 'emily@example.com', name: 'Emily' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e225',
        subject: 'Update on Project Status',
        body: 'Hi Jane,\n\nI wanted to provide you with an update on the status of the project. We have made significant progress over the past week, and we are on track to meet our deadline. I will keep you posted on any further developments.\n\nBest regards,\nSarah',
        isRead: true,
        sentAt: 'November 12, 2021 9:30:00 AM',
        removedAt: null,
        from: { email: 'sarah@example.com', name: 'Sarah' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e226',
        subject: 'Reminder: Feedback Requested',
        body: 'Hi Jane,\n\nI just wanted to remind you that I am still waiting for your feedback on the proposal I sent you last week. Please let me know if you need more time, or if there is anything else I can provide to help you with your review.\n\nBest regards,\nAdam',
        isRead: true,
        sentAt: 'November 14, 2021 3:00:00 PM',
        removedAt: null,
        from: { email: 'adam@example.com', name: 'Adam' },
        to: { email: 'jane@example.com', name: 'Jane' }
      },
      {
        id: 'e227',
        subject: 'Meeting Request',
        body: 'Hi Jane,\n\nI would like to schedule a meeting with you next week to discuss the next steps for the project. Please let me know if you are available, and if so, what times work for you.\n\nBest regards,\nMichael',
        isRead: false,
        sentAt: 'November 16, 2021 10:00:00 AM',
        removedAt: null,
        from: { email: 'michael@example.com', name: 'Michael' },
        to: { email: 'jane@example.com', name: 'Jane' }
      }


    ]

    storageService.saveToStorage(EMAIL_KEY, emails)
    console.log('emails:', emails)
    return emails
  }
}

// function _createMail() {
//     const email = getEmptyMail()
//     email.id = utilService.makeId()
//     return email
// }

function getCurrentDateTimeString() {
  return new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}