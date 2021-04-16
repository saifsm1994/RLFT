import React, { Component } from 'react';
import { Jumbotron, Row, Container, Col } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import Navbar1 from './subComponents/Navbar1';
import Card1 from './subComponents/Card1';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container >
                <Row>

                    {/* <Col lg="9" xl="9" md="9" sm="9"> */}
                    <Jumbotron className="mainPanel panel">
                        <Row style={{"marginBottom": "10px"}}>
                            <Col lg="4" xl="4" md="4" sm="12" >

                                <Card1
                                    heading="Go to Lookup Tool"
                                    text="This tool allows you to search for any term in a given list or Regex"
                                    linkName="Lookup Tool"
                                    link={this.props.lookupLink}
                                />
                            </Col>

                            <Col lg="4" xl="4" md="4" sm="12">

                                <Card1
                                    heading="Go to ADVANCED Lookup Tool (End)"
                                    text=" An experimental page which finds n characters after a match up until an ending keyword - experimental - for advanced users only"
                                    linkName="Lookup Tool - Advanced"
                                    link={this.props.lookupLinkAdvanced}
                                />
                            </Col>

                            <Col lg="4" xl="4" md="4" sm="12">

                                <Card1
                                    heading="Go to HCPC Tool"
                                    text="Same as the Lookup Tool, but also expands HCPC Ranges"
                                    linkName="HCPC + Lookup Tool"
                                    link={this.props.HCPC}
                                />
                            </Col>

                            </Row><Row>

                            <Col lg="4" xl="4" md="4" sm="12">

                                <Card1
                                    heading="Go to Gsheet Tool"
                                    text="This tool applies the match formula for Gsheets. It also can be used to convert columsn to csv"
                                    linkName="Gsheet Tool"
                                    link={this.props.GSheet}
                                />
                            </Col>

                            <Col lg="4" xl="4" md="4" sm="12">

                                <Card1
                                    heading="Go to Master PA Formatter"
                                    text="This tool takes Master PA text and adds new lines before headings / removes extra line breaks"
                                    linkName="Master PA Formatter"
                                    link={this.props.MasterPA}
                                />
                            </Col>

                            <Col lg="4" xl="4" md="4" sm="12">

                                <Card1
                                    heading="Go to Policy Formatter"
                                    text="Experimental Tool which removes extra line breaks from Policy Coverage Criteria, can also add indents"
                                    linkName="Policy Formatter"
                                    link={this.props.Policies}
                                />
                            </Col>
                        </Row>
                    </Jumbotron>
                    {/* </Col> */}
                    {/* <Col lg="3" xl="3" md="3" sm="3">
                        <Jumbotron className="sidePanel panel">
                        </Jumbotron>
                    </Col> */}
                </Row>

            </Container>
        );
    }
}


export default withRouter(HomePage)
