import React, { Component } from "react";
import axios from "axios";
import instance from "../../api/instance";
class FileUpload extends Component {
    constructor() {
        super();
        this.state = {
            file: null,
        };
    }
    submitFile = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.file[0]);
        formData.append("name", "chaitanya");
        console.log(formData)
        instance.post('aws/prescription-upload', formData, {})
      .then((response) => {
                console.log(response)
            })
                    .catch((error) => {
                        // handle your error
                        console.log(error);
                    });
    };
    handleFileUpload = (event) => {
        this.setState({ file: event.target.files });
    };
    render() {
        return (
            <form onSubmit={this.submitFile}>
                <input
                    label="upload file"
                    type="file"
                    onChange={this.handleFileUpload}
                />
                <button type="submit">Send</button>
            </form>
        );
    }
}
export default FileUpload;