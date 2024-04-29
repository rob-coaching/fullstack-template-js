import { Navigate } from "react-router-dom"
import { useStore } from "../data/useStore"

export const ProtectedRoute = ({ children }) => {

  const { user } = useStore()

  // if not logged in => redirect to login
  if(!user) return <Navigate to="/login" />

  return children
}