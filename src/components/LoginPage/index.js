import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({showSubmitError: false, errorMsg: ''})

  const onSuccesfullSubmit = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = props
    history.replace('/')
  }

  const submitForm = async event => {
    event.preventDefault()

    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()

      if (!response.ok) {
        setError({showSubmitError: true, errorMsg: data.error_msg})
      } else {
        onSuccesfullSubmit(data.jwt_token)
        setError({showSubmitError: false, errorMsg: ''})
      }
    } catch (err) {
      console.error('Network error:', err)
      setError({
        showSubmitError: true,
        errorMsg: 'Something went wrong. Please try again.',
      })
    }
  }

  const jwtToket = Cookies.get('jwt_token')

  if (jwtToket !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-form-container">
      <form className="form-container" onSubmit={submitForm}>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
        />

        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>

        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <div className="show-pwd-con" />
        <button type="submit" className="login-button">
          Login
        </button>
        {error.showSubmitError && (
          <p className="error-message">*{error.errorMsg}</p>
        )}
      </form>
    </div>
  )
}

export default LoginPage
