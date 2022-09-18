package main

import (
	"fmt"
	"log"
	"net/http"
	"gocv.io/x/gocv"
	"math"
)

func detectBlurFromFile(p string) {
	img := gocv.IMRead(p, gocv.IMReadGrayScale)
	blurDetector(img)
}

func detectBlurFromImageData(r *http.Request) {
	buf := []byte(r.FormValue("photo"))
	img, err := gocv.IMDecode(buf, gocv.IMReadGrayScale)
	if err == nil {
		blurDetector(img)
	}
}

func blurDetector(img gocv.Mat) {
	dest := gocv.NewMat()
	mean := gocv.NewMat()
	stddev := gocv.NewMat()
	gocv.Laplacian(img, &dest, gocv.MatTypeCV16S, 1, 1, 0, gocv.BorderDefault)
	gocv.MeanStdDev(dest, &mean, &stddev)
	fmt.Printf("variance is probably %v\n", math.Pow(2, stddev.GetDoubleAt(0, 0)))
}

func blurHandler(w http.ResponseWriter, r *http.Request){
	if r.Method != "POST" {
        http.Error(w, "Method is not supported.", http.StatusTeapot)
        return
	}
	detectBlurFromImageData(r)
}

func main() {
	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer)
	http.HandleFunc("/blur", blurHandler)
	detectBlurFromFile("test.jpg")
	detectBlurFromFile("sharp.jpeg")
	detectBlurFromFile("sharp2.jpeg")
	detectBlurFromFile("blur.jpeg")
	detectBlurFromFile("blur2.jpeg")
	detectBlurFromFile("blur3.jpeg")

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
