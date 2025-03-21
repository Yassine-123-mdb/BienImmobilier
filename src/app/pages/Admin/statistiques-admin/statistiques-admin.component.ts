import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-statistiques-admin',
  templateUrl: './statistiques-admin.component.html',
  styleUrls: ['./statistiques-admin.component.css'],
})
export class StatistiquesAdminComponent implements OnInit {
  // Données simulées
  nombreUtilisateurs = 1200;
  nombreBiens = 350;
  revenusMensuels = 50000;
  tauxConversion = 75;

  // Données pour les graphiques
  revenusData = [
    { mois: 'Jan', revenu: 10000 },
    { mois: 'Fév', revenu: 12000 },
    { mois: 'Mar', revenu: 15000 },
    { mois: 'Avr', revenu: 11000 },
    { mois: 'Mai', revenu: 13000 },
    { mois: 'Juin', revenu: 14000 },
  ];

  biensData = [
    { type: 'Appartement', value: 200 },
    { type: 'Villa', value: 100 },
    { type: 'Studio', value: 50 },
  ];

  reservationsData = [
    { mois: 'Jan', reservations: 50 },
    { mois: 'Fév', reservations: 60 },
    { mois: 'Mar', reservations: 80 },
    { mois: 'Avr', reservations: 70 },
    { mois: 'Mai', reservations: 90 },
    { mois: 'Juin', reservations: 100 },
  ];

  ngOnInit(): void {
    this.createLineChart('#line-chart', this.revenusData, 'Revenus');
    this.createPieChart('#pie-chart', this.biensData);
    this.createBarChart('#bar-chart', this.reservationsData, 'Réservations');
  }

  // Créer un graphique en courbes
  createLineChart(selector: string, data: any[], label: string): void {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(selector)
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
      .domain([0, d3.max(data, (d) => d.revenu)!])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d: any) => x(d.mois)! + x.bandwidth() / 2)
      .y((d: any) => y(d.revenu));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Ajouter un dégradé pour la courbe
    svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height)
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#56b3a8' },
        { offset: '100%', color: '#2c3e50' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);
  }

  // Créer un graphique en camembert
  createPieChart(selector: string, data: any[]): void {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3
      .scaleOrdinal<string>()
      .range(['#56b3a8', '#2c3e50', '#ffc107', '#dc3545', '#28a745']);

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
      .attr('d', (d: any) => arc(d))
      .attr('fill', (d, i) => color(i.toString()))
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#488d8d');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', color(d.index.toString()));
      });

    arcs
      .append('text')
      .attr('transform', (d: any) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text((d) => d.data.type);
  }

  // Créer un graphique en barres
  createBarChart(selector: string, data: any[], label: string): void {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 300 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3
      .select(selector)
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
      .domain([0, d3.max(data, (d) => d.reservations)!])
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
      .attr('x', (d) => x(d.mois)!)
      .attr('y', (d) => y(d.reservations))
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.reservations))
      .attr('fill', 'url(#bar-gradient)')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('fill', '#488d8d');
      })
      .on('mouseout', function (event, d) {
        d3.select(this).attr('fill', 'url(#bar-gradient)');
      });

    // Ajouter un dégradé pour les barres
    svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', height)
      .selectAll('stop')
      .data([
        { offset: '0%', color: '#56b3a8' },
        { offset: '100%', color: '#2c3e50' },
      ])
      .enter()
      .append('stop')
      .attr('offset', (d) => d.offset)
      .attr('stop-color', (d) => d.color);
  }
}