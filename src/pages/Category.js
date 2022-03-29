import React, { Component } from 'react';

import '../assets/css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const urlGet = "http://localhost/ecomoving/public/api/category/list";
const urlPost = "http://localhost/ecomoving/public/api/category/create";
const urlPut = "http://localhost/ecomoving/public/api/category/edit/";
const urlDelete = "http://localhost/ecomoving/public/api/category/delete/";
const header ={
  headers: {
    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NDg1NzA5NjMsImV4cCI6MTY0ODYxNDE2Mywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImhlY3RvckBnbWFpbC5jb20ifQ.YcKdvRCJ6C49KvBW3R7QqdqEXGzQHN_kDEbiIJlLvt2Zrxn_UZlyzINdwMrw2zIzZKuJGQ-77i7UxwIMP-HAoIsfgdnNy_Ei9off_OQZCdAlN-5LFXeemggJRsvmOY7yth_I2-k9NYD66S1wx7wDD7x9j5CGzgEyn_-AnGsJ6QMn2ZJHlDZ17RlnsupE5Z16T7APcUHKxdmWkmsASpYE9AYAq-zKOpnyBh_f9fN6k4U3VkW3FNMjZ8A6yetgo_a4hkuJjQsjuddyZDxFxGuQWDVNGYxCSlbp1A1SzaVoCePOq2U_3V40F90CU4_j3c1DQcWn2cohfMoJqHoh1Ux4Omwhb3XufVApLRO5MqtMeD8ZRiUxeE2_AUc_CKB-m_y68R6xtt-7k6s0DjjYFF5Hugp1KXk_sVqHZZN0GM4Q_7ej7av75CnffhOn83j8DDxNpbMP_Hop_SXSbnlnf5cXE8bG54R5Vul-7rgTvrUGu-np9ImCacNdM83SSg3lkB-XPP_WQdZ54IYDDekUEDrm319ecFcIcPyuqcV8zUmtI3ftq_1fMCdFMgQbl3XL_9TboTS23HYFeZ8-o5UkQXrpo_LqmwtxVnSF2VN0sWdMV6afs_E1EiM7NH--PLnXh_RpSOUSO6rWWqJXsbKCbBMiiRn-1PIXH2WfImE9o376qtI `
  }
};

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      name: '',
      description: '',
      status: '',
      tipoModal: '',
    }
  }

  peticionGet = () => {
    axios.get(urlGet,
      header
      ).then((response) => {
      console.log(response.data.items);
      console.log(response);
      this.setState({ data: response.data.items });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(urlPost, this.state.form, header).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

 

  peticionPut = () => {
    axios.put(urlPut + this.state.form.id, this.state.form).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(urlDelete+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  seleccionarCategoria = (category) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: category.id,
        name: category.name,
        description: category.description,
        status: category.status
      }
    })
  }

  handleChange = async e => {
    e.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }


  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const { form } = this.state
    return (
      < div className="App" >
        <br /><br /><br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Categoria</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Description</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(category => {
              return (
                <tr>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.status ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarCategoria(category); this.modalInsertar() }} ><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    
                    <button className="btn btn-danger" onClick={() => { this.seleccionarCategoria(category); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">ID</label>
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
              <br />
              <label htmlFor="nombre">Name</label>
              <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form ? form.name : ''} />
              <br />
              <label htmlFor="nombre">Description</label>
              <input className="form-control" type="text" name="description" id="description" onChange={this.handleChange} value={form ? form.description : ''} />
              <br />
              <label htmlFor="capital_bursatil">Status</label>
              <input className="form-control" type="text" name="status" id="status" onChange={this.handleChange} value={form ? form.status : ''} />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal == 'insertar' ?
              <button className="btn btn-success" onClick={() => this.peticionPost()}>
                Insertar
              </button> : <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                Actualizar
              </button>
            }
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar este categoria {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>

      </div >

    );
  }
}
export default App;
