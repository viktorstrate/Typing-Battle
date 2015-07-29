var unranked = io.connect(window.location.protocol + '//' + window.location.host + "/unranked");

unranked.on('connect', function () {
    unranked.emit('init', {id: id});
});