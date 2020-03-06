<h1 align="center">Welcome to Abhishek Mathur's find_server module👋</h1>
<p>
  <a href="https://www.npmjs.com/package/find_server" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/find_server.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/abhishekwebcode" target="_blank">
    <img alt="Twitter: abhishekwebcode" src="https://img.shields.io/twitter/follow/abhishekwebcode.svg?style=social" />
  </a>
</p>

> A module to find the server with lowest priority

### 🏠 [You can reach me via this link](https://app.codesignal.com/profile/abhishekwebcode)

## Install

```sh
npm install abhishekwebcode_find_server 
```

## Usage

```sh
Just require library from npm or your cloned repository and run it
the module contains a findServer method which you can run
to find the least priority server having status code between 200 & 299
```

```sh
const findServer = require('abhishekwebcode_find_server');
const result = await findServer.findServer(myServerArray);
```

Here the myServerArray is an array of input to library
 
It has the format
```
{
    url: "<url of the server>",
    priority: "<priority of the server>"
}
```

> This library returns a promise 

> Resolves with the server if found

> Rejects with an error if list is empty or no server is found to be available 

## Run tests

```sh
npm run test
```

## Author

👤 **Abhishek Mathur <mathur17021play@gmail.com>**

* Website: https://app.codesignal.com/profile/abhishekwebcode
* Twitter: [@abhishekwebcode](https://twitter.com/abhishekwebcode)
* Github: [@abhishekwebcode](https://github.com/abhishekwebcode)
* LinkedIn: [@abhishekwebcode](https://linkedin.com/in/abhishekwebcode)
