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
            <p>Проект Jobster -  приложение для управления откликами на вакансии, на которые подал заявку пользователь. Все предложения о работе содержат информацию о названии должности, компании, месте работы, текущем статусе, типе контракта и дате подачи заявления. Основная цель Jobster — предоставить пользователям возможность хранить и управлять предложениями о работе, на которые они подали заявки.
            </p>
            <Link to="/register" className="btn btn-hero">Login/Register</Link>
          </div>
          <img src={main} alt="job hunt" className="img main-img"/>
        </div>
      </Wrapper>
  )
};

export default Landing;
