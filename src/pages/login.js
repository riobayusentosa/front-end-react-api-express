import { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";


const Login = () => {
  const [values, setValues] = useState({
    email : '',
    password : ''
  })

  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await onLogin(values)
      dispatch(authenticateUser())
      localStorage.setItem('isAuth', true)
    } catch (error) {
      setError(error.response.data.errors[0].msg)
    } 
  }

    return (
      <Layout>
        <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
          <h2>Login</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input 
                onChange={(e) => onChange(e)}
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={values.email}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password 
              </label>
              <input 
                onChange={(e) => onChange(e)}
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={values.password}
                placeholder="Set your Password"
                required
              />
            </div>

            <div style={{color:'red',margin: '10px 0'}}>{error}</div>

            <button className="btn btn-primary" type="submit">
              Masuk
            </button>
        </form>
      </Layout>
    )
  }
  
  export default Login;