const app = new Vue({
    el: "#app",
    data: {
        showmodal: false,
        showmodalAsesor: false,
        showmodalTecnico: false,
        nombre: '',
        apellido: '',
        dni: '',
        nombreAsesor: '',
        apellidoAsesor: '',
        dniAsesor: '',
        nombreTecnico: '',
        apellidoTecnico: '',
        dniTecnico: '',
        ID: '',
        asesores: [],
        tecnicos: []
    },

    methods: {
        llamar: function() {
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
        },

        mostrarModal: function(ID, nombre, apellido, dni) {
            this.showmodal = true
            this.nombre = nombre
            this.apellido = apellido
            this.dni = dni
            this.ID = ID
        },

        actualizar: function() {
            axios.post('http://localhost:3105/actualizarEmpleados', {
                ide: this.ID,
                nombre: this.nombre,
                apellido: this.apellido,
                dni: this.dni
            });
        },

        ingresarAsesor: function() {
            this.showmodalAsesor = true;
            axios.post('http://localhost:3105/ingresarAsesor', {
                nombre: this.nombreAsesor,
                apellido: this.apellidoAsesor,
                dni: this.dniAsesor
            });
        },
        ingresarTecnico: function() {
            this.showmodalTecnico = true;
            axios.post('http://localhost:3105/ingresarTecnico', {
                nombre: this.nombreTecnico,
                apellido: this.apellidoTecnico,
                dni: this.dniTecnico
            });
        },

        eliminar: function(ide) {
            axios.post('http://localhost:3105/eliminarEmpleados', {
                ide: ide,
            });
        }
    }


});