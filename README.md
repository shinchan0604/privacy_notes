# Privacy Notes

## Overview

Privacy Notes is a React-based note-taking application designed with privacy and offline usage in mind. The application allows users to create, edit, delete, search, pin, and archive notes. Notes are stored locally so they remain available even after refreshing the browser, making the application usable without an internet connection.

The project is being developed to demonstrate client-side data management, state management in React, and secure local storage techniques. As development progresses, the application will use AES encryption with CryptoJS and IndexedDB for secure, offline-first storage.

## Features

* Create new notes
* Edit existing notes
* Delete notes
* Search notes by title or content
* Pin important notes
* Archive and restore notes
* Persistent local storage across browser refreshes
* Client-side encryption using CryptoJS (in progress)
* IndexedDB integration for offline storage (in progress)

## Technologies Used

* React
* Vite
* JavaScript (ES6+)
* CSS
* CryptoJS
* IndexedDB (planned implementation)

## How It Works

The application uses React state to manage notes during runtime. User actions such as creating, editing, deleting, pinning, or archiving notes update the application state immediately, providing a responsive user experience.

Currently, notes are persisted using the browser's local storage so that data is retained after the page is refreshed. The next stage of development involves replacing local storage with IndexedDB for a more scalable offline database solution. Before notes are stored, they will be encrypted using AES encryption provided by CryptoJS, ensuring that the stored data is not readable without the encryption key.

## Future Improvements

* Complete IndexedDB integration
* Encrypt notes before storage using CryptoJS
* Decrypt notes when displaying them to the user
* Improve the user interface and responsiveness
* Optional password-based encryption for enhanced security
