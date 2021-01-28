import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import Card1 from './subComponents/Card1';


class MasterPAFormatter extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.launchFormatter = this.launchFormatter.bind(this);
        this.headerManager = this.headerManager.bind(this);
        this.toggleDoubleLine = this.toggleDoubleLine.bind(this);
        this.fontSizeChange = this.fontSizeChange.bind(this);
        this.saveFontCookie = this.saveFontCookie.bind(this);
        this.loadFontCookie = this.loadFontCookie.bind(this);

        
        this.state = {
            input: "Placeholder",
            output: "Output Placeholder",
            noDoubleLineOutput: "Output Placeholder",
            doubleLine: false,
            fontSize: 10
        };

    }


    componentDidMount() {
        this.loadFontCookie()
    }

    fontSizeChange(num) {
        let fontSize = this.state.fontSize;
        if (num === "0" || num === 0) { this.setState({ fontSize: fontSize - 2 }) }
        if (num === "1" || num === 1) { this.setState({ fontSize: fontSize + 2 }) }
        this.saveFontCookie()
    }

    saveFontCookie() {
        let font = this.state.fontSize;
        localStorage.setItem('fontSize', font);
    }

    loadFontCookie() {
        let font = localStorage.getItem('fontSize');
        console.log("fontSize",font)
        if(font !== null && Number.isInteger(font)){
            this.setState({fontSize: font})
        }
    }




    updateInputValue(e) {
        e.preventDefault();
        this.setState({ input: e.target.value });
    }


    toggleDoubleLine() {
        // console.log("calling doubleLine with " + val)
        let doubleLine = this.state.doubleLine;

        if (doubleLine === true) {
            this.setState({ doubleLine: false });
        } else {
            this.setState({ doubleLine: true });
        }

        console.log("new double line value is now " + this.state.doubleLine)
    }


    updateSearchType(val) {

        this.setState({ searchType: val });

        console.log("new value is now " + this.state.searchType)

    }


    headerManager(inputer) {
        let headingsRegex = new RegExp("(Exclusion[\\s ]Criteria)|(Required[\\s ]Medical[\\s ]Information)|(Medical[\\s ]Information)|(Age[\\s ]Restriction[()s]{0,3})|(Prescriber[\\s ]Restriction[()s]{0,3})|(Coverage[\\s ]Duration)|(Other[\\s ]Criteria)|(Off[\-\\s ]]{0,1}Label[\\s ]Use[()s]{0,3})|(Products[\\s ]Affected)|(PA[\\s ]Criteria)|(Last[\\s ]Updated)|(•)|([\\s ]o[\\s ])|(Covered[\\s ]Use[()s]{0,3})|(Medication[()s]{0,3})", "gmi")
        let CapsHeadings = new RegExp("[\\s ]{0,1}Indications[\\s ]", "gm");
        let newLine = new RegExp("\\n{1,55}", "gmi");


        let input = inputer.replace(newLine, function (element) {
            element = " ";
            return element
        })

        //handling the different regex for special headings
        input = input.replace(CapsHeadings, function (element) {
            if (element.charAt(0) === " ") { element = "\n" + element.substring(1) } else {
                element = "\n" + element
            }
            return element
        })
        //END handling the different regex for special headings

        let result = input.replace(headingsRegex, function (element) {
            element = "\n" + element;
            return element
        });
        let result2 = result.replace(headingsRegex, function (element) {
            if (element === "•" | element === "\\so\\s") {
                return element
            } else { element = "\n" + element; }
            return element
        });

        //handling the different regex for special headings
        result2 = result2.replace(CapsHeadings, function (element) {
            if (element === "•" | element === "\\so\\s") {
                return element
            } else { element = "\n" + element; }
            return element
        });
        //END handling the different regex for special headings

        result = result.trim()
        result2 = result2.trim()






        return [result, result2]
    }

    launchFormatter() {
        console.log("LaunchFormatter called")
        let input = this.state.input;
        input = this.headerManager(input);


        this.setState({
            output: input[0],
            noDoubleLineOutput: input[1]
        });
    }



    render() {
        return (
            <Container >
                <Row>


                    <Col lg="12" xl="12" md="12" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Master PA Formatter</h5>
                            </Col>
                            <Row>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    <TextArea
                                        name="Input"
                                        placeholder={this.state.input}
                                        rows="18"
                                        onChange={this.updateInputValue}
                                        styler={{ fontSize: this.state.fontSize }}

                                    />
                                </Col>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    <TextArea
                                        name="Output"
                                        value={this.state.doubleLine === true ? this.state.noDoubleLineOutput : this.state.output}
                                        rows="18"
                                        styler={{ fontSize: this.state.fontSize }}
                                    />
                                </Col>
                            </Row>


                            <ButtonGroup size="" className="buttonGroup">
                                <Button
                                    bsSize=""
                                    name="launchFormatter"
                                    onClick={() => this.launchFormatter()}
                                    color="success"
                                >
                                    Format
                                </Button>                                <Button
                                    color={this.state.doubleLine === true ? "primary" : "secondary"}
                                    onClick={() => this.toggleDoubleLine("c")}
                                >
                                    Double Lines</Button>

                            </ButtonGroup>

                            <ButtonGroup size="" className="buttonGroup float-right">
                                <label style={{ paddingRight: "10px", textAlign: "center", marginTop: "5px" }}>Font Size: </label>
                                <Button
                                    bsSize=""
                                    name="fontSizeChange0"
                                    onClick={() => this.fontSizeChange(0)}
                                    color="secondary"
                                >
                                    -
                                </Button>
                                <Button
                                    name="fontSizeChange1"
                                    color="secondary"
                                    onClick={() => this.fontSizeChange(1)}
                                >
                                    +</Button>
                            </ButtonGroup>

                            <Card1
                                text={<div><p>This tool removes all line breaks before finding  pre-defined headings and inserts linebreaks before them
                                    </p></div>}


                            />

                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}


export default withRouter(MasterPAFormatter)

