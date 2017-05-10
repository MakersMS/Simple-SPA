var indexController = new function(){
    function sortViews(obj1, obj2){
        if(obj1.views < obj2.views) return 1;
        if(obj1.views > obj2.views) return -1;
        return 0;
    }

    function label(className, forElement, text){
        var $label = $('<label/>').addClass(className);
        if(forElement) {
            $label.attr('for', forElement);
        }
        $label.text(text);
        return $label;
    }

    function button(text, method){
        return $('<input/>',{
            'type': 'submit',
            'value': text
        }).addClass('search-button').click(method);
    }

    function img(url){
        return $('<img/>').attr('src',url);
    }

    function textInput(id, placeholder){
        return $('<input type="text"/>').attr('id',id).attr('placeholder', placeholder);
    }

    function div(className){
        return $('<div/>').addClass(className);
    }

    function span(className){
        return $('<span/>').addClass(className);
    }

    function href(url){
        return $('<a/>').attr('href', url);
    }

    function generateImage(url) {
        return div('top-popular-image').append(img(url));
    }

    function generateContentElement(carObject){
        var $a = href('#Car/'+carObject.id);
        var $contentBlock = div('top-popular-content');
        var $image = generateImage(carObject.image);
        var $info = div('top-popular-info');
        var $characteristic = div('top-popular-characteristic')
            .append(label('top-popular-car-name', null, carObject.mark+' '+carObject.model))
            .append(label('top-popular-car-info', null, carObject.year+', '+carObject.mileage+'км'))
            .append(label('top-popular-car-info', null, 'Просмотры:'+carObject.views));
        var $cost = div('top-popular-cost')
            .append(label('top-popular-cost-value', null, carObject.cost+'BYN'))
            .append(label('top-popular-cost-value', null, carObject.cost/2.5+'$'))
            .append(label('top-popular-cost-value', null, carObject.cost/2+'€'));
        $info = $info.append($characteristic).append($cost);
        $contentBlock.append($image).append($info);
        return $a.append($contentBlock);
    }

    function generateSearchField(callback){
        return div('search-block')
            .append(span('search-label')
                .append(label('search-label-text', 'search', 'Поиск: '))
            ).append(span('search-field')
                .append(textInput('search', 'Поиск...'))
            ).append(button('Искать', changeURL));
    }

    function generateContentBlock(carObjects){
        carObjects.sort(sortViews);
        var $content = div('top-popular-block');
        var count = carObjects.length<25 ? carObjects.length : 25;
        for(var i=0; i<count; i++){
            $content.append(generateContentElement(carObjects[i]));
        }
        return $content;
    }

    function changeURL(){
        var searchString = $('#search').val();
        var newURL = '#Search?search='+searchString;
        location.hash = newURL;
    }

    this.generateView = function($content, carObjects, callback){
        $content.empty();
        $content.append(generateSearchField());
        $content.append(generateContentBlock(carObjects));
        return;
    }
}