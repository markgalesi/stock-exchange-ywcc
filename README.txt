install steps:
	-unzip 'htdocs.zip'
	-Locate xampp folder(default C:\xampp on windows)
	-delete 'htdocs-default' inside C:\xampp
	-drag&drop 'htdocs' into C:\xampp
	-claim an API key here: https://www.alphavantage.co/support/#api-key
how to run:
	-start 'xampp-control.exe'
	-select 'Start' next to the 'Apache' module
	-navigate to 'htdocs'
	-on line 84, replace:
		var stocks = new Stocks('XXXXXXXXXXXXXXXXX');
	with
		var stocks = new Stocks('YOUR API KEY HERE');
	-open 'index.html' in any text editor
	-open 'index.html' in any browser