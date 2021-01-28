import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import Card1 from './subComponents/Card1';


class GSheetFormatter extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateGSheetCellValue = this.updateGSheetCellValue.bind(this);
        this.updateGSheetapplyFormula = this.updateGSheetapplyFormula.bind(this);
        this.updateRegexFlagsValue = this.updateRegexFlagsValue.bind(this);
        this.updateRegexFlagsValue2 = this.updateRegexFlagsValue2.bind(this);
        this.launchFunction = this.launchFunction.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.fontSizeChange = this.fontSizeChange.bind(this);
        this.saveFontCookie = this.saveFontCookie.bind(this);
        this.loadFontCookie = this.loadFontCookie.bind(this);


        this.state = {
            input: "Input Placeholder",
            output: "Output Placeholder",
            outputCsv: "Output Placeholder Csv",
            outputWithFormula: "Output Placeholder With Formula",
            outputWithFormulaReverse: "Output Placeholder With Is Not a Match Formula",
            GSheetCellValue: "A2",
            GSheetFormulaFlag: "rd",
            GSheetFormulaFlag2: "rdrl",
            GSheetapplyFormula: "normal",
            fontSize: 14

        }

        setTimeout(() => {
            this.loadFontCookie()
        }, 100);
    }

    resetAll() {


        this.setState({
            input: "Input Placeholder",
            output: "Output Placeholder",
            outputCsv: "Output Placeholder Csv",
            outputWithFormula: "Output Placeholder With Formula",
            outputWithFormulaReverse: "Output Placeholder With Is Not a Match Formula",
            GSheetCellValue: "A2",
            GSheetFormulaFlag: "rd",
            GSheetFormulaFlag2: "rdrl",
            GSheetapplyFormula: "normal"
        });

    }

    componentDidMount() {
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

    updateGSheetCellValue(e) {
        e.preventDefault();
        this.setState({ GSheetCellValue: e.target.value });
    }



    updateGSheetapplyFormula(val) {
        // console.log("calling doubleLine with " + val)
        // let GSheetapplyFormula = this.state.GSheetapplyFormula;

        this.setState({ GSheetapplyFormula: val });

        // if (val === "normal") {
        //     if (GSheetapplyFormula === "normal") {
        //         this.setState({ GSheetapplyFormula: "false" });
        //     } else {
        //         this.setState({ GSheetapplyFormula: "normal" });
        //     }
        // } else {
        //     if (GSheetapplyFormula === "reverse") {
        //         this.setState({ GSheetapplyFormula: "false" });
        //     } else {
        //         this.setState({ GSheetapplyFormula: "reverse" });
        //     }
        // }

        // console.log("new gSheet Formula value is now " + this.state.GSheetFormulaFlag)
    }

    updateRegexFlagsValue(val) {
        // console.log("calling updateRegexFlagsValue with " + val)
        let GSheetFormulaFlag = this.state.GSheetFormulaFlag;

        if (GSheetFormulaFlag.indexOf(val) !== -1 && val !== "rl" && val !== "rcm") {
            GSheetFormulaFlag = GSheetFormulaFlag.replace(val, "");
        } else {
            GSheetFormulaFlag = GSheetFormulaFlag + val;
        }

        //radio settings for list/csv splits on input - nl is plit at new line, cs is split at comma
        if (val === "cs" && GSheetFormulaFlag.indexOf("nl") !== -1) {
            GSheetFormulaFlag = GSheetFormulaFlag.replace("nl", "");
        } else {
            if (val === "nl" && GSheetFormulaFlag.indexOf("cs") !== -1) {
                GSheetFormulaFlag = GSheetFormulaFlag.replace("cs", "");
            }
        }

        // //radio settings for list/csv - rl is return list rcm is return csv
        // if (val === "rl") {
        //     GSheetFormulaFlag = GSheetFormulaFlag.replace("rcm", "");
        //     GSheetFormulaFlag = GSheetFormulaFlag.replace("rl", "");
        //     GSheetFormulaFlag = GSheetFormulaFlag + val;
        // } else {
        //     if (val === "rcm") {
        //         GSheetFormulaFlag = GSheetFormulaFlag.replace("rcm", "");
        //         GSheetFormulaFlag = GSheetFormulaFlag.replace("rl", "");
        //         GSheetFormulaFlag = GSheetFormulaFlag + val;

        //     } else {

        //     }
        // }



        this.setState({ GSheetFormulaFlag: GSheetFormulaFlag })

        console.log("new value is now " + this.state.GSheetFormulaFlag)

    }

    
    updateRegexFlagsValue2(val) {
        // console.log("calling updateRegexFlagsValue with " + val)
        let GSheetFormulaFlag = this.state.GSheetFormulaFlag2;

   
        //radio settings for list/csv - rl is return list rcm is return csv
        if (val === "rl") {
            GSheetFormulaFlag = GSheetFormulaFlag.replace("rcm", "");
            GSheetFormulaFlag = GSheetFormulaFlag.replace("rl", "");
            GSheetFormulaFlag = GSheetFormulaFlag + val;
        } else {
            if (val === "rcm") {
                GSheetFormulaFlag = GSheetFormulaFlag.replace("rcm", "");
                GSheetFormulaFlag = GSheetFormulaFlag.replace("rl", "");
                GSheetFormulaFlag = GSheetFormulaFlag + val;

            } else {

            }
        }



        this.setState({ GSheetFormulaFlag2: GSheetFormulaFlag })

        console.log("new value is now " + this.state.GSheetFormulaFlag2)

    }





    launchFunction() { //main function at play
        let input = this.state.input;
        console.log("running with ", input)
        let GSheetFormulaFlag = this.state.GSheetFormulaFlag;
        let GSheetapplyFormula = this.state.GSheetapplyFormula;
        let GSheetCellValue = this.state.GSheetCellValue;
        let removeDuplicatesFlag, splitAtNewLinesFlag, CommaSepListFlag, returnType;
        let output, outputWithFormula;

        if (GSheetFormulaFlag.indexOf("rd") === -1) { removeDuplicatesFlag = false } else { removeDuplicatesFlag = true }
        if (GSheetFormulaFlag.indexOf("nl") === -1) { splitAtNewLinesFlag = false } else { splitAtNewLinesFlag = true }
        if (GSheetFormulaFlag.indexOf("cs") === -1) { CommaSepListFlag = false } else { CommaSepListFlag = true }
        if (GSheetFormulaFlag.indexOf("rcm") === -1) { returnType = false } else { returnType = true }

        // if(splitAtNewLinesFlag){ input = input.split("\n")}else{input = input.split("\\s")}
        if (CommaSepListFlag) {
            input = input.split(",")
            console.log("split 1")
        } else {
            if (splitAtNewLinesFlag) {
                input = input.split("\n")
                console.log("split 2")

            } else {
                let rege = new RegExp("[\\s\\n]", "gmi")
                input = input.split(rege)
            }
            console.log("split 3")

        }
        if (removeDuplicatesFlag) { output = Array.from(new Set(input)) } else { output = input }

        output.forEach(element => { element = element.trim() });
        output = output.filter(n => n)

        console.log("updated to ", input)

        let LetterRegex = new RegExp("[A-Za-z\\s]{1,99}", "gmi");

        outputWithFormula = output.map((element) => {
            if (element.match(LetterRegex)) {
                element = '"' + element + '"';
                return element
            } else {
                return element
            }
        }
        )
        console.log("updated to ", output)


        // if (GSheetapplyFormula === "reverse") {
        let outputWithFormulaReverse = "=isna(match(" + GSheetCellValue + ",{" + outputWithFormula + "},0))";
        // } else {
        outputWithFormula = "=match(" + GSheetCellValue + ",{" + outputWithFormula + "},0)";
        // }

        // if (returnType) {
        let outputList = output.join(",")
        // } else {
        let outputCsv = output.join("\n")
        // }

        this.setState({
            output: outputList,
            outputCsv: outputCsv,
            outputWithFormula: outputWithFormula,
            outputWithFormulaReverse: outputWithFormulaReverse
        });
    }



    render() {
        return (
            <Container >
                <Row>


                    <Col lg="9" xl="9" md="9" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Row>

                                <Col lg="6" xl="6" md="6" sm="12">
                                    <TextArea
                                        name="Input"
                                        value={this.state.input}
                                        rows="12"
                                        onChange={this.updateInputValue}
                                        styler={{ fontSize: this.state.fontSize }}
                                    />
                                </Col>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    {this.state.GSheetapplyFormula === "false" && this.state.GSheetFormulaFlag2.indexOf("rcm") === -1 &&
                                        <TextArea
                                            name="Output"
                                            value={this.state.output}
                                            rows="12"
                                            styler={{ fontSize: this.state.fontSize }}
                                            />}

                                    {this.state.GSheetapplyFormula === "false" && this.state.GSheetFormulaFlag2.indexOf("rcm") !== -1 &&
                                        <TextArea
                                            name="Output"
                                            value={this.state.outputCsv}
                                            rows="12"
                                            styler={{ fontSize: this.state.fontSize }}
                                            />}

                                    {this.state.GSheetapplyFormula === "normal" &&
                                        <TextArea
                                            name="Output"
                                            value={this.state.outputWithFormula}
                                            rows="12"
                                            styler={{ fontSize: this.state.fontSize }}
                                            />}

                                    {this.state.GSheetapplyFormula === "reverse" &&
                                        <TextArea
                                            name="Output"
                                            value={this.state.outputWithFormulaReverse}
                                            rows="12"
                                            styler={{ fontSize: this.state.fontSize }}
                                            />}






                                </Col>
                            </Row>

                            <label>First cell under Header</label>
                            <br />
                            <ButtonGroup size="sm" className="buttonGroup">
                            <input
                                name="First Cell Under Header"
                                value={this.state.GSheetCellValue}
                                onChange={this.updateGSheetCellValue}
                            />
                            <Button
                                color="primary"
                                style={{ fontSize: 11, marginLeft: "5px" }}
                                onClick={() => this.launchFunction()}
                            >Run</Button>
                            <Button
                                color="danger"
                                style={{ fontSize: 11, marginLeft: "5px" }}
                                onClick={() => this.resetAll()}
                            >Reset</Button>
                            </ButtonGroup>

                            <ButtonGroup size="sm" className="buttonGroup float-right">
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
                            <br />
                            <br />
                            <Card1
                                text={
                                    <div>
                                        <p style={{ fontSize: "12px" }}>This tool wraps inputs in the =Match Gsheet Formula. Using Gsheet's filters we can use this to only see rows with the desired values.</p>
                                        <p style={{ fontSize: "12px" }}><span style={{ fontSize: "12px", fontWeight: "Bold" }}> Unless "Split at xyz" is selected </span>every space or new line is regarded as a new input</p>
                                    </div>}
                            />

                        </Jumbotron>
                    </Col>

                    <Col lg="3" xl="3" md="3" sm="12">
                        <Jumbotron className="sidePanel panel" >
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Gsheet Formatter</h5>
                            </Col>
                            <br />
                            <label style={{ fontSize: 14, borderBottom: "solid black 1px" }}>Dynamic Options:</label>
                            <ButtonGroup size="sm" className="buttonGroup" >
                                <Button
                                    color={this.state.GSheetapplyFormula === "normal" ? "primary" : "secondary"}
                                    onClick={() => this.updateGSheetapplyFormula("normal")}
                                    style={{ fontSize: 10, border: "2px black solid", flexWrap: "wrap" }}
                                >
                                    Match Formula</Button>
                                <Button
                                    color={this.state.GSheetapplyFormula === "reverse" ? "primary" : "secondary"}
                                    onClick={() => this.updateGSheetapplyFormula("reverse")}
                                    style={{ fontSize: 10, border: "2px black solid", flexWrap: "wrap" }}
                                >
                                    Is not Match Formula</Button>
                                <Button
                                    color={this.state.GSheetapplyFormula === "false" ? "primary" : "secondary"}
                                    onClick={() => this.updateGSheetapplyFormula("false")}
                                    style={{ fontSize: 10, border: "2px black solid", flexWrap: "wrap" }}
                                >
                                    No Formula</Button>
                            </ButtonGroup>


                            <ButtonGroup size="sm" className="buttonGroup">
                                <label style={{ fontSize: 14 }}>If No formula - return as:</label>
                                <Button
                                    color={this.state.GSheetFormulaFlag2.indexOf("rl") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue2("rl")}
                                    style={{ fontSize: 10, border: "2px black solid" }}
                                >
                                    CSV</Button>
                                <Button
                                    color={this.state.GSheetFormulaFlag2.indexOf("rcm") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue2("rcm")}
                                    style={{ fontSize: 10, border: "2px black solid" }}
                                >
                                    List</Button>
                            </ButtonGroup>
                            <br />
                            <br />
                            <label style={{ fontSize: 14, borderBottom: "solid black 1px" }}>Options that require re-run:</label>
                            <ButtonGroup size="sm" className="buttonGroup">
                                <Button
                                    color={this.state.GSheetFormulaFlag.indexOf("rd") !== -1 ? "success" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("rd")}
                                    style={{ fontSize: 10, border: "2px black solid" }}
                                >
                                    Remove Duplicates</Button>
                                <Button
                                    color={this.state.GSheetFormulaFlag.indexOf("nl") !== -1 ? "success" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("nl")}
                                    style={{ fontSize: 10, border: "2px black solid" }}
                                >
                                    Split at New Lines</Button>
                                <Button
                                    color={this.state.GSheetFormulaFlag.indexOf("cs") !== -1 ? "success" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("cs")}
                                    style={{ fontSize: 10, border: "2px black solid" }}
                                >
                                    Split at Commas</Button>
                            </ButtonGroup>

                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}


export default withRouter(GSheetFormatter)

