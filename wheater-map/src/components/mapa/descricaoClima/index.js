
import { useState } from "react";
import "./descricaoClimaStyle.css";

const DescricaoClima = (props) => {

    

    return (
        <div 
        className="row h-100 container-data"
        style={{backgroundImage: props.background}}
        >
            <div className="col-4">
                <section>
                    <p>Atual: {props.temp}</p>
                    <p>Mínima: {props.tempMin}</p>
                    <p>Máxima: {props.tempMax}</p>
                </section>
            </div>
            <div className="col-4">
                <section>
                    <p></p>
                </section>
            </div>
            <div className="col-4">
                <section>
                    <p></p>
                </section>
            </div>
        </div>
    )

};

export default DescricaoClima;
