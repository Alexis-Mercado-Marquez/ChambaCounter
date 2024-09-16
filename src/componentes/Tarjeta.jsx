import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

const Tarjeta = ({ jugadorPrev, jugadores, setJugadores, unidades, borrarJugador }) => {
	const [puntos, setPuntos] = useState(jugadorPrev.puntos);

	useEffect(() => {
		actualizarJugadores();
	}, [puntos]);

	const actualizarJugadores = () => {
		const ptsPositivos = puntos > 0 ? puntos : 0;

		const jugadorActual = {
			id: jugadorPrev.id,
			nombre: jugadorPrev.nombre,
			color: jugadorPrev.color,
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
						<Col xs="6">
							{ jugadorPrev.nombre.length < 9 ?
								<h1 className="texto-grande">{jugadorPrev.nombre}</h1> :
								<h1 className="texto-mediano">{jugadorPrev.nombre}</h1>
							}
						</Col>
						<Col xs="6"><h1 className="texto-grande">{puntos}</h1></Col>
					</Row>
					<Row>
						<Col xs="6"><button className="boton-tarjeta" onClick={() => borrarJugador(jugadorPrev.id)}>Quitar</button></Col>
						<Col xs="3"><button className="boton-tarjeta" onClick={decrementar}>-</button></Col>
						<Col xs="3"><button className="boton-tarjeta" onClick={incrementar}>+</button></Col>
					</Row>
				</CardBody>
			</Card>
		</Container>
    );
}

export default Tarjeta;