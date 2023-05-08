import { ApiClient } from '../AxiosInstance';
let client = new ApiClient();

export class ParticipantService {

    serviceName = "/Nps";
    get(_this,id) {
            return client.get(this.serviceName+"/"+id)
            .then(res => res.data)
            .then(data => {
                return data;
            }).catch(error => {
                if(error.response === undefined)
                {
                    _this.showError("Erro", "Não foi possível consultar.")
                }else{
                    _this.showError("Erro", "Não foi possível consultar. Detalhes: "+error.response.data.message)
                }
            });
    }

    getAll(_this) {
            return client.get(this.serviceName)
            .then(res => res.data)
            .then(data => {
                _this.setState({ serviceDataGetAll: data });                    
                return data;
            }).catch(error => {
                if(error.response === undefined)
                {
                    _this.showError("Erro", "Não foi possível listar participantes.")
                }else{
                    _this.showError("Erro", "Não foi possível listar participantes. Detalhes: "+error.response.data.message)
                }
            });
    }

    post(_this){
        return client.post(this.serviceName,_this.state)
            .then(res => res.data)
            .then(data => {                                  
                _this.props.history.push('/dashboard'); 
                return data;
            }).catch(error => {
                _this.setState({btnSalvar: false});
                if(error.response === undefined)
                {
                    _this.showError("Erro", "Não foi possível salvar o Nps.")
                }else{
                    _this.showError("Erro", "Não foi possível salvar o Nps. Detalhes: "+error.response.data.message)
                }
            });
    }
}