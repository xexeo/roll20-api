on('chat:message', function(msg) {
    if (msg.type != 'api') return;

    var command = msg.content.split(' ').shift().substring(1);

    if (command == 'sendas') {
        var content = msg.content.substring(8);
        var parts = content.split('|');
        if (parts.length < 2) {
            sendChat('SYSTEM', 'No player or character specified for message sender');
            return;
        }

        var who = parts.shift();
        var message = parts.join('|');

        var players = filterObjs(function(obj) {
            if (obj.get('type') != 'player') return false;
            return (obj.get('displayname').indexOf(who) >= 0);
        });
        if (players.length > 0) {
            who = 'player|' + players[0].id;
        } else {
            var characters = filterObjs(function(obj) {
                if (obj.get('type') != 'character') return false;
                return (obj.get('name').indexOf(who) >= 0);
            });
            if (characters.length > 0) {
                who = 'character|' + characters[0].id;
            } else {
                sendChat('SYSTEM', 'Could not find a player or character matching the name ' + who);
                return;
            }
        }

        sendChat(who, message);
    }
});
