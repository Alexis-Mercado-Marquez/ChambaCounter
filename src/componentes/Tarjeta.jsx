import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, CardBody, Row, Col, Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Tarjeta = ({ jugadorPrev, jugadores, setJugadores, unidades, borrarJugador }) => {
	const [puntos, setPuntos] = useState(jugadorPrev.puntos); //Cuantos puntos tiene el jugador
	const [nombre, setNombre] = useState(jugadorPrev.nombre); //Nombre del jugador
	const [mostrarOpc, setMostrarOpc] = useState(false); //Mostrar u ócultar las opciones del botón

	useEffect(() => {
		actualizarJugadores();
	}, [puntos, nombre]);

	const actualizarJugadores = () => {
		const ptsPositivos = puntos > 0 ? puntos : 0;

		const jugadorActual = {
			id: jugadorPrev.id,
			color: jugadorPrev.color,
			nombre: nombre,
			puntos: puntos,
			ptsPositivos: ptsPositivos
		};

		const listaJugadores = jugadores.map((jug) =>
			jug.id === jugadorActual.id ? jugadorActual : jug
		);

		setJugadores(listaJugadores);
	}

	const incrementar = () => {
		setPuntos(puntos => puntos + Number(unidades));
	};

	const decrementar = () => {
		setPuntos(puntos => puntos - Number(unidades));
	};

    return (
		<Container className="div-tarjeta">
			<Card>
				<CardBody style={{ backgroundColor: `${jugadorPrev.color}`, borderColor: `${jugadorPrev.color}` }}>
					<Row>
						<Col sm="9" xs="12"><Input placeholder="Jugador" value={nombre} onChange={(e) => setNombre(e.target.value)} /></Col>
						{/*<Col sm="3" xs="4"><button className="boton boton-borrar" onClick={() => borrarJugador(jugadorPrev.id)}><b>X</b></button></Col>*/}
						<Col sm="3" xs="4">
							<ButtonDropdown isOpen={mostrarOpc} toggle={() => setMostrarOpc(!mostrarOpc)}>
								<DropdownToggle caret>
									OP
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={console.log("Hola")}>Editar</DropdownItem>
									<DropdownItem onClick={console.log("Adios")}>Borrar</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</Col>
						<Col sm="2" xs="4"><button className="boton boton-tarjeta margen-superior" onClick={decrementar}><b>-</b></button></Col>
						<Col sm="2" xs="4"><button className="boton boton-tarjeta margen-superior" onClick={incrementar}><b>+</b></button></Col>
						<Col sm="8" xs="12"><h1 className="texto-grande">{puntos}</h1></Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
    );
}

export default Tarjeta;