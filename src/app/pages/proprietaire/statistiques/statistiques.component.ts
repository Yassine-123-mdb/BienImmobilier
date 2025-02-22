import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css'],
})
export class StatistiquesComponent implements OnInit {
  totalBiens = 15;
  revenuMensuel = 12000;
  reservationsActives = 8;
  tauxOccupation = 75;
  nbAnnoncesAutorise = 10; // Nombre d'annonces autorisées
  nbAnnoncesRestantes = 6; // Nombre d'annonces restantes

  ngOnInit(): void {
    this.createBarChart();
    this.createPieChart();
    this.createGaugeChart();
  }

  // Créer un graphique en barres
  createBarChart(): void {
    const data = [
      { mois: 'Jan', revenu: 10000 },
      { mois: 'Fév', revenu: 12000 },
      { mois: 'Mar', revenu: 15000 },
      { mois: 'Avr', revenu: 11000 },
      { mois: 'Mai', revenu: 13000 },
      { mois: 'Juin', revenu: 14000 },
    ];

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select('#bar-chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.mois))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.revenu) || 0])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.mois) || 0)
      .attr('y', (d) => y(d.revenu))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.revenu))
      .attr('fill', '#36A2EB')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#4BC0C0');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', '#36A2EB');
      });
  }

  // Créer un graphique en camembert
  createPieChart(): void {
    const data = [
      { type: 'Appartement', value: 10 },
      { type: 'Villa', value: 5 },
      { type: 'Terrain', value: 6 },
    ];

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#pie-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal<string>().range(['#FF6384', '#FFCE56', '#36A2EB']);

    const pie = d3.pie<{ type: string; value: number }>().value((d) => d.value);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs
      .append('path')
      .attr('d', (d) => arc(d as any))
      .attr('fill', (d, i) => color(i.toString()))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#4BC0C0');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', color(d.index.toString()));
      });

    arcs
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d as any)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.data.type);
  }

  // Créer un gauge chart avec une aiguille
  createGaugeChart(): void {
    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select('#gauge-chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height})`);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const backgroundArc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2);

    const percent = this.nbAnnoncesRestantes / this.nbAnnoncesAutorise;

    // Couleur dynamique
    const gaugeColor = this.nbAnnoncesRestantes <= 2 ? '#FF6384' : '#4BC0C0';

    // Fond du gauge
    svg
      .append('path')
      .datum({ endAngle: Math.PI / 2 })
      .style('fill', '#e0e0e0')
      .attr('d', backgroundArc as any);

    // Arc coloré
    svg
      .append('path')
      .datum({ endAngle: -Math.PI / 2 + percent * Math.PI })
      .style('fill', gaugeColor)
      .attr('d', arc as any);

    // Aiguille
    const needle = svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', -radius * 0.8)
      .attr('stroke', '#ff5722')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')
      .attr('transform', `rotate(${-90})`); // Position initiale

    // Animation de l'aiguille
    needle
      .transition()
      .duration(1000)
      .attr('transform', `rotate(${-90 + percent * 180})`);

    // Texte au centre (valeur de 1 à 10)
    svg
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '24px')
      .style('fill', '#333')
      .text(`${this.nbAnnoncesRestantes}`);
  }
}