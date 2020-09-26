const app = new Vue({

    el: '#app',
    data: {
        showmodal: false,
        solicitudes: [],
        identificador: '',
        tecnicos: [],
        asesores: [],
        estado: '',
        estadoUrgencia: '',
        prioridad: '',
        IDtecnico: '',
        IDasesor: '',
        dni: ''

    },

    methods: {
        llamar: function() {
            //trayendo asesores
            axios
                .get('http://localhost:3105/asesores')
                .then(res => {
                    console.log(res);
                    this.asesores = res.data;
                });

            //trayendo tecnicos
            axios
                .get('http://localhost:3105/tecnicos')
                .then(res => {
                    console.log(res);
                    this.tecnicos = res.data;
                });
            // trayendo atenciones    
            axios
                .get('http://localhost:3105')
                .then(res => {
                    console.log(res);
                    this.solicitudes = res.data;
                });
        },
        mostrarModal: function(IDatencion, IDcliente) {
            this.showmodal = true;
            this.identificador = IDatencion;
            this.dni = IDcliente;
        },

        guardarEnviar: function() {
            axios.post('http://localhost:3105/actualizar', {
                idAtencion: this.identificador,
                estado: this.estado,
                estadoUrgencia: this.estadoUrgencia,
                id_asesor: this.IDasesor,
                id_tecnico: this.IDtecnico,
                prioridad: this.prioridad,
                dni: this.dni
            });

        }

    }


});



// fetch('http://localhost:3000')
//     .then(data => data.json())
//     .then(json => {
//         console.log(json);
//         this.solicitudes = json;
//     });