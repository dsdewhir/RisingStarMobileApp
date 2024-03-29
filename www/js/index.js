var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        app.report('deviceready');
		setTimeout(function() {
			navigator.splashscreen.hide();
		}, 3000);
    },
    report: function(id) {
        // Report the event in the console
        console.log("Report: " + id);

        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};
