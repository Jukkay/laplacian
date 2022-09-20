# Laplacian

Laplacian is a small proof of concept type of project built to learn more about interfacing between pieces of software written with different languages. It's also our team's entry to Schibsted Challenge.

### What does it do?

This app takes in an image file from user. When user uploads the file, it's analyzed for blurryness using laplacian algoritm. If the image seems to be blurry, user gets notified of this and is encouraged to take a new picture. If image is not blurry, the image is just uploaded.

### What is it built with?

Frontend is built using Next.js, React and TypeScript. Backend is written in Golang and it uses OpenCV's laplacian function. Connection between frontend and backend is implemented using Go's built in http server and API requests.

- React
- TypeScript
- Golang
- OpenCV
- Next.js
- Tailwind CSS / Daisy UI

### How can I run it?

Repository includes docker-compose and Makefile files that can be used to build and run the project. Docker is required to take advantage of these.

1. Clone the repository
2. Use command line `make up` to build and run the project
3. The app can be accessed at http://localhost:3000
