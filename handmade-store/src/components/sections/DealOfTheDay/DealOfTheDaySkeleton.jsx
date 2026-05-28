export function DealOfTheDaySkeleton() {
    return (
        <div className="col">
            <div className="product animate-pulse">
                <div className="product-thumb bg-gray-200 rounded-0" style={{ minHeight: '487.6px', width: '100%' }}>
                    <div className="position-absolute rounded-circle bg-gray-300" style={{ top: '20px', left: '20px', width: '45px', height: '45px' }} />
                    <div className="position-absolute rounded-circle bg-gray-300" style={{ top: '20px', right: '20px', width: '40px', height: '40px' }} />
                </div>

                <div className="product-info pt-3">
                    <div className="bg-gray-200 rounded mb-2" style={{ height: '14px', width: '75%' }} />

                    <div className="d-flex gap-2 mb-3">
                        <div className="bg-gray-200 rounded" style={{ height: '14px', width: '50px' }} />
                        <div className="bg-gray-300 rounded" style={{ height: '14px', width: '50px' }} />
                    </div>

                    <div className="product-buttons d-flex gap-2 mb-3">
                        <div className="bg-gray-200 rounded-circle" style={{ width: '36px', height: '36px' }} />
                        <div className="bg-gray-200 rounded-circle" style={{ width: '36px', height: '36px' }} />
                    </div>

                    <div className="product-stock-status mt-2">
                        <div className="bar bg-gray-200" style={{ height: '10px', width: '100%', borderRadius: '5px' }} />
                        <div className="d-flex justify-content-between mt-2">
                            <div className="bg-gray-200 rounded" style={{ height: '12px', width: '80px' }} />
                            <div className="bg-gray-200 rounded" style={{ height: '12px', width: '70px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
