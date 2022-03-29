import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from "../components/Navbar";
import 'fontsource-roboto';
import '../assets/css/Dashboard.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CardsHeader from '../components/CardsHeader';
import Cards from '../components/Cards';
import PublicIcon from '@material-ui/icons/Public';
import VideocamIcon from '@material-ui/icons/Videocam';
import Graphics from '../components/Graphics';
import TableMaterial from '../components/TableMaterial';


const useStyles= makeStyles(()=>({
root:{
    flexGrow: 1
},
iconos:{
    color: 'white'
},
container:{
  paddingTop: '40px',
  alignItems: 'center'
}
}));

const data = [
  {
    id:1,
    video:
      "Como Hacer un Split en React JS || React Split Pane || Tutorial en Español (2020)",
    fecha: "6 de sep. 2020",
    visualizaciones: 32,
    imagen: require("../assets/img/split.webp"),
  },
  {
    id:2,
      video:
        "Cómo Solucionar Error al Crear Applicación de React JS",
      fecha: "5 de sep. 2020",
      visualizaciones: 31,
      imagen: require("../assets/img/error.webp"),
    },
    {
    id:3,
      video:
        "Cómo Utilizar Forever en Node JS || Ejecutar Node JS en Segundo Plano || Background Node JS",
      fecha: "4 de sep. 2020",
      visualizaciones: 21,
      imagen: require("../assets/img/forever.webp"),
    },
];

function Dashboard(props) {
    const classes= useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Navbar/>
                </Grid>

                
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                   <CardsHeader icono={<YouTubeIcon className={classes.iconos}/>} titulo="CANAL" texto="BorjaScript" color="rgba(248,80,50,1)" font="white"/>
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <a href="/product"><CardsHeader icono={<PublicIcon className={classes.iconos}/>} titulo="Products" texto="Productos" color="rgba(248,80,50,1)" font="white" /></a>
                </Grid>

                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  <CardsHeader icono={<VideocamIcon className={classes.iconos}/>} titulo="CANTIDAD DE VÍDEOS" texto="85" color="rgba(248,80,50,1)" font="white"/>
                </Grid>

                <Grid container spacing={1} className={classes.container} >
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Cards titulo="SUSCRIPTORES" texto="692"/>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Cards titulo="VISUALIZACIONES" texto="111,092"/>
                  </Grid>
                    
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Cards titulo="TIEMPO VISUALIZACIÓN" texto="2,504 horas"/>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                  <Cards titulo="PORCENTAJE IMPRESIONES" texto="14.2%"/>
                  </Grid>


                  </Grid>

                  <Grid item xs={12} className={classes.containerTabla}>
                    <TableMaterial data={data}/>
                  </Grid>




            </Grid>
        </div>
    );
}

export default Dashboard;