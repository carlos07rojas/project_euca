import React from "react";
import { LoginForm } from "../../../components/admin";
import "./loginAdmin.scss";

export function LoginAdmin() {
  return (
    <div className="login-admin">
      <div className="login-admin__content">
        <h1>Iniciar Sesion</h1>
        <LoginForm/>
      </div>
    </div>
  );
}
