import React, { useState, useEffect, useContext } from 'react';

interface ContainerProp {
    className?: string;
    children: any;
}

function Container({ className = '', children }: ContainerProp) {
    return (
        <>
            <div>
                <nav className="w-full bg-red-200 h-20"></nav>
                {children}
            </div>
        </>
    );
}

export default Container;
