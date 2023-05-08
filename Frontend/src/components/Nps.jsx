import {Messages} from 'primereact/messages';
import {Growl} from 'primereact/growl';
import {Button} from 'primereact/button';
import React, {Component} from 'react';
import {ParticipantService } from '../service/ParticipantService';
import { Rating } from 'primereact/rating';
import { RadioButton } from 'primereact/radiobutton';

export class Nps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idParticipant: "",
            score: 0,
            recommendation: "false",
            date:"",
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
                        <h1>Pesquisa de Opnião</h1>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="name">Qual a nota?</label>
                                </div>
                                <div className="p-col-12">
                                <Rating 
                                value={this.state.rating} 
                                cancel={false} 
                                stars={10}
                                onChange={this.changeHandler} ></Rating>                               
                                </div>
                            </div>
                            <div className="p-col-12 p-md-4">
                                <div className="p-col-12">
                                    <label htmlFor="email">Recomendaria para outra pessoa?</label>
                                </div>
                                <div className="p-col-12">
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                        inputId="score" 
                                        name="score" 
                                        value="true" 
                                        onChange={this.changeHandler}
                                        checked={this.state.recommendation === 'true'} />
                                        <label htmlFor="sim" className="ml-2">Sim</label>
                                    </div>
                                    <div className="flex align-items-center">
                                        <RadioButton 
                                        inputId="score" 
                                        name="score" 
                                        value="false" 
                                        onChange={this.changeHandler}
                                        checked={this.state.recommendation === 'false'} />
                                        <label htmlFor="nao" className="ml-2">Não</label></div>                                
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