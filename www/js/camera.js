function getPicture() {
	log("func getpicture");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 30,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
} 

function onCameraSuccess(imageData) {
	setTimeout(function() { log("Camera success"); }, 100);
	setTimeout(function() {
		var image = $("#player_photo");
		image.attr("src", imageData);
	}, 100);
}

function onCameraFail(message) {
    setTimeout(function() { log('Failed because: ' + message); }, 100);
}
