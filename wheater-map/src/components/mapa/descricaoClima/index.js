import { useState } from "react";

import "./descricaoClimaStyle.css";

const DescricaoClima = (props) => {

    const descricaoClima = typeof(props.climaGeral) == "string" ? props.climaGeral.toUpperCase() : props.climaGeral
    
    const cidade = typeof(props.cidade) == "string" ? props.cidade.toUpperCase() : props.cidade

    return (
        <div 
        className="row h-100 container-data justify-content-center"
        style={{backgroundImage: props.background}}
        >
            <div className="col-12 text-center m-auto">
                <h4>Cidade: {cidade}</h4>
                <h4>Descrição: {descricaoClima}</h4>
                <section className="section-temperatura">
                    <p>Atual: {props.temp}°</p>
                    <p>Mínima: {props.tempMin}°</p>
                    <p>Máxima: {props.tempMax}°</p>
                </section>
            </div>
        </div>
    );

};

export default DescricaoClima;
