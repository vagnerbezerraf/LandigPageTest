import React, { Component } from 'react';
import { ParticipantService } from '../service/ParticipantService';
import { Messages } from 'primereact/messages';
import { Growl } from 'primereact/growl';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#b944d6'
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            borderColor: '#0F97C7'
        }
    ]
};

const pieData = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [540, 325, 702, 421],
            backgroundColor: [
                '#0F97C7',
                '#b944d6',
                '#e2841a',
                '#10b163'
            ]
        }]
};

const polarData = {
    datasets: [{
        data: [
            11,
            16,
            7,
            3
        ],
        backgroundColor: [
            '#0F97C7',
            '#b944d6',
            '#e2841a',
            '#10b163'
        ],
        label: 'My dataset'
    }],
    labels: [
        'Blue',
        'Purple',
        'Orange',
        'Green'
    ]
};

const barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#0F97C7',
            borderColor: '#0F97C7',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#e2841a',
            borderColor: '#e2841a',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

const doughnutData = {
    labels: ['A', 'B', 'C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#e2841a",
                "#0F97C7",
                "#10b163"
            ],
            hoverBackgroundColor: [
                "#edb575",
                "#6fc0dd",
                "#6fd0a1"
            ]
        }]
};

const radarData = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(15,151,199,0.2)',
            borderColor: 'rgba(15,151,199,1)',
            pointBackgroundColor: 'rgba(15,151,199,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(15,151,199,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(185,68,214,0.2)',
            borderColor: 'rgba(185,68,214,1)',
            pointBackgroundColor: 'rgba(185,68,214,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(185,68,214,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};
export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            serviceDataGetAll: []
        };

        this.showError = this.showError.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.participantService = new ParticipantService();
    }

    showError(summary, detail) {
        this.growl.show({ severity: 'error', summary: summary, detail: detail, sticky: true });
        this.messages.show({ severity: 'error', summary: summary, detail: detail, });
    }

    changeHandler(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    componentDidMount() {
        localStorage.setItem("filtroCidade", JSON.stringify([]));
        localStorage.setItem("filtroEstado", JSON.stringify([]));
        localStorage.setItem("filtroDataNascimento", JSON.stringify([]));
        this.participantService.getAll(this);
    }

    render() {
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h5 className="centerText">Linear Chart</h5>
                        <Chart type="line" data={lineData} />
                    </div>

                    <div className="card">
                        <h5 className="centerText">Pie Chart</h5>
                        <Chart type="pie" data={pieData} />
                    </div>

                    <div className="card">
                        <h5 className="centerText">Polar Area Chart</h5>
                        <Chart type="polarArea" data={polarData} />
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h5 className="centerText">Bar Chart</h5>
                        <Chart type="bar" data={barData} />
                    </div>

                    <div className="card">
                        <h5 className="centerText">Doughnut Chart</h5>
                        <Chart type="doughnut" data={doughnutData} />
                    </div>

                    <div className="card">
                        <h5 className="centerText">Radar Chart</h5>
                        <Chart type="radar" data={radarData} />
                    </div>
                </div>
                <div className="p-col-12 p-lg-6">
                    <DataTable value={this.state.serviceDataGetAll} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Nome"></Column>
                        <Column field="email" header="E-mail"></Column>
                        <Column field="city" header="Cidade"></Column>
                        <Column field="state" header="Estado"></Column>
                        <Column field="birthDate" header="Data Nascimento"></Column>
                        <Column field="whoNominated" header="Quem Indicou?"></Column>
                    </DataTable>
                </div>
                <Messages ref={(el) => this.messages = el} />
                <Growl ref={(el) => this.growl = el} style={{ marginTop: '75px' }} />
            </div>
        );
    }
}