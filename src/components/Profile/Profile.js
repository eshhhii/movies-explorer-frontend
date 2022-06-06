import React from "react";
import "./Profile.css";
import Greeting from "../Greeting/Greeting";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Form from "../Form/Form";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useValidation } from "../../utils/validation";

function Profile({ onSignOut, onUpdate }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, setValues } = useValidation();

  const [visibleSubmitButton, setVisibleSubmitButton] = React.useState(false);
  const [isDisabledInput, setDisabledInput] = React.useState(true);

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdate({
            name: values.name,
            email: values.email,
        });

        setVisibleSubmitButton(false);
        setDisabledInput(true);
    }

    function handleClickEditButton() {
        setDisabledInput(false);
        setVisibleSubmitButton(true);
    }

    React.useEffect(() => {
        setValues(currentUser);
    }, [currentUser, setValues]);

    return (
        <>
            <Header />
            <section className="profile">
                <Greeting text={`Привет, ${currentUser.name}!`} loggedIn={true} name="profile" />
                <Form name="profile__form" noValidate onSubmit={handleSubmit}>
                    <Input
                        editProfile
                        id="name"
                        label="Имя"
                        name="name"
                        type="text"
                        placeholder="Имя"
                        minLength="2"
                        maxLength="30"
                        onChange={handleChange}
                        value={values.name || currentUser.name}
                        error={errors.name}
                        required
                        autoComplete="off"
                        disabled={isDisabledInput}
                    />
                    <Input 
                    editProfile 
                    id="email" 
                    label="E-mail" 
                    name="email" 
                    type="email" 
                    placeholder="Почта" 
                    onChange={handleChange} 
                    value={values.email || currentUser.email} 
                    error={errors.email} 
                    required 
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    autoComplete="off"
                    disabled={isDisabledInput} />

                    <div className="profile__container">
                        {!visibleSubmitButton && (
                            <>
                                <button type="button" className="profile__button" onClick={handleClickEditButton}>
                                    Редактировать
                                </button>
                                <button type="button" className="profile__button profile__button_exit" onClick={onSignOut}>
                                    Выйти из аккаунта
                                </button>
                            </>
                        )}

                        {visibleSubmitButton && (
                            <button type="submit" className={`profile__button-submit 
                            ${!isValid &&  "profile__button-submit_disabled"}
                            ${
                                values.email === currentUser.email &&
                                values.name === currentUser.name &&
                                "profile__button-submit_disabled"
                            }`}
                                disabled={!isValid}>
                                Сохранить
                            </button>
                        )}
                    </div>
                </Form>
            </section>
        </>
    );
}

export default Profile;
