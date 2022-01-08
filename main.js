Webcam.set({
    height: 300, 
    width: 350,
    image_format: 'png',
    png_quality: 90
});

camera= document.getElementById("webcam");

Webcam.attach(camera);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("img").innerHTML= '<img id= "captured_img" src= "'+data_uri+'">';
    });
}

console.log("ml5 version:", ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/X2ue2Hup4/model.json', modelLoaded);

function modelLoaded(){
    console.log("model loaded");
}

function identify(){
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("object_name").innerHTML= results[0].label;
        document.getElementById("object_accuracy").innerHTML= results[0].confidence.toFixed(3);
    }
}