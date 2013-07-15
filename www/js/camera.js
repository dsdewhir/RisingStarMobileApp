function getLogo() {
	log("func getlogo");
	navigator.camera.getPicture(onCameraSuccess, onCameraFail, { quality: 30,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
} 

function getPicture() {
	log("func getpicture");
	navigator.camera.getPicture(playerPhotoSuccess, onCameraFail, { quality: 30,
	    destinationType: Camera.DestinationType.FILE_URI,
	    sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
	 });
} 

function playerPhotoSuccess(imageData) {
	var image = $("#player_photo");
	image.attr("src", imageData);
}

function playerPhotoSuccess(imageData) {
	var image = $("#team_logo");
	image.attr("src", imageData);
}

function onCameraFail(message) {
    setTimeout(function() { log('Failed because: ' + message); }, 100);
}
