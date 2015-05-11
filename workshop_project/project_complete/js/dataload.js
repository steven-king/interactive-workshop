console.log("dataload.js loaded");
var countries = new Array();
var gdpArray = new Array();
var debtArray = new Array();

$(document).ready(function(){
            //makes anchors scroll rather than jump.
            $(document).plusAnchor();
            
            //set the url of your file...
           $.ajax({
                type: "GET",
                url: "data/country.xml",
                dataType: "xml",
                success: function(xml){
                    console.log("success");
                    loadData(xml);
                },
                error: function(){
                    console.log("error loading");
                }
            });
           
     


function loadData(xml){
    //parse the xml into variabls
    console.log("Success, loadData() called")

           $(xml).find('country').each(function(){
                //console.log("once for every person");
                var $country = $(this); 
                var name = $country.attr("name");
                countries.push($country.attr("name"));
                var text = $country.find('text').text();
                var gdp = $country.find('gdp').text();
                gdpArray.push(parseInt($country.find('gdp').text()));
                var debt = $country.find('debt').text();
                debtArray.push(parseInt($country.find('debt').text()));
                console.log(name);
                
                
                var countryHTML = '';
                countryHTML += '<a name=' + name + '/><h4>' + name + '</h4>';
                countryHTML += '<p>GDP: $' + gdp + ' |  Debt: ' + debt + '%</p>';
            
                countryHTML += '<p>' + text + '</p>'
                countryHTML += '<a href="#top">Back to top</a>'
               
                $('#countries').append($(countryHTML));
                writeCharts();
            });
           console.log(countries);
           console.log(debtArray);
    
          
}





function writeCharts() { 
    $('#chart1').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Eurozon Countries Debt precentage'
        },
        xAxis: {
            categories: countries
        },
        yAxis: {
            title: {
                text: '% of GDP '
            }
        },
        series: [{
            name: 'Countries',
            data: debtArray
        }]
    });
}
 });