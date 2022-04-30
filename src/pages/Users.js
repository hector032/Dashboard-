import React, { Component } from 'react';
import '../assets/css/App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import Cookies from "universal-cookie";

const cookies = new Cookies();

const urlGet = "http://localhost/ecomoving/public/api/user/list";
const urlPost = "http://localhost/ecomoving/public/api/user/create";
const urlPut = "http://localhost/ecomoving/public/api/user/edit/";
const urlDelete = "http://localhost/ecomoving/public/api/user/delete/";

const token = cookies.get("token");

const header = {
  headers: {
    Authorization: `Bearer ` + token,
  },
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
    axios.get(urlGet,header).then((response) => {
      console.log(response.data.items);
      console.log(response);
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

  seleccionarUsuario = (user) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: user.id,
        email:user.email,
        password:user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        country: user.country,
        city: user.city,
        zipCode: user.zipCode,
        phone: user.phone,
        roleId: user.roleId,
        status: user.status
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


  cerrarSesion = () => {
    cookies.remove("token", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("token")) {
      window.location.href = "./";
    }
    this.peticionGet();
  }

  render() {
    const { form } = this.state
    return (
      < div className="App" >
        <br /><br /><br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Usuario</button>
        <br /><br />
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>

              <th>first name</th>
              <th>last name</th>
              <th>address</th>
              <th>country</th>
              <th>city</th>
              <th>zip code</th>
              <th>phone</th>
              <th>role id</th>
              <th>status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(user => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.country}</td>
                  <td>{user.city}</td>
                  <td>{user.zipCode}</td>
                  <td>{user.phone}</td>
                  <td>{user.roleId}</td>               
                  <td>{user.status ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarUsuario(user); this.modalInsertar() }} ><FontAwesomeIcon icon={faEdit} /></button>
                    {"   "}
                    
                    <button className="btn btn-danger" onClick={() => { this.seleccionarUsuario(user); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
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

              <label htmlFor="email">Email</label>
              <input className="form-control" type="text" name="email" id="email" onChange={this.handleChange} value={form ? form.email : ''} />
              <br />

              <label htmlFor="password">Password</label>
              <input className="form-control" type="text" name="password" id="password" onChange={this.handleChange} value={form ? form.password : ''} />
              <br />

              <label htmlFor="firstName">First Name</label>
              <input className="form-control" type="text" name="firstName" id="firstName" onChange={this.handleChange} value={form ? form.firstName : ''} />
              <br />

              <label htmlFor="lastName">Last Name</label>
              <input className="form-control" type="text" name="lastName" id="lastName" onChange={this.handleChange} value={form ? form.lastName : ''} />
              <br />

              <label htmlFor="address">Address</label>
              <input className="form-control" type="text" name="address" id="address" onChange={this.handleChange} value={form ? form.address : ''} />
              <br />

              <label htmlFor="country">Country</label>
              <input className="form-control" type="text" name="country" id="country" onChange={this.handleChange} value={form ? form.country : ''} />
              <br />

              <label htmlFor="city">City</label>
              <input className="form-control" type="text" name="city" id="city" onChange={this.handleChange} value={form ? form.city : ''} />
              <br />

              <label htmlFor="zipCode">Zip Code</label>
              <input className="form-control" type="text" name="zip_code" id="zipCode" onChange={this.handleChange} value={form ? form.zipCode : ''} />
              <br />

              <label htmlFor="phone">Phone</label>
              <input className="form-control" type="text" name="phone" id="phone" onChange={this.handleChange} value={form ? form.phone : ''} />
              <br />

              <label htmlFor="role_id">Role ID</label>
              <input className="form-control" type="text" name="role_id" id="roleId" onChange={this.handleChange} value={form ? form.roleId : ''} />
              <br />

              <label htmlFor="status">Status</label>
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
            Estás seguro que deseas eliminar este usuario{form && form.first_name}
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