on('ready', () => { 

    const HPBarNum = 1;

    const bar = `bar${HPBarNum}_value`;
    const max = `bar${HPBarNum}_max`;

    const messageIfBad = (obj) => { // function that receives an obj
        const hpMax = parseInt(obj.get(max),10);
        if(!isNaN(hpMax) && 'token' === obj.get('subtype') && !obj.get('isdrawing') ){
            let hp = parseInt(obj.get(bar),10);
            let changes = {};
            let name = obj.get('name');
            let npc = obj.get('represents')
            if (getAttrByName(npc,"npc") == 1) { // only npc talks
                if(hp > hpMax) {
                    changes.status_dead = false;
                } else if(hp <= 0) {
                    hp=0;
                    changes[bar] = hp;
                    changes.status_dead = true;
                } else if (hp<hpMax/10 && xexeo_faz) {
                    // say something
                    changes.status_dead = false;
                    sendChat(name, "[[1t[Ultimas-palavras]]]");
                } else if (hp<hpMax/5 && xexeo_faz ) {
                    // say somthing
                    changes.status_dead = false;
                    sendChat(name, "[[1t[Palavras-mortais]]]");
                } else if (hp<hpMax/2 && xexeo_faz ) {
                    changes.status_dead = false;
                    sendChat(name, "[[1t[Palavras-mortais]]]");
                    // say
                }
                else {
                    changes.status_dead = false;
                }
                obj.set(changes);
            }
        }
    };


    on("change:token", messageIfBad); // receive a message, callback


    if('undefined' !== typeof TokenMod && TokenMod.ObserveTokenChange){
        TokenMod.ObserveTokenChange(messageIfBad);
    }
});


