import './App.css';
import { useState, useEffect } from 'react';
import Tablero from './componentes/Tablero';
import Grafica from './componentes/Grafica';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

function App() {
    const [recursos, setRecursos] = useState([]); //Lista de recursos (cada uno asociado a una tarjeta)
    const [tabActiva, setTabActiva] = useState("1"); //Pestaña seleccionada (tablero o gráfico)
    const [cargaInicial, setcargaInicial] = useState(true);

    useEffect(() => {
        if (cargaInicial == true) {
            //Evita un bug en caso de que aún no exista el objeto
            if (localStorage.getItem('lista-recursos') !== null) {
                setRecursos(JSON.parse(localStorage.getItem('lista-recursos')));
            }
            setcargaInicial(false);
        }
        else {
            //Guarda la lista de recursos en la memoria local
            localStorage.setItem('lista-recursos', JSON.stringify(recursos));
        }
    }, [recursos]);

    return (
        <Container>
            <h2>Chamba Counter</h2>
            <Nav tabs>
                <NavItem className="nav-tab">
                    <NavLink active={tabActiva == "1"}
                        onClick={() => setTabActiva("1")}>
                        Tablero
                    </NavLink>
                </NavItem>
                <NavItem className="nav-tab">
                    <NavLink active={tabActiva == "2"}
                        onClick={() => setTabActiva("2")}>
                        Grafica
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={tabActiva}>
                <TabPane tabId="1">
                    <Tablero
                        recursos={recursos}
                        setRecursos={setRecursos} />
                </TabPane>
                <TabPane tabId="2">
                    <Grafica
                        recursos={recursos} />
                </TabPane>
            </TabContent>
        </Container>
    )
}

export default App
