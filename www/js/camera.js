function getPicture() {
	log("Getting picture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 50,
	    destinationType: Camera.DestinationType.FILE_URI
	 });
} 

function onCameraSuccess(imageData) {
    var image = $("#myImage");
    image.attr("src", "data:image/jpeg;base64," + imageData);
}

function onCameraFail(message) {
    log('Failed because: ' + message);
}