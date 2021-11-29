import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";


class TextAreaJodit extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	content: 'content',
        }
    }
        /**
     * @property Jodit jodit instance of native Jodit
     */
	jodit;
	setRef = jodit => this.jodit = jodit;
    
    config = {
        readonly: this.props.readonly, // all options from https://xdsoft.net/jodit/doc/
        height: this.props.rows*30,
        toolbar: false,
        style: { font: "10px Arial"}
        }



    render() {
        return (
            <div>
                <FormGroup>
                    <Label for={this.props.name}>{this.props.name}</Label>
                    <JoditEditor 
                    type="textarea" 
                    name={this.props.name}
                    id={this.props.name} 
                    rows={this.props.rows} 
                    value={this.props.value} 
                    onChange={this.props.onChange}
                    config={this.config}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default TextAreaJodit;