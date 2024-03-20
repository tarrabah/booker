class Selector
{
    constructor(input_field_id, list_id)
    {
        this.input = document.getElementById(input_field_id);
        this.list = document.getElementById(list_id);
        this.selected_item = null;
    }

    on_input()
    {
        console.log('oninput');
        if (this.input.value == '')
        {
            this.selected_item = null;
            this.hide_list();
            return;
        }
        else
        {
            this.show_list();
        }

        console.log('filter objects');
        let up_input = this.input.value.toUpperCase();
        console.log(up_input);
        let elements = Array.prototype.slice.call(this.list.getElementsByTagName("p"));

        let counter = 10;
        for ( let i = 0; i < elements.length; i++)
        {
            let txtValue = elements[i].textContent || elements[i].innerText;

            if (txtValue.toUpperCase().indexOf(up_input) > -1 && counter > 0) // 10 or less elements can be shown
            {
                elements[i].style.display = "block";
                counter--;
            }
            else
            {
                elements[i].style.display = "none";
            }
            elements[i].style.backgroundColor = 'white';
        }

        for (let i = 0; i < elements.length; i++)
        {
            if (elements[i].style.display == "block")
            {
                this.selected_item = elements[i];
                this.selected_item.style.backgroundColor = 'var(--item-selected)';
                break;
            }
        }

    }

    show_list()
    {
        this.list.style.visibility = 'visible';
    }

    hide_list()
    {
        let elements = Array.prototype.slice.call( this.list.getElementsByTagName("p"));

        for (let i = 0; i < elements.length; i++) // clearing elements
        {
            elements[i].style.backgroundColor = 'white';
        }

        this.list.style.visibility = 'hidden';//hiding list
        this.selected_item = null;

    }

    list_arrows(event)
    {
        if (this.list.style.visibility == 'hidden' || this.list.style.visibility == '')
        {
            return;
        }

        let code = event.keyCode;

        switch (code)
        {
            case 38:
                event.preventDefault();
                this.arrow_up();
                break;
            case 40:
                event.preventDefault();
                this.arrow_down();
                break
            case 13:
            event.preventDefault();
                this.enter();
                break;
        }
    }

    arrow_up()
    {
        let elements = Array.prototype.slice.call(this.list.getElementsByTagName("p"));
        let base = -1;

        for (let i = 0; i <  elements.length; i++)
        {
            if (this.selected_item == elements[i])
            {
                base = i;
                this.selected_item.style.backgroundColor = 'white';
                break;
            }
        }
        console.log('base', base, elements.length)
        for (let i = 0; i < elements.length; i++)
        {
            let j = ((- i + base - 1) % elements.length + elements.length) % elements.length;
            if (elements[j].style.display != "none")
            {
                elements[j].style.backgroundColor = 'var(--item-selected)';
                this.selected_item = elements[j];
                break;
            }
        }

    }

    arrow_down()
    {
        let elements = Array.prototype.slice.call( this.list.getElementsByTagName("p"));
        let base = -1;

        for (let i = 0; i <  elements.length; i++)
        {
            if (this.selected_item == elements[i])
            {
                base = i;
                this.selected_item.style.backgroundColor = 'white';
                break;
            }
        }

        for (let i = 0; i < elements.length; i++)
        {
            let j = (i + base + 1) % elements.length;

            if (elements[j].style.display != "none")
            {
                elements[j].style.backgroundColor = 'var(--item-selected)';
                this.selected_item = elements[j];
                break;
            }
        }
    }

    enter(self)
    {
        let elements = Array.prototype.slice.call( this.list.getElementsByTagName("p"));
        if (this.selected_item != null)
        {
            let value = this.selected_item.innerText;
            this.selected_item = null;
            this.hide_list();
            this.input.value = value;
            console.log('to search', value)
            let latitude = cities[value].latitude;
            let longitude = cities[value].longitude;
            get(
                latitude,
                longitude,
                function(result) {
                    update(result)
                }
            )
        }
    }

    element_hover(elem)
    {
        console.log('hover');
        this.selected_item.style.backgroundColor = 'white';
        this.selected_item = elem;
        this.selected_item.style.backgroundColor = 'var(--item-selected)';
    }
}


