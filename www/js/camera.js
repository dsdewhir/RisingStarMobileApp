function getPicture() {
	log("Getting picture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 30,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
	 log("Done");
} 

function onCameraSuccess(imageData) {
	log("Camera success");
    var image = $("#myImage");
    image.attr("src", imageData);
    log("img set to " + imageData);
}

function onCameraFail(message) {
    log('Failed because: ' + message);
}