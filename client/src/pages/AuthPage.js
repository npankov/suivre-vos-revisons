import React from 'react';

export const AuthPage = () => {
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Reduction URL</h1>
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
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input className="auth-input"
                       placeholder="Entrez votre mot de passe"
                       id="password"
                       type="password"
                       name="password"
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button className="btn yellow darken-4"
            >
              Se connecter
            </button>

            <button className="btn grey lighten-1 black-text"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>

    </div>

  );
}