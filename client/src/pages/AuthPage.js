import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request,clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
      message(data.message);
    } catch (e) {}
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Vos revisions</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Autorisation / S'inscrire</span>
            <div>

              <div className="input-field">
                <input className="auth-input"
                       placeholder="Entrez votre e-mail"
                       id="email"
                       type="text"
                       name="email"
                       onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input className="auth-input"
                       placeholder="Entrez votre mot de passe"
                       id="password"
                       type="password"
                       name="password"
                       onChange={changeHandler}
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Se connecter
            </button>

            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}