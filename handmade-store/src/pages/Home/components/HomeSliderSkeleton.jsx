export function HomeSliderSkeleton() {
    return (
        <div className="home-slide-item animate-pulse" style={{ minHeight: '500px', display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div className="home-slide-image bg-gray-200" style={{ width: '50%', height: '400px', borderRadius: '8px' }} />
            <div className="home-slide-content" style={{ width: '40%', paddingLeft: '30px' }}>
                <div className="bg-gray-300 rounded mb-3" style={{ height: '14px', width: '120px', opacity: 1 }} />
                <div className="bg-gray-300 rounded mb-2" style={{ height: '36px', width: '80%', opacity: 1 }} />
                <div className="bg-gray-300 rounded mb-4" style={{ height: '36px', width: '50%', opacity: 1 }} />
                <div className="bg-gray-300 rounded" style={{ height: '20px', width: '100px' }} />
            </div>

            <div className="home-slide-pages d-flex align-items-center gap-2" style={{ position: 'absolute', bottom: '30px', right: '30px' }}>
                <div className="bg-gray-300 rounded-circle" style={{ width: '20px', height: '20px', opacity: 1 }} />
                <div className="bg-gray-300" style={{ width: '40px', height: '2px', opacity: 1 }} />
                <div className="bg-gray-300 rounded-circle" style={{ width: '20px', height: '20px', opacity: 1 }} />
            </div>
        </div>
    );
}
