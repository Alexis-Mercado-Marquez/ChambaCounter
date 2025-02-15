import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardImg, Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ModalEditar from './ModalEditar';
import ImgPlaceholder from '../assets/Usuario.png';

const Tarjeta = ({ jugadorPrev, jugadores, setJugadores, unidades, borrarJugador, editarJugador }) => {
	const [puntos, setPuntos] = useState(jugadorPrev.puntos); //Cuantos puntos tiene el jugador
	const [mostrarOpc, setMostrarOpc] = useState(false); //Mostrar u ócultar las opciones del botón
	const [mostrarModal, setMostrarModal] = useState(false); //Mostrar u ocultar el modal de creación

	useEffect(() => {
		actualizarJugadores();
	}, [puntos]);

	const actualizarJugadores = () => {
		const ptsPositivos = puntos > 0 ? puntos : 0;

		const jugadorActual = {
			id: jugadorPrev.id,
			color: jugadorPrev.color,
			nombre: jugadorPrev.nombre,
			imagen: jugadorPrev.imagen,
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
						<Col sm="2" xs="2">
							<Row>
								<Col xs="12">
									<ButtonDropdown isOpen={mostrarOpc} toggle={() => setMostrarOpc(!mostrarOpc)}
										className="margen-superior">
										<DropdownToggle caret>

										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={() => editarJugador(jugadorPrev)}>Editar</DropdownItem>
											<DropdownItem onClick={() => borrarJugador(jugadorPrev.id)}>Borrar</DropdownItem>
										</DropdownMenu>
									</ButtonDropdown>
								</Col>
							</Row>
							<Row>
								<Col xs="12"><button type="button" className="boton boton-tarjeta margen-superior" onClick={incrementar}><b>+</b></button></Col>
							</Row>
							<Row>
								<Col xs="12"><button type="button" className="boton boton-tarjeta margen-superior" onClick={decrementar}><b>-</b></button></Col>
							</Row>
						</Col>
						<Col sm="6" xs="6">
							<Row>
								<Col xs="12"><h1 className="texto-grande izquierda">{jugadorPrev.nombre}</h1></Col>
							</Row>
							<Row>
								<Col xs="12"><h1 className="texto-grande izquierda">{puntos}</h1></Col>
							</Row>
						</Col>
						<Col sm="4" xs="4">
							<span className="apoyo"></span>
							<CardImg top width="100%" src={jugadorPrev.imagen} alt="Jugador" />
						</Col>
					</Row>
				</CardBody>
			</Card>


			<ModalEditar
				mostrar={mostrarModal}
				setMostrar={setMostrarModal}
				jugadores={jugadores}
				setJugadores={setJugadores}
				jugador={jugadorPrev}
			/>
		</Container>
    );
}

export default Tarjeta;