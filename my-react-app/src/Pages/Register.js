import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({}); // State to track validation errors
    const [loading, setLoading] = useState(false); // State to track loading status
    const [successMessage, setSuccessMessage] = useState(""); // State to track success message
    const [fieldValidity, setFieldValidity] = useState({
        firstname: false,
        lastname: false,
        email: false,
        password: false
    }); // State to track field validity

    const { firstname, lastname, email, password } = user;

    const validateForm = () => {
        const newErrors = {};

        if (!firstname.trim()) {
            newErrors.firstname = "First name is required";
        } else {
            setFieldValidity(prevState => ({ ...prevState, firstname: true }));
        }

        if (!lastname.trim()) {
            newErrors.lastname = "Last name is required";
        } else {
            setFieldValidity(prevState => ({ ...prevState, lastname: true }));
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        } else {
            setFieldValidity(prevState => ({ ...prevState, email: true }));
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        } else {
            setFieldValidity(prevState => ({ ...prevState, password: true }));
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true); // Set loading to true when submitting form
            try {
                await axios.post("http://localhost:1010/auth/signup", user);
                setSuccessMessage(`Register successfully! Dear ${firstname}`);
                navigate("/register");
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false); // Set loading back to false after request completes
            }
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card border rounded p-10 mt-2 shadow">
                        <div className="card-header bg-secondary text-white" style={{ height: '100px' }}>
                            <h2 className='text-center m-0'>e-Village-Membership(e-VMs)</h2>
                        </div>
                        <div className="card-body">
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}
                            {loading ? (
                                <div className="text-center">
                                    <p>Loading...</p>
                                    {/* You can add a spinner or any loading animation here */}
                                </div>
                            ) : (
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className='mb-3 position-relative'>
                                        <label htmlFor="firstname" className="form-label">First Name</label>
                                        <input
                                            type={"text"}
                                            className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                            placeholder='Enter firstname'
                                            id="firstname"
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => onInputChange(e)}
                                            style={{ width: '560px', height: '50px' }}
                                        />
                                        {fieldValidity.firstname && <span className="position-absolute top-50 translate-middle-y bi bi-check-circle-fill text-success"></span>}
                                        {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                                    </div>
                                    <div className='mb-3 position-relative'>
                                        <label htmlFor="lastname" className="form-label">Last Name</label>
                                        <input
                                            type={"text"}
                                            className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                            placeholder='Enter lastname'
                                            id="lastname"
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => onInputChange(e)}
                                            style={{ width: '560px', height: '50px' }}
                                        />
                                        {fieldValidity.lastname && <span className="position-absolute top-50 translate-middle-y bi bi-check-circle-fill text-success"></span>}
                                        {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                                    </div>
                                    <div className='mb-3 position-relative'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type={"email"}
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder='Enter email'
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => onInputChange(e)}
                                            style={{ width: '560px', height: '50px' }}
                                        />
                                        {fieldValidity.email && <span className="position-absolute top-50 translate-middle-y bi bi-check-circle-fill text-success"></span>}
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className='mb-3 position-relative'>
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type={"password"}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder='Enter password'
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => onInputChange(e)}
                                            style={{ width: '560px', height: '50px' }}
                                        />
                                        {fieldValidity.password && <span className="position-absolute top-50 translate-middle-y bi bi-check-circle-fill text-success"></span>}
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>
                                    <button
                                        type='submit'
                                        className='btn btn-primary  d-block mx-auto'
                                        style={{ width: '560px', height: '50px', backgroundColor: '' }}
                                    >
                                        REGISTER
                                    </button>
                                </form>
                            )}
                        </div>
                        <p className="mt-3 text-center">Do you have an account? <a href="/">Login</a></p>
                    </div>

                </div>
            </div>
        </div>
    );
}
