var adminController = new function(){
    var carId = 0;
    var filterParameters;
    var $deleteButton;
    var $changeButton;

    function sortId(obj1, obj2){
        if(obj1.id > obj2.id) return 1;
        if(obj1.id < obj2.id) return -1;
        return 0;
    }

    function span(className, text){
        return $('<span/>').addClass(className).text(text);
    }

    function div(className){
        return $('<div/>').addClass(className);
    }

    function input(id, type, placeholder){
        return $('<input/>',{
            'type': type,
            'id': id,
            'placeholder': placeholder
        });
    }

    function button(text){
        return $('<input/>',{
            'type': 'submit',
            'value': text
        });
    }

    function generateTable(carObjects){
        var $searchList = div('admin-table');
        $searchList.append(generateMainRow());
        for (var i=0; i<carObjects.length; i++){
            $searchList.append(generateCarRow(carObjects[i]));
        }
        return $searchList;
    }

    function generateMainRow(){
        var $row = div('admin-table-main-row')
            .append(span('admin-table-field', 'ID'))
            .append(span('admin-table-field','Марка'))
            .append(span('admin-table-field','Модель'))
            .append(span('admin-table-field','Год'))
            .append(span('admin-table-field','Трансмиссия'))
            .append(span('admin-table-field','Объём'))
            .append(span('admin-table-field','Топливо'))
            .append(span('admin-table-field','Стоимость'))
            .append(span('admin-table-field','Просмотры'))
        return $row;
    }

    function generateCarRow(car){
        var $row = div('admin-table-row')
            .append(span('admin-table-field', car.id))
            .append(span('admin-table-field', car.mark))
            .append(span('admin-table-field', car.model))
            .append(span('admin-table-field', car.year))
            .append(span('admin-table-field', car.transmission))
            .append(span('admin-table-field', car.volume))
            .append(span('admin-table-field', car.fuel))
            .append(span('admin-table-field', car.cost))
            .append(span('admin-table-field', car.views))
            .hover(addButtons, removeButtons);
        return $row;
    }

    function generateAdminMenu(){
        var $adminMenu = div('admin-menu');
        var $search = div('admin-search')
            .append(input('admin-search', 'text', 'Поиск...'))
            .append(button('Поиск').on('click', search));
        var $addButton = div('admin-add')
            .append(button('Добавить').on('click', goToAddView));
        $adminMenu.append($search).append($addButton);
        return $adminMenu;
    }

    function addButtons(){
        $row = $('.admin-table-row:hover');
        carId = $row.children('.admin-table-field').first().text();
        $row.append($deleteButton);
        $row.append($changeButton);
    }

    function removeButtons(){
        $deleteButton.detach();
        $changeButton.detach();
    }

    function search(){
        var searchString = $('#admin-search').val();
        var newURL = '#Admin?search='+searchString;
        location.hash = newURL;
    }

    function goToAddView(){
        location.hash = '#Add';
    }

    function generateView($content, carObjects, parameters){
        $content.empty();
        $deleteButton = button("Удалить").on('click', deleteCar);
        $changeButton = button("Изменить").on('click', editCar);
        filterParameters = parameters;
        var cars = carObjects.filter(filters.searchFilter, parameters);
        cars.sort(sortId);
        var $menu = generateAdminMenu();
        var $table = generateTable(cars);
        $content.append($menu)
            .append($table);
        return;
    }

    function deleteCar(){
        localStorageController.remove(carId);
        var cars = localStorageController.values();
        var $content = $('#content');
        generateView($content, cars, filterParameters);
    }

    function editCar(){
        location.hash = '#Edit/'+carId;
    }

    this.generateView = generateView;
}
