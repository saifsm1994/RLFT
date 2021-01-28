import React, { Component } from 'react';
import { Button, Col, Row, FormGroup, Form, Label, Input } from 'reactstrap';


class TextAreaQuery extends Component {
    render() {
        return (
            <div>
                <Form  >
                    <FormGroup >
                        <Label for={this.props.name}>{this.props.name}</Label>
                        <Row>
                            <Col lg="10" xl="10" md="10" sm="10">
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
                            <Col lg="1" xl="1" md="1" sm="1">
                                <Button
                                    bsSize="sm"
                                    name={this.props.buttonName}
                                    onClick={this.props.buttonOnClick}
                                    color="success"
                                >
                                    {this.props.buttonText}
                                </Button>
                            </Col>
                        </Row>

                    </FormGroup>

                </Form>
            </div>
        );
    }
}

export default TextAreaQuery;