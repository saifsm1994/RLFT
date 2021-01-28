import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import Card1 from './subComponents/Card1';


class Formatter extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.launchFormatter = this.launchFormatter.bind(this);
        this.rulesManager = this.rulesManager.bind(this);
        this.bulletRanker = this.bulletRanker.bind(this);
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
        console.log("fontSize",font)
        if(font !== null && Number.isInteger(font)){
            this.setState({fontSize: font})
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


    bulletRanker(inputer) {
        let bullet1 = new RegExp("•", "gmi");
        let bullet2 = new RegExp("\\so\\s", "gmi");

        // let bullet3 = new RegExp("[\\s\\n\\]{1}[ivx]{1,5}[\\.]", "gm");
        let bullet4 = new RegExp("[\\s\\n]{1}[ivx]{1,5}[\\)]", "gm");
        // let bullet5 = new RegExp("[\\s\\n]{1}[IVX]{1,5}[\\.]", "gm");
        let bullet6 = new RegExp("[\\s\\n]{1}[IVX]{1,5}[\\)]", "gm");

        let bullet7 = new RegExp("[\\s\\n^\\/]{1}[a-z]{1,2}[\\)]", "gm");
        let bullet8 = new RegExp("[\\s\\n]{1}[a-z]{1,2}[\\.]", "gm");
        let bullet9 = new RegExp("[\\s\\n^\\/]{1}[A-Z]{1,2}[\\)]", "gm");
        let bullet10 = new RegExp("[\\s\\n]{1}[A-Z]{1,2}[\\.]", "gm");

        // let bullet13 = new RegExp("[\\()][0-9]{1,2}[\\)]", "gm");
        let bullet11 = new RegExp("[\\(]{0,1}[0-9]{1,2}[\\)]", "gm");
        let bullet12 = new RegExp("[\\s][0-9]{1,2}[\\.][\\s]", "gm");

        let bullet13 = new RegExp("[\\s\\n]{1}[\\(]{0,1}[a-z]{1,2}[\\)]", "gm");
        // let bullet14 = new RegExp("[\\s\\n]{1}[a-z]{1,2}[\\.]", "gm");
        let bullet15 = new RegExp("[\\s\\n]{1}[\\(]{0,1}[A-Z]{1,2}[\\)]", "gm");
        // let bullet16 = new RegExp("[\\s\\n]{1}[A-Z]{1,2}[\\.]", "gm");

        let allBullets = [bullet1, bullet2, bullet4, bullet6, bullet7, bullet8, bullet9, bullet10, bullet11, bullet12, bullet13, bullet15]
        // ,bullet13]
        let ranking = [];

        // console.log("inputer.match(bullet7), inputer.match(bullet7)", inputer.match(bullet7))

        allBullets.forEach((element, index) => {
            if (inputer.match(element) != null) {
                let element2 = inputer.indexOf(inputer.match(element)[0])
                ranking.push([index, element2]) // [choice of bullet,relative position]
                console.log(inputer.match(element))

            }
        });

        // console.log(ranking)
        ranking = ranking.sort(([a, b], [c, d]) => b - d);
        console.log("bullet rankings are ", ranking)

        ranking.forEach((bulletRegexPosition, currentIndex) => {
            let bulletRegex = allBullets[bulletRegexPosition[0]]
            console.log("chosen the bullet regex " + bulletRegex + " for " + currentIndex + " indents")
            let spacer = "";
            let indentString = "    ";

            for (let i = 0; i < currentIndex; i++) {
                spacer = spacer + indentString;
            }

            inputer = inputer.replace(bulletRegex, function (element) {
                if (element.indexOf("\n") !== -1) {
                    element = element.replace("\n", "\n" + spacer)
                    // console.log(element)
                } else {
                    element = spacer + element
                }
                return element
            });
        });

        return inputer





    }

    rulesManager(inputer, type) { // expands all hcpc ranges in document
        let lineBetweenNoCaps = new RegExp("([A-Za-z0-9]{1,55}[\\s \\,\\-]{0,4}[\\n]{1,5}[\\s]{0,5}[a-z0-9\\(]{1,55})", "gm")
        let extraSpaces = new RegExp("[\\s\\n]{1,55}", "gmi");
        let extraSpaces2 = new RegExp("[\\s]{1,55}", "gmi");
        let bullets = new RegExp("[\\s\\n/^\\(^/]{1}[a-zA-Z0-9]{1,2}[\\.\\)]{1}[\\s]{0,1}[\\n]{0,1}", "gmi");
        let failedBullets = new RegExp("[\\s]{0,55}[(/]{1}[a-zA-Z0-9]{1,2}","gmi")
        let extraLine = new RegExp("\\n\\n", "gmi")


        let result = inputer.replace(lineBetweenNoCaps, function (element) {
            element = element.replace(extraSpaces, " ")
            return element
        });

        let result2 = result.replace(bullets, function (element) {
            if (!element.match(failedBullets) && element.charAt(0) === " ") {
                element = element.substring(1);
                console.log("removing extra spacer")
            }
            if(element.match(failedBullets)){
                element = element.replace(extraSpaces," ")
            }else{
            element = "\n" + element;
            }
            return element
        });

        result = result.trim()
        result2 = result2.trim()

        result2 = this.bulletRanker(result2);
        result2 = result2.replace(extraLine, "\n")
        result2 = result2.replace(failedBullets,function(element){
            console.log(element)
            element = element.replace(extraSpaces2,"")
            console.log(element)
            return element
        })

        

        // result2 = result2.replace(lineBetweenNoCaps, function (element) {
        //     element = element.replace(extraSpaces," ")
        //     return element       
        // });

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
                                        Experimental Indents</Button>


                                </ButtonGroup>
                                <ButtonGroup size="" className="buttonGroup float-right">
                                    <label style={{paddingRight: "10px",textAlign: "center",marginTop:"5px"}}>Font Size: </label>
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
                                text='This tool tries to apply basic rules regarding bullet indents and removes extra line breaks'
                            />

                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}


export default withRouter(Formatter)

