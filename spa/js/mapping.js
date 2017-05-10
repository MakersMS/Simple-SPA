var mapper = new function() {
    var stateH={parameters: {}};

    this.switchToStateFromURLHash = function() {
        var $content = $('#content');
        var URLHash = window.location.hash;

        var StateStr = URLHash.substr(1);

        if (StateStr != "") {
            stateH={parameters: {}};
            stateH.parameters = getParameters(StateStr);
            var PartsA = StateStr.split('?')[0].split('/');

            stateH.pagename = PartsA[0];
            if (stateH.pagename == 'Car' || stateH.pagename == 'Edit')
                stateH.carId = PartsA[1];
        }
        else
            stateH = {pagename: 'Main'};

        switch (stateH.pagename) {
            case 'Main':
                indexController.generateView($content, localStorageController.values());
                break;
            case 'Car':
                var object = localStorageController.get(stateH.carId);
                if (object) {
                    object.views = object.views + 1;
                    localStorageController.set(stateH.carId, object);
                    carController.generateView($content, object);
                }
                else {
                    $content.empty();
                    $content.append($('<img/>').attr('src', 'img/error.png'));
                }
                break;
            case 'Edit':
                var object = localStorageController.get(stateH.carId);
                if (object) {
                    var marks = localStorageController.get('marks');
                    addAndEditController.generateEditView($content, marks, object);
                }
                else {
                    $content.empty();
                    $content.append($('<img/>').attr('src', 'img/error.png'));
                }
                break;
            case 'Search':
                var marks = localStorageController.get('marks');
                searchController.generateView($content, localStorageController.values(), marks, stateH.parameters);
                break;
            case 'Admin':
                adminController.generateView($content, localStorageController.values(), stateH.parameters);
                break;
            case 'Add':
                var marks = localStorageController.get('marks');
                addAndEditController.generateAddView($content, marks);
                break;
            default:
                $content.empty();
                $content.append($('<img/>').attr('src', 'img/error.png'));
                break;
        }
    }

    function getParameters(hash){
        var parameters = {};
        var parts = hash.split('?');
        if(parts[1]){
            var parameterStringArray = parts[1].split('&');
            for (var i=0; i<parameterStringArray.length; i++){
                var parameter = parameterStringArray[i].split('=');
                parameters[parameter[0]] = parameter[1];
            }
        }
        return parameters;
    }
}

window.onhashchange = mapper.switchToStateFromURLHash;
$(document).ready(mapper.switchToStateFromURLHash());