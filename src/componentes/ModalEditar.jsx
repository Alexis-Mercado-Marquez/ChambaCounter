import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalEditar = ({ mostrar, setMostrar, jugadores, setJugadores, jugador }) => {
    const [nombre, setNombre] = useState(jugador.nombre);
    const [color, setColor] = useState(jugador.color);

    //Color del control de texto
    const [hex, setHex] = useState(jugador.color);
    const reg = /^#([0-9a-f]{3}){1,2}$/i;

    useEffect(() => {
        setNombre(jugador.nombre);
        setColor(jugador.color);
        setHex(jugador.color);

        const originalConsoleError = console.error;

        //Evita que aparezca un mensaje de error relativo a la obsolecencia de las "defaultProps"
        console.error = (...args) => {
            if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
                return;
            }

            originalConsoleError(...args);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, [mostrar]);

    useEffect(() => {
        //Actualiza el color si 'hex' es un código válido
        if (reg.test(hex)) {
            setColor(hex);
        }
        else {
            setColor('#FFFFFF');
        }
    }, [hex]);

    useEffect(() => {
        //Actualiza 'hex' si 'color' no tiene su valor por defecto
        if (color != '#FFFFFF') {
            setHex(color);
        }
    }, [color]);

    const actualizarJugador = () => {
        const nuevoEstado = jugadores.map(obj => {
            //Si el id coincide, actualiza el nombre y el color
            if (obj.id === jugador.id) {
                return { ...obj, nombre: nombre, color: color };
            }

            //De otro modo, devuelve el objeto sin cambios
            return obj;
        });

        setJugadores(nuevoEstado);
        setMostrar(false);
    }

    const cerrarModal = () => {
        setMostrar(false);
    }

    return (
        <Modal isOpen={mostrar}>
            <ModalHeader>Editar jugador</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="6" xs="6">
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br/>
                        <Label>Color</Label>
                        <Input name="color" value={hex} onChange={(e) => setHex(e.target.value)} />
                    </Col>
                    <Col sm="6" xs="6">
                        <HexColorPicker color={color} onChange={setColor} />
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                <Button color="primary" size="sm" onClick={() => actualizarJugador()}>Guardar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalEditar;