import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ModalNuevo = ({ mostrar, setMostrar, jugadores, setJugadores, cuenta, setCuenta }) => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("#aabbcc");

    //Evita que aparezca un mensaje de error relativo a la obsolecencia de las "defaultProps"
    useEffect(() => {
        setNombre("");
        setColor("#aabbcc");

        const originalConsoleError = console.error;

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
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Color</Label>
                        <HexColorPicker color={color} onChange={setColor} />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="danger" size="sm" onClick={() => cerrarModal()}>Cerrar</Button>
                <Button color="primary" size="sm" onClick={() => agregarJugador()}>Agregar</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ModalNuevo;