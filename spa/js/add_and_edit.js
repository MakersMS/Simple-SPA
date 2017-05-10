var addAndEditController = new function(){
    var changeCar;

    function sortId(obj1, obj2){
        if(obj1.id > obj2.id) return 1;
        if(obj1.id < obj2.id) return -1;
        return 0;
    }

    function img(url){
        return $('<img/>').attr('src',url);
    }

    function href(url){
        return $('<a/>').attr('href', url);
    }

    function span(className, text){
        return $('<span/>').addClass(className).text(text);
    }

    function div(className){
        return $('<div/>').addClass(className);
    }

    function option(value, placeholder){
        return $('<option/>').attr('value', value).text(placeholder);
    }

    function select(className, id, placeholder, variants){
        var $select = $('<select/>').addClass(className).attr('id',id);
        $select.append(option('', placeholder));
        for(var i=0; i<variants.length; i++){
            $select.append(option(variants[i], variants[i]));
        }
        return $select;
    }

    function label(className, forElement, text){
        var $label = $('<label/>');
        if(className){
            $label.addClass(className);
        }
        if(forElement) {
            $label.attr('for', forElement);
        }
        $label.text(text);
        return $label;
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
            'type': 'button',
            'value': text
        });
    }

    function radio(id, name, text){
        var $radio =  $('<input/>',{
            'type': 'radio',
            'name': name,
            'id': id,
            'value': id
        });
        var $customRadio = div('search-radio')
            .append(div('custom-radio'))
            .append(label(null, id, text));
        return $('<label/>').append($radio).append($customRadio);
    }

    function generateDataBlock(marks, name){
        var $addBlock = div('add-block');
        var $name = span('add-block-name', name);
        var $mark = div('add-block-characteristic')
            .append(select('add-block-input', 'mark', 'Выберите марку...', marks));
        var $model = div('add-block-characteristic')
            .append(label('add-block-characteristic-name', 'model', 'Модель:'))
            .append(input('model', 'text', 'Модель'));
        var $year = div('add-block-characteristic')
            .append(label('add-block-characteristic-name', 'year', 'Год выпуска:'))
            .append(input('year', 'number', 'Год'));
        var $volume = div('add-block-characteristic')
            .append(label('add-block-characteristic-name', 'volume', 'Объём:'))
            .append(input('volume', 'number', 'Объём'))
        var $cost = div('add-block-characteristic')
            .append(label('add-block-characteristic-name', 'cost', 'Цена BYN:'))
            .append(input('cost', 'number', 'Цена'));
        var $mileage = div('add-block-characteristic')
            .append(label('add-block-characteristic-name', 'mileage', 'Пробег:'))
            .append(input('mileage', 'number', 'Пробег'));
        var $fuel = div('add-block-characteristic')
            .append(radio('diesel', 'fuel', 'Дизель'))
            .append(radio('petrol', 'fuel', 'Бензин'))
            .append(radio('electro', 'fuel', 'Электро'));
        var $transmission = div('add-block-characteristic')
            .append(radio('mechanic', 'transmission', 'Механика'))
            .append(radio('automatic', 'transmission', 'Автомат'));
        var $imgURL = div('add-block-characteristic')
            .append(input('img', 'text', 'URL изображения').on('change', changeImg))
            .append(
                div('add-image').append(img())
            );
        $addBlock
            .append($name)
            .append($mark)
            .append($model)
            .append($year)
            .append($cost)
            .append($mileage)
            .append($volume)
            .append($fuel)
            .append($transmission)
            .append($imgURL)
        return $addBlock;
    }

    function generateAddButtons(){
        var $button = div('add-block-characteristic')
            .append(button('Добавить').click(addCar))
            .append(button('Отмена').click(goBackToAdmin));
        return $button;
    }

    function generateEditButtons(){
        var $button = div('add-block-characteristic')
            .append(button('Изменить').click(editCar))
            .append(button('Отмена').click(goBackToAdmin));
        return $button;
    }

    function generateAddView($content, marks){
        $content.empty();
        var $block = generateDataBlock(marks, 'Добавить').append(generateAddButtons());
        $content.append($block);
        return;
    }

    function generateEditView($content, marks, car){
        $content.empty();
        changeCar = car;
        var $block = generateDataBlock(marks, 'Изменить ['+car.id+']').append(generateEditButtons());
        $content.append($block);
        fillData(car);
        return;
    }

    function takeData(){
        var car = {};
        car.mark = $('#mark :selected').val();
        car.model = $('#model').val();
        car.transmission = $('input[name="transmission"]:checked').val();
        car.fuel = $('input[name="fuel"]:checked').val();
        car.year = $('#year').val();
        car.cost = $('#cost').val();
        car.mileage = $('#mileage').val();
        car.image = $('#img').val();
        car.volume = $('#volume').val();
        car.views = 0;
        if(!car.mark || !car.model || !car.transmission || !car.fuel || !car.year || !car.cost || !car.image
            || !car.volume || (!car.mileage && car!=0)){
            return null;
        }
        return car;
    }

    function fillData(car){
        $('#mark option[value="'+car.mark+'"]').attr('selected','selected');
        $('#model').val(car.model);
        $('input[name="transmission"][value="'+car.transmission+'"]').attr('checked','checked');
        $('input[name="fuel"][value="'+car.fuel+'"]').attr('checked','checked');
        $('#year').val(car.year);
        $('#cost').val(car.cost);
        $('#mileage').val(car.mileage);
        $('#img').val(car.image);
        $('#volume').val(car.volume);
        changeImg();
    }

    function addCar(){
        var car = takeData();
        if(!car) {
            return alert('Заполните все поля!');
        }
        var values = localStorageController.values().sort(sortId);
        car.id = values[values.length-1].id + 1;
        console.log(values);
        console.log(car.id);
        localStorageController.set(car.id, car);
        location.hash = '#Admin';
    }

    function editCar(){
        var car = takeData();
        if(!car) {
            return alert('Заполните все поля!');
        }
        car.id = changeCar.id;
        car.views = changeCar.views;
        localStorageController.set(car.id, car);
        location.hash = '#Admin';
    }

    function goBackToAdmin(){
        var newURL = '#Admin';
        location.hash = newURL;
    }

    function changeImg(){
        var url = $('#img').val();
        if(!!url){
            $('img').attr('src', url);
        }
    }

    this.generateAddView = generateAddView;
    this.generateEditView = generateEditView;
}