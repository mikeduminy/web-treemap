var data = [40050,15060,8900,4700,3800];

var total = 0,
width = 400,
height = 400,
percentages = [],
elements = [];

// array.sort is failing me
function qsort(a) {
    if (a.length == 0) return [];
 
    var left = [], right = [], pivot = a[0];
 
    for (var i = 1; i < a.length; i++) {
        a[i] > pivot ? left.push(a[i]) : right.push(a[i]);
    }
 
    return qsort(left).concat(pivot, qsort(right));
}

// place the largest data point first
data = qsort(data);

// total the data
data.forEach(function(a){ total += a });

document.getElementById('data').innerHTML = '['+data.join(', ').trim()+']';
document.getElementById('total').innerHTML = total;

data.forEach(function(a){ percentages.push(a/total*100) });

var randomColour = function(){
	var result = Math.floor(Math.random()*16777215).toString(16);
	if (result.length < 6) result+=0;
	return result;
};

var remainingWidth = width,
remainingHeight = height,
remainingArea = remainingWidth * remainingHeight,
remainingPer = 100;

for(var i = 0; i < data.length; i++){
	// get the next highest percentage
	var originalPer = percentages.shift(); // it is ordered

	// what percentage is our next highest of the remaining
	var per = originalPer / remainingPer;
	
	// adjust the remaining percentage
	remainingPer -= originalPer;

	var elw = remainingWidth;
	var elh = remainingHeight;

	if (i%2==0) {
		elw = remainingWidth * per;
		remainingWidth -= elw; 
	} else {
		elh = remainingHeight * per;
		remainingHeight -= elh;
	}

	lastPer = per;

	var style = 'background-color:#' + randomColour() + ';';
	style += 'width:'+elw+'px;';
	style += 'height:'+elh+'px;';

	var el = '<div class=\"leaf\" style=\"'+style+'\">'+originalPer.toFixed(2)+'%</div>';
	elements.push(el);
}

var treemap = document.getElementById('treemap');
for(var i = 0; i < elements.length; i++) {
	treemap.innerHTML += elements[i];
}