import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, PieChart, Pie } from 'recharts';
import { useState, useEffect } from 'react';

const Grafica = ({ jugadores }) => {
    const [grafico, setGrafico] = useState("barras"); //Mostrar la gráfica de barras o la de pastel
    const [radio, setRadio] = useState(1.0); //Radio de la gráfica de pastel
    const foo_height = 500;

    useEffect(() => {
        const resizeObserver = new ResizeObserver((event) => {
            //Obtiene la anchura del contenedor
            setRadio(event[0].contentBoxSize[0].inlineSize * 0.35);
        });

        resizeObserver.observe(document.getElementById("div-grafico"));
    });

    const RADIAN = Math.PI / 180;

    //Crea la etiqueta con la que muestra los datos en el pastel
    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, data } = props;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    //A: Intentar ponder los números dentro del gráfico
    //B: Ponerlos a la derecha si hay negativos y a la izquierda si no
    //C: Colocar los nombres de los jugadores del lado opuesto
    //D: Tener un segundo eje x con los números fijos

    return (
        <div className="margen-superior">
            <ButtonGroup>
                <Button color="secondary" onClick={() => setGrafico("barras")}>Barras</Button>
                <Button color="secondary" onClick={() => setGrafico("pastel")}>Pastel</Button>
            </ButtonGroup>

            <div id="div-grafico" className="margen-superior">
                {grafico == "barras" ? 
                    <ResponsiveContainer width="100%" height={foo_height}>
                        <BarChart data={jugadores} layout="vertical" margin={{ top: 20, left: 20, right: 20 }}
                        >
                            <XAxis hide axisLine={false} type="number" />
                            <YAxis yAxisId={0} dataKey="nombre" type="category"
                            />
                            <Bar
                                dataKey="puntos"
                                fill="#8884d8"
                                barSize={32}
                                label={{ position: 'left', fontSize: 25 }}
                            >
                                {jugadores.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    :
                    <ResponsiveContainer width="100%" height={foo_height}>
                        <PieChart width="100%" height="100%">
                            <Pie
                                data={jugadores}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={radio}
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