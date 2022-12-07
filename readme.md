# Laplacian
![Laplacian](https://img.shields.io/github/languages/top/Jukkay/laplacian)

Laplacian is a small proof of concept type of project built to learn more about interfacing between pieces of software written in different languages. It's also our team's entry to Schibsted Challenge.

### What does it do?

When the user uploads the file, it's analyzed for blurriness using the laplacian algorithm. If the image seems to be blurry, user gets notified of this and is encouraged to take a new picture. If image is not blurry, the image is just uploaded.

### What is it built with?

The front end is built using Next.js, React, and TypeScript. The back end is written in Golang and it uses OpenCV's Laplacian function. The connection between the front end and the back end is implemented using Go's built in http server and API requests.

- React
- TypeScript
- Golang
- OpenCV
- Next.js
- Tailwind CSS / Daisy UI

### How can I run it?

The repository includes docker-compose and Makefile files that can be used to build and run the project. Docker is required to take advantage of these.

1. Clone the repository
2. Use the command line `make install` to install the client
3. Use the command line `make up` to build and run the project
4. The app can be accessed at http://localhost:3000

### Contributors

Jukkay & [tpolonen](https://github.com/tpolonen)
