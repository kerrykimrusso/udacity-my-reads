# Summary
This project was done for the [React Nandodegree course offered by Udacity](https://classroom.udacity.com/nanodegrees/nd019/syllabus/core-curriculum), specifically the **React Fundamentals** section. The focus of this project was to create a functional app that satisfied the user requirements. UI/UX improvements are in the roadmap. Minimum styling was done using [Semantic UI](https://www.npmjs.com/package/semantic-ui-css).

## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Known Issues](#known-issues)
  - [Roadmap](#roadmap)
  - [License](#license)

## Installation
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app), and **DID NOT** use the [starter template](https://github.com/udacity/reactnd-project-myreads-starter) offered by the course. However, the [Books API](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/src/BooksAPI.js) was copied from there.

In the project directory, you can run:

### `npm install`
This will install all of the projects dependencies.

## Usage

### `npm start`
Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Using the App
Within the applicaiton, you're able to search for books and add them to one of three reading lists: 
- Currently Reading
- Want To Read
- Read

_Because Udacity created the backend, there is a list of **[acceptable search terms](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md)**. I do not guarantee the others will work._

After finding a book and adding it to a list, click the **Library** link in the main navigation to view it and any other books you have added, and manage what list your books appear on.

## Known Issues
- The recommend feature on the search page may not return results because the search API has a limit on the acceptable search terms. The feature randomly chooses a book in your library and searches based on the first non-filtered term. The filtered words were hardcoded by me to exclude most articles and other small words only.

## Roadmap
- [ ] Pass the Udacity submission requirements
- [ ] Add features like being able to remove or archive books you don't want to see in your library, etc.
- [ ] Improve design
- [ ] Utilize third-party real-world API for search service
- [ ] Implement own node.js backend

## License
As stated in the summary, this was a project for the [React Nandodegree course offered by Udacity](https://classroom.udacity.com/nanodegrees/nd019/syllabus/core-curriculum). If you are currently taking this class, I would encourage you to not copy my project in any way. Having said that, the license won't stop you assuming you give me credit.

MIT License

Copyright (c) 2017 Kerry Russo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.