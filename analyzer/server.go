package main

import (
	"fmt"
	"log"
	"net/http"
	"gocv.io/x/gocv"
	"math"
	"bytes"
	"io"
)

const treshold = 400.0

func detectBlurFromFile(p string) (float64, error) {
	img := gocv.NewMat()
	img = gocv.IMRead(p, gocv.IMReadGrayScale)
	if img.Empty() {
		return 0.0, fmt.Errorf("Invalid file path")
	}
	return blurDetector(img), nil
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	}

func detectBlurFromImageData(r *http.Request) (float64, error) {
	r.ParseMultipartForm(0)
	file, _, err := r.FormFile("photo")
	if err != nil {
		return 0.0, fmt.Errorf("Invalid image data")
	}
	defer file.Close()
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file); err != nil {
    	return 0.0, err
	}
	img, err := gocv.IMDecode(buf.Bytes(), gocv.IMReadGrayScale)
	if img.Empty() {
		return 0.0, fmt.Errorf("Empty image")
	}
	return blurDetector(img), nil
}

func blurDetector(img gocv.Mat) float64 {
	dest := gocv.NewMat()
	mean := gocv.NewMat()
	stddev := gocv.NewMat()
	gocv.Laplacian(img, &dest, gocv.MatTypeCV16S, 1, 1, 0, gocv.BorderDefault)
	gocv.MeanStdDev(dest, &mean, &stddev)
	variance := math.Pow(2, stddev.GetDoubleAt(0, 0))
	return (variance)
}

func blurHandler(w http.ResponseWriter, r *http.Request){
	enableCors(&w)
	if r.Method != "POST" {
        http.Error(w, "Method is not supported.", http.StatusTeapot)
		return
	}
	res, err := detectBlurFromImageData(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	fmt.Printf("Variance was %v\n", res)
	w.Write([]byte(fmt.Sprintf("{ \"variance\":%.f, ", res)))
	if res < treshold {
		w.Write([]byte(`"blurry":true }`))
	} else {
		w.Write([]byte(`"blurry":false }`))
	}
}

func blurPathHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method != "POST" {
		http.Error(w, "Method is not supported.", http.StatusTeapot)
		return
	}
	path := r.FormValue("path")
	res, err := detectBlurFromFile(path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(fmt.Sprintf("{ \"variance\":%.f, ", res)))
	if res < treshold {
		w.Write([]byte(`"blurry":true }`))
	} else {
		w.Write([]byte(`"blurry":false }`))
	}
}

func main() {
	fileServer := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileServer)
	http.HandleFunc("/blur", blurHandler)
	http.HandleFunc("/blurp", blurPathHandler)
	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
