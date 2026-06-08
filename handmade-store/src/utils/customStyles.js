export const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#ffffff',
        borderRadius: '0',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        borderWidth: '2px',
        borderColor: state.isFocused ? '#f8796c' : '#333333', // Бордер при фокус и нормално състояние
        boxShadow: state.isFocused ? '0' : 'none',
        cursor: 'pointer',
        '&:hover': {
            borderColor: '#f8796c', // Бордер при ховър
        },
        color: '#333333',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#333333', // Цвят на текста на избраната опция
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#ffffff', // Фон на падащото меню
        border: 'none',
        boxShadow: 'none',
        borderRadius: '0',
        padding: '0',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#ff6b6b' // Фон на избраната опция вътре в менюто
            : state.isFocused
              ? '#98d8ca' // Фон при посочване с мишката (hover)
              : '#f2f2f2', // Нормален фон на опция
        color: state.isSelected ? '#ffffff' : '#333333', // Цвят на текста
        cursor: 'pointer',
        '&:hover': {
            color: '#ffffff',
        },
        '&:active': {
            backgroundColor: '#f8796c',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#666666', // Цвят на placeholder текста
    }),
};
