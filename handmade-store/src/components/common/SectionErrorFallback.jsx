import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function SectionErrorFallback({ error, resetErrorBoundary, title }) {
    const errorMessage = error?.message?.toLowerCase() || '';

    const isNetworkError = errorMessage.includes('fetch') || errorMessage.includes('network') || !navigator.onLine;

    const defaultTitle = title || (isNetworkError ? 'Проблем с връзката' : 'Неочаквана грешка');

    const description = isNetworkError
        ? 'Възникна проблем с връзката до сървъра. Моля, проверете мрежата си и опитайте отново.'
        : 'Неуспешно свързване с базата данни. Опитайте отново по-късно или се свържете с поддръжката.';

    return (
        <div className="section section-padding text-center">
            <div className="container">
                <div className="text-center error-container">
                    <FontAwesomeIcon icon={isNetworkError ? 'wifi' : 'exclamation-circle'} size="3x" className="learts-mb-10 text-primary" />
                    <h3 className="title">{defaultTitle}</h3>
                    <p className="text-muted">{description}</p>

                    <button onClick={resetErrorBoundary} className="btn btn-danger">
                        Опитай отново
                    </button>
                </div>
            </div>
        </div>
    );
}
