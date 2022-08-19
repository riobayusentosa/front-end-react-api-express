import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedinfo,onLogout } from "../api/auth";
import Layout from "../components/layout";
import {  unauthenticateUser } from "../redux/slices/authSlice";


const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading,setloading] = useState(true)
  const [protectedData,setprotectedData] = useState(null)

  const logout = async () => {
    try {
      await onLogout()
      dispatch(unauthenticateUser())
      localStorage.removeItem('isAuth')

    } catch (error) {
      console.log(error.response);
    }
  }

  const protectedinfo = async () => {
    try {
      const { data } = await fetchProtectedinfo()
      setprotectedData(data.info)
      setloading(false)
    } catch (error) {
      logout()
    }
  }

  useEffect(() => {protectedinfo()} ,[])

    return loading ? (
      <Layout>
        <h4>Loading...</h4>
        </Layout>
    ) : (
      <Layout>
        <h1>Dashboard</h1>
        <h2>{protectedData}</h2>
        <button onClick={()=> logout()} className="btn btn-danger">Logout
        </button>
      </Layout>
    )
  }
  
  export default Dashboard;