import React from 'react';
// import { push } from 'react-router-redux';

// Базовый компонет, он него наследуем все компоненты проекта

class BaseComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
    // Функция связывает переданные в нее методы с контекстом компонета
    // для последующего использования этих методов в качестве обработчиков событий.
    // Рекомендуется к использованию в конструкторе компонента

    bind(...methods) {
        methods.forEach((method) => {
            this[method] = this[method].bind(this);
        });
    }

    // redirect(dispatch, url) {
    //     setTimeout(() => {
    //         dispatch(push(url));
    //     });
    // }

}

export default BaseComponent;
