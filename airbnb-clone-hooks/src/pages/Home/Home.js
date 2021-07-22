import React, { Component } from 'react';
import './Home.css';
import SearchBox from './SearchBox';
import Spinner from '../../utility/Spinner/Spinner';
import axios from 'axios';
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Activities';
// import Venues from '../../utility/Venue/Venues';

class Home extends Component {

    state = {
        cities: [],
        europeCities: {},
        asiaCities: {},
        exoticCities: {},
        activities: [],
        recVenues: {}
    }

    async componentDidMount() { //Reminder: componentDidMount is called after the page renders for the first time
        // we created window.apiHost in index.html. It's where we store the url of the api
        const citiesUrl = `${window.apiHost}/cities/recommended`;
        const europeCitiesUrl = `${window.apiHost}/cities/europe`;
        const asiaCitiesUrl = `${window.apiHost}/cities/asia`;
        const exoticCitiesUrl = `${window.apiHost}/cities/exotic`;

        const citiesPromises = [];

        // //axios.get() returns a promise
        citiesPromises.push(axios.get(citiesUrl));
        citiesPromises.push(axios.get(europeCitiesUrl));
        citiesPromises.push(axios.get(asiaCitiesUrl));
        citiesPromises.push(axios.get(exoticCitiesUrl));

        // One has to pass an array of promises (or iterable of promises) to Promise.all()
        // In Promise.all(), all the promises run independently, but all of them have to finish successfully to run the callback inside "then"
        Promise.all(citiesPromises).then((data) => { // regardless of when the promises finish, javascript will preserve the order they are in
            const recommendedCities = data[0].data; //array 
            const europeCities = data[1].data; //object
            const asiaCities = data[2].data; //object
            const exoticCities = data[3].data; //object

            this.setState({
                cities: recommendedCities,
                europeCities,
                asiaCities,
                exoticCities,
            });
        })

        const activitiesUrl = `${window.apiHost}/activities/today`;
        const activities = await axios(activitiesUrl);
        this.setState({
            activities: activities.data,
        });

        // const recVenuesUrl = `${window.apiHost}/venues/recommended`;
        // const venues = await axios(recVenuesUrl);
        // this.setState({
        //     recVenues: venues.data,
        // })

    }

    render() { //Reminder: the page will re-render after the state is changed
        // console.log("this.state.activities: ", this.state.activities);
        // in the developer tools, under network, there's the option to set "throttling" to slow 3G, that way the website
        // simulates slow connection, and it's possible to see what happens between render() and componentDidMount for example
        // console.log("this.state.activities in home.js (render()): ", this.state.activities); //gets logged twice, once with the initial state (empty) and after componentDidMount updates de state
        // if ((this.state.cities.length === 0) || (!this.state.recVenues.venues)) {
        if ((this.state.cities.length === 0)) {
            return (<Spinner />)
        }
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="home col s12"> {/*col s12: takes 12 columns from 12 columns (materializecss) */}
                            <div className="upper-fold">
                                <SearchBox history={this.props.history} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid lower-fold">
                    <div className="row">
                        <div className="col s12">
                            <Cities cities={this.state.cities} header="Recommended Cities For You" />
                        </div>

                        <div className="col s12">
                            <Activities activities={this.state.activities} header="Today in your area" />
                        </div>

                        <div className="col s12">
                            <Cities cities={this.state.europeCities.cities} header={this.state.europeCities.header} />
                        </div>

                        {/* <div className="col s12">
                            <Venues venues={this.state.recVenues.venues} header={this.state.recVenues.header} />
                        </div> */}

                        <div className="col s12">
                            <Cities cities={this.state.asiaCities.cities} header={this.state.asiaCities.header} />
                        </div>

                        <div className="col s12">
                            <Cities cities={this.state.exoticCities.cities} header={this.state.exoticCities.header} />
                        </div>



                    </div>
                </div>
            </>
        )
    }
}

export default Home;