import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import Card1 from './subComponents/Card1';
import { Helmet } from "react-helmet";


class Formatter extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.launchFormatter = this.launchFormatter.bind(this);
        this.rulesManager = this.rulesManager.bind(this);
        this.toggleexperimental = this.toggleexperimental.bind(this);
        this.fontSizeChange = this.fontSizeChange.bind(this);
        this.saveFontCookie = this.saveFontCookie.bind(this);
        this.loadFontCookie = this.loadFontCookie.bind(this);

        this.state = {
            input: "Placeholder",
            output: "Output Placeholder",
            experimentalOutput: "Output Placeholder",
            experimental: false,
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


    toggleexperimental() {
        // console.log("calling experimental with " + val)
        let experimental = this.state.experimental;

        if (experimental === true) {
            this.setState({ experimental: false });
        } else {
            this.setState({ experimental: true });
        }

        // console.log("new double line value is now " + this.state.experimental)
    }


    updateSearchType(val) {

        this.setState({ searchType: val });

        // console.log("new value is now " + this.state.searchType)

    }



    rulesManager(inputer, type) { // expands all hcpc ranges in document
        // flow
        // 1. Take input and remove line breaks where first word is lower case and not direcly followed by a .)-
        // a. match regexes for different bullet points and insert line breaks before them
        // 2.remove extra line breaks
        // 3.
        // 4.


        let result;
        let result2;

        let smallCapsStartingLine = new RegExp("[\\n]{1,99}[\\s]{0,99}([a-z]{0,40}[\\s,]|AND|OR|NOT)", "gm");
        let obviousBulletPoints = new RegExp("([•])|([\\s\\n]o[\\s\\n])", "gmi");
        let letterBulletPoint = new RegExp("((?<!\\([\\sa-z]{2,99})[\\s\\n][a-z]{1,2}[.)][\\s])", "gmi");
        let numberBulletPoint = new RegExp("((?<!\\([\\sa-z]{2,99})[\\s\\n][0-9]{1,2}[.)]([\\s]|[A-Za-z]{2}))", "gmi");
        let RomanBulletPoint = new RegExp("((?<!\\([\\sa-z]{2,99})[\\s\\n][IVX]{1,5}[.)][\\s])", "gmi");
        let doubleLine = new RegExp("\\n\\n", "gmi")
        let commaLine = new RegExp("([\\,][\\s]{0,3}[\\n])", "gmi")

        console.log("inputer called")

        result = inputer.replace(smallCapsStartingLine, function (element) {
            console.log("smallCapsStartingLine",element)
            if (element.match(obviousBulletPoints)) { return element }
            return element.replace("\n", " ")
        })

        result2 = result.replace(obviousBulletPoints, function (element) {
            // console.log("obviousBulletPoints",element)
            if (element.charAt(0) !== "\n") { if(element.charAt(0) === " "){return "\n" + element.substring(1) }else{return "\n" + element }}
            return element //.replace("\n", " ")
        })

        result2 = result2.replace(letterBulletPoint, function (element) {
            // console.log("letterBulletPoint",element)
            if (element.match(obviousBulletPoints)) { return element }
            if (element.charAt(0) !== "\n") { 
                // console.log("letterBulletPoint first letter is not newline ",element)
                if(element.charAt(0) === " "){
                    // console.log("letterBulletPoint first letter is space ",element)
                    return "\n" + element.substring(1) }else{
                        // console.log("letterBulletPoint first letter is not space or new line, returning as new row ",element)
                        return "\n" + element }}
            return element //.replace("\n", " ")
        })

        result2 = result2.replace(numberBulletPoint, function (element) {
            // console.log("numberBulletPoint",element)
            if (element.match(obviousBulletPoints) || element.match(obviousBulletPoints)) { return element }
            if (element.charAt(0) !== "\n") { if(element.charAt(0) === " "){return "\n" + element.substring(1) }else{return "\n" + element }}
            return element //.replace("\n", " ")
        })

        result2 = result2.replace(RomanBulletPoint, function (element) {
            console.log("RomanBulletPoint",element)
            if (element.match(obviousBulletPoints) || element.match(numberBulletPoint) || element.match(obviousBulletPoints)) {
                        console.log("RomanBulletPoint first letter is a match for other regexes returning ",element)
                        return element }
            if (element.charAt(0) !== "\n") {
                console.log("RomanBulletPoint first letter is a newline ",element)
                if(element.charAt(0) === " "){
                    console.log("RomanBulletPoint first letter is a space returning as new row minus 1 letter  ",element)
                    return "\n" + element.substring(1) }else{
                        console.log("RomanBulletPoint first letter is a not a space or a new line returning as new row  ",element)
                        return "\n" + element }}
            return element
        })

        result = result.replace(doubleLine, "\n")
        result2 = result2.replace(doubleLine, "\n")
        result = result.replace(commaLine, ", ")
        result2 = result2.replace(commaLine, ", ")

        return [result, result2]
    }

    launchFormatter(type) {
        // console.log("LaunchFormatter called")
        let input = this.state.input;
        input = this.rulesManager(input, type);


        this.setState({
            output: input[0],
            experimentalOutput: input[1]
        });
    }



    render() {
        return (
            <Container >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Formatter</title>
                </Helmet>
                <Row>


                    <Col lg="12" xl="12" md="12" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Policy Formatter (Experimental)</h5>
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
                                        value={this.state.experimental === true ? this.state.experimentalOutput : this.state.output}
                                        rows="18"
                                        styler={{ fontSize: this.state.fontSize }}
                                    />
                                </Col>
                            </Row>

                            <Col lg="12" xl="12" md="12" sm="12">
                                <ButtonGroup size="" className="buttonGroup">
                                    {/* <label>Options</label> */}
                                    <Button
                                        bsSize=""
                                        name="launchFormatter"
                                        onClick={() => this.launchFormatter(1)}
                                        color="success"
                                    >
                                        Format
                                </Button>
                                    <Button
                                        color={this.state.experimental === true ? "primary" : "secondary"}
                                        onClick={() => this.toggleexperimental("c")}
                                    >
                                        Experimental formatting</Button>


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


                            </Col>

                            <Card1
                                text='This tool tries to remove extra line breaks. Experimental Formatting makes sure each bullet point is on a new line'
                            />

                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}


export default withRouter(Formatter)

