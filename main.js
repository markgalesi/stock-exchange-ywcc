var stocks = new Stocks("QQ2A275X35V32WRP"); // Mark Galesis API Key

//get the stock data of input symbol for the last 10 minutes
function request() {

   var openArr = [];
   var highArr = [];
   var lowArr = [];
   var closeArr = [];
   var volumeArr = [];
   var dateArr = [];

  //Show loader, hide data
  $("#tableWrapperADX").css("display", "none");
  $("#tableWrapper").css("display", "none");
  $("#loading").css("display", "block");

  let symbol = document.getElementById("symbol").value;

  var resultPromise = new Promise((res, rej) => {
    res(
      stocks.timeSeries({
        symbol: symbol,
        interval: "daily",
        amount: 50,
      })
    );
  });

  var ADXPromise = new Promise((res, rej) => {
    res(
      stocks.technicalIndicator({
        symbol: symbol,
        interval: "monthly",
        indicator: "ADX",
        time_period: 10,
        amount: 50,
      })
    );
  });

  Promise.all([resultPromise, ADXPromise]).then((data) => {
    $("#myTable tbody tr").remove();
    $("#myTableADX tbody tr").remove();
    $("#inputWrapper input").val("");

    //populate table
    const table = document.getElementById("testBody");
    data[0].forEach((item) => {
      let row = table.insertRow();

      let open = row.insertCell(0);
      open.innerHTML = item["open"];
	  openArr.push(item["open"]);
      let high = row.insertCell(1);
      high.innerHTML = item["high"];
	  highArr.push(item["high"]);
      let low = row.insertCell(2);
      low.innerHTML = item["low"];
	  lowArr.push(item["low"]);
      let close = row.insertCell(3);
      close.innerHTML = item["close"];
	  closeArr.push(item["close"]);
      let volume = row.insertCell(4);
      volume.innerHTML = item["volume"];
	  volumeArr.push(item["volume"]);
      let date = row.insertCell(5);
      date.innerHTML = item["date"];

      var d = new Date(item["date"]);
	  var datestring = d.toISOString().slice(0,10);
	  dateArr.push(datestring);
    });


    var open = {
	  type: "scatter",
	  mode: "lines",
	  name: symbol + ' Open',
	  x: dateArr.reverse(),
	  y: openArr.reverse(),
	  line: {color: '#17BECF'}
	}

	var close = {
	  type: "scatter",
	  mode: "lines",
	  name: symbol + ' Close',
	  x: dateArr.reverse(),
	  y: closeArr.reverse(),
	  line: {color: '#a63482'}
	}

	var high = {
	  type: "scatter",
	  mode: "lines",
	  name: symbol + ' High',
	  x: dateArr.reverse(),
	  y: highArr.reverse(),
	  line: {color: '#98ee4e'}
	}

	var low = {
	  type: "scatter",
	  mode: "lines",
	  name: symbol + ' Low',
	  x: dateArr.reverse(),
	  y: lowArr.reverse(),
	  line: {color: '#ee834e'}
	}

	var layout = {
	  title: symbol + ' 50 day summary',
	  xaxis: {
	    autorange: true,
	    rangeselector: {buttons: [
	        {
	          count: 1,
	          label: '1m',
	          step: 'month',
	          stepmode: 'backward'
	        },
	        {
	          count: 6,
	          label: '6m',
	          step: 'month',
	          stepmode: 'backward'
	        },
	        {step: 'all'}
	      ]},
	    rangeslider: {range: [dateArr.reverse()[0], dateArr[0]]},
	    type: 'date'
	  },
	  yaxis: {
	    autorange: true,
	    type: 'linear'
	  }
	};

	var plot = [open, high, low, close];

	Plotly.newPlot('tester', plot, layout);

    //populate table
    const tableADX = document.getElementById("testBodyADX");
    data[1].forEach((item) => {
      let row = tableADX.insertRow();

      let adx = row.insertCell(0);
      adx.innerHTML = item["ADX"];
      let date = row.insertCell(1);
      date.innerHTML = item["date"];
    });

    //Hide loader, show data
    $("#loading").css("display", "none");
    $("#tableWrapperADX").css("display", "flex");

    $("#tableWrapper").css("display", "flex");
  });
}
