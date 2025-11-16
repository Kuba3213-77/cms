import { useState } from "react";

function LoginForm({ loginFn }) {
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    if (login.length > 4 && password.length > 4) {
      loginFn({ login, password });
    } else {
      setError("Invalid credentials");
      return;
    }
  };

  return (
    <div className="form-container">
      <form className="form">
        <h2>Login Form</h2>
        <input name="login" type="text" placeholder="Login" id="login" />
        <input
          name="password"
          type="password"
          placeholder="Pass"
          id="password"
        />
        <button onClick={(e) => submit(e)}>Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default LoginForm;
