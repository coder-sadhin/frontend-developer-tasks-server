const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

const flights = require('./data/flights.json')
const routes = require('./data/routes.json')

const offerFlight = flights[0].flightOffer;

app.get('/', (req, res) => {
    res.send("Server Is running")
    // res.send('flights api is running')
})

app.post('/flights', (req, res) => {
    const { from, to, date } = req.body;
    // console.log(from, to, date);
    const matched = offerFlight.filter(flight => flight.itineraries[0].segments[0].departure.iataCode === from &&
        flight.itineraries[0].segments[0].arrival.iataCode === to
        && flight.itineraries[0].segments[0].departure.at.includes(date) === true);
    // console.log(matched);
    // console.log("match hoyeche");
    if (matched.length > 0) {
        res.send(matched)
    }
    else {
        res.send([])
    }
})

app.get('/routes', (req, res) => {
    res.send(routes)
})

app.listen(port, () => {
    console.log('news server is running', port);
})