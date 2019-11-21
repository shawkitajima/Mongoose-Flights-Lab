const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', {flights, title: 'Flights'})
    }).sort('+departs');
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'New Flight'})
}

function create(req, res) {
    req.body.flightNo = parseInt(req.body.flightNo);
    let flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.render('flights/new');
        console.log(flight);
        res.redirect('/flights');
    })
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', {flight, tickets, title: 'Details'});
        })
    });
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id, function(err) {
        Ticket.remove({flight: req.params.id}, function(err) {
            res.redirect('/flights');
        });
    });
}