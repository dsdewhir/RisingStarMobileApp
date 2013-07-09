function getPicture() {
	alert("Getting picture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 30,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
} 

function onCameraSuccess(imageData) {
	alert("Camera success");
    var image = $("#myImage");
    image.attr("src", imageData);
    alert("img set to " + imageData);
}

function onCameraFail(message) {
    alert('Failed because: ' + message);
}