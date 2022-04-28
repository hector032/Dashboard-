import React, { Component } from 'react';

import '../assets/css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const urlGet = "http://localhost/ecomoving/public/api/order/list";
const urlPost = "http://localhost/ecomoving/public/api/order/create";
const urlPut = "http://localhost/ecomoving/public/api/order/edit/";
const urlDelete = "http://localhost/ecomoving/public/api/order/delete/";

const header ={
  headers: {
    'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTA5MDI2MDUsImV4cCI6MTY1MDk0NTgwNSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImhlY3RvckBnbWFpbC5jb20ifQ.KeHZVaBzkYyTI0TyAKOjEqTEkWCHSkHhSxVrpu8g2fl43bep8fnsmlVeDfFcT-A-ZYw_q3xUniAkIYiJoHrx66BvLrUMLpdfWiYz5KTZJnF6JNs1mijlKDEiPvAhmpJS1WbnL4ZEYg-mXybKs6kp5sgLOVi2HHnPSHRDmm2QAEbZPQg_0JBUpjiKILuwr8J9_Y1-wvKJ0gFAYR-oqKs-_FzPdZgYxPlIg9lh-B_V_IfVdGIXKyIEj62Q1UE_6Z9eu7IBgwLyGR3zzBfb0ht90RL-ODSzix3FtZxbh5wpDyuJzT7O3g2WHWnuTtgIKFea3w5IkbUI1kgFKRy4B6jmK_N4PWhVZIHMksNZ6VVVtNU801rPiyTYe1xoW48X6Lzn0si7LY4yjSt6i_4XvnIT2InwmOtQIUIxAR8ODfQAqDumGZ1mPi655vk1YVK9vLW1ixrZazrSCoEHb7IyJ67kn7XEM4M7qJZuqdJ-FCPDdiIkAbWpbWopfEEZc3AE7jfn8q6e2Sry63ZxRGfvm83X3Ff1kVO6tYpnvNhUP8iMWdjIfVQDzAzD8nU9VYCB_Y6VAxk9WrLvGErdesl6m0oOTL-8yKGbMyOOUaz-qXAkBnQHk07iS3qhK9vhlHl9Pw5YwiONTHuEhDVHw9prCaHKI3xV4-8w1S4H49hMUa6eayE`
  }
};

class App extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form: {
      id: '',
      packs_id: '',
      user_id: '',
      product_id: '',
      status: '',
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

  seleccionarOrder = (order) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: order.id,
        packs_id: order.packs_id,
        user_id: order.user_id,
        product_id: order.product_id,
        status: order.status
        
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
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Order</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Packs id</th>
              <th>User id</th>
              <th>Product id</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(order => {
              return (
                <tr>
                  <td>{order.id}</td>
                  <td>{order.packs_id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.status ? 'Activo' : 'Inactivo'}</td>
                  
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarOrder(order); this.modalInsertar() }} ><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarOrder(order); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
              <label htmlFor="packs_id">Packs ID</label>
              <input className="form-control" type="text" name="packs_id" id="packs_id" onChange={this.handleChange} value={form ? form.packs_id : ''} />
              <br />
              <label htmlFor="user_id">User ID</label>
              <input className="form-control" type="text" name="user_id" id="user_id" onChange={this.handleChange} value={form ? form.user_id : ''} />
              <br />
              <label htmlFor="status">Status</label>
              <input className="form-control" type="text" name="status" id="status" onChange={this.handleChange} value={form ? form.status : ''} />
              <br />
              <label htmlFor="product_id">Product Id</label>
              <input className="form-control" type="text" name="product_id" id="product_id" onChange={this.handleChange} value={form ? form.product_id : ''} />
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
            Estás seguro que deseas eliminar esta order {form && form.id}
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
