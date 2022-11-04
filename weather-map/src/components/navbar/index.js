import React from 'react'

import './navbarStyle.css'

const Navbar = () => {

    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#Home">🌥Weather Map</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#Home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/PedroLaraa/Weather-Map">Projeto</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://pedro-lara.vercel.app" style={{color: 'green'}}>O Desenvolvedor</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" href='#Home' data-bs-toggle="dropdown" aria-expanded="false">
                                Contatos
                            </a>
                            <ul className="dropdown-menu bg-dark dropdown-text">
                                <li><a className="dropdown-item" href="https://github.com/PedroLaraa">GitHub</a></li>
                                <li><a className="dropdown-item" href="https://www.linkedin.com/in/pedro-lara-497723176/">Linkedin</a></li>
                                <li><a className="dropdown-item" href="mailto:pedroalveslara@gmail.com">Email</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

};

export default Navbar;
