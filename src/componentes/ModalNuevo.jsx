import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalNuevo = ({ mostrar, setMostrar, jugadores, setJugadores, cuenta, setCuenta }) => {
    const colorBase = "#aabbcc";

    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState(colorBase);
    const [hex, setHex] = useState(colorBase);
    const reg = /^#([0-9a-f]{3}){1,2}$/i;

    useEffect(() => {
        setNombre("");
        setColor(colorBase);
        setHex(colorBase);

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

    const agregarJugador = () => {
        const nuevoJugador = {
            id: cuenta,
            nombre: nombre,
            color: color,
            puntos: 0,
            ptsPositivos: 0
        };
        setJugadores(
            [...jugadores, nuevoJugador]
        );
        
        setCuenta(c => c + 1);
        setMostrar(false);
    }

    const cerrarModal = () => {
        setMostrar(false);
    }

    return (
        <Modal isOpen={mostrar}>
            <ModalHeader>Agregar jugador</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="6" xs="6">
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /><br />
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
                <Button color="primary" size="sm" onClick={() => agregarJugador()}>Agregar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalNuevo;