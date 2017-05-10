var filters = new function(){
    function filterMark(obj, mark){
        return obj.mark.toLowerCase() === mark.toLowerCase();
    }

    function filterModel(obj, model){
        return obj.model.toLowerCase() === model.toLowerCase();
    }

    function filterYearFrom(obj, yearFrom){
        return (obj.year >= yearFrom);
    }

    function filterYearTo(obj, yearTo){
        return (obj.year <= yearTo);
    }

    function filterCostFrom(obj, costFrom){
        return (obj.cost >= costFrom);
    }

    function filterCostTo(obj, costTo){
        return (obj.cost <= costTo);
    }

    function filterTransmission(obj, transmission){
        return obj.transmission.toLowerCase() === transmission.toLowerCase();
    }

    function filterFuel(obj, fuel){
        return obj.fuel.toLowerCase() === fuel.toLowerCase();
    }

    this.propertyFilter = function(car){
        var isSuitable = true;
        if(!!this.mark){
            isSuitable = isSuitable & filterMark(car, this.mark);
        }
        if(!!this.model){
            isSuitable = isSuitable & filterModel(car, this.model);
        }
        if(!!this.transmission){
            isSuitable = isSuitable & filterTransmission(car, this.transmission);
        }
        if(!!this.fuel){
            isSuitable = isSuitable & filterFuel(car, this.fuel);
        }
        if(!!this.yearFrom){
            isSuitable = isSuitable & filterYearFrom(car, this.yearFrom);
        }
        if(!!this.yearTo){
            isSuitable = isSuitable & filterYearTo(car, this.yearTo);
        }
        if(!!this.costFrom){
            isSuitable = isSuitable & filterCostFrom(car, this.costFrom);
        }
        if(!!this.costTo){
            isSuitable = isSuitable & filterCostTo(car, this.costTo);
        }
        return isSuitable;
    }

    this.searchFilter = function(car){
        if(!!this.search){
            var search = this.search.toLowerCase();
            var isSuitable = (car.mark+" "+car.model).toLowerCase().indexOf(search)!=-1
                || car.transmission.toLowerCase().indexOf(search)!=-1
                || car.fuel.toLowerCase().indexOf(search)!=-1
                || String(car.year).indexOf(search)!=-1
                || String(car.cost).indexOf(search)!=-1
                || String(car.volume).indexOf(search)!=-1
                || String(car.mileage).indexOf(search)!=-1;
            return isSuitable;
        } else {
            return true;
        }
    }
}