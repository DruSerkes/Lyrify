import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const user = useSelector((state) => state.user);
    return (
        {user ? }
    )
};

export default Navbar;
