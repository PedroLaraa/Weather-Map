import React from 'react'

import { useState } from 'react'

import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";

import { http } from '../../config';

import DescricaoClima from './descricaoClima';

import './mapaStyle.css'

import Padrao from './padrao';

const Mapa = () => {

    const [position, setPosition] = useState(null)

    const [temperaturaRegiao, setTemperaturaRegiao] = useState([])

    const [clima, setClima] = useState([])

    const [cidade, setCidade] = useState("")

    const [background, setBackground] = useState("");

    let latitude, longitude;

    const climaGeral = clima.map(v => v.main)[0]

    const backgroundLinks = {
        clear: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1057%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(202%2c 219%2c 29%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c393.445C79.887%2c409.361%2c165.883%2c408.075%2c238.358%2c370.892C314.011%2c332.078%2c376.299%2c265.063%2c405.725%2c185.288C434.27%2c107.902%2c416.318%2c23.024%2c396.177%2c-56.962C377.662%2c-130.489%2c337.764%2c-192.963%2c294.753%2c-255.405C246.556%2c-325.376%2c213.336%2c-425.986%2c130.134%2c-443.197C45.998%2c-460.601%2c-17.845%2c-365.317%2c-98.904%2c-336.837C-173.951%2c-310.469%2c-271.093%2c-340%2c-326.372%2c-282.803C-381.663%2c-225.594%2c-367.026%2c-132.942%2c-372.664%2c-53.581C-377.91%2c20.266%2c-393.942%2c98.762%2c-358.079%2c163.529C-322.968%2c226.939%2c-245.24%2c247.533%2c-184.248%2c286.695C-123.286%2c325.838%2c-71.051%2c379.289%2c0%2c393.445' fill='%23aab818'%3e%3c/path%3e%3cpath d='M1440 1135.199C1546.219 1143.702 1636.173 1061.91 1721.769 998.442 1802.55 938.544 1877.665 870.428 1920.062 779.237 1962.634 687.668 1976.98 584.79 1960.395 485.179 1944.029 386.88599999999997 1902.681 289.667 1827.632 224.115 1756.55 162.027 1654.169 165.60500000000002 1563.708 138.68900000000002 1472.844 111.65300000000002 1387.457 45.418000000000006 1294.826 65.584 1200.859 86.041 1127.495 163.433 1076.253 244.812 1028.967 319.908 1041.219 413.313 1021.4010000000001 499.815 999.315 596.215 919.538 689.331 953.0989999999999 782.36 986.5889999999999 875.193 1105.893 897.624 1185.805 955.534 1271.56 1017.677 1334.434 1126.748 1440 1135.199' fill='%23d6e53b'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1057'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
        rain: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1033%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(95%2c 102%2c 109%2c 1)'%3e%3c/rect%3e%3cpath d='M1156 188L1155 -37' stroke-width='10' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M262 441L261 300' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M282 113L281 437' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M177 528L176 796' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1 287L0 554' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1303 245L1302 570' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1333 176L1332 -149' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M783 194L782 375' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M833 467L832 219' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1249 268L1248 626' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1051 279L1050 595' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M890 445L889 717' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M363 9L362 241' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M841 453L840 706' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M650 142L649 313' stroke-width='6' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M1142 445L1141 94' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M76 376L75 204' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M246 200L245 -16' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1046 299L1045 479' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M752 119L751 -190' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M783 253L782 -86' stroke-width='10' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M692 228L691 605' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M519 476L518 616' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1418 55L1417 -145' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M62 342L61 694' stroke-width='6' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M1304 185L1303 370' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M394 177L393 -82' stroke-width='10' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M627 514L626 222' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M143 473L142 848' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M546 110L545 475' stroke-width='6' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M110 148L109 -76' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M183 252L182 -71' stroke-width='10' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M212 169L211 316' stroke-width='8' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M945 522L944 900' stroke-width='8' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3cpath d='M784 203L783 538' stroke-width='10' stroke='url(%23SvgjsLinearGradient1034)' stroke-linecap='round' class='Down'%3e%3c/path%3e%3cpath d='M568 364L567 525' stroke-width='6' stroke='url(%23SvgjsLinearGradient1035)' stroke-linecap='round' class='Up'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1033'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='0%25' y1='0%25' x2='0%25' y2='100%25' id='SvgjsLinearGradient1034'%3e%3cstop stop-color='rgba(43%2c 67%2c 111%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(43%2c 67%2c 111%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient1035'%3e%3cstop stop-color='rgba(43%2c 67%2c 111%2c 0)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(43%2c 67%2c 111%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e")`,
        clouds: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1002%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='%231e3266'%3e%3c/rect%3e%3cpath d='M1512 560L0 560 L0 297.96Q66.11 244.07%2c 120 310.18Q170.59 288.77%2c 192 339.37Q242.26 317.63%2c 264 367.89Q266.88 298.76%2c 336 301.64Q361.78 255.42%2c 408 281.21Q466.77 267.98%2c 480 326.74Q525.23 299.97%2c 552 345.19Q598.7 319.89%2c 624 366.59Q640.88 311.46%2c 696 328.34Q721.95 282.29%2c 768 308.24Q821.03 289.27%2c 840 342.3Q891.86 322.15%2c 912 374.01Q938.02 280.03%2c 1032 306.05Q1104.41 258.46%2c 1152 330.87Q1193.66 252.53%2c 1272 294.2Q1341.84 244.04%2c 1392 313.88Q1479.97 281.86%2c 1512 369.83z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M1560 560L0 560 L0 422.26Q5.07 355.33%2c 72 360.4Q142.91 359.31%2c 144 430.22Q165.64 379.86%2c 216 401.5Q228.71 342.21%2c 288 354.91Q329.96 324.87%2c 360 366.83Q403.5 338.33%2c 432 381.84Q521.13 350.97%2c 552 440.1Q564.18 380.29%2c 624 392.47Q668.6 317.07%2c 744 361.67Q825.38 323.05%2c 864 404.43Q909.5 377.94%2c 936 423.44Q979.88 347.32%2c 1056 391.21Q1071.6 334.81%2c 1128 350.41Q1176.17 326.58%2c 1200 374.75Q1290.49 345.24%2c 1320 435.73Q1368.7 364.44%2c 1440 413.14Q1475.63 328.76%2c 1560 364.39z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M1488 560L0 560 L0 506.14Q14.32 448.46%2c 72 462.78Q96.88 415.65%2c 144 440.53Q202.07 426.6%2c 216 484.67Q262.05 410.72%2c 336 456.77Q403.67 404.44%2c 456 472.1Q498.64 394.75%2c 576 437.39Q620.87 410.25%2c 648 455.12Q729.63 416.75%2c 768 498.38Q792.16 450.54%2c 840 474.71Q869.92 432.63%2c 912 462.55Q973.55 452.1%2c 984 513.65Q1013.12 470.76%2c 1056 499.88Q1058.38 430.26%2c 1128 432.65Q1194.91 379.56%2c 1248 446.47Q1320.52 399%2c 1368 471.52Q1435.24 418.76%2c 1488 486.01z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M1464 560L0 560 L0 584.19Q27.64 539.84%2c 72 567.48Q90.2 513.68%2c 144 531.89Q210.78 478.67%2c 264 545.45Q311.77 473.23%2c 384 521Q412.36 477.36%2c 456 505.71Q545.51 475.22%2c 576 564.73Q646.36 515.09%2c 696 585.45Q700.7 518.15%2c 768 522.85Q822.79 457.64%2c 888 512.44Q979.61 484.05%2c 1008 575.65Q1030.63 478.28%2c 1128 500.91Q1175.18 476.1%2c 1200 523.28Q1258.92 510.2%2c 1272 569.12Q1301.19 526.31%2c 1344 555.5Q1383.4 474.9%2c 1464 514.31z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1002'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
        mist: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1196%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1197)'%3e%3c/rect%3e%3cpath d='M1440 0L804.46 0L1440 136.61z' fill='rgba(255%2c 255%2c 255%2c .1)'%3e%3c/path%3e%3cpath d='M804.46 0L1440 136.61L1440 160.08L642.38 0z' fill='rgba(255%2c 255%2c 255%2c .075)'%3e%3c/path%3e%3cpath d='M642.38 0L1440 160.08L1440 225.29000000000002L434.73 0z' fill='rgba(255%2c 255%2c 255%2c .05)'%3e%3c/path%3e%3cpath d='M434.73 0L1440 225.29000000000002L1440 365.57000000000005L268.27 0z' fill='rgba(255%2c 255%2c 255%2c .025)'%3e%3c/path%3e%3cpath d='M0 560L184.36 560L0 310.23z' fill='rgba(0%2c 0%2c 0%2c .1)'%3e%3c/path%3e%3cpath d='M0 310.23L184.36 560L303.53000000000003 560L0 238.74z' fill='rgba(0%2c 0%2c 0%2c .075)'%3e%3c/path%3e%3cpath d='M0 238.74L303.53000000000003 560L374.04 560L0 149.03000000000003z' fill='rgba(0%2c 0%2c 0%2c .05)'%3e%3c/path%3e%3cpath d='M0 149.03000000000003L374.04 560L1022.04 560L0 109.02000000000004z' fill='rgba(0%2c 0%2c 0%2c .025)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1196'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='15.28%25' y1='-39.29%25' x2='84.72%25' y2='139.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1197'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(80%2c 80%2c 80%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");`
    };

    const requestData = async function (req, res) {
        http.get(`weather?lat=${latitude}&lon=${longitude}`)
            .then((res) => {
                setTemperaturaRegiao(res.data.main)
                setClima(res.data.weather)
                setCidade(res.data.name)
                console.log(temperaturaRegiao, clima, cidade)
            }).catch((err) => {
                console.log(err)
            })
    };

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition(map.mouseEventToLatLng(e.originalEvent));
                latitude = map.mouseEventToLatLng(e.originalEvent).lat;
                longitude = map.mouseEventToLatLng(e.originalEvent).lng;
                requestData();
            }
        });

        switch (climaGeral) {
            case "Clear":
                setBackground(backgroundLinks.clear)
                break
            case "Rain":
                setBackground(backgroundLinks.rain)
                break
            case "Clouds":
                setBackground(backgroundLinks.clouds)
                break
            case "Mist":
                setBackground(backgroundLinks.mist)
                break
            default:
                setBackground("whitesmoke")
                break
        }

        return position === null ? null : (
            <Marker position={position}>
                <Popup>{cidade}</Popup>
            </Marker>
        )
    }

    return (
        <div className=' d-flex align-items-center container-div'>
            <div className="map-container row justify-content-center">
                <div className='col-md-5 h-100 map-container-mapa m-2'>
                    <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
                <div className='col-md-5 m-2'>
                    {cidade 
                    ? 
                    <DescricaoClima
                        background={background}
                        climaGeral={clima.map(v => v.description)[0]}
                        temp={temperaturaRegiao.temp}
                        tempMin={temperaturaRegiao.temp_min}
                        tempMax={temperaturaRegiao.temp_max}
                        cidade={cidade}
                    />
                    :  
                    <Padrao />
                    }
                </div>
            </div>
        </div>
    )

};

export default Mapa;
