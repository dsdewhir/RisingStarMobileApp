function getPicture() {
	alert("Getting picture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 50,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
} 

function onCameraSuccess(imageData) {
    var image = $("#myImage");
    image.attr("src", imageData);
    alert("img set to " + imageData);
}

function onCameraFail(message) {
    alert('Failed because: ' + message);
}