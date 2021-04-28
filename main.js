var stocks = new Stocks("QQ2A275X35V32WRP"); // Mark Galesis API Key

//get the stock data of input symbol for the last 10 minutes
function request() {
  //Show loader, hide data
  $("#tableWrapperADX").css("display", "none");
  $("#tableWrapper").css("display", "none");
  $("#loading").css("display", "block");

  let symbol = document.getElementById("symbol").value;

  var resultPromise = new Promise((res, rej) => {
    res(
      stocks.timeSeries({
        symbol: symbol,
        interval: "1min",
        amount: 10,
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
        amount: 10,
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
      let high = row.insertCell(1);
      high.innerHTML = item["high"];
      let low = row.insertCell(2);
      low.innerHTML = item["low"];
      let close = row.insertCell(3);
      close.innerHTML = item["close"];
      let volume = row.insertCell(4);
      volume.innerHTML = item["volume"];
      let date = row.insertCell(5);
      date.innerHTML = item["date"];
    });

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
