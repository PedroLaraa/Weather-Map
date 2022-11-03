import React from 'react';

import './padraoStyle.css'

const Padrao = () => {
    return(
        <div className='row h-100 justify-content-center container-data-padrao'>
            <div className="col-12 text-center m-auto container-padrao">
                <section>
                    <p>Clique em cidades do mapa para obter o clima!</p>
                </section>
            </div>
        </div>
    )
};

export default Padrao;
