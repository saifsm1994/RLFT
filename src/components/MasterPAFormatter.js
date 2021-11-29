import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import Card1 from './subComponents/Card1';
import { Helmet } from "react-helmet";


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
        console.log("fontSize", font)
        if (font !== null && Number.isInteger(font)) {
            this.setState({ fontSize: font })
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
        let headingsRegex = new RegExp("(Affected[\\s]Drugs)|(Exclusion[\\s ]Criteria)|(PA[\\s ]Indication[\\s ]Indicator)|(Required[\\s ]Medical[\\s ]Information)|(Medical[\\s ]Information)|(Age[\\s ]Restriction[()s]{0,3})|(Prescriber[\\s ]Restriction[()s]{0,3})|(Coverage[\\s ]Duration)|(Other[\\s ]Criteria)|(Off[\-\\s ]]{0,1}Label[\\s ]Use[()s]{0,3})|(Products[\\s ]Affected)|(PA[\\s ]Criteria)|(Last[\\s ]Updated)|([pP]age[\\s ][\\d]{1,4})|(Covered[\\s ]Use[()s]{0,3})|(Medication[()s]{0,3})|(Prior[\\-\\s ]{0,1}Authorization[\\-\\s ]{0,1}Group)|(Formulary ID [\\d]{2,10})|(Required[\\s ]Medical[\\s ]Info)|(Criteria[\\s ]Details)|(Prior[\\s ]Authorization[\\s ]Indication)|(Prior[\\s ]Authorization[\\s ]Group[\\s ]Description)|(Required[\\s ]Medical:)|(Updated [\\d]{2})|(AFFECTED[\\S]DRUGS)|(EXCLUSION[\\S ]CRITERIA)|(PA[\\S ]INDICATION[\\S ]INDICATOR)|(REQUIRED[\\S ]MEDICAL[\\S ]INFORMATION)|(MEDICAL[\\S ]INFORMATION)|(AGE[\\S ]RESTRICTION[()S]{0,3})|(PRESCRIBER[\\S ]RESTRICTION[()S]{0,3})|(COVERAGE[\\S ]DURATION)|(OTHER[\\S ]CRITERIA)|(OFF[\-\\S ]]{0,1}LABEL[\\S ]USE[()S]{0,3})|(PRODUCTS[\\S ]AFFECTED)|(PA[\\S ]CRITERIA)|(LAST[\\S ]UPDATED)|([PP]AGE[\\S ][\\D]{1,4})|(COVERED[\\S ]USE[()S]{0,3})|(MEDICATION[()S]{0,3})|(PRIOR[\\-\\S ]{0,1}AUTHORIZATION[\\-\\S ]{0,1}GROUP)|(FORMULARY ID [\\D]{2,10})|(REQUIRED[\\S ]MEDICAL[\\S ]INFO)|(CRITERIA[\\S ]DETAILS)|(PRIOR[\\S ]AUTHORIZATION[\\S ]INDICATION)|(PRIOR[\\S ]AUTHORIZATION[\\S ]GROUP[\\S ]DESCRIPTION)|(REQUIRED[\\S ]MEDICAL:)|(Prior[\\s\\-]{0,2}Authorization[\\s\\-]{0,2}Protocol)|(Group[\\s\\-]{0,2}Description[\\s\\-]{0,2}\\:)|(UPDATED [\\D]{2})", "gm")

        let wrongHeadingsRegex = new RegExp("(accepted[\\s]{0,3}[\\n]Indications)|(approved[\\s]{0,3}[\\n]Indications)|(No[\\s]{0,3}[\\n]Age[\\s ]{0,3}Restriction)|(No[\\s]{0,3}[\\n]Exclusion[\\s ]{0,3}Criteria)", "gmi")

        let bulletsRegex = new RegExp("[•]|([\\s ]o[\\s ])", "gmi")
        let noDoubleBulletRegex = new RegExp("[\\n]{2}[•]|([\\n]{2}[\\s ]o[\\s ])", "gmi")

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


        input = input.replace(bulletsRegex, function (element) {
            return "\n" + element
        })
        //END handling the different regex for special headings



        let result = input.replace(headingsRegex, function (element) {
            element = "\n" + element;
            return element
        });

        result = result.replace(wrongHeadingsRegex, function (element) {
            console.log(element)
            element = element.replace("\n", " ");
            element = element.replace("  ", " ");
            return element
        });

        let result2 = result.replace(newLine, "\n\n")
        result2 = result2.replace(noDoubleBulletRegex, function (element) {
            element = element.replace("\n\n", "\n");
            return element
        });





        result = result.trim();
        result2 = result2.trim();

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
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Master PA</title>
                </Helmet>
                <Row>


                    <Col lg="12" xl="12" md="12" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Master PA Formatter <span style={{ fontSize: "10px" }}>v1.05</span></h5>
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

