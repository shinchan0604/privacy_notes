# Privacy Notes

## Overview

Privacy Notes is a secure, offline-first note-taking application built with React. Notes are encrypted on the client side using AES encryption before being stored in IndexedDB, ensuring that sensitive information is never saved as plain text.

## Features

* Create, edit, and delete notes
* AES client-side encryption with CryptoJS
* IndexedDB for offline storage
* Search notes by title or content
* Pin and archive notes
* Responsive user interface
* Automatic data persistence across browser sessions

## Tech Stack

* React
* Vite
* JavaScript
* CryptoJS
* IndexedDB
* CSS

## Getting Started

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser.

## How It Works

* Notes are encrypted before being stored.
* Encrypted data is saved in IndexedDB.
* Notes are decrypted only when viewed or edited.
* All processing happens locally in the browser, with no backend required.

## Future Improvements

* Password-based encryption
* Dark mode
* Categories and tags
* Export/Import notes
* Cloud synchronization

## License

This project was developed for educational and learning purposes.
