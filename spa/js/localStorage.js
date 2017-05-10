var localStorageController = (function(){
    function getKey(object){
        return Object.keys(object)[0];
    }

    function get(key){
        var jsonObject = localStorage.getItem(key);
        return JSON.parse(jsonObject);
    }

    function getAll(){
        var arrayObject = [];
        for(var key in localStorage){
            var value = get(key);
            var object = {};
            object[key] = value;
            arrayObject.push(object);
        }
        return arrayObject;
    }

    function set(key, value){
        var jsonObject = JSON.stringify(value);
        localStorage.setItem(key, jsonObject);
    }

    function add(arrayObj){
        for(var i=0; i<arrayObj.length; i++){
            var key = getKey(arrayObj[i]);
            var value = arrayObj[i][key];
            set(key, value);
        }
    }

    function remove(key){
        localStorage.removeItem(key);
    }

    function clear(){
        localStorage.clear();
    }

    function values(){
        var arrayObject = [];
        for(var key in localStorage){
            var value = get(key);
            if(!Array.isArray(value)){
                arrayObject.push(value);
            }
        }
        return arrayObject;
    }

    return {
        get: get,
        getAll: getAll,
        set: set,
        add: add,
        remove: remove,
        clear: clear,
        values: values
    }
})();