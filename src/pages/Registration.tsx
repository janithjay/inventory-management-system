import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'

function Registration() {
    const navigate = useNavigate()    
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [buttonText, setButtonText] = React.useState('Close');
    const [buttonStyle, setButtonStyle] = React.useState('flex w-full justify-center items-center rounded-md bg-red-50 px-3 py-1.5 text-sm/6 font-semibold text-red-700 ring-4 ring-inset ring-red-500/20');
    const [labelStyle, setLabelStyle] = React.useState('hidden flex w-full justify-center items-center block py-1 text-sm font-medium text-green-700');
    const [labelText1, setLabelText1] = React.useState('');
    const [labelText2, setLabelText2] = React.useState('');
    const [labelText3, setLabelText3] = React.useState('');
    const [labelText4, setLabelText4] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {                
                setLabelText4('Registration successful. Please login to continue');
                setLabelText1('');
                setLabelText2('');
                setLabelText3('');
                setButtonText('Login');
                setButtonStyle('flex w-full justify-center items-center rounded-md bg-green-50 px-3 py-1.5 text-sm/6 font-semibold text-green-700 ring-4 ring-inset ring-green-500/20');
                setLabelStyle('flex w-full justify-center items-center block py-1 text-sm font-medium text-green-700')
                
            } else {
                //alert(data.error);
                if (data.error) {
                    if (data.error === 'Username already exists') {
                        setLabelText1('Username already exists. Please try another');
                    }
                    else {
                        setLabelText1('');
                    }
                    if (data.error === 'Email is not valid') {
                        setLabelText2('Email is not valid. Please enter a valid email');
                    }
                    else {
                        setLabelText2('');
                    }
                    if (data.error === 'Passwords do not match') {
                        setLabelText3('Passwords do not match. Registration failed');
                    }
                    else {
                        // This is for other errors  
                        setLabelText3('Registration failed. Please try again');
                    }
                }
                else {
                    setLabelText4('');
                    setLabelText2('');
                    setLabelText1('');
                    setLabelText3('');
                }

            }
        } catch (error) {
            console.error("Registration failed:", error);
            setLabelText4('');
            setLabelText2('');
            setLabelText1('');
            setLabelText3('Error!!! Registration failed. Please try again');
        }
    };

    const closeButtonClick = () => {
        navigate('/login'); // Navigate to the "/another" page
    };

    const handleFocus1 = () => {
        setLabelText2('');
        setLabelText1('');
        setLabelText3('');
        setLabelText4('');
    };


    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center">
            <div className="bg-white py-5  px-8 rounded-lg shadow-md w-96">
                <div className='flex items-center justify-center'>
                    <img src="./src/img/logo.jpg" alt="logo" className=" size-20 rounded-full " />
                </div>
                <h1 className="text-2xl font-bold mb-6 text-center">Registration</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 py-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onFocus={handleFocus1}
                            required
                        />
                        <label className="flex w-full justify-center items-center block py-1 text-sm font-medium text-red-700">
                            {labelText1}
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 py-1">
                            Email
                        </label>
                        <input
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onFocus={handleFocus1}
                            required
                        />
                        <label className="flex w-full justify-center items-center block py-1 text-sm font-medium text-red-700">
                            {labelText2}
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 py-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onFocus={handleFocus1}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 py-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onFocus={handleFocus1}
                            required
                        />
                        <label className="flex w-full justify-center items-center block py-1 text-sm font-medium text-red-700">
                            {labelText3}
                        </label>
                    </div>

                    <Button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Register
                    </Button>
                    <label  className={labelStyle}>
                        {labelText4}
                    </label>
                    <Button className={buttonStyle} onClick={closeButtonClick}>
                        {buttonText}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Registration