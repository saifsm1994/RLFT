import React, { Component } from 'react';
import { Button, Col, Row, FormGroup, Form, Label, Input, ButtonGroup } from 'reactstrap';


class TextAreaQuery2 extends Component {
    render() {
        return (
            <div>
                <Form  >
                    <FormGroup >
                        <Label for={this.props.name}>{this.props.name}</Label>
                        <Row>
                            <Col lg="12" xl="12" md="12" sm="12">
                                <Input
                                    bsSize="sm"
                                    type="textarea"
                                    name={this.props.name}
                                    id={this.props.name}
                                    rows={this.props.rows}
                                    value={this.props.value}
                                    onChange={this.props.onChange}
                                />
                            </Col>
                            <Col lg="12" xl="12" md="12" sm="12">

                                <ButtonGroup size="sm" className="buttonGroup">
                                <Button
                                    name={this.props.buttonName}
                                    onClick={this.props.buttonOnClick}
                                    color="success"
                                >
                                    {this.props.buttonText}
                                </Button>
                                <Button
                                    name={this.props.buttonName2}
                                    onClick={this.props.buttonOnClick2}
                                    color="secondary"
                                >
                                    {this.props.buttonText2}
                                </Button>
                                <Button
                                    name={this.props.buttonName3}
                                    onClick={this.props.buttonOnClick3}
                                    color="danger"
                                    style={{borderLeft:"white 1px solid"}}
                                >
                                    {this.props.buttonText3}
                                </Button>
                            </ButtonGroup>

                            </Col>
                        </Row>

                    </FormGroup>

                </Form>
            </div>
        );
    }
}

export default TextAreaQuery2;