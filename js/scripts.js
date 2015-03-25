$(document).ready(function() {
    $("#sendAudio1").click(function() {
        $.get('http://buzztrain.azurewebsites.net/api/sit');
    });

    $("#sendAudio2").click(function() {
        $.get('http://buzztrain.azurewebsites.net/api/laydown')
    });
});
