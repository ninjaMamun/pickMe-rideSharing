import React, { useState } from 'react';
import './SearchFrom.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import RideInfo from '../RideInfo/RideInfo';

const SearchForm = (props) => {
    const {rideTitle,rides} = props;
    const [ pickLocation,setPickLocation ] = useState("");
    const [ dropLocation,setDropLocation ] = useState("");
    const [ dateTime,setDateTime ] = useState("");
    const [ searchClicked,setSearchClicked ] = useState(false);

    const handleBlur = (e) => {
        if (e.target.id === 'pick-location'){
            setPickLocation(e.target.value) ;
        }
        if (e.target.id === 'drop-location'){
            setDropLocation(e.target.value) ;
        }
        if (e.target.id === 'date-time'){
            setDateTime(e.target.value) ;
        }
    }

    const handleSearch = () => {
        setSearchClicked(!searchClicked);
    }
    return (
        <div>
            {
                searchClicked ?
                <div>
                    <div className="location-name">
                        <p><span className="from-to-text">From:</span> {pickLocation}</p>
                        <p><span className="from-to-text">To:</span> {dropLocation} </p>
                        <p>Date- {dateTime.replace("T", `, Time- `)} </p>
                    </div>
                    {
                        rides.map(ride => <RideInfo key={ride.rideId} ride={ride}></RideInfo>)
                    }
                    
                </div>  :
                <form onSubmit={handleSearch} className="search-form">
                        <div class="form-group">
                            <label for="pick-location">Pick From</label>
                            <input onBlur={handleBlur} type="text" class="form-control" id="pick-location" placeholder="Enter location" required />
                        </div>
                        <div class="form-group">
                            <label for="drop-location">Drop To</label>
                            <input onBlur={handleBlur} type="text" class="form-control" id="drop-location" placeholder="Enter location" required />
                        </div>
                        <div class="form-group">
                            <label for="date-time">Date & Time</label>
                            <input onBlur={handleBlur} type="datetime-local" class="form-control" id="date-time" placeholder="Enter location" required />
                        </div>
                        <div className="form-group mt-3">
                            <button  type="submit" className="form-control btn btn-danger" >Search</button>
                        </div>
                </form>


            }
            
                
        </div>
               

    );
};

export default SearchForm;