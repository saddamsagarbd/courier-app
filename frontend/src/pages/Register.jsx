import { useContext, useEffect, useState } from "react";
import { register } from "../services/AuthService";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: "",
    role: "customer",
  });
  const [errors, setErrors] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordCheck = (e) => {
    console.log(form.password, e.target.value);
    const isMatch = form.password === e.target.value;
    console.log("isMatch", isMatch);
    setPasswordMatch(isMatch);
    return isMatch;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=> {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create a new account</h1>
        <p className="text-gray-600 mb-8">
          Or{' '}
          <Link to="/" className="font-medium underline">
            sign in to existing account
          </Link>
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="John Doe"
            />
            {errors && (
              <p className="mt-1 text-sm text-red-600">{ errors }</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Contact no
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="01676690930"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              onChange={(e) => {
                handleChange(e);
                handlePasswordCheck(e);
              }}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                !passwordMatch ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {!passwordMatch && form.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Assign Role
            </label>
            <select 
              name="role" 
              id="role"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
              <option value="agent">Delivery Agent</option>
            </select>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              onChange={handleChange}
              className="h-4 w-4 mt-1 border-gray-300 rounded focus:ring-gray-900"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the <Link to="/" className="underline">Terms</Link> and <Link to="/" className="underline">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
