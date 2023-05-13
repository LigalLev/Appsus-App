import { utilService } from '../../../services/util.service.js'
import { asyncStorageService } from '../../../services/async-storage.service.js'
import {storageService} from '../../../services/storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    editNoteContent,
    changeNoteColor,
    getDefaultFilter
}

function query(filterBy = {}) {
    // console.log('filterBy service:', filterBy)
    return asyncStorageService.query(NOTE_KEY)
    .then(notes => {
    //     if (filterBy.type) {
    //         const regExp = new RegExp(filterBy.type, 'i')
    //         notes = notes.filter(note => regExp.test(car.type))
    //     }
       
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            notes = notes.filter(note => regExp.test(note.info.txt))
           
          }
        return notes
    })
}

function getDefaultFilter() {
    return { txt: ''}
}

function editNoteContent(noteId, value) { // noteType?
    const notes = storageService.loadFromStorage(NOTE_KEY)
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].info.txt = value
    // switch (noteType) {
    //     case 'note-txt':
    //         notes[noteIdx].info.txt = value
    // }

    storageService.saveToStorage(NOTE_KEY, notes)
    // return Promise.resolve(notes[noteIdx])
}

function changeNoteColor(color, noteId) {
    const notes = storageService.loadFromStorage(NOTE_KEY)
    let noteIdx = notes.findIndex(note => note.id === noteId)
    notes[noteIdx].style.backgroundColor = color
    storageService.saveToStorage(NOTE_KEY, notes)
    return Promise.resolve()
}

function get(noteId) {
    return asyncStorageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return asyncStorageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return asyncStorageService.put(NOTE_KEY, note)
    } else {
        return asyncStorageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        // notes = []
        // notes.push(_createNote('NoteTxt'))
        // notes.push(_createNote('NoteTxt'))
        // notes.push(_createNote('NoteTxt'))
        notes = [
            {
                id: utilService.makeId(),
                createdAt: utilService.getTimeStamp(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#fec8d8'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: utilService.makeId(),
                createdAt: utilService.getTimeStamp(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#FFEE93'
                },
                info: {
                    txt: 'You know what i know?'
                },
            },
            {
                id: utilService.makeId(),
                createdAt: utilService.getTimeStamp(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#B4FF9F'
                },
                info: {
                    txt: 'Lets dance!'
                },
            }
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
    console.log('notes:', notes)
}

// function _createNote(type = 'NoteTxt', isPinned = false) {
//     const note = getEmptyNote(type, info.txt = '')
//     note.id = utilService.makeId()
//     note.createdAt = utilService.getTimeStamp()
//     note.info.txt = utilService.makeLorem(size = 4)
//     return note
// }

function getEmptyNote(type = '', isPinned = false) {
    return {
        id: '',
        createdAt: new Date(),
        type,
        isPinned,
        style: {
            backgroundColor: '#FDF4F5'
        },
        info: {
            txt: ''
        }
    }
}