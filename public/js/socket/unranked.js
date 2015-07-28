var unranked = io.connect(window.location.protocol + '//' + window.location.host + "/unranked");

unranked.on('connect', function (data) {
    console.log('connect' + data);
});