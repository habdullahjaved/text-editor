import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark text-white'>
      <a className='navbar-brand' href='#'>
        Editor
      </a>
      <button className='navbar-toggler' type='button' onClick={toggleNavbar}>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
        id='navbarNav'
      >
        <ul className='navbar-nav'>
          <li className='nav-item active'>
            <Link className='nav-link' to={'/'}>
              EditableContent
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/multiple'}>
              EditableContentJson
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/report'}>
              Example
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/props'}>
              Report
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={'/report2'}>
              Report2
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // add an event listener to detect changes in screen size
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 992) {
//         setIsOpen(true); // show the navbar content on larger screens
//       } else {
//         setIsOpen(false); // hide the navbar content on smaller screens
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // trigger the function initially to set the initial state

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
//       <a className='navbar-brand' href='#'>
//         Editor
//       </a>
//       <button
//         className='navbar-toggler'
//         type='button'
//         data-toggle='collapse'
//         data-target='#navbarNav'
//         aria-controls='navbarNav'
//         aria-expanded={isOpen ? 'true' : 'false'}
//         aria-label='Toggle navigation'
//         onClick={() => setIsOpen(!isOpen)} // toggle the isOpen state
//       >
//         <span className='navbar-toggler-icon'></span>
//       </button>
//       <div
//         className={`collapse navbar-collapse ${isOpen && 'show'}`}
//         id='navbarNav'
//       >
//         <ul className='navbar-nav'>
//           <li className='nav-item active'>
//             <Link className='nav-link' to={'/'}>
//               EditableContent
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link className='nav-link' to={'/multiple'}>
//               EditableContentJson
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link className='nav-link' to={'/report'}>
//               Report
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
