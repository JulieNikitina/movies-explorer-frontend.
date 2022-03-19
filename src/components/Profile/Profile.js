import './Profile.css';
import React from "react";
import Header from "../Header/Header";
import {projectApi} from "../../utils/MainApi";
import {useFormValidation} from "../../validation/FormValidation";
import {clearCachedSearchState} from "../../utils/localStorage";

function Profile(props) {
  const { currentUser, setCurrentUser, loggedIn } = props;
  const {values, handleChange, errors, isValid, resetForm} = useFormValidation();
  const [profileError, setProfileError] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const buttonClassName = isValid ? "profile__button" : "profile__button profile__button_inactive"

  function handleSubmit(e) {
    e.preventDefault()
    handleUpdateUser(values.name || currentUser.name, values.email || currentUser.email)
    resetForm();
  }

  function handleChangeInput(e) {
    handleChange(e);
    if (profileError.length > 0) {
      setProfileError("");
    }
  }

  function resetStatus() {
    setTimeout(() => setStatus(null), 2000);
  }

  function handleUpdateUser(name, email) {
    projectApi.patchUserInfo(name, email)
      .then((resultUserInfo) => {
        setCurrentUser({
            name: resultUserInfo.user.name,
            email: resultUserInfo.user.email,
            _id: resultUserInfo.user._id
        })
        setStatus('success');
        resetStatus();
      })
      .catch((err) => {
        setStatus('error');
        resetStatus();
        console.error(err);
      });
  }

  function handleLogout() {
    resetForm();
    projectApi.signOut()
      .then(() => {
        clearCachedSearchState();
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function isError(error) {
    const errorClass = !!error ? 'form__input-error form__input-error_active' : 'form__input-error';
    return errorClass
  }

  return (
    <>
      <Header isLoggedIn={loggedIn}/>
      <section className="profile">
        <div className="profile__content">
          <h1 className="profile__title">Привет, {currentUser.name}!</h1>
          <form className="profile__form" onSubmit={handleSubmit}>
            <div className="profile__form-field">
              <label className="profile__form-label">Имя</label>
              <input className="profile__form-input" name="name" minLength="2" maxLength="30" placeholder={currentUser.name} value={values.name} onChange={handleChangeInput}/>
            </div>
            <span className={isError(errors.name)}>{errors.name}</span>
            <div className="profile__form-field">
              <label className="profile__form-label">email</label>
              <input className="profile__form-input" type="email" name="email" placeholder={currentUser.email} value={values.email} onChange={handleChangeInput}/>
            </div>
            <span className={isError(errors.email)}>{errors.email}</span>
            <div className="profile__form-footer">
              {!status && <button className={buttonClassName} type={"submit"}>Редактировать</button>}
              {status === 'success' && <span className="profile__message">Данные успешно изменены!</span>}
              {status === 'error' && <span className="profile__message">Произошла ошибка, не смогли обновить ваши данные</span>}
              <button type="button" className="profile__button profile__button_red" onClick={handleLogout}>Выйти из аккаунта</button>
            </div>
          </form>
        </div>
      </section>
    </>

  );
}

export default Profile;
