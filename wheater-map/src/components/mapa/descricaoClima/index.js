
import "./descricaoClimaStyle.css";

const DescricaoClima = (props) => {

    return (
        <div className="row">
            <div className="col-4">
                <ul>
                    <li>
                        Atual: { props.temp }
                    </li>
                    <li>
                        Mínima: { props.tempMin }
                    </li>
                    <li>
                        Máxima: { props.tempMax }
                    </li>
                </ul>
            </div>
            <div className="col-4">
                <ul>
                    <li>
                        { }
                    </li>
                </ul>
            </div>
            <div className="col-4">
                <ul>
                    <li>
                        { }
                    </li>
                </ul>
            </div>
        </div>
    )

};

export default DescricaoClima;
