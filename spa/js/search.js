var searchController = new function(){
    var search = '';

    function sortViews(obj1, obj2){
        if(obj1.views < obj2.views) return 1;
        if(obj1.views > obj2.views) return -1;
        return 0;
    }

    function img(url){
        return $('<img/>').attr('src', url);
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
        }).click(changeURL);
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

    function generateSearchResultList(carObjects){
        var $searchList = div('search-result-list');
        if(!carObjects.length) {
            $searchList.append(generateNoResultRow());
        } else {
            for (var i=0; i<carObjects.length; i++){
                $searchList.append(generateSearchResultRow(carObjects[i]));
            }
        }
        return $searchList;
    }

    function generateSearchResultRow(car){
        var $a = href('#Car/'+car.id);
        var $carBlock = div('search-result-content');
        var $carImage = div('search-result-img')
            .append(img(car.image));
        var $carInfo = div('search-result-car-info')
            .append(div('search-result-year').text(car.year))
            .append(div('search-result-cost').text(car.cost+'BYN'))
            .append(div('search-result-views').text(car.views));
        var $carCharacteristic = div('search-result-car-characteristic')
            .append(div('search-result-name').text(car.mark+' '+car.model))
            .append(div('search-result-characteristic').text(car.transmission+', '+car.volume+'л., '+car.fuel));
        $a.append($carImage).append($carInfo).append($carCharacteristic);
        $carBlock.append($a);
        return $carBlock;
    }

    function generateNoResultRow(){
        var $errorBlock = div('search-result-content');
        var $errorImage = div('search-result-img')
            .append(img(''));
        var $errorWords = div('search-result-car-info')
            .append(div('search-result-year').text('ERROR!'))
            .append(div('search-result-cost').text('ERROR!'))
            .append(div('search-result-views').text('ERROR!'));
        var $errorInfo = div('search-result-car-characteristic')
            .append(div('search-result-name').text('NO RESULTS!'))
            .append(div('search-result-characteristic').text('really no results, believe me'));
        $errorBlock.append($errorImage).append($errorWords).append($errorInfo);
        return $errorBlock;
    }

    function generateSearchFilter(marks){
        var $filter = div('search-filter');
        var $name = span('search-filter-name', 'Фильтр');
        var $mark = div('search-filter-characteristic')
            .append(select('search-filter-input', 'mark', 'Выберите марку...', marks));
        var $model = div('search-filter-characteristic')
            .append(input('model', 'text', 'Введите модель'));
        var $year = div('search-filter-characteristic')
            .append(label('search-filter-characteristic-name', 'year-from', 'Год выпуска:'))
            .append(input('year-from', 'number', 'От...'))
            .append(input('year-to', 'number', 'До...'));
        var $cost = div('search-filter-characteristic')
            .append(label('search-filter-characteristic-name', 'cost-from', 'Цена BYN:'))
            .append(input('cost-from', 'number', 'От...'))
            .append(input('cost-to', 'number', 'До...'));
        var $fuel = div('search-filter-characteristic')
            .append(radio('diesel', 'fuel', 'Дизель'))
            .append(radio('petrol', 'fuel', 'Бензин'))
            .append(radio('electro', 'fuel', 'Электро'));
        var $transmission = div('search-filter-characteristic')
            .append(radio('mechanic', 'transmission', 'Механика'))
            .append(radio('automatic', 'transmission', 'Автомат'));
        var $button = div('search-filter-characteristic')
            .append(button('Фильтр'));
        $filter.append($name).append($mark).append($model).append($year).append($cost).append($fuel).append($transmission).append($button);
        return $filter;
    }

    this.generateView = function($content, carObjects, marks, parameters){
        $content.empty();
        var cars = carObjects.filter(filters.searchFilter, parameters);
        cars = cars.filter(filters.propertyFilter, parameters);
        cars.sort(sortViews);
        search = parameters.search;
        var $result = generateSearchResultList(cars);
        var $filter = generateSearchFilter(marks);
        $content.append($result)
            .append($filter);
        return;
    }

    function changeURL(){
        var $mark = '&mark='+$('#mark :selected').val();
        var $model = '&model='+$('#model').val();
        var $transmission = '&transmission=';
        var $checked = $('input[name="transmission"]:checked').val();
        if(!!$checked){
            $transmission += $checked;
        }
        var $fuel = '&fuel=';
        $checked = $('input[name="fuel"]:checked').val();
        if(!!$checked){
            $fuel += $checked;
        }
        var $yearFrom = '&yearFrom='+$('#year-from').val();
        var $yearTo = '&yearTo='+$('#year-to').val();
        var $costFrom = '&costFrom='+$('#cost-from').val();
        var $costTo = '&costTo='+$('#cost-to').val();
        if (!!search){
            var newURL = '#Search?search='+ search;
        } else {
            var newURL = '#Search?search=';
        }
        newURL = newURL + $mark + $model + $transmission + $fuel + $yearFrom + $yearTo + $costFrom + $costTo;
        location.hash = newURL;
    }
}