var carController = new function(){
    function img(url){
        return $('<img/>').attr('src',url);
    }

    function span(className, text){
        return $('<span/>').addClass(className).text(text);
    }

    function div(className){
        return $('<div/>').addClass(className);
    }

    function characteristicRow(name, value){
        return div('car-characteristic-row')
            .append(span('car-characteristic-name', name))
            .append(span('car-characteristic-value', value));
    }

    function generateCarName(mark, model){
        return div('car-name').append(span('car-name-label', mark+' '+model));
    }

    function generateDataInfo(id, views){
        return div('car-data-info')
            .append(span('car-data-id', '№' + id))
            .append(span('car-data-views', 'Просмотров: ' + views));
    }

    function generateCarInfo(cost, year, mileage, fuel, volume, transmission, image){
        return div('car-info')
            .append(div('car-characteristic')
                .append(div('car-cost')
                    .append(span('',cost+'BYN'))
                ).append(characteristicRow('Год выпуска:', year))
                .append(characteristicRow('Пробег:', mileage+'км.'))
                .append(characteristicRow('Вид топлива:', fuel))
                .append(characteristicRow('Объём:', volume+'л.'))
                .append(characteristicRow('Трансмиссия:', transmission))
            ).append(div('car-image')
                .append(img(image))
            );
    }

    this.generateView = function($content, carObject){
        $content.empty();
        var $carName = generateCarName(carObject.mark, carObject.model);
        var $carDataInfo = generateDataInfo(carObject.id, carObject.views);
        var $carInfo = generateCarInfo(carObject.cost, carObject.year, carObject.mileage, carObject.fuel, carObject.volume, carObject.transmission, carObject.image);
        $content.append($carName)
            .append($carDataInfo)
            .append($carInfo);
        return;
    }
}