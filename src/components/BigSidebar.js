import Wrapper from '../assets/wrappers/BigSidebar';
import Logo from '../components/Logo';
import NavLinks from './NavLinks';
import { useSelector } from 'react-redux';

const BigSidebar = (props) => {
  const { isSidebarOpen } = useSelector((store) => store.user)
  
  return (
      <Wrapper>
        <div className={isSidebarOpen
                        ? 'sidebar-container'
                        : 'sidebar-container show-sidebar'}>
          <div className="content">
            <header>
              <Logo/>
            </header>
            <NavLinks/>
          </div>
        </div>
      </Wrapper>
  )
};

export default BigSidebar;
