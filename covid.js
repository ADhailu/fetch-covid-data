
var ar1 = []
var count77 = document.getElementById('continent')

var num1 = 0
let num2 = 0
let num3 = 0
let num4 = 0
let num5 = 0
let num6 = 0
let num7 = 0

var mydata2 = 0;

window.addEventListener('load', global)
var mydata = 0;
async function global(x) {

    if(typeof x === 'string' && x !== ''){
        mydata = await fetch(`https://corona.lmao.ninja/v2/countries/${x}`)
        .then(res => res.json())
         //console.log(mydata.countryInfo)
        // count77.innerHTML = `${mydata.countryInfo.iso3} ` +`<img src="${mydata.countryInfo.flag}" width="20px">` + ' is in ' + mydata.continent
        // ztable(mydata)
    }

    else{
        mydata = await fetch(`https://corona.lmao.ninja/v2/all?yesterday=`)
    .then(res => res.json()) 

    mydata2 = await fetch(`https://corona.lmao.ninja/v2/countries?yesterday=&sort=`)
    .then(res => res.json())
    first_map(mydata2)
    ztable(mydata2)
    }
    //console.log(mydata)
 
        count1 = new CountUp('confirmed_num', 0, mydata.cases)
        count1.start();
        count2 = new CountUp('active_case', 0, mydata.active)
        count2.start();
        count3 = new CountUp('death', 0, mydata.deaths)
        count3.start();
        count4 = new CountUp('critical', 0, mydata.critical)
        count4.start();
        count5 = new CountUp('total_rec', 0, mydata.recovered)
        count5.start();


        pie(count1.endVal,count2.endVal,count3.endVal,count4.endVal,count5.endVal)
}


                    var country_list = document.getElementById('thelist')
                    function country() {
                        fetch(`https://corona.lmao.ninja/v2/countries?yesterday=&sort=`)
                            .then(res => res.json())
                            .then(data => {
                                //console.log(data)

                                for (var i = 0; i < data.length; i++) {
                                    //console.log(data[i].countryInfo.flag)

                                    var new_option = document.createElement('option');
                                    new_option.value = data[i].country 
                                    new_option.text = data[i].country
                                    country_list.appendChild(new_option)

                                }

                            })
                    }
                    country();


                    function update() {
                        var option = country_list.options[country_list.selectedIndex].text;
                        //console.log(option) 
                        global(option)
                    // changepie(option) 
                    }
                    update()



                    var t1 = document.getElementById('row1')
                    async function ztable(zzz) {
                    
                        if(Array.isArray(zzz)){
                        
                            t1.innerHTML = zzz.map(xy => {  
                                //console.log(xy) 
                                    return ` <tr >
                                            <td style="background-color: rgb(213, 213, 213);">${xy.country}</td>
                                            <td id="t1" style="color: #b54029;">${xy.cases}</td>
                                            <td id="t2" style="color: #458dc4;">${xy.active}</td>
                                            <td id="t3" style="color: rgb(125, 125, 125);">${xy.deaths}</td>
                                            <td id="t4" style="color: rgb(235, 167, 30)">${xy.critical}</td>
                                            <td id="t5" style="color: #408f69;">${xy.recovered}</td>
                                            <td id="t6" style="color: rgba(107, 107, 107, 1);">${xy.tests}</td>
                                            <td id="t7" style="color: #408f69;">${xy.population}</td>
                                        </tr> 
                                        `
                                }).join('')        
                        }
                        else{
                        // console.log(zzz)
                            t1.innerHTML = ` <tr >
                                            <td style="background-color: rgb(213, 213, 213);">${zzz.country}</td>
                                            <td id="t1" style="color: #b54029;">${zzz.cases}</td>
                                            <td id="t2" style="color: #458dc4;">${zzz.active}</td>
                                            <td id="t3" style="color: rgb(125, 125, 125);">${zzz.deaths}</td>
                                            <td id="t4" style="color: rgb(235, 167, 30);">${zzz.critical}</td>
                                            <td id="t5" style="color: #408f69;">${zzz.recovered}</td>
                                            <td id="t6" style="color: rgba(107, 107, 107, 1);">${zzz.tests}</td>
                                            <td id="t7" style="color: #408f69;">${zzz.population}</td>
                                        </tr> 
                                        `     
                        }
                    }


                    async function first_map(info){
                    //  console.log(info)
                        const topology = await fetch(
                            'https://code.highcharts.com/mapdata/custom/world.topo.json'
                        ).then(response => response.json());
                        //console.log(info);
                        Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json',
                            function (data) {

                                // Prevent logarithmic errors in color calulcation
                                data.forEach(function (p) {
                                    let key =0;
                                info.forEach(names =>{
                                if(p.code === names.countryInfo.iso2){
                                    p.value = names.cases < 1 ? 1: names.cases;
                                    key = 1;
                                }
                                })
                                if(key = 0){
                                    p.value = ('No value is found'< 1 ? 1 : 'No value is found');
                                }
                                });


                                // Initialize the chart
                                Highcharts.mapChart('map1', {
                                    chart: {
                                        map: topology
                                    },

                                    title: {
                                        text: 'confirmed-case ONLY!'
                                    },

                                    mapNavigation: {
                                        enabled: true,
                                        enableDoubleClickZoomTo: true,
                                        buttonOptions: {
                                            verticalAlign: 'bottom'
                                        }
                                    },

                                    mapView: {
                                        fitToGeometry: {
                                            type: 'MultiPoint',
                                            coordinates: [
                                                // Alaska west
                                                [-164, 54],
                                                // Greenland north
                                                [-35, 84],
                                                // New Zealand east
                                                [179, -38],
                                                // Chile south
                                                [-68, -55]
                                            ]
                                        }
                                    },

                                    colorAxis: {
                                        min: 1,
                                        max: 1000,
                                        type: 'logarithmic'
                                    },

                                    series: [{
                                        data: data,
                                        joinBy: ['iso-a3', 'code3'],
                                        name: 'confirmed-cases',
                                        states: {
                                            hover: {
                                                color: '#a4edba'
                                            }
                                        },
                                        tooltip: {
                                            valueSuffix: ''
                                        }
                                    }]
                                });
                            });

                    };


                    function pie(num1,num2,num3,num4,num5){ 
                        //console.log(num1)
                        Highcharts.chart('map2', {
                            chart: {
                                type: 'variablepie'
                            },
                            title: {
                                text: 'Overall Active Cases vs Recovered vs Deaths',
                                align: 'center'
                            },
                            tooltip: {
                                headerFormat: '',
                                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
                                    'people: <b>{point.y}</b><br/>'
                            },
                            series: [{
                                minPointSize: 10,
                                innerSize: '20%',
                                zMin: 0,
                                name: 'countries',
                                data: [{
                                    name: 'Confirmed',
                                    y: num1,
                                    z: 92
                                }, {
                                    name: 'Active',
                                    y: num2,
                                    z: 92
                                }, {
                                    name: 'Death',
                                    y: num3,
                                    z: 92
                                }, {
                                    name: 'Critical',
                                    y: num4,
                                    z: 119
                                },
                                {
                                    name: 'Recoverd',
                                    y: num5,
                                    z: 119
                                }]
                            }]
                        });
                        }
     
                        
    
                      
