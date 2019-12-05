const fs = require('fs')
const chalk = require('chalk')
const print = console.log

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notesDB.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(err) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notesDB.json', JSON.stringify(notes))
}

const addNote = (title, body) => {
    const notes = loadNotes()
    
    // array.find return first element which returns true for callabck fn, undefined otherwise 
    const duplicateNote = notes.find((note) => note.title === title)

    if(duplicateNote === undefined) { // title is not used already 
        notes.push({
            title: title,
            body: body,
            completed: false
        })

        print(chalk.green('\"' + title + '\" added to Notes!'))
        saveNotes(notes)
    }
    else
        print(chalk.red('Note with title: \"' + title + '\" already exists. Please choose another title.'))
}

const removeNote = (title) => {
    const notes = loadNotes()

    const modifiedNotes = notes.filter((note) => note.title != title) 
        // only those notes added whose title doesn't match
        // the note whose title matches is left behind
    
    if(modifiedNotes.length === notes.length)
        print(chalk.red('Note with title \"' + title + '\" not found.')) 
    else
    {
        print(chalk.green('\"' + title + '\"' + ' removed from Notes!'))
        saveNotes(modifiedNotes)
    }
}

const checkStatus = (note) => {
    if(note.completed === true)
        return chalk.green(' [completed]')
    else
        return chalk.red(' [not completed]')
}

const listNotes = () => {
    const notes = loadNotes()
    var count = 1

    if(notes.length > 0) {
        print(chalk.inverse('\nYour Notes:'))
        
        notes.forEach(note => {
            const status = checkStatus(note)
            print(count + ') ' + note.title + status)
            count++
        });
    }
    else {
        print(chalk.red('No notes found'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const reqdNote = notes.find((note) => note.title === title)

    if(reqdNote === undefined)
        print(chalk.red('Note not found'))
    else {
        print((chalk.bgRed.bold.white(reqdNote.title + ':' ) + ' ' + chalk.green(reqdNote.body)))
    }
}

const markCompleted = (title) => {
        const notes = loadNotes()
        const reqdNote = notes.find((note) => note.title === title)
        
        if(reqdNote === undefined)
            print(chalk.red('Note not found'))
        else {
            notes.forEach((note) => {
                if(note.title === title) {
                    note.completed = true
                    print(chalk.green('\"' + title + '\" ' + 'marked as completed'))
                }
            })

            saveNotes(notes)
        }
}

module.exports = { 
    addNote: addNote, 
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
    markCompleted: markCompleted
} 