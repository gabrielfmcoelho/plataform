interface ErrorProps {
    error: string;
}

export default function Error({ error }: ErrorProps) {
    return (
        <div className="min-h-screen flex items-center justify-center text-center">
            <div>
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Tente Novamente
                </button>
            </div>
        </div>
    );
}
  