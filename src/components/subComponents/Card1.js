import React from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const Card1 = (props) => {

    return (
        <div>
            <Card body>
    { props.heading &&  <CardTitle tag="h5">{props.heading}</CardTitle> }
    { props.text && <CardText>{props.text}</CardText>}
    { props.linkName && <Button >Go to {props.link}</Button>}
            </Card>

        </div>
    );
};

export default Card1;