xexeo_faz = true;

on('chat:message', function(msg) {
    
    if (msg.type != 'api') return;

    var command = msg.content.split(' ').shift().substring(1);

    if (command == 'troca_xexeo_faz') {
        xexeo_faz = !xexeo_faz;
            // the variable is defined
        sendChat("GM", "/w GM Agora falas ocorrem é :"+xexeo_faz);
    }
});
