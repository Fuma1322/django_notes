import React from 'react';

export default function NotFound() {
    return (
        <div>
            <main>
                <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-center h-screen md:px-8">
                    <div className="max-w-lg mx-auto text-center space-y-6">
                        <h3 className="text-indigo-600 font-semibold">
                            404 Error
                        </h3>
                        <p className="text-gray-800 text-4xl font-semibold sm:text-5xl">
                            Page not found
                        </p>
                        <p className="text-gray-600">
                            Sorry, the page you are looking for could not be found or has been removed.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                            <a
                                href="/"
                                className="block py-2 px-4 text-black font-medium rounded-lg hover:text-indigo-700"
                            >
                                Go back
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}