import React from 'react';
import { Container, Row, Col, Input, Button } from 'reactstrap';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ModalNuevo from './ModalNuevo';
import Tarjeta from './Tarjeta';

const Jugadores = () => {
    const [mostrarModal, setMostrarModal] = useState(false); //Mostrar u ocultar el modal de creación
    const [jugadores, setJugadores] = useState([]); //Lista de jugadores (cada uno con una tarjeta)
    const [cuenta, setCuenta] = useState(0); //Cuenta usada para crear los id únicos
    const [unidades, setUnidades] = useState(1); //Cuantas unidades incremente o decrementan los puntos

    useEffect(() => {
        console.log(jugadores);
    }, [jugadores]);

    const borrarJugador = async (idBorrar) => {
        var respuesta = window.confirm("¿Quieres borrar a este jugador?");
        if (!respuesta) {
            return;
        }

        setJugadores(jugadores.filter((jug) => jug.id !== idBorrar));
    }

    return (
        <Container>
            <Row>
                <Col><Input type="number" name="aumento" value={unidades} onChange={(e) => setUnidades(e.target.value)} /></Col>
                <Col><Button color="primary" size="sm" onClick={() => setMostrarModal(true)}>Nuevo</Button></Col>
            </Row>

            <ModalNuevo
                mostrar={mostrarModal}
                setMostrar={setMostrarModal}
                jugadores={jugadores}
                setJugadores={setJugadores}
                cuenta={cuenta}
                setCuenta={setCuenta}
            />

            {jugadores.map((obj) => (
                <div key={obj.id}>
                    <Tarjeta
                        jugadorPrev={obj}
                        jugadores={jugadores}
                        setJugadores={setJugadores}
                        unidades={unidades}
                        borrarJugador={borrarJugador}
                    />
                </div>
            ))}
        </Container>
    );
}

export default Jugadores;