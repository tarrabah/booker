function no_flight_found()
{
    return "<div class='flex_row flight_desc'>No flights found. Please try to alter search parameters</div>";
}

function flight_desc(date_1, date_2, time_1, time_2, departure_point, destination_point, duration, ticket_cost, total_cost, airport_1, airport_2)
{
    let return_block = '';
    if (flight_type == 'round')
    {
        return_block = `<div class='inside_details'><b>Return</b></div>
            <div class='inside_details'>○ ${date_2} ${time_1} ${airport_1}</div>
            <div class='inside_details_i flex_row'><div class='cooldots'>∘∘∘∘</div><i>Travel Time: ${duration}</i></div>
            <div class='inside_details'>○ ${date_2} ${time_2} ${airport_2}</div>`;
    }
    return `<div class='flex_row flight_desc'>
        <details>
            <summary class="flex_row flight_details">
                    <div>
                        <p class='flight_details_regular'>Time: <b>${time_1} — ${time_2}</b></p>
                    </div>
                    <div class='airport_duration'>
                        <p class='duration'>Duration: ${duration}</p>
                        <p class='airport_codes'>${departure_point}—${destination_point}</p>
                    </div>
                    <p class='flight_details_regular'>Nonstop</b></p>
                    <p class='flight_details_regular'>Cost: <b>USD ${total_cost}</b></p>
            </summary>
            <div class='common_content_container flex_column'>
                <div class='inside_details'><b>Departure</b></div>
                <div class='inside_details'>○ ${date_1} ${time_1} ${airport_1}</div>
                <div class='inside_details_i flex_row'><div class='cooldots'>∘∘∘∘</div><i>Travel Time: ${duration}</i></div>
                <div class='inside_details'>○ ${date_1} ${time_2} ${airport_2}</div>
                ${return_block}
                <div class='inside_details'>
                    <form action="/flight_form" method="GET" onsubmit='submit_form(event, this)'>
                        <input type='hidden' name='total_cost' value='${total_cost}'>
                        <input type='hidden' name='time_1' value='${time_1}'>
                        <input type='hidden' name='time_2' value='${time_2}'>
                        <input type='hidden' name='duration' value='${duration}'>
                        <input type='hidden' name='airport_1' value='${airport_1}'>
                        <input type='hidden' name='airport_2' value='${airport_2}'>
                        <input type='hidden' name='ticket_cost' value='${ticket_cost}'>
                        <button class='submit_flight' type="submit">Select ➞</button>
                    </form>
                </div>
            </div>

        </details>
    </div>`;
}