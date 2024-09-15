import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, Cell, PieChart, Pie } from 'recharts';
import { useState, useEffect } from 'react';

const Grafica = ({ jugadores }) => {
    const [grafico, setGrafico] = useState("barras"); //Mostrar la gráfica de barras o la de pastel
    const foo_height = 500;

    /*useEffect(() => {
        console.log(jugadores);
    }, [jugadores]);*/

    /*
    CORREGIR BUG: al mostrar puntos negativos en la gráfica de pastel
    añade una propiedad extra al objeto jugador, que también contenga puntos, pero convirtiendo en 0 todos los negativos
    */

    const RADIAN = Math.PI / 180;

    //Crea la etiqueta con la que muestra los datos en el pastel
    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, data } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${props.nombre}: ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="margen-superior">
            <ButtonGroup>
                <Button color="primary" onClick={() => setGrafico("barras")}>Barras</Button>
                <Button color="danger" onClick={() => setGrafico("pastel")}>Pastel</Button>
            </ButtonGroup>

            <div className="div-grafico margen-superior">
                {grafico == "barras" ? 
                    <ResponsiveContainer width="100%" height={foo_height}>
                        <BarChart data={jugadores} margin={{ top: 20 }} width="100%" height="100%">
                            <XAxis dataKey="nombre" />
                            <Bar dataKey="puntos" fill="#8884d8" label={{ position: 'top', fontSize: 25 }} >
                                {jugadores.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    <ResponsiveContainer width="100%" height={foo_height}>
                        <PieChart width={500} height={500}>
                            <Pie
                                data={jugadores}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={200}
                                fill="#8884d8"
                                dataKey="ptsPositivos"
                            >
                                {jugadores.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                }
            </div>
        </div>
    );
}

export default Grafica;