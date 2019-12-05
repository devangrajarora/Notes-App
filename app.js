const yargs = require('yargs')
const notes = require('./notes.js')
const print = console.log

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: { // object having details and properties, every property is also an object
        title: {
            describe: 'Title of the note',
            demandOption: true, // title is always to be provided when using add method
            type: 'string' // only string value allowed
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => { // executed when this commmand is called
        notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List Notes',
    handler: () => {
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.readNote(argv.title)
    }
})

yargs.command({
    command: 'completed',
    describe: 'Mark note as completed',
    builder: {
        title: {
            describe: 'Title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.markCompleted(argv.title)
    }
})



yargs.parse() // parse input fom CLI, returns argv object