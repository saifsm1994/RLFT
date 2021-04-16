import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import TextAreaQuery from './subComponents/TextAreaQuery';
import Card1 from './subComponents/Card1';
import TextAreaQuery2 from './subComponents/TextAreaQuery2';


class LookupAdvanced extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.updateSearchValueEnd = this.updateSearchValueEnd.bind(this);
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
            input: "START Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has END been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            output: "Output Placeholder",
            noCountOutput: "Output Placeholder",
            csvOutput: "Output Placeholder",
            csvDedupeOutput: "Output Placeholder",
            searchType: "regex",
            searchValue: "(start[a-z\\s\\n0-9]{0,999})",
            searchValueEnd: "(end)",
            searchStringFlags: "c",
            searchRegexFlags: "gmi",
            Searches: {}
        };

    }

    resetAll() {
        localStorage.removeItem("cookie3")


        this.setState({
            input: "START Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's END standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            output: "Output Placeholder",
            noCountOutput: "Output Placeholder",
            csvOutput: "Output Placeholder",
            csvDedupeOutput: "Output Placeholder",
            searchType: "regex",
            searchValue: "(start[a-z\\s\\n0-9]{0,999})",
            searchValueEnd: "(end)",
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
            let searchType = this.state.searchType ? this.state.searchType : "regex";
            let searchValue = this.state.searchValue ? this.state.searchValue : "(start[a-z\\s\\n0-9]{0,999})";
            let searchValueEnd = this.state.searchValueEnd ? this.state.searchValueEnd : "(end)";
            let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
            let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";

            cookieData.searchType = searchType;
            cookieData.searchValue = searchValue;
            cookieData.searchValueEnd = searchValueEnd;
            cookieData.searchStringFlags = searchStringFlags;
            cookieData.searchRegexFlags = searchRegexFlags;


            localStorage.setItem('cookie3', JSON.stringify(cookieData));
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
        let searchType = this.state.searchType ? this.state.searchType : "regex";
        let searchValue = this.state.searchValue ? this.state.searchValue : "(start[a-z\\s\\n0-9]{0,999})";
        let searchValueEnd = this.state.searchValueEnd ? this.state.searchValueEnd : "(end)";
        let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
        let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";
        let nameValue = this.state.name ? this.state.name : "";

        if (name === null || name === undefined) { return } else {
            alert("Current search saved as " + name)
        }

        if (localStorage.getItem('Searches2')) {
            cookieData = JSON.parse(localStorage.getItem('Searches2'));
        }

        cookieData[name] = {};
        cookieData[name].searchType = searchType;
        cookieData[name].searchValue = searchValue;
        cookieData[name].searchValueEnd = searchValueEnd;
        cookieData[name].searchStringFlags = searchStringFlags;
        cookieData[name].searchRegexFlags = searchRegexFlags;
        cookieData[name].name = nameValue;
        //unsure if this one does anything except eat up storage, replacing.
        // cookieData[name] = this.state;




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
        if (localStorage.getItem('cookie3')) {
            let fetchedCookie = JSON.parse(localStorage.getItem('cookie3'));
            Object.keys(fetchedCookie).forEach(element => {
                if (element === "name") { } else {
                    this.setState({
                        [element]: fetchedCookie[element]
                    })
                }
            });

        }

        if (localStorage.getItem('Searches2')) {
            let fetchedcookie3 = JSON.parse(localStorage.getItem('Searches2'));
            this.setState({
                Searches: fetchedcookie3
            })
        }
    }

    loadSearchFromSavedSearches(val) {
        if (this.state.Searches && this.state.Searches[val]) {
            let fetchedSearch = this.state.Searches[val];
            // if(fetchedSearch.searchType === "string"){
            //     alert("could not load - this page only accepts regex search types")

            // }else{
            Object.keys(fetchedSearch).forEach(element => {
                if (element !== "Searches" && element !== "input" && element !== "output" && element !== "noCountOutput" && element !== "csvOutput" && element !== "csvDedupeOutput") {
                    this.setState({
                        [element]: fetchedSearch[element]
                    })
                }
            });
            // }
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

    updateSearchValueEnd(e) {
        e.preventDefault();
        this.setState({ searchValueEnd: e.target.value });
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

        // console.log("new value is now " + this.state.searchStringFlags)
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

        // console.log("new value is now " + this.state.searchRegexFlags)
        this.saveStateToCookie()

    }


    updateSearchType(val) {

        this.setState({ searchType: val });

        // console.log("new value is now " + this.state.searchType)
        this.saveStateToCookie()

    }


    hcpcManager(input) { // expands all hcpc ranges in document
        let NumRegex = new RegExp("\\d{4}", "gmi");
        let LetterRegex = new RegExp("[A-CE-Z]", "gmi");
        let HCPCRegexRange = new RegExp("([A-CE-Z][0-9]{4}[\\t]{0,3}[-—]{0,2}(through){0,1}(to){0,1}[\\t]{0,3}[A-CE-Z][0-9]{4})", "gmi");
        // console.log("range matches include", input.match(HCPCRegexRange))



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
        let searchEnd = this.state.searchValueEnd;
        let searchType = this.state.searchType;
        let caseSensitive;

        // console.log("setSearchValue, step 0 - input is ", input)


        input = this.hcpcManager(input);

        // console.log("setSearchValue, step 1 passed - input is ", input)

        if (searchRegexFlags.indexOf("i") === -1) { // if case sensitive true  - no i flag
            caseSensitive = true
        } else {
            caseSensitive = false
        }

        //if the regex option is chosen search as is - assign to array for the forEach loop below
        //if the list option is chosen split into an array and regex search each element
        if (searchType === "string") {
            if (searchRegexFlags.indexOf("g") === -1) {
                this.setState({ searchRegexFlags: searchRegexFlags + "g" });
                searchRegexFlags = searchRegexFlags  + "g"
            }
            if (searchRegexFlags.indexOf("m") === -1) {
                this.setState({ searchRegexFlags: searchRegexFlags + "m" });
                searchRegexFlags = searchRegexFlags  + "m"
            }

            search = search.split(",");
            searchEnd = searchEnd.split(",");
            search = Array.from(new Set(search));
            searchEnd = Array.from(new Set(searchEnd));
            search = search.map(element => "(" + element + "[a-zA-Z\\:\\,\\.\\-\\'•=\\/\\s\\n0-9\\\\ \\\"]{0,9999})")
            searchEnd = searchEnd.map(element => "(" + element + ")")

        } else {
            search = [search]
        }
        let output = [];
        let matcher2 = [];
        // console.log("setSearchValue, step 2 passed - input is" ,input)


        search.forEach(element => {
            if (element == null) {
                console.log("null search",element)
                this.setState({ output: "No Matches" });
                this.saveStateToCookie()
                return
            } else {
                // console.log("not null search",element)

                // update this to keep a track of the specific order of matches
                let match;
                let matcher = []; // input.match(new RegExp(element, searchRegexFlags))
                let test = new RegExp(element, searchRegexFlags);
                // console.log("not null regex",test)
                let i = 0
                while ((match = test.exec(input)) != null && i < 500) {
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
        }
        )

        // console.log("setSearchValue, step 3 passed", " matcher2 == ", matcher2)

        if (matcher2.length >= 1 && Array.isArray(matcher2)) {
            // matcher = matcher.split(",") 
            matcher2 = matcher2.sort(([a, b], [c, d]) => b - d);
            matcher2.forEach(element => {
                // console.log("matcher32", element)
                let test2 = new RegExp(searchEnd, searchRegexFlags);
                element[0] = element[0].split(test2)[0]
                output = [...output, element[0]]
            });



        }

        // console.log("step 4")

        let noCountOutput = output.join("\n\n\n\n");
        let csvOutput = output.join(",");

        let uniqueOutput = [];
        let counts = [];
        let countOutput = [];
        let csvDedupeOutput = [];

        output.forEach(element => {
            if (!caseSensitive) {
                // console.log("element,", element)
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
            output: countOutput.join("\n\n\n"),
            noCountOutput: noCountOutput,
            csvOutput: csvOutput,
            csvDedupeOutput: csvDedupeOutput.join(",")
        });
        this.saveStateToCookie()
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

                                    />
                                </Col>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    {this.state.searchStringFlags.indexOf("c") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.noCountOutput}
                                        rows="12"
                                    />}

                                    {this.state.searchStringFlags.indexOf("a") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.output}
                                        rows="12"
                                    />}

                                    {this.state.searchStringFlags.indexOf("s") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.csvDedupeOutput}
                                        rows="12"
                                    />}

                                    {this.state.searchStringFlags.indexOf("h") !== -1 && <TextArea
                                        name="Output"
                                        value={this.state.csvOutput}
                                        rows="12"
                                    />}






                                </Col>
                            </Row>

                            <TextAreaQuery
                                name="Search String"
                                value={this.state.searchValue}
                                rows="3"
                                onChange={this.updateSearchValue}
                                buttonOnClick={this.setSearchValue}
                                buttonText="Search"
                            />

                            <TextAreaQuery
                                name="Search String End"
                                value={this.state.searchValueEnd}
                                rows="3"
                                onChange={this.updateSearchValueEnd}
                            // buttonOnClick={this.setSearchValueEnd}
                            // buttonText="Search"
                            />

                            <Card1
                                text={<div><p>A variant of the lookup tool, this page takes 2 regexes or lists of strings and returns any match for the first regex and truncates it where the second regex starts.
                                    </p><ul>
                                        <p style={{ "fontWeight": "900" }}>Press Reset Page and click search for an example</p>
                                        <li>The first regex matches the keyword 'Start' and 999 characters after it</li>
                                        <li>The second regex matches the keyword 'End'</li>
                                        <li>As a result we get the first 999 characters after Start until End cuts it off early</li>
                                        <li>With the list option these would be Start and End respectively - the list option is also hardcoded to find 9999 characters</li>

                                        <li>Note: Some features are disabled in list mode</li>


                                    </ul></div>}


                            />


                        </Jumbotron>
                    </Col>
                    <Col lg="3" xl="3" md="3" sm="12">
                        <Jumbotron className="sidePanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Lookup</h5>
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


                            <ButtonGroup size="lg" className="buttonGroup">
                                <Button
                                    color={this.state.searchStringFlags.indexOf("c") !== -1 ? "info" : "secondary"}
                                    onClick={() => this.updatesearchStringFlagsValue("c")}
                                >
                                    Show All</Button>
                                {/* <Button
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
                                    CSV</Button> */}

                            </ButtonGroup>


                            <ButtonGroup size="" className="buttonGroup">
                                {/* <label>Search Type</label> */}
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


export default withRouter(LookupAdvanced)

