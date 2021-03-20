import React from 'react';
import Header from '../Header/Header';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import bikeLogo from '../../images/Frame.png';
import carLogo from '../../images/Frame-1.png';
import busLogo from '../../images/Frame-2.png';
import trainLogo from '../../images/Group.png';
import rides from '../../FakeData/rides'
import Ride from '../Ride/Ride';
import ParticleBackground from '../ParticleBackground/ParticleBackground';


const Home = () => {



    return (
        <div>
            
            <div className="container">
            <h1 className="text-center mt-5">Please Select Your Ride</h1>
                <div className="row d-flex align-items-center justify-content-center mt-5">
                    {
                        rides.map(ride => <Ride key={ride.rideId} ride={ride}></Ride>)
                    }
                </div>
            </div>
            
        </div>
    );
};

export default Home;