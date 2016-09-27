Storage.prototype.__walker = function(path,o) {
    //Validate if path is an object otherwise returns false
    if(typeof path !== "object")
        return undefined;

    if(path.length === 0){
        return o;
    }

    for(var i in path){
        var prop = path[i];
        //Check if path step exists
        if(o.hasOwnProperty(prop)){
            var val = o[prop];
            if(typeof val == 'object'){
                path.splice(0,1);
                return this.__walker(path,val);
            } else {
                return val;
            }
        }
    }
};

Storage.prototype.setObj = function(key, value) {

    var path = key.split('.');

    //First level is always the localStorage key pair item
    var _key = path[0];
    var os = this.getItem(_key) !== null ? JSON.parse(this.getItem(_key)) : null; //general storage key pair element
    path.splice(0,1);

    if(os === null) {
        os = {};
        this.setItem(_key,JSON.stringify(os));
    }

    var innerWalker = function(path,o) {

        //Validate if path is an object otherwise returns false
        if(typeof path !== "object")
            return undefined;

        if(path.length == 1) {
            o[path[0]] = value;
            return o;
        } else if(path.length === 0) {
            os = value;
            return os;
        }

        var val = null;

        for(var i in path){
            var prop = path[i];
            //Check if path step exists
            if(o.hasOwnProperty(prop)) {
                val = o[prop];
                if(typeof val == 'object'){
                    path.splice(0,1);
                    return innerWalker(path,val);
                }
            } else {
                //create depth
                o[prop] = {};
                val = o[prop];
                path.splice(0,1);
                return innerWalker(path,val);
            }
        }
    };

    innerWalker(path,os);

    this.setItem(_key,JSON.stringify(os));
};

Storage.prototype.getObj = function(key) {
    key = key.split('.');

    //First level is always the localStorage key pair item
    var _key = key[0];
    var o = this.getItem(_key) ? JSON.parse(this.getItem(_key)) : null;

    if(o === null)
        return undefined;

    key.splice(0,1);

    return this.__walker(key,o);
};
