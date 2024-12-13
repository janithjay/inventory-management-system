import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Button } from '../components/ui/button'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })
  const [labelText1, setLabelText1] = React.useState('');
  const [labelText2, setLabelText2] = React.useState('');
  const [labelText3, setLabelText3] = React.useState('');
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        login({ id: data.id, username: formData.username, role: 'admin' });
        navigate('/');
      } else {
        //alert(data.error);
        if (data.error === 'Invalid username') {
          setPasswordVisible(false);
          setLabelText1('Username not found');
          setLabelText2('');
          setLabelText3('Please register to create an account');
        } else if (data.error === 'Invalid password') {
          setPasswordVisible(true);
          setLabelText2('Incorrect password');
          setLabelText1('');
          setLabelText3('');
        } else {
          // This is for other errors  
          setPasswordVisible(false);
          setLabelText2('Error!!! login failed. Please try again');
          setLabelText1('');
          setLabelText3('');
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setPasswordVisible(false);
      setLabelText2('Error!!! login failed. Please try again');
      setLabelText1('');
      setLabelText3('');
    }
  };

  const handleFocus1 = () => {
    setLabelText2('');
    setLabelText1('');
    setLabelText3('');
  };

  const handleFocus2 = () => {
    setPasswordVisible(false);
    setLabelText2('');
    setLabelText1('');
    setLabelText3('');
  };

  const regButtonClick = () => {
    navigate('/register'); // Navigate to the "/register" page
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center justify-center" >
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className='flex items-center justify-center'>
        <img src="./src/img/logo.jpg" alt="logo"  className=" size-20 rounded-full "/>
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>            
            <label className="block text-sm font-medium text-gray-700 py-1" >
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
            <label className="flex w-full justify-center items-center block py-2 text-sm font-medium text-red-700">
              {labelText1}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 py-1">
              Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              onFocus={handleFocus2}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-400 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              required
            />
            <label className="flex w-full justify-center items-center block py-2 text-sm font-medium text-red-700">
              {labelText2}
            </label>
          </div>

          <Button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </Button>
          <Button className="flex w-full justify-center items-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm/6 font-semibold text-indigo-700 ring-4 ring-inset ring-indigo-700/20" onClick={regButtonClick}>
            Register
          </Button>
          <label className="flex w-full justify-center items-center block text-sm font-medium text-red-700">
            {labelText3}
          </label>
        </form>
      </div>
    </div>
  )
}

export default Login