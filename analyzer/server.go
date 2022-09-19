package main

import (
	"fmt"
	"log"
	"net/http"
	"gocv.io/x/gocv"
	"math"
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

func detectBlurFromImageData(r *http.Request) (float64, error) {
	fmt.Printf("Request: %v\n", r)
	r.ParseForm()
	fmt.Printf("Form: %v\n", r.Form)
	fmt.Printf("Form photo?: %v\n", r.Form["photo"])
	buf := []byte(r.FormValue("photo"))
	fmt.Printf("received from request: %v\n", buf)
	img, err := gocv.IMDecode(buf, gocv.IMReadGrayScale)
	if err == nil {
		return blurDetector(img), nil
	}
	return 0.0, fmt.Errorf("Invalid image data")
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
