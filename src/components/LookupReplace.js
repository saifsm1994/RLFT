import React, { Component } from 'react';
import { Jumbotron, Button, Row, Container, Col, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router";
import './Universal.css';
import TextArea from './subComponents/TextArea';
import TextAreaQuery from './subComponents/TextAreaQuery';
import Card1 from './subComponents/Card1';
import TextAreaQuery2 from './subComponents/TextAreaQuery2';
import { Helmet } from "react-helmet";
import TextAreaJodit from './subComponents/TextAreaJodit';


class LookupReplace extends Component {
    constructor(props) {
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.updatesearchValueReplacement = this.updatesearchValueReplacement.bind(this);
        this.setName = this.setName.bind(this);
        this.updatesearchStringFlagsValue = this.updatesearchStringFlagsValue.bind(this);
        this.updateRegexFlagsValue = this.updateRegexFlagsValue.bind(this);
        this.setSearchValue = this.setSearchValue.bind(this);
        this.updateSearchType = this.updateSearchType.bind(this);
        this.saveStateToCookie = this.saveStateToCookie.bind(this);
        this.saveSearchesToSearchesCookie = this.saveSearchesToSearchesCookie.bind(this);
        this.loadSearchFromSavedSearches = this.loadSearchFromSavedSearches.bind(this);
        this.pullStateFromCookie = this.pullStateFromCookie.bind(this);
        this.resetAll = this.resetAll.bind(this);


        this.state = {
            input: "Start placeholder text here End more placeholder text",
            output: "Output Placeholder 1",
            searchType: "regex",
            searchValue: "([ :;\\.\\,<>a-zA-Z_\\-'o‍c‍o‌]{10,99}(\\.com|\\.c‍om|\\.c‌om)[ :;\\.\\,<>a-zA-Z_\\-'o‍o‌c‍]{0,99})",
            searchValueReplacement: "",
            searchStringFlags: "c",
            searchRegexFlags: "gmi",
            Searches: {}
        };

    }

    resetAll() {
        localStorage.removeItem("cookie4")


        this.setState({
            input: "START Lorem Ipsum.com is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's END standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            output: "Output Placeholder",
            searchType: "regex",
            searchValue: "([ :;\\.\\,<>a-zA-Z_\\-'o‍c‍o‌]{10,99}(\\.com|\\.c‍om|\\.c‌om)[ :;\\.\\,<>a-zA-Z_\\-'o‍o‌c‍]{0,99})",
            searchValueReplacement: "",
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

            let searchType = this.state.searchType ? this.state.searchType : "regex";
            let searchValue = this.state.searchValue ? this.state.searchValue : "([ :;\\.\\,<>a-zA-Z_\\-'o‍c‍o‌]{10,99}(\\.com|\\.c‍om|\\.c‌om)[ :;\\.\\,<>a-zA-Z_\\-'o‍o‌c‍]{0,99})";
            let searchValueReplacement = this.state.searchValueReplacement ? this.state.searchValueReplacement : "";
            let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
            let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";

            cookieData.searchType = searchType;
            cookieData.searchValue = searchValue;
            cookieData.searchValueReplacement = searchValueReplacement;
            cookieData.searchStringFlags = searchStringFlags;
            cookieData.searchRegexFlags = searchRegexFlags;


            localStorage.setItem('cookie4', JSON.stringify(cookieData));
        }, num);

    }

    saveSearchesToSearchesCookie(val) {
        //get the current proposed name
        //save the current state to that name
        //remove the searches subObject to prevent duplicates
        //The final cookie will be a object like {name: state, name2: state2, Searches: null}

        let cookieData = {};
        let name = this.state.name;

        let searchType = this.state.searchType ? this.state.searchType : "regex";
        let searchValue = this.state.searchValue ? this.state.searchValue : "([ :;\\.\\,<>a-zA-Z_\\-'o‍c‍o‌]{10,99}(\\.com|\\.c‍om|\\.c‌om)[ :;\\.\\,<>a-zA-Z_\\-'o‍o‌c‍]{0,99})";
        let searchValueReplacement = this.state.searchValueReplacement ? this.state.searchValueReplacement : "";
        let searchStringFlags = this.state.searchStringFlags ? this.state.searchStringFlags : "ci";
        let searchRegexFlags = this.state.searchRegexFlags ? this.state.searchRegexFlags : "gmi";
        let nameValue = this.state.name ? this.state.name : "";

        if (name === null || name === undefined) { return } else {
            alert("Current search saved as " + name)
        }

        if (localStorage.getItem('Searches4')) {
            cookieData = JSON.parse(localStorage.getItem('Searches4'));
        }

        cookieData[name] = {};
        cookieData[name].searchType = searchType;
        cookieData[name].searchValue = searchValue;
        cookieData[name].searchValueReplacement = searchValueReplacement;
        cookieData[name].searchStringFlags = searchStringFlags;
        cookieData[name].searchRegexFlags = searchRegexFlags;
        cookieData[name].name = nameValue;
        //unsure if this one does anything except eat up storage, replacing.
        // cookieData[name] = this.state;




        localStorage.setItem('Searches4', JSON.stringify(cookieData));
        this.setState({ Searches: cookieData });

        if (val) {
            if (cookieData[this.state.name]) {
                delete cookieData[this.state.name];
                localStorage.setItem('Searches4', JSON.stringify(cookieData));
                this.setState({ Searches: cookieData })
            }
        }
    }


    pullStateFromCookie() {
        if (localStorage.getItem('cookie4')) {
            let fetchedCookie = JSON.parse(localStorage.getItem('cookie4'));
            Object.keys(fetchedCookie).forEach(element => {
                if (element === "name") { } else {
                    this.setState({
                        [element]: fetchedCookie[element]
                    })
                }
            });

        }

        if (localStorage.getItem('Searches4')) {
            let fetchedcookie4 = JSON.parse(localStorage.getItem('Searches4'));
            this.setState({
                Searches: fetchedcookie4
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
                if (element !== "Searches" && element !== "input" && element !== "output" ) {
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

    updatesearchValueReplacement(e) {
        e.preventDefault();
        this.setState({ searchValueReplacement: e.target.value });
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

    // not used, but left in for now
    

    setSearchValue() {
        let input = this.state.input;
        let searchRegexFlags = this.state.searchRegexFlags;
        let search = this.state.searchValue;
        let searchReplacement = this.state.searchValueReplacement;

        //if the regex option is chosen search as is - assign to array for the forEach loop below
        //if the list option is chosen split into an array and regex search each element

        search = [search]
        searchReplacement = [searchReplacement]
        
        let output = input;



        search.forEach(element => {
            if (element == null) {
                console.log("null search", element)
                this.setState({ output: "No Matches" });
                this.saveStateToCookie()
                return
            } else {
                let test = new RegExp(element, searchRegexFlags);
                output = input.replaceAll(test, searchReplacement)
                this.setState({ output: output });
                this.saveStateToCookie()
                return
                
            }
        }
        )

        this.setState({
            output: output,
    
        });
        this.saveStateToCookie()
    }



    render() {
        return (
            <Container >
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Regex Lookup and Replace</title>
                </Helmet>
                <Row>

                    <Col lg="9" xl="9" md="9" sm="12">
                        <Jumbotron className="mainPanel panel">
                            <Row>
                                <Col lg="6" xl="6" md="6" sm="12">
                                    <TextArea
                                        name="Input"
                                        value={this.state.input}
                                        rows="22"
                                        onChange={this.updateInputValue}
                                        fontSize="10px"
                                    />
                                </Col>
                                <Col lg="6" xl="6" md="6" sm="12">
                                {/* <TextAreaJodit
                                        name="Output 1"
                                        value={this.state.output}
                                        rows="12"
                                        readonly="true"
                                        styler={{"fontSize":"12px"}}
                                    />
                                     */}
                                    
                                    <TextArea
                                        name="Output"
                                        value={this.state.output}
                                        rows="22"
                                        fontSize="10px"
                                        />


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
                                name="Replacement String"
                                value={this.state.searchValueReplacement}
                                rows="3"
                                onChange={this.updatesearchValueReplacement}
                            />

                            <Card1
                                text={<div><p>Enter a regex to find in the input text, all matches will be replaced with the contents of the Replace box. List option is disabled.
                                    </p><ul>
                                        <li>The default replacement removes any lines (up to 99*2 characters) with the text .com in them - centered around .com</li>


                                    </ul></div>}


                            />


                        </Jumbotron>
                    </Col>
                    <Col lg="3" xl="3" md="3" sm="12">
                        <Jumbotron className="sidePanel panel">
                            <Col lg="12" xl="12" md="12" sm="12">
                                <h5>Slicing Lookup (Advanced)</h5>
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
                            
                            </ButtonGroup>


                            <ButtonGroup size="" className="buttonGroup">
                                <Button
                                    color={this.state.searchType.indexOf("regex") !== -1 ? "primary" : "secondary"}
                                    onClick={() => this.updateSearchType("regex")}
                                >
                                    Regex</Button>
                                <Button
                                    color={this.state.searchType.indexOf("string") !== -1 ? "primary" : "secondary"}
                                    
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


export default withRouter(LookupReplace)

