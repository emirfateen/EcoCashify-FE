import React from 'react';
import { useParams } from 'react-router-dom';
import check from '../assets/check.svg';
const SuccessfulPage = () => {
    const { message } = useParams();

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <img src={check} alt="Check" className="w-20 h-20 mx-auto" />
                <h1 className="text-xl font-bold text-green-600 my-10 text-wrap max-w-80">{message} has been completed successfully.</h1>
                <a className='bg-main-green text-white py-2 px-5 rounded-xl font-bold' href='/home'>Ok</a>
            </div>
        </div>
    );
};

export default SuccessfulPage;