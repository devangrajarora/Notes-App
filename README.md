# Notes-App

**Notes-App** is a note making app made using Node.js. 
Basic features it provides are:
1. Adding new notes
2. Deleting notes
3. Listing all notes
4. Reading notes
5. Mark a note as Completed

Currently, the app can only be used through Command Line. I'll make a GUI in the future.

### Adding a Note
```node app.js add --title="Note Title" --body="Note Body"```

### Removing a Note
```node app.js remove --title="Note Title"```

### Listing all Notes
```node app.js list```

### Reading a Note
```node app.js read --title="Note Title"```

### Mark a Note as Completed
```node app.js completed --title="Note Title"```

