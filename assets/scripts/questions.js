var questions = [
    {
        title: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
        answers: [
            { text: "The User's machine running a Web browser", correct: true },
            { text: "The Web server", correct: false },
            { text: "A central machine deep within Netscape's corporate offices", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        title: "What are variables used for in JavaScript Programs?",
        answers: [
            { text: "Storing numbers, dates, or other values", correct: true },
            { text: "Varying randomly", correct: false },
            { text: "Causing high-school algebra flashbacks", correct: false },
            { text: "None of the above", correct: false }
        ]
    },
    {
        title: "Which of the following can't be done with client-side JavaScript?",
        answers: [
            { text: "Validating a form", correct: false },
            { text: "Sending a form's contents by email", correct: false },
            { text: "Storing the form's contents to a database file on the server", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        title: "Which of the following are capabilities of functions in JavaScript?",
        answers: [
            { text: "Return a value", correct: false },
            { text: "Accept parameters and Return a value", correct: false },
            { text: "Accept parameters", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        title: "Which of the following is not a valid JavaScript variable name?",
        answers: [
            { text: "2names", correct: true },
            { text: "_first_and_last_names", correct: false },
            { text: "FirstAndLast", correct: false },
            { text: "None of the above", correct: false }
        ]
    },{
        title: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<scripting>", correct: false },
            { text: "<script>", correct: true },
            { text: "<javascript>", correct: false }
        ]
    },
    {
        title: "What is the correct syntax for referring to an external script called 'abc.js'?",
        answers: [
            { text: "<script href='abc.js'>", correct: false },
            { text: "<script name='abc.js'>", correct: false },
            { text: "<script src='abc.js'>", correct: true },
            { text: "None of the above", correct: false }
        ]
    },
    {
        title: "Which of the following best describes JavaScript?",
        answers: [
            { text: "a low-level programming language.", correct: false },
            { text: "a scripting language precompiled in the browser.", correct: false },
            { text: "a compiled scripting language.", correct: false },
            { text: "an object-oriented scripting language.", correct: true }
        ]
    },
    {
        title: "Which of the following event fires when the form element loses the focus: <button>, <input>, <label>, <select>, <textarea>?",
        answers: [
            { text: "onfocus", correct: false },
            { text: "onblur", correct: true },
            { text: "onclick", correct: false },
            { text: "ondblclick", correct: false }
        ]
    },
    {
        title: "JavaScript is interpreted by _________",
        answers: [
            { text: "Client", correct: true },
            { text: "Server", correct: false },
            { text: "Object", correct: false },
            { text: "None of the above", correct: false }
        ]
    },{
        title: "Using _______ statement is how you test for a specific condition.",
        answers: [
            { text: "Select", correct: false },
            { text: "If", correct: true },
            { text: "Switch", correct: false },
            { text: "For", correct: false }
        ]
    },
    {
        title: "How to create a Date object in JavaScript?",
        answers: [
            { text: "dateObjectName = new Date([parameters])", correct: true },
            { text: "dateObjectName.new Date([parameters])", correct: false },
            { text: "dateObjectName := new Date([parameters])", correct: false },
            { text: "dateObjectName Date([parameters])", correct: false }
        ]
    },
    {
        title: "The _______ method of an Array object adds and/or removes elements from an array.",
        answers: [
            { text: "Reverse", correct: false },
            { text: "Shift", correct: false },
            { text: "Slice", correct: false },
            { text: "Splice", correct: true }
        ]
    }
];


var worldCapitals = [
    {
        title: "What is the capital of Spain?",
        answers: [
            { text: "Madrid", correct: true },
            { text: "Barcelona", correct: false },
            { text: "Seville", correct: false },
            { text: "Valencia", correct: false }
        ]
    },
    {
        title: "What is the capital of France",
        answers: [
            { text: "Bordeaux", correct: false },
            { text: "Paris", correct: true },
            { text: "Calais", correct: false },
            { text: "Lyon", correct: false }
        ]
    },
    {
        title: "What is the capital of Germany:",
        answers: [
            { text: "Munich", correct: false },
            { text: "Dusseldorf", correct: false },
            { text: "Berlin", correct: true },
            { text: "Koln", correct: false }
        ]
    },
    {
        title: "What is the capital of the United Kingdom",
        answers: [
            { text: "Newcastle", correct: false },
            { text: "Manchester", correct: false },
            { text: "Liverpool", correct: false },
            { text: "London", correct: true }
        ]
    },
    {
        title: "What is the capital of the United States",
        answers: [
            { text: "Washington D.C.", correct: true },
            { text: "New York City", correct: false },
            { text: "Denver", correct: false },
            { text: "Atlanta", correct: false }
        ]
    }
];