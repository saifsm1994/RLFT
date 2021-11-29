import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import TextAreaQuery from './subComponents/TextAreaQuery';
import Card1 from './subComponents/Card1';
import TextAreaQuery2 from './subComponents/TextAreaQuery2';
import {Helmet} from "react-helmet";



class HCPCandFilter extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.setName = this.setName.bind(this);
        this.updatesearchStringFlagsValue = this.updatesearchStringFlagsValue.bind(this);
        this.updateRegexFlagsValue = this.updateRegexFlagsValue.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
        this.updateSearchType = this.updateSearchType.bind(this);
        this.saveStateToCookie = this.saveStateToCookie.bind(this);
        this.saveSearchesToSearchesCookie = this.saveSearchesToSearchesCookie.bind(this);
        this.loadSearchFromSavedSearches = this.loadSearchFromSavedSearches.bind(this);
        this.pullStateFromCookie = this.pullStateFromCookie.bind(this);
        this.hcpcManager = this.hcpcManager.bind(this);
        this.resetAll = this.resetAll.bind(this);


        this.state = {
            input: "Input Placeholder",
            output: "Output Placeholder",
            noCountOutput: "Output Placeholder",
            csvOutput: "Output Placeholder",
            csvDedupeOutput: "Output Placeholder",
            searchType: "string",
            searchValue: "Placeholder",
            searchStringFlags: "c",
            searchRegexFlags: "gmi",
            Searches: {}
        };

    }

    resetAll() {
        localStorage.removeItem("cookie2")


        this.setState({
            input: "Input Placeholder",
            output: "Output Placeholder",
            noCountOutput: "Output Placeholder",
            csvOutput: "Output Placeholder",
            csvDedupeOutput: "Output Placeholder",
            searchType: "string",
            searchValue: "Placeholder",
            searchStringFlags: "c",
            searchRegexFlags: "gmi",
            name: ""
        }, this.saveStateToCookie(100));
    }

    componentDidMount() {
        this.pullStateFromCookie()
    }


    saveStateToCookie(num) {
        if (num) { } else { num = 0 }
        setTimeout(() => {
            let cookieData = {};
            // let name = this.state.name ? this.state.name : ""; ;
            // let input= this.state.input ? this.state.input : "Input Placeholder";
            // let output= this.state.output ? this.state.output :"Output Placeholder";
            // let noCountOutput= this.state.noCountOutput ? this.state.noCountOutput :"Output Placeholder";
            // csvOutput:  "Output Placeholder",
            // csvDedupeOutput:  "Output Placeholder",
            let searchType = this.state.searchType ? this.state.searchType : "string";
            let searchValue = this.state.searchValue ? this.state.searchValue : "([A-CE-Z][0-9]{4})";
            let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
            let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";

            cookieData.searchType = searchType;
            cookieData.searchValue = searchValue;
            cookieData.searchStringFlags = searchStringFlags;
            cookieData.searchRegexFlags = searchRegexFlags;


            localStorage.setItem('cookie2', JSON.stringify(cookieData));
        }, num);

    }

    saveSearchesToSearchesCookie(val) {
        //get the current proposed name
        //save the current state to that name
        //remove the searches subObject to prevent duplicates
        //The final cookie will be a object like {name: state, name2: state2, Searches: null}

        let cookieData = {};
        let name = this.state.name;
        // let input= this.state.input ? this.state.input : "Input Placeholder";
        // let output= this.state.output ? this.state.output :"Output Placeholder";
        // let noCountOutput= this.state.noCountOutput ? this.state.noCountOutput :"Output Placeholder";
        // csvOutput:  "Output Placeholder",
        // csvDedupeOutput:  "Output Placeholder",
        let searchType = this.state.searchType ? this.state.searchType : "string";
        let searchValue = this.state.searchValue ? this.state.searchValue : "([A-CE-Z][0-9]{4})";
        let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
        let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";

        if (name === null || name === undefined) { return } else {
            alert("Current search saved as " + name)
        }

        if (localStorage.getItem('Searches2')) {
            cookieData = JSON.parse(localStorage.getItem('Searches2'));
        }

        cookieData[name] = {};
        cookieData[name].searchType = searchType;
        cookieData[name].searchValue = searchValue;
        cookieData[name].searchStringFlags = searchStringFlags;
        cookieData[name].searchRegexFlags = searchRegexFlags;
        cookieData[name] = this.state;


        localStorage.setItem('Searches2', JSON.stringify(cookieData));
        this.setState({ Searches: cookieData });

        if (val) {
            if (cookieData[this.state.name]) {
                delete cookieData[this.state.name];
                localStorage.setItem('Searches2', JSON.stringify(cookieData));
                this.setState({ Searches: cookieData })
            }
        }
    }


    pullStateFromCookie() {
        if (localStorage.getItem('cookie2')) {
            let fetchedCookie = JSON.parse(localStorage.getItem('cookie2'));
            Object.keys(fetchedCookie).forEach(element => {
                if (element === "name") { } else {
                    this.setState({
                        [element]: fetchedCookie[element]
                    })
                }
            });

        }

        if (localStorage.getItem('Searches2')) {
            let fetchedCookie2 = JSON.parse(localStorage.getItem('Searches2'));
            this.setState({
                Searches: fetchedCookie2
            })
        }
    }

    loadSearchFromSavedSearches(val) {
        if (this.state.Searches && this.state.Searches[val]) {
            let fetchedSearch = this.state.Searches[val];
            Object.keys(fetchedSearch).forEach(element => {
                if (element !== "Searches" && element !== "input" && element !== "output" && element !== "noCountOutput" && element !== "csvOutput" && element !== "csvDedupeOutput") {
                    this.setState({
                        [element]: fetchedSearch[element]
                    })
                }
            });
        }

    }




    updateInputValue(e) {
        e.preventDefault();
        this.setState({ input: e.target.value });
        this.saveStateToCookie()
    }

    updateSearchValue(e) {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
        this.saveStateToCookie()
    }

    setName(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
        this.saveStateToCookie()
    }

    updatesearchStringFlagsValue(val) {
        // console.log("calling searchStringFlags with " + val)
        // let searchStringFlags = this.state.searchStringFlags;

        this.setState({ searchStringFlags: val });


        // if (searchStringFlags.indexOf(val) !== -1) {
        //     this.setState({ searchStringFlags: searchStringFlags.replace(val, "") });
        // } else {
        //     this.setState({ searchStringFlags: searchStringFlags + val });
        // }

        console.log("new value is now " + this.state.searchStringFlags)
        this.saveStateToCookie()
    }

    updateRegexFlagsValue(val) {
        // console.log("calling updateRegexFlagsValue with " + val)
        let searchRegexFlags = this.state.searchRegexFlags;

        if (searchRegexFlags.indexOf(val) !== -1) {
            this.setState({ searchRegexFlags: searchRegexFlags.replace(val, "") });
        } else {
            this.setState({ searchRegexFlags: searchRegexFlags + val });
        }

        console.log("new value is now " + this.state.searchRegexFlags)
        this.saveStateToCookie()

    }

    updateSearchType(val) {

        this.setState({ searchType: val });

        console.log("new value is now " + this.state.searchType)
        this.saveStateToCookie()

    }


    hcpcManager(input) { // expands all hcpc ranges in document
        let NumRegex = new RegExp("\\d{4}", "gmi");
        let LetterRegex = new RegExp("[A-CE-Z]", "gmi");
        let HCPCRegexRange = new RegExp("([A-CE-Z][0-9]{4}[\\t]{0,3}[-—]{0,2}(through){0,1}(to){0,1}[\\t]{0,3}[A-CE-Z][0-9]{4})", "gmi");
        console.log("range matches include", input.match(HCPCRegexRange))

        let result = input.replace(HCPCRegexRange, function (element) {

            let letters = element.match(LetterRegex);
            let numbers = element.match(NumRegex);
            let store = [];

            if (letters.length !== 2 | numbers.length !== 2 | numbers[0] > numbers[1]) { alert("failed match") } else {
                let i = numbers[0]
                for (i; i <= numbers[1]; i++) {
                    store.push(letters[0] + i)
                }
            }

            store = store.join(",")
            return store
        });

        return result



    }

    setSearchValue() {
        let input = this.state.input;
        let searchRegexFlags = this.state.searchRegexFlags;
        let search = this.state.searchValue;
        let searchType = this.state.searchType;
        let caseSensitive;


        input = this.hcpcManager(input);

        if (searchRegexFlags.indexOf("i") === -1) { // if case sensitive true  - no i flag
            caseSensitive = true
        } else {
            caseSensitive = false
        }

        //if the regex option is chosen search as is - assign to array for the forEach loop below
        //if the list option is chosen split into an array and regex search each element
        if (searchType === "string") {
            search = search.split(",");
            search = Array.from(new Set(search));
        } else {
            search = [search]
        }
        let output = [];
        let matcher2 = [];

        search.forEach(element => {
            // update this to keep a track of the specific order of matches
            let match;
            let matcher = []; // input.match(new RegExp(element, searchRegexFlags))
            let test = new RegExp(element, searchRegexFlags);
            let i = 0
            while ((match = test.exec(input)) != null && i< 19999) {
                matcher.push([match[0], parseInt(match.index)])
                i++
            }


            //if no matches
            if (matcher === null) {
                this.setState({ output: "No Matches" });
                this.saveStateToCookie()
                return
            }
            matcher2 = [...matcher2, ...matcher]
        }
        )

        console.log("matcher2", matcher2)

        if (matcher2.length >= 1 && Array.isArray(matcher2)) {
            // matcher = matcher.split(",") 
            matcher2 = matcher2.sort(([a, b], [c, d]) => b - d);
            matcher2.forEach(element => {
                console.log("matcher32", element)
                output = [...output, element[0]]
            });

        }



        let noCountOutput = output.join("\n");
        let csvOutput = output.join(",");

        let uniqueOutput = [];
        let counts = [];
        let countOutput = [];
        let csvDedupeOutput = [];

        output.forEach(element => {
            if (!caseSensitive) {
                console.log("element,", element)
                let lowerCaseUniqueOutput = uniqueOutput.map(element => element.toLowerCase())
                let pos = lowerCaseUniqueOutput.indexOf(element.toLowerCase());
                if (pos === -1) {
                    uniqueOutput.push(element)
                    counts.push(1)
                } else {
                    counts[pos] = counts[pos] + 1;
                }

            } else {
                let pos = uniqueOutput.indexOf(element);
                if (pos === -1) {
                    uniqueOutput.push(element)
                    counts.push(1)
                } else {
                    counts[pos] = counts[pos] + 1;
                }
            }
        });

        uniqueOutput.forEach((element, index) => {
            countOutput.push(element + " - " + counts[index] + " times");
            csvDedupeOutput.push(element);
        });



        this.setState({
            output: countOutput.join("\n"),
            noCountOutput: noCountOutput,
            csvOutput: csvOutput,
            csvDedupeOutput: csvDedupeOutput.join(",")
        });
        this.saveStateToCookie()
    }



    render() {
        return (
            <Container >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>HCPC</title>
                </Helmet>
                <Row>

                    <Col lg="9" xl="9" md="9" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Row>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    <TextArea
                                        name="Input"
                                        value={this.state.input}
                                        rows="18"
                                        onChange={this.updateInputValue}

                                    />
                                </Col>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    {this.state.searchStringFlags.indexOf("c") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.noCountOutput}
                                        rows="18"
                                    />}

                                    {this.state.searchStringFlags.indexOf("a") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.output}
                                        rows="18"
                                    />}

                                    {this.state.searchStringFlags.indexOf("s") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.csvDedupeOutput}
                                        rows="18"
                                    />}

                                    {this.state.searchStringFlags.indexOf("h") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.csvOutput}
                                        rows="18"
                                    />}






                                </Col>
                            </Row>

                            <TextAreaQuery
                                name="Search String"
                                value={this.state.searchValue}
                                rows="6"
                                onChange={this.updateSearchValue}
                                buttonOnClick={this.setSearchValue}
                                buttonText="Search"
                            />

                            <Card1
                                text='This tool is the same as the lookup tool, but also expands HCPC ranges'
                            />


                        </Jumbotron>
                    </Col>
                    <Col lg="3" xl="3" md="3" sm="12">
                        <Jumbotron className="sidePanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>HCPC Lookup</h5>
                            </Col>
                            <ButtonGroup size="sm" className="buttonGroup">
                                <Button
                                    color={this.state.searchRegexFlags.indexOf("i") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("i")}
                                >
                                    Case Insensitive</Button>
                                <Button
                                    color={this.state.searchRegexFlags.indexOf("g") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("g")}
                                >
                                    Global</Button>
                                <Button
                                    color={this.state.searchRegexFlags.indexOf("m") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateRegexFlagsValue("m")}
                                >
                                    Multiline</Button>
                            </ButtonGroup>


                            <ButtonGroup size="sm" className="buttonGroup">
                                <Button
                                    color={this.state.searchStringFlags.indexOf("c") !== -1 ? "info" : "secondary"}
                                    onClick={() => this.updatesearchStringFlagsValue("c")}
                                >
                                    Show All</Button>
                                <Button
                                    color={this.state.searchStringFlags.indexOf("a") !== -1 ? "info" : "secondary"}
                                    onClick={() => this.updatesearchStringFlagsValue("a")}
                                >
                                    Count</Button>
                                <Button
                                    color={this.state.searchStringFlags.indexOf("s") !== -1 ? "info" : "secondary"}
                                    onClick={() => this.updatesearchStringFlagsValue("s")}
                                >
                                    CSV Trimmed</Button>
                                <Button
                                    color={this.state.searchStringFlags.indexOf("h") !== -1 ? "info" : "secondary"}
                                    onClick={() => this.updatesearchStringFlagsValue("h")}
                                >
                                    CSV</Button>

                            </ButtonGroup>


                            <ButtonGroup size="" className="buttonGroup">
                                <label>Search Type</label>
                                <Button
                                    color={this.state.searchType.indexOf("regex") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateSearchType("regex")}
                                >
                                    Regex</Button>
                                <Button
                                    color={this.state.searchType.indexOf("string") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateSearchType("string")}
                                >
                                    List</Button>

                            </ButtonGroup>

                            <TextAreaQuery2
                                name="Save Search"
                                value={this.state.name}
                                rows="1"
                                onChange={this.setName}
                                buttonOnClick={() => this.saveSearchesToSearchesCookie()}
                                buttonOnClick2={() => this.saveSearchesToSearchesCookie(this.state.name)}
                                buttonOnClick3={() => this.resetAll()}
                                buttonText={"Save"}
                                buttonText2={"Delete"}
                                buttonText3={"Reset Page"}

                            />

                            {this.state.Searches && Object.keys(this.state.Searches).map((element) => {
                                return element !== "Searches" ?
                                    <Button
                                        onClick={() => this.loadSearchFromSavedSearches(element)}
                                        color="primary"
                                        style={{ border: "solid white 1px", marginLeft: "1px" }}
                                    >{element}</Button> : ""
                            })
                            }



                        </Jumbotron>
                    </Col>
                </Row>

            </Container>
        );
    }
}


export default withRouter(HCPCandFilter)

