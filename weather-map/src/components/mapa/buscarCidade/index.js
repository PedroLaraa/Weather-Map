import React from 'react';

import './buscarCidadeStyle.css';

const BuscarCidade = (props) => {

    return(
        <form className='d-flex justify-content-center' onSubmit={(e) => props.funcaoSubmit(e)}>
            <div className='form-group grupoDeForm'>
                <input placeholder='Cidade...' onChange={(e) => props.funcaoCidade(e)} type='text' className='form-control' />
                <input placeholder='Estado...' onChange={(e) => props.funcaoEstado(e)} type='text' className='form-control' />
                <button type='submit' className='btn btn-outline-dark'>
                    Buscar
                </button>
            </div>
        </form>
    )

};

export default BuscarCidade;