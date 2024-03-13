import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({}); // State to track validation errors
    const [loading, setLoading] = useState(false); // State to track loading status
    const [successMessage, setSuccessMessage] = useState(""); // State to track success message
    const [fieldValidity, setFieldValidity] = useState({
        email: false,
        password: false
    }); // State to track field validity

    const { email, password } = user;

    const validateForm = () => {
        const newErrors = {};

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
                const response = await axios.post("http://localhost:1010/auth/login", user);
                const { role } = response.data; // Assuming the server responds with the user's role

                // Check if role is present and valid
                if (role !== undefined && role !== null) {
                    setSuccessMessage(`Login successfully! Dear ${email}`);

                    // Store user's role in session or local storage
                    localStorage.setItem('userRole', role);

                    setTimeout(() => {
                        if (role === "ADMIN") {
                            navigate("/admin"); // Redirect to admin dashboard
                        } else if (role === "USER") {
                            navigate("/user"); // Redirect to user dashboard
                        } else {
                            // Handle other roles or scenarios
                            console.error("Unknown role:", role);
                        }
                    }, 1000); // 3000 milliseconds = 3 seconds
                } else {
                    // Handle case where role is null or undefined
                    console.error("Role is null or undefined");
                }
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
                                        className='btn btn-primary d-block mx-auto'
                                        style={{ width: '560px', height: '50px' }}
                                    >
                                        LOGIN
                                    </button>
                                </form>
                            )}
                        </div>
                        <p className="mt-3 text-center">Don't you have an account? <a href="/register">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
