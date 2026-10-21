export function ProfileReminder({ missingName, missingAddress, onGoTo }) {
    if (!missingName && !missingAddress) {
        return null;
    }

    return (
        <div className="profile-reminder" role="status">
            <p>Допълнете профила си, за да завършвате поръчките по-бързо.</p>
            {missingName && (
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onGoTo('accountDetails')}>
                    Добавете име
                </button>
            )}
            {missingAddress && (
                <button type="button" className="btn btn-primary" onClick={() => onGoTo('address')}>
                    Добавете адрес
                </button>
            )}
        </div>
    );
}
