import Axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom';

const ConfirmPrescription = (props) => {
    console.log(props);
    const [state, setState] = React.useState(localStorage.getItem('refreshToken') ?
        {
            name: localStorage.getItem("userName"),
            email: localStorage.getItem("email"),
            mobileNumber: localStorage.getItem("number"),
            age: localStorage.getItem("age"),
            gender: localStorage.getItem("gender"),
            address: localStorage.getItem("address"),
            files: props.history.location.state.files ? props.history.location.state.files : [],
            success: false,
        } :
        {
            name: "",
            email: "",
            mobileNumber: "",
            age: "",
            gender: "",
            address: "",
            files: props.history.location.state.files ? props.history.location.state.files : [],
        }
    )
    const textAreaStyle = {
        resize: "none",
        bacgroundColor: "white",
        fontSize: "1.2em",
        border: "0px"
    }

    const onChange = (e) => {
        setState({ [e.target.name]: e.target.value })
    }

    const submitPrescription = (e) => {
        e.preventDefault();
        let body = {
            prescriptionDetails: {
                userName: state.name,
                email: state.email,
                mobile: state.mobileNumber,
                age: parseInt(state.age),
                gender: state.gender,
                prescriptionImg: state.files,
                address: state.address,
            }
        }
        Axios.post('https://api.emetroplus.com/prescription/upload', body)
            .then((response) => {
                if (response.data.ok) {
                    setState({
                        success: true,
                    })
                }
            }).catch((error) => {
                console.error("***", error);
            })
    }
    const gotoHome = (e) => {
        e.preventDefault();
        props.history.replace('', null)
        props.history.push({ pathname: '/' })
    }
    if (state.success) {
        return (
            <div>
                <div className="modal-header">
                    <h5 className="modal-title text-primary" id="exampleModalLongTitle">Success</h5>
                </div>
                <div className="modal-body">
                    <p>
                        Your prescription Uploaded Successfully...<br />
                                Our customer support will contact you... <br /> Thank you..
                            </p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button-secondary" data-dismiss="modal" onClick={(e) => gotoHome(e)}>Close</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container my-4">
                <div className="row m-0">
                    <div className="col-lg-6 col-md-6 my-2">
                        <div className="text-right my-2">
                            <Link to={{
                                pathname: "/prescription",
                                state: {
                                    files: state.files
                                }
                            }} className="text-decoration-none"><i className="fas fa-edit mr-2"></i>Edit</Link>
                        </div>
                        <div className="table-responsive bg-white rounded-lg">
                            <table className="table table-borderless m-0">
                                <tbody>
                                    {
                                        state.files.map((file, index) => (
                                            <tr key={index}>
                                                <th>
                                                    <img src={file} className="img-fluid" alt="prescription" />
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 my-2">
                        <div className="text-right my-2">
                            <Link to="/profileUpdate" className="text-decoration-none"><i className="fas fa-edit mr-2"></i>Edit</Link>
                        </div>
                        <div className="table-responsive bg-white rounded-lg p-2">
                            {
                                localStorage.getItem('refreshToken') ?
                                    <table className="table table-borderless m-0">
                                        <tbody>
                                            <tr>
                                                <td className="secondary-text">Name</td>
                                                <td>{state.name}</td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Email</td>
                                                <td>{state.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Mobile</td>
                                                <td>{state.mobileNumber}</td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Gender</td>
                                                <td>{state.gender}</td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Age</td>
                                                <td>{state.age}</td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Address </td>
                                                <td>
                                                    <textarea className="form-control" rows="8" value={state.address} disabled style={textAreaStyle}>
                                                    </textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-center">
                                            <tr>
                                                <th colSpan="2">
                                                    <button className="button-primary" onClick={(e) => submitPrescription(e)} >SUBMIT</button>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                                    :
                                    <table className="table table-borderless m-0">
                                        <tbody>

                                            <tr>
                                                <td className="secondary-text">Name</td>
                                                <td>
                                                    <input type="text" className="form-control" name="name" required value={state.name} onChange={(e) => onChange(e)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Email</td>
                                                <td>
                                                    <input type="email" className="form-control" name="email" required value={state.email} onChange={(e) => onChange(e)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Mobile</td>
                                                <td>
                                                    <input type="number" className="form-control" name="mobileNumber" required value={state.mobileNumber} onChange={(e) => onChange(e)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Gender</td>
                                                <td>

                                                    <input type="text" className="form-control" name="gender" required value={state.gender} onChange={(e) => onChange(e)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Age</td>
                                                <td>

                                                    <input type="number" className="form-control" name="age" value={state.age} onChange={(e) => onChange(e)} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="secondary-text">Address </td>
                                                <td>
                                                    <textarea className="form-control" value={state.address} required onChange={(e) => onChange(e)} style={textAreaStyle}>
                                                    </textarea>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot className="text-center">
                                            <tr>
                                                <th colSpan="2">
                                                    <button className="button-primary" onClick={(e) => submitPrescription(e)} >SUBMIT</button>
                                                </th>
                                            </tr>
                                        </tfoot>
                                    </table>
                            }
                        </div>
                    </div>
                </div>
            </ div>
        )
    }
}

export default ConfirmPrescription
