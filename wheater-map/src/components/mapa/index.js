import React from 'react'

import { useState } from 'react'

import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";

import { http } from '../../config';
import DescricaoClima from './descricaoClima';

import './mapaStyle.css'

const Mapa = () => {

    const [position, setPosition] = useState(null)

    const [temperaturaRegiao, setTemperaturaRegiao] = useState([])

    const [clima, setClima] = useState([])

    const [cidade, setCidade] = useState("")

    function LocationMarker() {
        const map = useMapEvents({
            click(e) {
                setPosition(map.mouseEventToLatLng(e.originalEvent))
                const latitude = position.lat
                const longitude = position.lng
                http.get(`weather?lat=${latitude}&lon=${longitude}`)
                .then((res) => {
                    setTemperaturaRegiao(res.data.main)
                    setClima(res.data.weather)
                    setCidade(res.data.name)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }

    console.log(temperaturaRegiao, clima, cidade)

    return (
        <div className="map-container row">
            <div className='col-6'>
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
            <div className='col-6'>
                <DescricaoClima 
                temp={temperaturaRegiao.temp}
                tempMin={temperaturaRegiao.temp_min}
                tempMax={temperaturaRegiao.temp_max}
                />
            </div>
        </div>
    )

};

export default Mapa;