var cities = {
    "Kuala Lumpur": {
        'latitude': 3.076204,
        'longitude': 101.649666
    },
    "Tokyo": {
        'latitude': 35.689487,
        'longitude': 139.691711
    },
    "Seoul": {
        'latitude': 37.566536,
        'longitude': 126.977966
    },
    "Bangokok": {
        'latitude': 13.753960,
        'longitude': 100.4935089
    },
    "Singapore": {
        'latitude': 1.2899175,
        'longitude': 103.8519072
    },
    "London": {
        'latitude': 51.5074456,
        'longitude': -0.1277653
    },
    "Amsterdam": {
        'latitude': 52.3730796,
        'longitude': 4.8924534
    },
    "Frankfurt Rhine-Main": {
        'latitude': 50.1106444,
        'longitude': 8.6820917
    },
    "Istanbul": {
        'latitude': 41.006381,
        'longitude': 28.9758715
    },
    "Paris": {
        'latitude': 48.8534951,
        'longitude': 2.3483915
    },
    "Munich": {
        'latitude': 48.1371079,
        'longitude': 11.5753822
    },
    "Madrid": {
        'latitude': 40.4167047,
        'longitude': -3.7035825
    },
    "Dubai": {
        'latitude': 25.2653471,
        'longitude': 55.2924914
    },
    "Doha": {
        'latitude': 25.2856329,
        'longitude': 51.5264162
    },
    "Pretoria": {
        'latitude': -25.7459277,
        'longitude': 28.1879101
    },
    "Riyad": {
        'latitude': 24.638916,
        'longitude': 46.7160104
    },
    "New York": {
        'latitude': 40.7127281,
        'longitude': -74.0060152
    },
    "Toronto": {
        'latitude': 43.6534817,
        'longitude': -79.3839347
    },
    "Chicago": {
        'latitude': 41.8755616,
        'longitude': -87.6244212
    },
    "Atlanta": {
        'latitude': 33.7489924,
        'longitude': -84.3902644
    },
    "Mexico": {
        'latitude': 19.4326296,
        'longitude': -99.1331785
    },
    "Bogotá": {
        'latitude': 4.6529539,
        'longitude': -74.0835643
    },
}

var weather_codes_to_img = {
    0 : 'day_clear.svg',
    1 : 'day_clear.svg',
    2 : 'day_partial_cloud.svg',
    3 : 'overcast.svg',
    45 : 'fog.svg',
    48 : 'fog.svg',
    51 : 'rain.svg',
    53 : 'rain.svg',
    55 : 'rain.svg',
    56 : 'sleet.svg',
    57 : 'sleet.svg',
    61 : 'rain.svg',
    63 : 'rain.svg',
    65 : 'rain.svg',
    66 : 'sleet.svg',
    67 : 'sleet.svg',
    71 : 'snow.svg',
    73 : 'snow.svg',
    75 : 'snow.svg',
    77 : 'snow.svg',
    80 : 'rain.svg',
    81 : 'rain.svg',
    82 : 'rain.svg',
    85 : 'snow.svg',
    86 : 'snow.svg',
    95 : 'thunder.svg',
    96 : 'thunder.svg',
    99 : 'thunder.svg',
};

var weather_codes_to_desc = {
    0 : 'Clear sky',
    1 : 'Mainly clear,',
    2 : 'Partly cloudy',
    3 : 'Overcast',
    45 : 'Fog',
    48 : 'Depositing rime fog',
    51 : 'Light drizzle',
    53 : 'Moderate drizzle',
    55 : 'Dense drizzle',
    56 : 'Light freezing drizzle',
    57 : 'Dense freezing drizzle',
    61 : 'Slight rain',
    63 : 'Moderate rain',
    65 : 'Heavy rain',
    66 : 'Light freezing rain',
    67 : 'Heavy freezing rain',
    71 : 'Slight snowfall',
    73 : 'Moderate snowfall',
    75 : 'Heavy snowfall',
    77 : 'Snow grains',
    80 : 'Slight rain shower',
    81 : 'Moderate rain shower',
    82 : 'Violent rain shower',
    85 : 'Slight snow shower',
    86 : 'Heavy snow shower',
    95 : 'Thunderstorm',
    96 : 'Thunderstorm with hail',
    99 : 'Thunderstorm with hail',
};

var select_city = new Selector('input', 'list');

for (let i in cities)
{
    console.log(i);
    select_city.list.insertAdjacentHTML(
        'beforeend',
        `<p class='list_item' id='${i.toUpperCase()}' class="pseudo_paragraph" onclick="select_city.enter()" onmouseenter='select_city.element_hover(this)'>${i}</p>`
    );
}

var params =  [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    "precipitation_probability_max"
];

function get(latitude, longitude, callback)
{
    $.ajax(
        {
            method: "GET",
            url: "https://api.open-meteo.com/v1/forecast",
            data: {
                'latitude': latitude,
                'longitude': longitude,
                "daily": params,
                "models": "best_match"
            }
        }
    ).done(
        function (result)
        {
            callback(result)
        }
    )
}

function update(r)
{
    console.log('update', r);
    for (let i in r.daily.time)
    {
        console.log(r.daily.time[i])

        for (let j of params)
        {
            if (j == 'weather_code')
            {
                document.getElementById(`tile_${i}_${j}`).style.background = `url("/static/img/SVG/${weather_codes_to_img[r.daily[j][i]]}")`;
                document.getElementById(`tile_${i}_weather_desc`).textContent = weather_codes_to_desc[r.daily[j][i]];
            }
            else
            {

                document.getElementById(`tile_${i}_${j}`).textContent = r.daily[j][i] + ' ' + r.daily_units[j];
            }
        }
        let date = new Date(r.daily.time[i]);
        let month = date.toLocaleString('default', { month: 'long' });
        let day = date.toLocaleString('default', { day: 'numeric' });
        let weekday = date.toLocaleString('default', { weekday: 'long' });
        document.getElementById(`tile_${i}_weekday`).textContent = `${weekday}`;
        document.getElementById(`tile_${i}_rest`).textContent = `${month} ${day}`;
    }
    document.getElementById('tile_container').style.display = 'block';
}