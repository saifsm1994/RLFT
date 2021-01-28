import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


class TextArea extends Component {
    render() {
        return (
            <div>
                <FormGroup>
                    <Label for={this.props.name}>{this.props.name}</Label>
                    <Input 
                    type="textarea" 
                    name={this.props.name}
                    id={this.props.name} 
                    rows={this.props.rows} 
                    value={this.props.value} 
                    onChange={this.props.onChange}
                    style={this.props.styler}
                    />
                </FormGroup>
            </div>
        );
    }
}

export default TextArea;