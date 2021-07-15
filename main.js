prediction_1=""
prediction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
   png_quality: 90
  });
  camera= document.getElementById("camera");
  Webcam.attach('#camera');
  function take_snapshot()
{
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="image_result" src="'+data_uri+'"/>';
});
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1v7ePEkJl/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');}

function speak(){
var synth= window.speechSynthesis;
speak_data_1="the first prediction is "+prediction_1;
speak_data_2="the second prediction is "+prediction_2;
var utterThis =new SpeechSynthesisUtterance
(speak_data_1+speak_data_2);
synth.speak(utterThis);
}
function check(){
    img= document.getElementById('image_result');
    classifier.classify(img,gotResult);
    }
    function gotResult(error,results){
    if(error){
      console.error(error);
    }
    else
    {
      document.getElementById("result_emotion_name").innerHTML= results[0].label;
      document.getElementById("result_emotion_name2").innerHTML= results[1].label;
      prediction_1=results[0].label;
      prediction_2=results[1].label;
      speak();
      if(results[0].label=="punch")
      {
        document.getElementById("update_emoji").innerHTML="&#128074;";
      }
      if(results[0].label=="thumbs-up")
      {
        document.getElementById("update_emoji").innerHTML="&#128077;";
      }
      if(results[0].label=="thumbs-down")
      {
        document.getElementById("update_emoji").innerHTML="&#128078;";
      } 


      if(results[1].label=="punch")
      {
        document.getElementById("update_emoji2").innerHTML="&#128074;";
      }
      if(results[1].label=="thumbs-up")
      {
        document.getElementById("update_emoji2").innerHTML="&#128077;";
      }

      if(results[1].label=="thumbs-down")
      {
        document.getElementById("update_emoji2").innerHTML="&#128078;";
      } 
    }
    }
    