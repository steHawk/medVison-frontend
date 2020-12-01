import React, {Component} from 'react';

class RequestUserDetails extends Component {
    constructor(props) {
        super();
        this.state = {
            userName: localStorage.getItem("userName"),
            address: localStorage.getItem("address"),
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        let url = "https://api.emetroplus.com/user/update";

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "AuthType": "user"
            },
            body: JSON.stringify({
                user_id: localStorage.getItem("_id"),
                phoneNumber: localStorage.getItem("number"),
                userDetails: {
                    userName: this.state.userName,
                    address: this.state.address,
                    _id: localStorage.getItem("_id"),
                },
            }),
        }).then((response) => {
            if (response.ok) {
                console.log(response);
                window.location.reload();
            }
        })
            .catch(error => {
                console.log({error});
            });
    }

    render() {
        let {userName, address} = this.state;
        return (
            <div className=" my-4 position-fixed">
                <div className="row m-0">
                    <div className="col-lg-4 mx-auto bg-white p-4 shadow-lg rounded-lg">
                        <h4>User Details: </h4>
                        <hr/>
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <label htmlFor="userName">Name</label>
                            <input
                                type="text"
                                id="userName"
                                className="form-control mb-2"
                                name="userName"
                                required="true"
                                onChange={(e) => this.onChange(e)}
                                value={userName}
                            />
                            <label>Address</label>
                            <textarea
                                className="form-control mb-2"
                                name="address"
                                required="true"
                                onChange={(e) => this.onChange(e)}
                                value={address}
                                placeholder="Address..."
                                style={{resize: "none"}}
                                rows="10"
                            >{address}</textarea>
                            <button className="button-secondary" type="submit" onClick={(e) => this.onSubmit(e)}>
                                UPDATE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RequestUserDetails;