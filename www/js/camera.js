function getPicture() {
	log("Getting picture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 50,
	    destinationType: Camera.DestinationType.FILE_URI
	 });
} 

function onCameraSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onCameraFail(message) {
    log('Failed because: ' + message);
}