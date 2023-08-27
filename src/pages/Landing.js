import { Logo } from '../components';
import main     from '../assets/images/hero.svg';
import Wrapper  from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = (props) => {
  return (
      <Wrapper>
        <nav>
          <Logo/>
        </nav>
        <div className="container page">
          {/* info */}
          <div className="info">
            <h1>
              job <span>tracking</span> app
            </h1>
            <p>Jobster -  приложение для управления откликами на вакансии, на которые подал заявку пользователь. Все предложения о работе содержат информацию о названии должности, компании, месте работы, текущем статусе, типе контракта и дате отклика.
            </p>
            <Link to="/register" className="btn btn-hero">Login/Register</Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img"/>
        </div>
      </Wrapper>
  )
};

export default Landing;
