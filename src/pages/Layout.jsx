import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {

  const [isAsideActive, setAsideActive] = useState(true);

  const toggleAside = () => setAsideActive(!isAsideActive);
  return (
    <div className={`app ${isAsideActive ? 'aside-active' : ''}`}>
      <Navbar 
        toggleAside={toggleAside} 
      />
      <Sidebar isActive={isAsideActive} />
      <div className="content content-app" style={{minHeight:"100vh"}}>
        <div className="container">
          {children}
        </div>
      </div>

    </div>
  )
}

export default Layout