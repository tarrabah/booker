class Selector
{
    constructor(input_field_id, list_id, tooltip_id)
    {
        this.input = document.getElementById(input_field_id);
        this.list = document.getElementById(list_id);
        this.tooltip = document.getElementById(tooltip_id);
        this.list_elements;
        this.point = null;
        this.selected_item = null;
    }

    on_input()
    {
        console.log('oninput');
        if (this.input.value == '')
        {
            this.selected_item = null;
            this.point = null;
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

    enter()
    {
        let elements = Array.prototype.slice.call( this.list.getElementsByTagName("p"));
        if (this.selected_item != null)
        {
            let value = this.selected_item.innerText;

            this.point = this.selected_item.getAttribute('data-code');
            console.log('point is set to', this.point);
            this.tooltip.style.visibility = 'hidden';
            this.selected_item = null;
            this.hide_list();
            this.input.value = value;
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

var departure_points = []; // type 2 / Departure
var destination_points = []; // type 1 / Arrival
var flight_data;
var airports;

var select_from = new Selector('input_from', 'from_list', 'tip_from');
var select_to = new Selector('input_to', 'to_list', 'tip_to');

var adult_count = 1;
var child_count = 0;
var date_in = null;
var date_out = null;


var flight_type = 'round';

$.ajax(
    {
        method: "GET",
        url: "/flights",
    }
).done(
    function(result)
    {
        airports = new Map(Object.entries(result.airports));
        flight_data = result.flights;
        console.log('airpots', airports)
        for (let [key, value] of airports)
        {
            departure_points.push([value.city, value.code]);
            destination_points.push([value.city, value.code]);
        }
        console.log('it continues');
        departure_points.sort();
        destination_points.sort();
        prepare_data();
    }

);


function prepare_data()
{
    selected_item_id = null;

    for (let i of departure_points)
    {
        select_from.list.insertAdjacentHTML(
            'beforeend',
            `<p class='list_item' data-code='${i[1]}' data-city='${i[0]}' id='dep_${i[1].toUpperCase()}' class="pseudo_paragraph" onclick="select_from.enter()" onmouseenter='select_from.element_hover(this)'>${i[0] + ", " + i[1]}</p>`
        );
    }

    for (let i of destination_points)
    {
        select_to.list.insertAdjacentHTML(
            'beforeend',
            `<p class='list_item' data-code='${i[1]}' data-city='${i[0]}' id='des_${i[1].toUpperCase()}'class="pseudo_paragraph" onclick="select_to.enter()" onmouseenter='select_to.element_hover(this)'>${i[0] + ", " + i[1]}</p>`
        );
    }
}

function confirm_data()
{

    let departure_point = select_from.point;
    let destination_point = select_to.point;
    let flights = [];
    console.log('confirm_data()');

    console.log('departure_point', departure_point);
    let flag = true;
    if (departure_point == null)
    {
        document.getElementById('tip_from').style.visibility = 'visible';
        flag = false;
    }
    console.log('destination_point', destination_point);
    if (destination_point == null)
    {
        document.getElementById('tip_to').style.visibility = 'visible';
        flag = false;
    }
    console.log('date_in', date_in);
    if (date_in == null)
    {
        document.getElementById('tip_arrival').style.visibility = 'visible';
        flag = false;
    }
    console.log('date_out', date_out);
    if (date_out == null && flight_type == 'round')
    {
        document.getElementById('tip_return').style.visibility = 'visible';
        flag = false;
    }
    if (!flag)
    {
        console.log('full stop');
        return;
    }

    console.log('start_search');

    console.log('departure point', departure_point);
    console.log('destination point', destination_point)
    let flight_class = document.getElementById('flight_class').value;
    console.log('class', flight_class)

    for (let value of flight_data)
    {
        let dep = value.departure_point;
        let des = value.destination_point;
        console.log(dep, departure_point, des, destination_point)
        if (((dep == departure_point && des == destination_point) || (dep == destination_point && des == departure_point)) && value.class == flight_class)
        {
            console.log('!', value);
            flights.push(value);
        }
    }
    console.log(flights);

    let container = document.getElementById('flights_result');
    if (flights.length == 0)
    {
        container.innerHTML = no_flight_found();
    }
    else
    {
        let res = '';
        for (let i in flights)
        {
            let date_1 = new Date(flights[i].departure_time);
            let date_2 = new Date(flights[i].arrival_time);
            let time_1 = date_1.getHours().toString().padStart(2, '0') + ':' + date_1.getMinutes().toString().padStart(2, '0');
            let time_2 = date_2.getHours().toString().padStart(2, '0') + ':' + date_2.getMinutes().toString().padStart(2, '0');
            let airport_1 = airports.get(departure_point).name;
            let airport_2 = airports.get(destination_point).name;
            let cost = flights[i].cost_usd;
            let total_cost = adult_count * cost + child_count * cost * 0.5;
            if (flight_type == 'round')
            {
                total_cost *= 2;
            }
            let duration = flights[i].duration;

            res += flight_desc(date_in, date_out, time_1, time_2, departure_point, destination_point, duration, cost, total_cost, airport_1, airport_2);
        }
        container.innerHTML = res;
    }
}

function submit_form(event, self)
{
    event.preventDefault();
    console.log('.....');

    let params = {
        'adult': adult_count,
        'child': child_count,
        'flight_type': flight_type,
        'date_in': date_in,
        'date_out': date_out
    };

    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            let hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            self.appendChild(hiddenField);
        }
    }
    self.submit();
}

function check_flight_type(self)
{
    if (self.value == 'oneway')
    {
        flight_type = 'oneway';
        document.getElementById('tip_return').style.visibility = 'hidden';
        document.getElementById('date_out').style.display = 'none';
    }
    else if (self.value == 'round')
    {
        flight_type = 'round';
        document.getElementById('date_out').style.display = 'block';
    }
}

function departure_date(self)
{
    if (self.value == '')
    {
        self.type='text';
        date_in = null;
        document.getElementById('date_out').type = 'date';
    }
    else
    {
        document.getElementById('date_out').min = self.value;
        if (document.getElementById('date_out').value < document.getElementById('date_in').value)
        {
            let day = new Date(self.value);
            let nextDay = new Date(day);
            nextDay.setDate(day.getDate() + 1);

            document.getElementById('date_out').value = nextDay.toISOString().slice(0,10);
            return_date(document.getElementById('date_out'));
        }
        document.getElementById('date_out').type = 'date';
        document.getElementById('tip_arrival').style.visibility = 'hidden';
        date_in  = self.value;
    }
    this.blur();
}

function return_date(self)
{
    if (this.value == '')
    {
        this.type='text'
    }
    else
    {
        date_out = self.value;
        document.getElementById('tip_return').style.visibility = 'hidden';
    }
    this.blur();
}

function passengers_dropdown()
{
    document.getElementById('dropdown-content').style.display = 'block';
}

function decrementPassenger(category)
{
    let countInput = document.getElementById(category + '-count');
    let currentValue = parseInt(countInput.innerText);
    switch (category)
    {
        case 'adult':
            if (adult_count > 1)
            {
                adult_count--;
                countInput.innerText = adult_count;
            }
            break;
        case 'child':
            if (child_count > 0)
            {
                child_count--;
                countInput.innerText = child_count;
            }
            break;
    }
    updateTotalPassengers();
}

function incrementPassenger(category)
{
    if (total_passengers() > 8)
    {
        return;
    }

    let countInput = document.getElementById(category + '-count');

    switch (category)
    {
        case 'adult':
            adult_count++;
            countInput.innerText = adult_count;
            break;
        case 'child':
            child_count++;
            countInput.innerText = child_count;
            break;
    }
    updateTotalPassengers();
}

function total_passengers()
{
    return adult_count + child_count;
}

function updateTotalPassengers() {
    document.getElementById('passenger_count_display').textContent = total_passengers();
}

function hide_passengers()
{
    let openDropdown = document.getElementById("dropdown-content").style.display = 'none';
}
