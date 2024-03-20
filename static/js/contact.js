var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var name_regex = /^[A-Z][a-zA-Z \'&-]*[A-Za-z]$/;

function submit()
{
    let tooltip = document.getElementById('submit_tooltip');
    console.log('submit!');
    if (check_name('first') && check_name('last') && check_email() && check_reason())
    {
        tooltip.innerText = 'Submission successful!';
        let first_name = document.getElementById('input_first_name');
        first_name.value = '';

        check_input(first_name, 'first_name_tooltip');
        let last_name = document.getElementById('input_last_name');
        last_name.value = '';

        check_input(last_name, 'last_name_tooltip');

        let email = document.getElementById('email');
        email.value = '';
        check_email_input();

        document.getElementById('comment').value = '';
        return;
    }
    tooltip.innerText = 'Submission failed';
}

function check_name(type)
{
    let name = document.getElementById(`input_${type}_name`).value;

    if (name === '')
    {
        return false;
    }
    else if (!name_regex.test(name))
    {
        return false;
    }
    else
    {
        return true;
    }
}

function check_email_input()
{
    let email = document.getElementById("email").value;
    let email_tooltip = document.getElementById("email_tooltip");

    if (email == '')
    {
        email_tooltip.innerText = 'Please, fill this field!'
    }
    else if (!regex.test(email))
    {
        email_tooltip.innerText = 'Please, provide valid email!';
    }
    else
    {
        email_tooltip.innerText = '';
    }
}

function check_reason_tooltip()
{
    let value = document.getElementById('reason').value;
    let tooltip = document.getElementById('reason_tooltip');

    if (value === '')
    {
        tooltip.innerText = "Please, complete this field!";
    }
    else
    {
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
    }
}

function check_input(checked_field, tooltip_id)
{
    let value = checked_field.value;
    let tooltip = document.getElementById(tooltip_id);

    if (value === '')
    {
        tooltip.innerText = "Please, complete this field!";
        tooltip.style.visibility = 'visible';
    }
    else if (!name_regex.test(value))
    {
        tooltip.innerText = "First name must start with Capital letter and contain only [A-Z] [a-z] ['-&]";
        tooltip.style.visibility = 'visible';
    }
    else
    {
        tooltip.style.visibility = 'hidden';
        tooltip.innerText = '';
    }
}

function check_email()
{
    let email = document.getElementById("email").value;
    if ((email == '') || (!regex.test(email)))
    {
        return false;
    }
    else
    {
        return true;
    }
}

function check_reason()
{
    let  value = document.getElementById("reason").value;
    if (value == '')
    {
        return false;
    }
    else
    {
        return true;
    }
}