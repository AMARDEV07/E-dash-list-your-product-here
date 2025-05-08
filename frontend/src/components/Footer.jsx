import React from 'react';
import githubIcon from '../assets/github-brands.svg';
import linkedinIcon from '../assets/linkedin-brands.svg';
import emailIcon from '../assets/envelope-solid.svg';
import twitterIcon from '../assets/twitter-brands.svg';

function Footer() {
  return (
    <div className='footer'>
      <h2>e-dashBoard</h2>
      <p>&copy; Amardev Panwar {new Date().getFullYear()} All rights reserved</p>

      <div className="footerLinks">
        <a href="https://github.com/AMARDEV07" target="_blank" rel="noopener noreferrer">
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
        <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer">
          <img src={emailIcon} alt="Email" />
        </a>
        <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
