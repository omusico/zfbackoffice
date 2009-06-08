(function(){
    var lasts = ['<?php echo implode("', '",$usernames )?>'];
    var firsts = ['<?php echo implode("', '",$emails )?>'];
    var lastLen = lasts.length, firstLen = firsts.length;

    Ext.ux.getRandomInt = function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    Ext.ux.generateName = function(){
        var name = firsts[Ext.ux.getRandomInt(0, firstLen-1)] + ' ' + lasts[Ext.ux.getRandomInt(0, lastLen-1)];
        if(Ext.ux.generateName.usedNames[name]){
            return Ext.ux.generateName();
        }
        Ext.ux.generateName.usedNames[name] = true;
        return name;
    }
    Ext.ux.generateName.usedNames = {};

})();
