import React from 'react';
import { Button } from 'reactstrap';
import '../Universal.css';


const Card2 = (props) => {

    return (
        <div>
            <Button 
            color={!props.pressed ? "primary" : "secondary"}
            >
                {props.text}
            </Button>

        </div>
    );
};

export default Card2;