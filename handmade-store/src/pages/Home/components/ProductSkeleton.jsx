export function ProductSkeleton() {
    return (
        <div className="col">
            <div className="product animate-pulse">
                <div className="product-thumb bg-gray-200 rounded-0" style={{ minHeight: '493px', width: '100%' }}>
                    <div className="position-absolute rounded-circle bg-gray-300" style={{ top: '20px', right: '20px', width: '40px', height: '40px' }} />
                </div>

                <div className="product-info pt-3">
                    <div className="mb-2">
                        <div className="bg-gray-200 rounded mb-1" style={{ height: '14px', width: '85%' }} />
                        <div className="bg-gray-200 rounded" style={{ height: '14px', width: '50%' }} />
                    </div>

                    <div className="bg-gray-300 rounded mb-3" style={{ height: '16px', width: '30%' }} />
                </div>
            </div>
        </div>
    );
}
