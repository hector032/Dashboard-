import React, { Component } from 'react';

import '../assets/css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Cookies from 'universal-cookie';


const cookies = new Cookies();

const urlGet = "http://localhost/ecomoving/public/api/product/list";
const urlPost = "http://localhost/ecomoving/public/api/product/create";
const urlPut = "http://localhost/ecomoving/public/api/product/edit/";
const urlDelete = "http://localhost/ecomoving/public/api/product/delete/";

const token = cookies.get('token');

const header ={
  headers: {
    'Authorization': `Bearer `+token
  }
};

class Product extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      name: '',
      description: '',
      status: '',
      category_id: '',
      tipoModal: '',
    }
  }

  peticionGet = () => {
    axios.get(urlGet,header).then((response) => {
      console.log(response.data.items);
      this.setState({ data: response.data.items });
    }).catch(error => {
      console.log(error.message);
    })
  }

  peticionPost = async () => {
    delete this.state.form.id;
    await axios.post(urlPost, this.state.form,header).then(response => {
      this.modalInsertar();
      this.peticionGet();
    }).catch(error => {
      console.log(error.message);
    })
  }


  peticionPut = () => {
    axios.put(urlPut + this.state.form.id, this.state.form,header).then(response => {
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(urlDelete+this.state.form.id,header).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  seleccionarProducto = (product) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: product.id,
        name: product.name,
        description: product.description,
        status: product.status,
        category_id: product.category_id
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

  cerrarSesion =()=>{
    cookies.remove('token',{path: '/'});
    window.location.href='./';
  }
  
  componentDidMount() {
    if(!cookies.get('token')){
        window.location.href="./";
    }
    this.peticionGet();
}

  render() {
    const { form } = this.state
    return (
      < div className="App" >
        <br /><br /><br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Producto</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Description</th>
              <th>Status</th>
              <th>Category id</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(product => {
              return (
                <tr>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.status ? 'Activo' : 'Inactivo'}</td>
                  <td>{product.category_id}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarProducto(product); this.modalInsertar() }} ><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarProducto(product); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
              <br />
              <label htmlFor="Category Id">Category Id</label>
              <input className="form-control" type="text" name="category_id" id="category_id" onChange={this.handleChange} value={form ? form.category_id : ''} />
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
            Estás seguro que deseas eliminar este producto {form && form.nombre}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>
        <br />
            <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
      </div >

    );
  }
}
export default Product;
