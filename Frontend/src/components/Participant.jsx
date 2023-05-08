import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import {Messages} from 'primereact/messages';
import {Growl} from 'primereact/growl';
import {Button} from 'primereact/button';
import React, {Component} from 'react';
import {ParticipantService } from '../service/ParticipantService'

export class Participant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            city:"",
            state:"",
            birthDate: "",
            whoNominated: "",
            btnSalvar: false
        };

        this.service = new ParticipantService();
        this.salvar = this.salvar.bind(this);
        this.showError = this.showError.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {           
        let id = this.props.location.search.split('=')[1]
        if(id !== undefined){
            localStorage.setItem("resultado", []);
            this.resultadoService.get(this, id).then(data =>this.carregaState(data)); 
        }
    }

    showError(summary,detail) {
        this.growl.show({severity: 'error', summary: summary, detail: detail, sticky: true});
        this.messages.show({severity: 'error', summary: summary, detail: detail});
    }

    changeHandler = event => {      
        this.setState({[event.target.name]: event.target.value});
    }

    salvar(){
        this.setState({btnSalvar: true});
        var erros = [];
        if(this.state.name === null)
            erros.push("Cadastre seu Nome."); 
        if(this.state.email === null)
            erros.push("Cadastre seu E-mail."); 
        if(this.state.city === null)
            erros.push("Cadastre sua Cidade."); 
        if(this.state.state === null)
            erros.push("Cadastre seu Estado");   
        if(this.state.birthDate === null)
            erros.push("Cadastre sua Data de Nascimento.");              

        if(erros.length===0){ 
            this.service.post(this);   
        }else{
            this.setState({btnSalvar: false});
            this.showError(erros.join(', '),"");
        }       
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1>Cadastro Participante</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="name">Nome</label>
                                </div>
                                <div className="p-col-12">
                                    <InputText 
                                    id="name" 
                                    name="name" 
                                    placeholder="Nome do Participante" 
                                    value={this.state.name} 
                                    onChange={this.changeHandler} />                                
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="email">E-mail</label>
                                </div>
                                <div className="p-col-12">
                                    <InputText 
                                    id="email" 
                                    name="email" 
                                    placeholder="E-mail" 
                                    value={this.state.email} 
                                    onChange={this.changeHandler} />                                
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="city">Cidade</label>
                                </div>
                                <div className="p-col-12">
                                    <InputText 
                                    id="city" 
                                    name="city" 
                                    placeholder="Cidade" 
                                    value={this.state.city} 
                                    onChange={this.changeHandler} />                                
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="state">Estado</label>
                                </div>
                                <div className="p-col-12">
                                    <InputText 
                                    id="state" 
                                    name="state" 
                                    placeholder="Estado" 
                                    value={this.state.estado} 
                                    onChange={this.changeHandler} />                                
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="birthDate">Data de Nascimento</label>
                                </div>
                                <div className="p-col-12">
                                    <Calendar 
                                    id="birthDate" 
                                    readOnly={true} 
                                    dateFormat="dd/mm/yy" 
                                    placeholder="Selecione" 
                                    value={this.state.birthDate} 
                                    onChange={(e) => {this.setState({birthDate: e.value})}} />                                                             
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="whoNominated">Quem indicou</label>
                                </div>
                                <div className="p-col-12">
                                    <InputText 
                                    id="whoNominated" 
                                    name="whoNominated" 
                                    placeholder="Quem indicou" 
                                    value={this.state.whoNominated} 
                                    onChange={this.changeHandler} />                                
                                </div>
                            </div>
                        </div> 
                        <div className="p-col-12 p-md-12" style={{textAlign:'right'}}>
                            <Button 
                            label="Participar!" 
                            style={{marginBottom:'10px',marginLeft:'10px'}} 
                            className="p-button-raised" 
                            onClick={this.salvar} 
                            disabled={this.state.btnSalvar}/> 
                        </div>  
                        <div className="p-col-12 p-md-12" style={{textAlign:'right'}}>
                            <Messages ref={(el) => this.messages = el} />
                            <Growl ref={(el) => this.growl = el} style={{marginTop: '75px'}} />
                        </div>                                                        
                    </div>
                </div>
            </div>
        );
    }
}