var name_regex = /^[A-Z][a-zA-Z \'&-]*[A-Za-z]$/;
var passport_regex = /^[0-9\s]*$/;
var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

var continue_button = document.getElementById('passenger_data_confirm');

var tab_indexes = [0, 1, 2];
var adult_count = 0;
var child_count = 0;
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

var passengers = new Map();
var choose_seat_tooltips = document.getElementById("tooltip_choose_seat_container").getElementsByTagName('div');
console.log(choose_seat_tooltips);

for (item of choose_seat_tooltips)
{
    let text = item.innerText || textContent;
    console.log(typeof text)
    if (text != 'Contact information for all passengers')
    {
        passengers.set(item.innerText, null);
    }
    if (text.includes('adult'))
    {
        adult_count++;
    }
    if (text.includes('child'))
    {
        child_count++;
    }
}
console.log(passengers, adult_count, child_count);

var current_passenger = 0;
choose_seat_tooltips[0].style.display = 'block';

function showTab(index)
{
    let tab;
    for (i of tab_indexes)
    {
        tab = document.getElementById(`tab_${i}`);
        tab.style.visibility = 'visible';
        tab.style.display = 'none';
    }

    tab = document.getElementById(`tab_${index}`);
    tab.style.visibility = 'visible';
    tab.style.display = 'block';

}

function check_email_input(self)
{
    let email = self.value;
    let tooltip = document.getElementById("email_tooltip");
    if (email == '')
    {
        tooltip.innerText = "Please, complete this field!";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else if (!email_regex.test(email))
    {
        tooltip.innerText = "Please, provide valid email!";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else
    {
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
        self.setAttribute('data-valid', 'true');
    }
    validate_all_forms();
    check_email_confirm_input(document.getElementById('email_confirm'), 'email')
}

function check_email_confirm_input(self, first_field_id)
{
    let first_field = document.getElementById(first_field_id);
    let email = self.value;
    let tooltip = document.getElementById("email_confirm_tooltip");
    if (email == '')
    {
        tooltip.innerText = "Please, complete this field!";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else if (!email_regex.test(email))
    {
        tooltip.innerText = "Please, provide valid email!";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else if (first_field.getAttribute('data-valid') == 'true' && email == first_field.value)
    {
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
        self.setAttribute('data-valid', 'true');
        console.log('emails match');
        document.getElementById('email_checkout').innerText=first_field.value;
    }
    else
    {
        tooltip.innerText = "Emails does not match";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    validate_all_forms();
}

function check_phone_input(self)
{
    let value = self.value;
    console.log(self, value, value=='');
    let tooltip = document.getElementById('phone_tooltip');
    if (value == '')
    {
        tooltip.innerText = "Please, complete this field!";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else if (!phone_regex.test(value))
    {
        tooltip.innerText = "Please, provide valid phone number";
        tooltip.style.visibility = 'visible';
        self.setAttribute('data-valid', 'false');
    }
    else
    {
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
        self.setAttribute('data-valid', 'true');
        document.getElementById('phone_checkout').innerText=value;
    }
}

function check_input(self, tooltip_id, input_type, passenger_id)
{
    let value = self.value;
    console.log(self, value, value=='');
    let tooltip = document.getElementById(tooltip_id);

    switch (input_type)
    {
        case "first_name":
            if (value === '')
            {
                tooltip.innerText = "Please, complete this field!";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else if (!name_regex.test(value))
            {
                tooltip.innerText = "First name must start with Capital letter and contain only [A-Z] [a-z] ['-&]";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else
            {
                tooltip.style.visibility = 'hidden';
                tooltip.innerText = '';
                self.setAttribute('data-valid', 'true');
                document.getElementById(`${passenger_id}_first_name`).innerText = self.value;
            }
            break;
        case "last_name":
            if (value == '')
            {
                tooltip.innerText = "Please, complete this field!";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else if (!name_regex.test(value))
            {
                tooltip.innerText = "Last name must start with Capital letter and contain only [A-Z] [a-z] ['-&]";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else
            {
                tooltip.style.visibility = 'hidden';
                tooltip.innerText = '';
                self.setAttribute('data-valid', 'true');
                document.getElementById(`${passenger_id}_last_name`).innerText = self.value;
            }
            break;
        case "passport_number":
            if (value == '')
            {
                tooltip.innerText = "Please, complete this field!";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else if (!passport_regex.test(value))
            {
                tooltip.innerText = "Passport number must contain only Numbers and Spaces";
                tooltip.style.visibility = 'visible';
                self.setAttribute('data-valid', 'false');
            }
            else
            {
                tooltip.style.visibility = 'hidden';
                tooltip.innerText = '';
                self.setAttribute('data-valid', 'true');
                document.getElementById(`${passenger_id}_passport_number`).innerText = self.value;
            }
            break;
    }
    validate_all_forms();
}

function form_validate(form)
{
    let inputs = form.getElementsByTagName('input');
    let res = true;
    for (let item of inputs)
    {
        if (item.getAttribute('data-valid') == 'false')
        {
            res = false;
            break
        }
    }
    return res;
}

function validate_all_forms()
{
    let res = true;
    let validation_res;
    let form_collection = document.getElementById('tab_0').getElementsByClassName('info_to_gather');
    for (let item of form_collection)
    {
        validation_res = form_validate(item);
        console.log('common checking function');
        console.log(item.id,validation_res )
        if (!validation_res)
        {
           res = false;
           break;
        }
    }

    let tooltip_all_valid = document.getElementById('all_valid');
    console.log(tooltip_all_valid);
    if (res)
    {
        console.log('All valid')
        tooltip_all_valid.style.visibility = 'hidden';
        tooltip_all_valid.innerText = '';
        continue_button.setAttribute('data-valid', 'true');
    }
    else
    {
        console.log('Not valid')
        tooltip_all_valid.style.visibility = 'visible';
        continue_button.setAttribute('data-valid', 'false');
    }
}

function continue_1(self)
{
    console.log('continue()', self.getAttribute('data-valid'))
    if (self.getAttribute('data-valid') == 'true')
    {
        showTab(1);
    }

}

function continue_2(self)
{
    console.log('continue()', self.getAttribute('data-valid'))
    if (self.getAttribute('data-valid') == 'true')
    {
        showTab(2);
    }

}

function select_seat(self, number)
{
    console.log('select_seat', self, self.getAttribute('data-passenger'), number, current_passenger, choose_seat_tooltips.length);
    if (self.getAttribute('data-passenger') == '' && current_passenger != choose_seat_tooltips.length)
    {

        if (current_passenger < adult_count)
        {
            console.log(`adult_${current_passenger}_seat-number`);
            document.getElementById(`passenger_${current_passenger}_seat_number`).innerText = self.innerText;
        }
        else
        {
            console.log(`child_${current_passenger }_seat_number`);
            document.getElementById(`passenger_${current_passenger}_seat_number`).innerText = self.innerText;
        }
        self.setAttribute('data-passenger', current_passenger);
        self.classList.add("selected");
        passengers.set(choose_seat_tooltips[current_passenger].innerText, self);
        console.log(passengers);
        inc_passenger();
    }
}

function inc_passenger()
{
    if (current_passenger == choose_seat_tooltips.length - 1)
    {
        current_passenger++;
        console.log('all selected');

        document.getElementById('seat_data_confirm').setAttribute('data-valid', 'true');
        document.getElementById('seats_valid').style.display = 'none';
        document.getElementById('choose_seat_label').innerText = 'All selected!';

        for (item of choose_seat_tooltips)
        {
            item.style.display = 'none';
        }
    }
    else
    {
        current_passenger++;
        for (item of choose_seat_tooltips)
        {
            item.style.display = 'none';
        }
        choose_seat_tooltips[current_passenger].style.display = 'block';
    }
}

function dec_passenger()
{
    if (current_passenger > 0)
    {
        document.getElementById('seat_data_confirm').setAttribute('data-valid', 'false');
        document.getElementById('seats_valid').style.display = 'block';
        current_passenger--;
        passengers.get(choose_seat_tooltips[current_passenger].innerText).setAttribute('data-passenger', '');
        passengers.get(choose_seat_tooltips[current_passenger].innerText).classList.remove('selected');
        document.getElementById('choose_seat_label').innerText = 'Choose seat for:';
        for (item of choose_seat_tooltips)
        {
            item.style.display = 'none';
        }
        choose_seat_tooltips[current_passenger].style.display = 'block';
    }
}
