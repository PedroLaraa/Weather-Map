import React from 'react';

import './padraoStyle.css'

const Padrao = () => {
    return(
        <div className='row h-100 justify-content-center container-data-padrao'>
            <div className="col-12 text-center m-auto container-padrao">
                <section>
                    <p>Clique em qualquer lugar do mapa <br /> para obter os dados metereológicos!</p>
                </section>
            </div>
        </div>
    )
};

export default Padrao;
