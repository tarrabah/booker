from flask import Flask, render_template, request, jsonify
from datetime import datetime
import json
app = Flask(__name__)

f = open('json_data/flights.json')
flight_list = json.load(f)
f.close()

f = open('json_data/airports.json')
airport_list = json.load(f)
f.close()


@app.route('/')
def main_page():
    return render_template('main.html')

@app.route('/contact')
def contact_page():
    return render_template('contact.html')


@app.route('/about')
def about_page():
    return render_template('about_us.html')

@app.route('/flight')
def flight_page():
    return render_template('choose_flight.html', today=datetime.now().strftime("%Y-%m-%d"))

@app.route('/flight_form', methods=['GET','POST'])
def flight_form():
    if request.method == 'GET':
        print(request)
        adult_count = request.args.get('adult')
        children_count = request.args.get('child')
        total_cost = request.args.get('total_cost')
        flight_type = request.args.get('flight_type')
        date_in = request.args.get('date_in')
        date_out = request.args.get('date_out')
        time_1 = request.args.get('time_1')
        time_2 = request.args.get('time_2')
        duration = request.args.get('duration')
        ticket_cost = request.args.get('ticket_cost')
        airport_1 = request.args.get('airport_1')
        airport_2 = request.args.get('airport_2')
        print('params')
        print('adult_count', adult_count)
        print('children_count', children_count)
        print('cost', total_cost)
        print('flight_type', flight_type)
        print('date_in', date_in)
        print('date_out', date_out)
        print('time_1', time_1)
        print('time_2', time_2)
        print('duration', duration)

        return render_template(
            'book_page.html',
            adult_count=int(adult_count),
            child_count=int(children_count),
            cost=int(total_cost),
            flight_type=flight_type,
            date_in=date_in,
            date_out=date_out,
            time_1=time_1,
            time_2=time_2,
            duration=duration,
            ticket_cost=int(ticket_cost),
            airport_1=airport_1,
            airport_2=airport_2
        )

@app.route('/submit_flight_form', methods=['POST'])
def submit_flight_form():
    if request.method == 'POST':
        email = request.form.get('email_1')
        return render_template('checkout.html', email=email)

@app.route('/flights')
def flights_list():
    return jsonify(
        {
            'flights': flight_list,
            'airports': airport_list
        }
    )

@app.route('/weather')
def weather():
    return render_template('weather.html')

@app.route('/madrid')
def madrid():
    return render_template('madrid.html')

@app.route('/london')
def london():
    return render_template('london.html')

if __name__ == "__main__":
    app.run(host='localhost', port = 5001)



